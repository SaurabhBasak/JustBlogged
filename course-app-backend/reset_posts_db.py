import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(os.environ["DATABASE_URL"])

with connection:
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM posts;")
        cursor.execute("DELETE FROM comments;")
        cursor.execute("DROP SEQUENCE post_serial;")
        cursor.execute("DROP SEQUENCE comment_serial;")

        