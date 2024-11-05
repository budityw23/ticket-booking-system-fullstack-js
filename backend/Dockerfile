FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./

RUN npm install

COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./

RUN mkdir -p logs

EXPOSE 3000

CMD ["npm", "run", "dev"]
