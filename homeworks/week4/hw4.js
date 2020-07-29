const request = require("request");

const options = {
  url: "https://api.twitch.tv/kraken/games/top",
  headers: {
    "Client-ID": "vw9qvpsg84wszv7m8phzejcda7t8tn",
    Accept: "application/vnd.twitchtv.v5+json",
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode >= 200 && response.statusCode < 300) {
    const info = JSON.parse(body);
    for (let i = 0; i < info.top.length; i++) {
      console.log(`${info.top[i].viewers} ${info.top[i].game.name}`);
    }
  }
}

request(options, callback);
