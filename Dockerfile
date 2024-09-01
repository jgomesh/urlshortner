FROM node:20.7

EXPOSE 3001

WORKDIR /backend

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout
ENV NEW_RELIC_APP_NAME="URL Shortner"

COPY package.json package-lock*.json .sequelizerc ./

RUN npm install

COPY . .

CMD ["npm", "start"]
