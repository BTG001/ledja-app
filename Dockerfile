FROM node:lts-alpine

### Working Directory.
# WORKDIR /ledja-frontend

### Copy Everything Package.json
COPY package.json ./
COPY . .

### Run Npm install.
RUN npm install
RUN apk add --no-cache bash


#RUN node ace migration:run

EXPOSE 3000

CMD ["npm", "dev"]
