FROM node:current-alpine

WORKDIR /opt/affms
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install
COPY ./public ./public
COPY ./src ./src

RUN yarn build

# final
FROM node:current-alpine

LABEL maintainer="bmswens@gmail.com"
EXPOSE 5000

WORKDIR /opt/affms
COPY --from=0 /opt/affms/build ./build
RUN npm install -g serve
ENTRYPOINT [ "serve", "-s", "build" ]