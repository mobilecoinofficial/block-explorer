# Install deps and build html + js
FROM node:19.5.0-buster-slim AS builder
WORKDIR /app
COPY package.json .
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
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]




# # install yarn
# # RUN npm install -g yarn
# RUN export NODE_ENV=development
# RUN yarn install
# # Set the working directory to /app inside the container
# RUN export NODE_ENV=production
# WORKDIR /app
# # Copy app files
# COPY package.json ./
# # set backend URLs
# ENV RESERVE_AUDITOR_URL tbd
# ENV FULL_SERVICE_URL tbd
