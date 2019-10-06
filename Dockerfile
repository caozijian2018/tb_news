# #FROM node:lts-alpine
# #
# #WORKDIR /app
# #
# #COPY . .
# #RUN cd trak_web \
# #  && npm install \
# #  && npm run build:prod

# FROM node:lts-alpine

# # install simple http server for serving static content
# RUN npm install -g http-server

# # make the 'app' folder the current working directory
# WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# # install project dependencies
# RUN npm install

# # copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# # build app for production with minification
# RUN npm run build:prod

# EXPOSE 9999
# CMD [ "http-server", "dist" ]

FROM caocaocao/web
LABEL MAINTAINER=cy
WORKDIR /app
RUN apk add python\
    && apk add  openssh --no-cache\
    && npm set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/\
    && git clone  https://github.com/caozijian2018/tb_news.git\
    && cd tb_news && npm install
# CMD "cd trak_web && npm run build:prod"

#  docker run --name=node1 alpine:3.9  sh