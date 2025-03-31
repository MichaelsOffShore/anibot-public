# 📌 Anibot - A Discord Bot for Images & Crypto Prices

Anibot is a **Discord bot** that:  
✅ Sends random images from a directory every **2 hours** ⏳  
✅ Fetches live **cryptocurrency prices** and converts them to EUR 💰  
✅ Responds to `!ping` with `Pong.` for a simple bot check 🔄  

---

## 🚀 Features

- 📷 **Scheduled Image Posting** → Posts random images from the `Images/` folder.  
- 💱 **Crypto Price Fetcher** → Get the price of a cryptocurrency in **EUR** using `!price <TICKER>`.  
- 🏓 **Basic Ping Command** → Check if the bot is online with `!ping`.  

---

## 💨 To run

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file based on the `.env.example` template
4. Fill in all required API keys and tokens in the `.env` file
5. Start the bot with `node index.js`

## 🔑 Environment Variables

You'll need to set up the following environment variables in your `.env` file:

- `BOT_TOKEN` - Your Discord bot token
- `BOT_CHANNEL_ID` - The ID of the channel where images will be posted
- `COIN_MARKET_CAP_API_KEY_HEADER` - Header name for the CoinMarketCap API
- `COIN_MARKET_CAP_API_KEY` - Your CoinMarketCap API key
- `COIN_MARKET_CAP_BASE_URL` - Base URL for CoinMarketCap API
- `CURRENCY_CONVERTER_BASE_URL` - Base URL for currency conversion API
- `CURRENCY_API_KEY` - Your currency conversion API key

## 📁 Images

Place your images in the `Images/` directory to have them randomly posted by the bot.
