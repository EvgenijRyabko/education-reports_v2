# 1 Этап: build node_modules (размер node_modules около 156 МБ + ./dist app)
FROM node:20.11-alpine AS development
WORKDIR /var/www/education-reports
COPY *.json ./
COPY ./src ./src
# ! ENV FILE
COPY ./.env ./.env
RUN npm install && npm run build

# 2 Этап: build application (`--omit=dev` размер node_modules около 27МБ + ./dist app)
FROM node:20.11-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /var/www/education-reports
COPY --from=development /var/www/education-reports/dist ./dist
# ! ENV FILE
COPY --from=development /var/www/education-reports/.env ./.env
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start:prod"]