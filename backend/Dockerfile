FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Create logs directory
RUN mkdir -p logs

EXPOSE 3000

CMD ["npm", "run", "dev"]
