### STAGE 1:BUILD ###
FROM node:20.0-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
#There are some mistakes with angular modules versions, thun use --force
RUN npm install --force
RUN npm run build --prod


### STAGE 2:RUN ###
FROM nginx:latest AS ngi

ENV BACKEND_UPSTREAM backend:8080

COPY ./docker/entrypoint.sh /sbin/entrypoint.sh

COPY --from=build /dist/src/app/dist/astana-ui /usr/share/nginx/html
COPY ./docker/nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80

