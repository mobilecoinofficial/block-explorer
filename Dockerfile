# Install deps and build html + js
FROM node:19.5.0-buster-slim AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
ENV REACT_APP_RESERVE_AUDITOR_URL http://localhost:8080
ENV REACT_APP_FULL_SERVICE_URL http://localhost:9090/wallet/v2
COPY . . 
RUN yarn build

# Run webserver
# everything we need is in /app/dist
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
