from fastapi import Depends, FastAPI, Response, HTTPException, status
from pydantic import BaseModel, StrictStr
from datetime import datetime, timedelta
import database
from fastapi.middleware.cors import CORSMiddleware
import pytz
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext


currentTime = pytz.timezone('US/Eastern')


SECRET_KEY = "907c266dfe33cbe7893ad99757be904d400fda46ff266ea2e54881fde049741d"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    },
}


app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


origins = [
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


database.create_posts_table()
database.create_comments_table()
database.create_posts_sequence()
database.create_comments_sequence()
database.create_users_table();
database.create_users_sequence();


class Comment(BaseModel):
    comment: str


class Post(BaseModel):
    title: StrictStr
    body: StrictStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str




def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)

def get_user(username: str):
    if database.user_exists(username):
        user_dict = database.get_user(username)
        return UserInDB(**user_dict)


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/signup", tags=["User Registration"])
def register(form_data: OAuth2PasswordRequestForm = Depends()):
    if database.user_exists(form_data.username):
        return "Username exists"
    hashed_password = get_password_hash(form_data.password)
    disabled = False
    return database.register_user(form_data.username, hashed_password, disabled, datetime.now(currentTime))


@app.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]


@app.get("/", tags=["Homepage"])
def home():
    return database.get_posts()


@app.post("/post", tags=["Create post"])
def post(request: Post, current_user: User = Depends(get_current_active_user)):
    return database.add_post(request.title, request.body, datetime.now(currentTime))


@app.post("/posts/{post_id}", tags=["Create comment"])
def comment(post_id: int, request: Comment, response: Response, current_user: User = Depends(get_current_active_user)):
    try:
        return database.add_comment(request.comment, datetime.now(currentTime), post_id)
    except database.PostDoesNotExist:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return f"Post with id = {post_id} does not exist"
        

@app.get("/posts/{post_id}", tags=["Post page"])
def postPage(post_id: int, response: Response):
    try:
        return database.get_post(post_id)
    except database.PostDoesNotExist:
        response.status_code = status.HTTP_404_NOT_FOUND
        return f"Post with id = {post_id} does not exist"
    

@app.get("/users", tags=["Users List"])
def get_users():
    return database.get_users()


@app.get("/user/{username}", tags=["Get User"])
def get_user_from_db(username: str, response: Response):
    try:
        return database.get_user(username)
    except database.UserDoesNotExist:
        response.status_code = status.HTTP_404_NOT_FOUND
        return f"{username} could not be found"


@app.put("/posts/{post_id}", tags=["Update post"])
def updatePost(post_id: int, request: Post):
    return database.update_post(post_id, request.title, request.body, datetime.now())


@app.delete("/posts/{post_id}", tags=["Delete post"])
def deletePost(post_id: int):
    return database.delete_post(post_id)