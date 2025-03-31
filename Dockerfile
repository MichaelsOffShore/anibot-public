# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables (optional, if you're using .env files, you'll need to handle that separately)
# Define environment variable
ENV BOT_TOKEN=${BOT_TOKEN}
ENV BOT_CHANNEL_ID=${BOT_CHANNEL_ID}
ENV COIN_MARKET_CAP_API_KEY_HEADER=${COIN_MARKET_CAP_API_KEY_HEADER}
ENV COIN_MARKET_CAP_API_KEY=${COIN_MARKET_CAP_API_KEY}
ENV COIN_MARKET_CAP_BASE_URL=${COIN_MARKET_CAP_BASE_URL}
ENV CURRENCY_CONVERTER_BASE_URL=${CURRENCY_CONVERTER_BASE_URL}
ENV CURRENCY_API_KEY=${CURRENCY_API_KEY}

# Command to run the bot
CMD ["node", "index.js"]



