FROM node:alpine
WORKDIR /usr/chessh_bot
COPY package.json .
RUN npm install\
    && npm install typescript -g
COPY . .
RUN tsc
CMD ["node", "./dist/src/index.js"]
