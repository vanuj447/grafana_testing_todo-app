FROM node:18

# Set working dir
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

EXPOSE 8000

CMD ["node", "app.js"]
