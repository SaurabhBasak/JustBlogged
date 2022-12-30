from fastapi import FastAPI, Response, status
from pydantic import BaseModel, StrictStr
import datetime
import database
from fastapi.middleware.cors import CORSMiddleware
import pytz

currentTime = pytz.timezone('US/Eastern')

app = FastAPI()

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
database.enable_foreign_key()

class Comment(BaseModel):
    comment: str

class Post(BaseModel):
    title: StrictStr
    body: StrictStr

@app.get("/")
def home():
    return database.get_posts()

@app.post("/post")
def post(request: Post):
    return database.add_post(request.title, request.body, datetime.datetime.now(currentTime))

@app.post("/posts/{post_id}")
def comment(post_id: int, request: Comment, response: Response):
    try:
        return database.add_comment(request.comment, datetime.datetime.now(currentTime), post_id)
    except database.PostDoesNotExist:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return f"Post with id = {post_id} does not exist"
        

@app.get("/posts/{post_id}")
def postPage(post_id: int, response: Response):
    try:
        return database.get_post(post_id)
    except database.PostDoesNotExist:
        response.status_code = status.HTTP_404_NOT_FOUND
        return f"Post with id = {post_id} does not exist"

@app.put("/posts/{post_id}")
def updatePost(post_id: int, request: Post):
    return database.update_post(post_id, request.title, request.body, datetime.now())

@app.delete("/posts/{post_id}")
def deletePost(post_id: int):
    return database.delete_post(post_id)