const express = require("express");
const multer = require("multer");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

// Replace with your Telegram bot token
const token = "6786130954:AAF-dzGGNm2lD-KqrQ0NPDPXdTUQOrWowzo";
const bot = new TelegramBot(token, { polling: true });

app.use(cors());

app.get("/", (req, res) => {
  res.send("Unavailable");
});

// Endpoint to upload images
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Replace with your chat ID
  const chatId = "6612518419";

  // Send the photo to the Telegram bot
  bot
    .sendPhoto(chatId, fs.createReadStream(req.file.path))
    .then(() => {
      fs.unlinkSync(req.file.path); // Delete the file after sending
      res.send({ message: "Image sent to Telegram" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending image to Telegram");
    });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
