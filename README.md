# Just Blogged
A simple web app that lets users create an account and post a question, fact, thought or anything to express themselves however they like. The web app is authenticated using JWT tokens and built using technologies such as FastAPI, React, PostgreSQL, and Docker

# Features
* Create an account and login
* Create a text-based post while logged in only
* Comment on other posts while logged in only
* View all the latest user posts on the homepage

# Getting Started

To run the app using Docker, follow these steps:
1. Clone the repo:
   
    ```shell
    git clone git@github.com:SaurabhBasak/JustBlogged.git
    cd JustBlogged
    ```
2. Build the images:

   ```shell
   docker compose build
   ```

3. Create the docker containers:

   ```shell
   docker conatiner create
   ```

4. Start the development server:

   ```shell
   docker compose start
   ```

### To stop the server:

  ```shell
  docker compose stop
  ```
