FROM node:carbon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . /usr/src/app
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
