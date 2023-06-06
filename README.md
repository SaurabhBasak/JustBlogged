sudo service docker start - https://stackoverflow.com/questions/71815092/docker-cannot-connect-to-the-docker-daemon-at-unix-var-run-docker-sock-is-th

```
docker build -t image_name directory
docker run -d -p port:port --name(container) -e env_var=value --network network_name image_name
docker ps
docker container ls -a
docker container stop cont_name
docker container rm cont_name
docker container rm -f cont_name
docker system prune
docker run -d  --name app-db-container  --network blog-app-network -e POSTGRES_USER=sbasak -e POSTGRES_HOST=sbasak-blog-app -e POSTGRES_PASSWORD=Fall@2020 -e POSTGRES_NAME=blog-app -e POSTGRES_PORT=5432 -h sbasak-blog-app app-database
```