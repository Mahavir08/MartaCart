FROM node:18-slim

EXPOSE 4000

WORKDIR /app

COPY . ./app

RUN npm install

CMD ["node", "server/server.js"]
