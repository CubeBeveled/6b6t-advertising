let bots = [];
const bot = require("./bot");
const config = require("./config.json")

for (let i = 0; i < config.botCount; i++) {
  let options = {
    host: "6b6t.org", // IP of the server to connect to
    version: "1.20", // Version that the bot will use
    viewDistance: config.botOptions.viewDistance, // Info in README.md
    checkTimeoutInterval: 60000, // After how much time of the server not responding the bot should be considered timed out
  }

  if (i == 0) options.username = config.botOptions.username
  else options.username = config.botOptions.username + i

  bots.push(
    new bot(options)
  )
}