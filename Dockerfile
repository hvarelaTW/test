FROM node:16.13-alpine

EXPOSE 3000

WORKDIR /opt/yape/app

COPY . .

ARG NODE_AUTH_TOKEN

# Everything in a single RUN, to avoid unecessary docker layers.
RUN echo "Starting" \
     && echo "//npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN" >> .npmrc \
     && npm install \
     && npm run build \
     && npm prune --production \
     && rm -f .npmrc

# Silent start because we want to have our log format as the first log
CMD ["npm", "run", "start:prod"]
