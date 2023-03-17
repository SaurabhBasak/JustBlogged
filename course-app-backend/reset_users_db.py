import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(os.environ["DATABASE_URL"])

with connection:
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM users;")
        cursor.execute("DROP SEQUENCE user_serial;")