# Install deps and build html + js
FROM node:19.5.0-buster-slim AS builder
WORKDIR /app
COPY package.json .
COPY .env .
RUN yarn install
COPY . . 
RUN yarn build

# Run webserver
# everything we need is in /app/dist
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
