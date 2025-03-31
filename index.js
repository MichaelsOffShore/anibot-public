require("dotenv").config();
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");
const schedule = require("node-schedule");

// Bot Configuration
const imagesDir = path.join(__dirname, "Images");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Configuration (Environment Variables)
const COIN_MARKET_CAP_API_KEY_HEADER = process.env.COIN_MARKET_CAP_API_KEY_HEADER;
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;
const COIN_MARKET_CAP_BASE_URL = process.env.COIN_MARKET_CAP_BASE_URL;
const CURRENCY_CONVERTER_BASE_URL = process.env.CURRENCY_CONVERTER_BASE_URL;
const BOT_CHANNEL_ID = process.env.BOT_CHANNEL_ID;
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY;

// Bot Ready Event
client.once("ready", () => {
  console.log("Anibot is now online!");
  schedule.scheduleJob("0 */2 * * *", postRandomImage);
});

client.login(process.env.DISCORD_BOT_TOKEN);

// Command: Ping Response
client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "!ping") {
    message.channel.send("Pong.");
  }
});

// Command: Get Cryptocurrency Price
client.on("messageCreate", async (message) => {
  const msgArray = message.content.toLowerCase().split(" ");
  if (msgArray.length > 1 && msgArray[0] === "!price") {
    const ticker = msgArray[1].toUpperCase();
    try {
      const usdPrice = await getCryptocurrencyPrice(ticker);
      const response = await axios.get(
        `${CURRENCY_CONVERTER_BASE_URL}${usdPrice}`,
        { headers: { apikey: CURRENCY_API_KEY } }
      );
      
      const eurPrice = Math.round(response.data.result * 100) / 100;
      console.log(`EUR Price: €${eurPrice}`);
      message.reply(`€${eurPrice}`);
    } catch (error) {
      console.error("Error fetching cryptocurrency price:", error);
      message.reply(`Error retrieving price for ${ticker}. Please try again later.`);
    }
  }
});

// Function: Send Random Image to Channel
const postRandomImage = () => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error("Error reading images directory:", err);
      return;
    }
    if (files.length === 0) {
      console.warn("No images found in directory.");
      return;
    }
    
    const randomFile = files[generateRandomNumber(0, files.length - 1)];
    console.log(`Sending random image: ${path.join(imagesDir, randomFile)}`);
    
    const channel = client.channels.cache.get(BOT_CHANNEL_ID);
    if (channel) {
      channel.send({
        files: [{
          attachment: path.join(imagesDir, randomFile),
          name: randomFile,
          description: "Random Image",
        }],
      });
    } else {
      console.error("Invalid BOT_CHANNEL_ID. Check your .env file.");
    }
  });
};

// Function: Generate Random Number (Inclusive)
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Function: Fetch Cryptocurrency Price from API
async function getCryptocurrencyPrice(ticker) {
  try {
    const response = await axios.get(
      `${COIN_MARKET_CAP_BASE_URL}${ticker}`,
      { headers: { [COIN_MARKET_CAP_API_KEY_HEADER]: COIN_MARKET_CAP_API_KEY } }
    );
    
    const usdPrice = response.data.data[ticker].quote.USD.price;
    console.log(`USD Price = $${usdPrice.toFixed(2)}`);
    return usdPrice.toFixed(2);
  } catch (error) {
    console.error(`Error fetching price for ${ticker}:`, error);
    throw error;
  }
}