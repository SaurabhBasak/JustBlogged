FROM node:latest

COPY package.json /app-frontend/
COPY public /app-frontend/
COPY src /app-frontend/
COPY tailwind.config.js /app-frontend/
COPY package-lock.json /app-frontend/

WORKDIR /app-frontend

RUN npm install

CMD [ "npm", "start" ]