FROM node:14-alpine

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]
