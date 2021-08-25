FROM node:12.13.0

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/src
RUN mkdir -p /usr/src/app/jest
RUN mkdir -p /usr/src/app/certs
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY .env.example /usr/src/app/.env
RUN npm install

COPY src /usr/src/app/src/
COPY jest /usr/src/app/jest/
COPY certs /usr/src/app/certs/
COPY . /usr/src/app/

EXPOSE 3000

CMD ["npm", "start"]
