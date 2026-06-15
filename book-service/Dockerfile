FROM docker.io/library/node:24-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

RUN npm run build
ENV HOST=0.0.0.0 PORT=3000
EXPOSE 3000
CMD ["npm", "start"]