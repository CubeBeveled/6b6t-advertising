const mineflayer = require("mineflayer");
const color = require("colors");
const { randomInt } = require("crypto");

const sleep = (toMs) => {
  return new Promise((r) => {
    setTimeout(r, toMs);
  });
};

function getRandomBoolean() {
  return randomInt(-1, 1) < 0;
}

function randomString(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, alphabet.length);
    randomString += alphabet.charAt(randomIndex);
  }

  return randomString;
}

const state = {
  offline: "offline",
  online: "online",
  reconnecting: "reconnecting",
  dead: "dead"
}

// These are here so every bot doesnt sent playercount and messages and spam the console
let loggingMsgs = false;
let sentPlayercount = false;

class bot {
  constructor(botOptions) {
    this.config = require("./config.json");
    this.botOptions = botOptions;
    this.bot = mineflayer.createBot(this.botOptions);
    this.registerEvents()

    this.playerIndex = 0;
    this.messageIndex = 0;

    this.spawned = 0;
    this.currentState = state.offline;
  }

  registerEvents() {
    this.bot.on("error", async (error) => {
      console.log(color.yellow(`[${this.botOptions.username}] Error: `) + error.message)
      this.currentState = state.online;
      await this.reconnect();
    });

    this.bot.on("end", async (reason) => {
      console.log(color.yellow(`[${this.botOptions.username}] Connection ended: `) + reason);
    });

    this.bot.on("kicked", async (reason) => {
      console.log(color.yellow(`[${this.botOptions.username}] Kicked: `) + reason)
      this.currentState = state.online;
      await this.reconnect()
    });

    this.bot.on("death", () => {
      this.currentState = state.dead;
    });

    this.bot.on("spawn", () => {
      this.spawned++
      this.currentState = state.online;

      console.log(color.green(`[${this.botOptions.username}] spawned (${this.spawned})`));

      if (this.spawned == 1) {
        this.bot.setControlState("forward", true);
      }

      if (this.spawned == 2) {
        this.bot.setControlState("forward", false);

        if (!sentPlayercount) {
          const players = Object.values(this.bot.players)
          .filter((p) => p.username !== this.botOptions.username && !this.config.advertising.usernameBlacklist.includes(p.username))
            .map(player => player);

          console.log(color.green(players.length + " players online"));
          sentPlayercount = true;
        }
      }

      if (this.spawned >= 2) {
        this.advertisementLoop();
        this.movementLoop();
      }
    });

    this.bot.on("message", (msg) => {
      const ansi = msg.toAnsi();
      msg = msg.toString();

      if (this.botOptions.sendServerMessagesInConsole && !loggingMsgs) {
        console.log(ansi);
        loggingMsgs = true;
      }

      if (msg.includes("/login")) {
        this.bot.chat(`/login ${this.botOptions.password}`);
      }
    });
  }

  async movementLoop() {
    if (this.currentState !== state.online) return;
    const maxMotionDelay = 2000;

    if (getRandomBoolean()) {
      this.bot.setControlState("jump", true)
      await sleep(randomInt(10, maxMotionDelay))
      this.bot.setControlState("jump", false)
    }

    if (getRandomBoolean()) {
      this.bot.setControlState("forward", true)
      await sleep(randomInt(10, maxMotionDelay))
      this.bot.setControlState("forward", false)
    }

    if (getRandomBoolean()) {
      this.bot.setControlState("back", true)
      await sleep(randomInt(10, maxMotionDelay))
      this.bot.setControlState("back", false)
    }

    if (getRandomBoolean()) {
      this.bot.setControlState("left", true)
      await sleep(randomInt(10, maxMotionDelay))
      this.bot.setControlState("left", false)
    }

    if (getRandomBoolean()) {
      this.bot.setControlState("right", true)
      await sleep(randomInt(10, maxMotionDelay))
      this.bot.setControlState("right", false)
    }

    this.bot.look(randomInt(-180, 180), randomInt(-360, 360));

    await sleep(100);
    this.movementLoop()
  }

  async advertisementLoop() {
    if (this.currentState !== state.online) return;

    let message;

    if (this.config.advertising.sendMessagesInRandomOrder) {
      message = this.config.advertising.messages[randomInt(this.config.advertising.messages.length)]
    } else {
      if (this.messageIndex < this.config.advertising.messages.length) {
        message = this.config.advertising.messages[this.messageIndex]
        this.messageIndex++;
      } else {
        message = this.config.advertising.messages[this.messageIndex]
        this.messageIndex = 0;
      }
    }

    message = this.config.advertising.messagePattern.replace(".msg", message).replace(".rand", randomString(this.config.advertising.randomStringLength))

    if (this.config.advertising.whisperMessages) {
      const players = Object.values(this.bot.players)
        .filter((p) => p.username !== this.botOptions.username && !this.config.advertising.usernameBlacklist.includes(p.username))
        .map(player => player);

      let username;

      if (this.config.advertising.randomPlayerOrder) {
        username = players[randomInt(0, players.length - 1)].username
      } else {
        let currentPlayer = players[this.playerIndex];

        if (currentPlayer) username = currentPlayer.username
        else {
          currentPlayer = players[this.playerIndex - 1]
          this.playerIndex = 0;
        }

        if (players.length - 1 < this.playerIndex + 1) this.playerIndex++
        else this.playerIndex = 0;
      }

      this.bot.chat(`/msg ${username} ${message}`)
      console.log(color.green(`Sent ${color.gray(message)} to ${color.yellow(username)}`));
      
      if (this.config.advertising.randomMessageDelay) await sleep(randomInt(3500, this.config.advertising.maxRandomMessageDelay))
      else await sleep(this.config.advertising.messageDelay)
    }

    if (this.config.advertising.sendMessagesInChat) {
      this.bot.chat(message);
      console.log(color.green(`Sent ${color.gray(message)}`));
    }

    if (this.config.advertising.randomMessageDelay) await sleep(randomInt(3500, this.config.advertising.maxRandomMessageDelay)) // 3.5s min message delay
    else await sleep(this.config.advertising.messageDelay)

    this.advertisementLoop()
  }

  async reconnect() {
    if (this.currentState !== state.online) return;
    this.currentState = state.reconnecting;
    if (this.bot) this.bot.end();

    this.spawned = 0;
    await sleep(this.botOptions.reconnectDelay)
    this.bot = mineflayer.createBot(this.botOptions);
    this.registerEvents();
  }
}

module.exports = bot;