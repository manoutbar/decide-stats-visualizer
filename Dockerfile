FROM node:12.22.7-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --silent
RUN yarn add react-scripts@4.0.3 -g silent

CMD ["yarn", "start"]