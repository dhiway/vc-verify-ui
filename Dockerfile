FROM node:22-slim as prod

#ENV NODE_ENV=production

WORKDIR /app

COPY package.json  yarn.lock /app/
RUN yarn

COPY . .
RUN yarn build

COPY view dist/

EXPOSE 5002

CMD ["node", "dist/index.js"]

#CMD ["tail", "-f", "/dev/null"]
