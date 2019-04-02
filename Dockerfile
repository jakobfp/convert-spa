FROM node:10.15.3

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
