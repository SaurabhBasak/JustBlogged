import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


connection = psycopg2.connect(os.environ["DATABASE_URL"])

# connection.row_factory = dict_factory

class PostDoesNotExist(Exception):
    pass


def create_posts_table():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS posts (
                    id INTEGER, 
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
                    id INTEGER, 
                    body VARCHAR(255), 
                    date VARCHAR, 
                    post_id INTEGER REFERENCES posts(id)
                );
            """)

def create_sequence():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("ALTER SEQUENCE serial RESTART 1;")


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
            cursor.execute("SELECT NEXTVAL('serial')")
            id = cursor.fetchone()[0]
            cursor.execute(
                "INSERT INTO posts VALUES(%s, %s, %s, %s);", (id, title, body, created_at)
            )
            return {"id": id, "title": title, "body": body, "date": created_at}


def add_comment(body, created_at, post_id):
    with connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(
                    "INSERT INTO comments (body, date, post_id) VALUES(%s, %s, %s);", (body, created_at, post_id)
                )
                return {"id": cursor.lastrowid, "body": body, "date": created_at, "post_id": post_id}
            except psycopg2.IntegrityError as exc:
                raise PostDoesNotExist from exc


def get_posts():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM posts ORDER BY date DESC;")
            return cursor.fetchall()


def get_post(post_id):
    with connection:
        with connection.cursor() as cursor:
            post_cursor = cursor.execute("""
                SELECT title, body, date
                FROM posts
                WHERE id = %s;
            """, (post_id,))
            
            comments_cursor = cursor.execute("""
                SELECT id, body, date
                FROM comments
                WHERE post_id = %s ORDER BY date DESC;
            """, (post_id,))

            post = post_cursor.fetchone()
            
            if post is None:
                raise PostDoesNotExist
            
            post["comments"] = comments_cursor.fetchall()
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