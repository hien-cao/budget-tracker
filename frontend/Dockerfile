FROM node:20

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./

RUN npm install

COPY . .