// 以下做法已有看參考範例影片，並且有部分參考同學 YuHan Huang 的第八週作業一

const drawBtn = document.querySelector(".draw_btn");
const drawAgain = document.querySelector(".draw_again_btn");

drawBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getPrize();
});

drawAgain.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
});

function getPrize() {
  const apiURL =
    "https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery";
  const errMsg = "系統不穩定，請再試一次";
  const resultText = document.querySelector(".result_text");
  const container = document.querySelector(".event_intro");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiURL, true);
  xhr.onload = function () {
    // 錯誤處理
    if (xhr.status >= 200 && xhr.status < 400) {
      let result;
      try {
        result = JSON.parse(xhr.response);
      } catch (err) {
        alert(errMsg);
        console.log(err);
        return;
      }
      if (!result.prize) {
        alert(errMsg);
      }
      switch (result.prize) {
        case "FIRST":
          resultText.textContent = "恭喜你中頭獎了！日本東京來回雙人遊！";
          container.classList.add("first_prize");
          break;
        case "SECOND":
          resultText.textContent = "二獎！90 吋電視一台！";
          container.classList.add("second_prize");
          break;
        case "THIRD":
          resultText.textContent =
            "恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！";
          container.classList.add("third_prize");
          break;
        case "NONE":
          resultText.textContent = "銘謝惠顧";
          container.classList.add("none_prize");
          break;
        default:
          alert("error");
      }

      // 隱藏一開始的活動頁面
      document.querySelector(".event_content").classList.add("hide");
      // 顯示中獎頁面
      document.querySelector(".event_result").classList.remove("hidden");
    } else {
      alert(errMsg);
    }
  };
  xhr.onerror = function () {
    alert(errMsg);
  };
  xhr.send();
}

// 參考同學作業前的程式碼如下，跟著參考影片做的
// bug:抽到銘謝惠顧後，再抽一次背景始終是黑底
// 推測原因： 把js獨立一個檔案寫，跟把js寫在HTML 裡面會需要細微不同的設定。
// 看同學作業，有些會加window.location.reload()，有些會給btn加一個class做返回初始抽獎活動頁面的處理

// const drawBtn = document.querySelector(".draw_btn");
// const apiURL =
//   "https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery";

// drawBtn.addEventListener("click", function () {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", apiURL, true);
//   xhr.onload = function () {
//     if (xhr.status >= 200 && xhr.status < 400) {
//       // 錯誤處理
//       let result;
//       try {
//         result = JSON.parse(xhr.response);
//       } catch (err) {
//         alert("系統不穩定，請再試一次");
//         console.log(err);
//         return;
//       }

//       if (!result.prize) {
//         alert("系統不穩定，請再試一次");
//       }

//       let className;
//       let noticeText;

//       if (result.prize === "FIRST") {
//         className = "first_prize";
//         noticeText = "恭喜你中頭獎了！日本東京來回雙人遊！";
//       } else if (result.prize === "SECOND") {
//         className = "second_prize";
//         noticeText = "二獎！90 吋電視一台！";
//       } else if (result.prize === "THIRD") {
//         className = "third_prize";
//         noticeText =
//           "恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！";
//       } else if (result.prize === "NONE") {
//         className = "none_prize";
//         noticeText = "銘謝惠顧";
//       }
//
//       // 這裡本來想要保留原本活動頁面的btn不動，在上面插入一個元素（中獎通知文字）
//       // 後來發現這樣做很卡，而且感覺程式碼也不會比較簡潔有效，就放棄了
//
//       document
//         .querySelector(".event_content")
//         .insertAdjacentHTML("beforebegin", `<div class="event_result"></div>`);
//       document.querySelector(".event_intro").classList.add(className);
//       document.querySelector(".event_result").innerText = noticeText;
//       document.querySelector(".draw_btn").classList.add("back_to_origin");

//       // 隱藏一開始的活動頁面
//       document.querySelector(".event_content").classList.add("hide_bccolor");
//       document.querySelector(".event_detail").classList.add("hide");
//     } else {
//       alert("系統不穩定，請再試一次");
//     }
//   };
//   xhr.onerror = function () {
//     alert("系統不穩定，請再試一次");
//   };
//   xhr.send();
// });
