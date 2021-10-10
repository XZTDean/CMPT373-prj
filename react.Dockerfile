FROM node:lts-slim

WORKDIR /app
COPY frontend .

RUN ["npm", "install"]
CMD ["npm", "start"]
