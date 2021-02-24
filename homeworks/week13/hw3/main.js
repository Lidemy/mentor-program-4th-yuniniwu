const getGamesURL = "https://api.twitch.tv/kraken/games/top?limit=5";
const getStreamsURL = "https://api.twitch.tv/kraken/streams/?game=";
const errMsg = "系統不穩定，請再試一次";


getTopGames(getGamesURL);

// 點了會顯示第二個遊戲的實況
document.querySelector(".navbar").addEventListener("click", (e) => {
  const gameName = e.target.innerText;
  document.querySelector("h1").innerText = gameName;

  // 這裡沒清空的話永遠只會顯示第一個遊戲實況
  document.querySelector(".streams").innerHTML = "";
  getStreams(gameName);
});

// 拿前五個熱門遊戲放到 navbar，改用 fetch
function getTopGames (url) {
  fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': 'vw9qvpsg84wszv7m8phzejcda7t8tn',
      'Accept': 'application / vnd.twitchtv.v5 + json'
    })
  })
  .then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json()
    } else {
      alert(errMsg)
    }
  }).then(json => {
    data = json.top;
    for (let game of data) {
      let element = document.createElement("li");
      element.innerText = game.game.name;
      document.querySelector(".navbar").appendChild(element);
    }
    // 顯示第一個遊戲的實況
    document.querySelector("h1").innerText = data[0].game.name;
    getStreams(data[0].game.name);
  }).catch(err => {
    alert(errMsg);
    console.log('error:', err);
    return;
  })
}

// 取得特定遊戲的前 20 個熱門 live stream
function getStreams(gameName) {
  fetch(getStreamsURL + encodeURIComponent(gameName), {
    method: 'GET',
    headers: new Headers({
      'Client-ID': 'vw9qvpsg84wszv7m8phzejcda7t8tn',
      'Accept': 'application / vnd.twitchtv.v5 + json'
    })
  }).then(response => {
      return response.json()
    }).then(json => {
      const streamsData = json.streams
      console.log(streamsData)
      for (let stream of streamsData) {
        let element = document.createElement("div")
        document.querySelector(".streams").appendChild(element)
        element.outerHTML = `
              <div class="stream">
                <a href="${stream.channel.url}"><img src="${stream.preview.large}"/><a/>
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
              `
      }
    })
}

// function GETbyFetch (url) {
//   fetch(url, {
//     method: 'GET',
//     headers: new Headers({
//       'Client-ID': 'vw9qvpsg84wszv7m8phzejcda7t8tn',
//       'Accept': 'application / vnd.twitchtv.v5 + json'
//     })
//   }).then(response => {
//     if (response.status >= 200 && response.status < 400) {
//       return response.json()
//     } else {
//       alert(errMsg);
//       return;
//     }
//   })
// }