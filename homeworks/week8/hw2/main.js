const getGamesURL = "https://api.twitch.tv/kraken/games/top?limit=5";
const getStreamsURL = "https://api.twitch.tv/kraken/streams/?game=";
const errMsg = "系統不穩定，請再試一次";

// 設定 header
function setHeader(e) {
  e.setRequestHeader("Client-ID", "vw9qvpsg84wszv7m8phzejcda7t8tn");
  e.setRequestHeader("Accept", "application / vnd.twitchtv.v5 + json");
}

getTopGames();

// 點了會顯示第二個遊戲的實況
document.querySelector(".navbar").addEventListener("click", (e) => {
  const gameName = e.target.innerText;
  document.querySelector("h1").innerText = gameName;

  // 這裡沒清空的話永遠只會顯示第一個遊戲實況
  document.querySelector(".streams").innerHTML = " ";
  getStreams(gameName);
});

// 拿前五個熱門遊戲放到 navbar
function getTopGames() {
  const request = new XMLHttpRequest();
  request.open("Get", getGamesURL, true);
  setHeader(request);
  request.onload = function () {
    // 錯誤處理
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.response).top;
        for (let game of data) {
          let element = document.createElement("li");
          element.innerText = game.game.name;
          document.querySelector(".navbar").appendChild(element);
        }
        // 顯示第一個遊戲的實況
        document.querySelector("h1").innerText = data[0].game.name;
        getStreams(data[0].game.name);
      } catch (err) {
        alert(errMsg);
        console.log(err);
        return;
      }
      if (!request.response) {
        alert(errMsg);
      }
    } else {
      alert(errMsg);
    }
  };
  request.send();
}

// 取得特定遊戲的前 20 個熱門 live stream
function getStreams(e) {
  const request2 = new XMLHttpRequest();
  request2.open("GET", getStreamsURL + encodeURIComponent(e), true);
  setHeader(request2);
  request2.onload = function () {
    if (request2.status >= 200 && request2.status < 400) {
      const streamsData = JSON.parse(request2.response).streams;
      for (let stream of streamsData) {
        let element = document.createElement("div");
        document.querySelector(".streams").appendChild(element);
        element.outerHTML = `
              <div class="stream">
                <img src="${stream.preview.large}"/>
                <div class="stream_data">
                  <div class="stream_logo">
                    <img src="${stream.channel.logo}"/>
                  </div>
                  <div class="stream_intro">
                    <div class="stream_title">${stream.channel.status}</div>
                    <div class="stream_channel">${stream.channel.display_name}</div>
                  </div>
                </div>
              </div>
              `;
      }
    } else {
      alert(errMsg);
    }
  };
  request2.send();
}
