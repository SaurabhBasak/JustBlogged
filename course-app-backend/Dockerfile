FROM python:3.10-bullseye

COPY main.py /app-backend/
COPY database.py /app-backend/
COPY requirements.txt /app-backend/

WORKDIR /app-backend

RUN pip install --requirement requirements.txt

EXPOSE 8000

CMD [ "python3.10", "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0" ]