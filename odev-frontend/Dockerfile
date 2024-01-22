FROM node:alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build


FROM nginx:latest

WORKDIR /app
COPY --from=build /app/dist/odev-frontend /usr/share/nginx/html
EXPOSE 80