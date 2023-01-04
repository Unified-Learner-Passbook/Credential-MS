FROM node:16 as dependencies
WORKDIR /app
COPY . ./
RUN yarn
EXPOSE 3333
CMD ["yarn", "start"]