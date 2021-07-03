FROM node:12.10.0-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN npm install --production

EXPOSE 8888

CMD ["node", "app.js"]
