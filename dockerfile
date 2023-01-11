FROM node:latest

WORKDIR /usr/src/app
COPY app.js /usr/src/app
COPY package.json /usr/src/app

RUN npm install && apt-get -y update
RUN apt-get -y install vim

CMD ["node", "app.js"]