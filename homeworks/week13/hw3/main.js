const API_URL = "https://api.twitch.tv/kraken"
const CLIENT_ID = "vw9qvpsg84wszv7m8phzejcda7t8tn"
const errMsg = "系統不穩定，請再試一次"
const streamTemplate = `
        <div class="stream">
          <a href="$streamURL"><img src="$preview"/><a/>
          <div class="stream_data">
            <div class="stream_logo">
              <img src="$logo"/>
            </div>
            <div class="stream_intro">
              <div class="stream_title">$title</div>
              <div class="stream_channel">$name</div>
            </div>
          </div>
        </div>
        `

getTopGames()

// 點了會顯示第二個遊戲的實況
document.querySelector(".navbar").addEventListener("click", (e) => {
  const gameName = e.target.innerText;
  changeGame(gameName)
})

// 拿前五個熱門遊戲放到 navbar
async function getTopGames () {
  const response = await fetch(API_URL + "/games/top?limit=5", {
    headers: new Headers({
      'Client-ID': CLIENT_ID,
      'Accept': 'application / vnd.twitchtv.v5 + json'
    })
  })
  const data  = await response.json()
  const games = data.top
  try {
    for (let i = 0; i < 5; i++) {
      const element = document.createElement('li')
      element.innerText = games[i].game.name
      document.querySelector('.navbar').appendChild(element)
    }
    // 顯示第一個遊戲的實況
    changeGame(games[0].game.name)
  } catch (err) {
    alert(errMsg)
    console.log(err)
  }
}

// 取得特定遊戲的前 20 個熱門 live stream
async function getStreams(gameName) {
  const response = await fetch(API_URL + "/streams/?game=" + encodeURIComponent(gameName), {
    headers: new Headers({
      'Client-ID': CLIENT_ID,
      'Accept': 'application / vnd.twitchtv.v5 + json'
    })
  })
  const data = await response.json()
  return data
}

async function changeGame(gameName) {
  document.querySelector("h1").innerText = gameName
  document.querySelector(".streams").innerHTML = ""
  try {
    const data = await getStreams(gameName)
    for (let i = 0; i < 20; i++) {
      appendStream(data.streams[i])
    }
  } catch (err) {
    alert(errMsg)
    console.log(err)
  }
}

function appendStream(stream) {
  let element = document.createElement("div")
  document.querySelector(".streams").appendChild(element)
  element.outerHTML = streamTemplate
    .replace('$streamURL', stream.channel.url)
    .replace('$preview', stream.preview.medium)
    .replace('$logo', stream.channel.logo)
    .replace('$title', stream.channel.status)
    .replace('$name', stream.channel.name)
}