FROM node:latest

WORKDIR /usr/src/app
COPY app.js /usr/src/app
COPY package.json /usr/src/app
RUN npm install

CMD ["node", "app.js"]