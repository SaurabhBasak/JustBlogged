FROM python:3.10-bullseye

COPY main.py /app-backend/
COPY database.py /app-backend/
COPY requirements.txt /app-backend/

WORKDIR /app-backend

RUN pip install --requirement requirements.txt

CMD [ "uvicorn", "main:app", "--reload" ]