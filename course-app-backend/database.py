import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(os.environ["DATABASE_URL"])

class PostDoesNotExist(Exception):
    pass


def create_posts_table():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS posts (
                    id SERIAL PRIMARY KEY, 
                    title VARCHAR(50), 
                    body VARCHAR(255), 
                    date VARCHAR
                );
            """)


def create_comments_table():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS comments (
                    id SERIAL PRIMARY KEY, 
                    body VARCHAR(255), 
                    date VARCHAR, 
                    post_id INTEGER REFERENCES posts(id)
                );
            """)

def create_posts_sequence():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("CREATE SEQUENCE IF NOT EXISTS post_serial START 1;")

def create_comments_sequence():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("CREATE SEQUENCE IF NOT EXISTS comment_serial START 1;")


# def enable_foreign_key():
#     with connection:
#         with connection.cursor() as cursor:
#             cursor.execute("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO wtjyubfw;")
#             cursor.execute("SET session_replication_role = replica;")
#             cursor.execute("ALTER TABLE comments ADD FOREIGN KEY (post_id) REFERENCES posts (id);")
#             cursor.execute("SET session_replication_role = DEFAULT;")
#             return cursor.fetchall()


def add_post(title, body, created_at):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT NEXTVAL('post_serial')")
            id = cursor.fetchone()[0]
            cursor.execute(
                "INSERT INTO posts VALUES(%s, %s, %s, %s);", (id, title, body, created_at)
            )
            return {"id": id, "title": title, "body": body, "date": created_at}


def add_comment(body, created_at, post_id):
    with connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute("SELECT NEXTVAL('comment_serial')")
                id = cursor.fetchone()[0]
                cursor.execute(
                    "INSERT INTO comments VALUES(%s, %s, %s, %s);", (id, body, created_at, post_id)
                )
                return {"id": id, "body": body, "date": created_at, "post_id": post_id}
            except psycopg2.IntegrityError as exc:
                raise PostDoesNotExist from exc


def get_posts():
    with connection:
        with connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM posts ORDER BY date DESC;")
            return cursor.fetchall()


def get_post(post_id):
    with connection:
        with connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute(
                """SELECT title, body, date 
                   FROM posts
                   WHERE id = %s;
                """, (post_id,)
            )
            
            post = cursor.fetchone()
            
            if post is None:
                raise PostDoesNotExist
            
            cursor.execute(
                """SELECT id, body, date
                   FROM comments
                   WHERE post_id = %s ORDER BY date DESC;
                """, (post_id,)
            )         
            
            post["comments"] = cursor.fetchall()

            return post


def update_post(post_id, title, body, created_at):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE posts SET title = %s, body = %s, date = %s WHERE id = %s",
                (title, body, created_at, post_id)
            )
            return post_id


def delete_post(post_id):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "DELETE FROM posts WHERE id = %s;", (post_id,)
            )
            return post_id 