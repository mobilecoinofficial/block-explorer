# Use a Node 16 base image
FROM node:16-alpine
# install yarn
# RUN npm install -g yarn
RUN export NODE_ENV=development
RUN yarn install
# Set the working directory to /app inside the container
RUN export NODE_ENV=production
WORKDIR /app
# Copy app files
COPY package.json ./
# set backend URLs
ENV RESERVE_AUDITOR_URL tbd
ENV FULL_SERVICE_URL tbd
# Expose port
EXPOSE 8085
# run the app
CMD [ "yarn", "start" ]
