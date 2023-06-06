FROM node:latest

RUN mkdir /app-frontend/

COPY package.json /app-frontend/package.json
COPY public /app-frontend/public
COPY src /app-frontend/src
COPY tailwind.config.js /app-frontend/tailwind.config.js
COPY package-lock.json /app-frontend/package-lock.json

WORKDIR /app-frontend

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]