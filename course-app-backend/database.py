import sqlite3


def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


connection = sqlite3.connect("data.db", check_same_thread=False)
connection.row_factory = dict_factory


class PostDoesNotExist(Exception):
    pass


def create_posts_table():
    with connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, 
                body TEXT, 
                date TEXT
            );
        """)


def create_comments_table():
    with connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                body TEXT, 
                date TEXT, 
                post_id INTEGER, 
                FOREIGN KEY (post_id) 
                    REFERENCES posts(id)
                        ON UPDATE CASCADE 
                        ON DELETE CASCADE
            );
        """)


def enable_foreign_key():
    with connection:
        cursor = connection.execute("PRAGMA foreign_keys = ON")
        return cursor.fetchall()


def add_post(title, body, created_at):
    with connection:
        cursor = connection.execute(
            "INSERT INTO posts (title, body, date) VALUES(?, ?, ?);", (title, body, created_at)
        )
        return cursor.lastrowid


def add_comment(body, created_at, post_id):
    with connection:
        try:
            cursor = connection.execute(
                "INSERT INTO comments (body, date, post_id) VALUES(?, ?, ?);", (body, created_at, post_id)
            )
            return cursor.lastrowid
        except sqlite3.IntegrityError as exc:
            raise PostDoesNotExist from exc


def get_posts():
    with connection:
        cursor = connection.execute("SELECT * FROM posts ORDER BY date DESC;")
        return cursor.fetchall()


def get_post(post_id):
    with connection:
        post_cursor = connection.execute("""
            SELECT title, body, date
            FROM posts
            WHERE id = ?;
        """, (post_id,))
        
        comments_cursor = connection.execute("""
            SELECT id, body, date
            FROM comments
            WHERE post_id = ?;
        """, (post_id,))

        post = post_cursor.fetchone()
        
        if post is None:
            raise PostDoesNotExist
        
        post["comments"] = comments_cursor.fetchall()
        return post


def update_post(post_id, title, body, created_at):
    with connection:
        connection.execute(
            "UPDATE posts SET title = ?, body = ?, date = ? WHERE id = ?",
            (title, body, created_at, post_id)
        )
        return post_id


def delete_post(post_id):
    with connection:
        connection.execute(
            "DELETE FROM posts WHERE id = ?;", (post_id,)
        )
        return post_id 