let readline = require("readline");

let lines = [];
let rl = readline.createInterface({
  input: process.stdin,
});

rl.on("line", function (line) {
  lines.push(line);
});

rl.on("close", function () {
  solve(lines);
});

function solve(lines) {
  let m = Number(lines[0]);
  for (let i = 1; i <= m; i++) {
    let temp = lines[i].split(" ");
    let a = temp[0];
    let b = temp[1];
    let k = Number(temp[2]);
    if (a === b) {
      console.log("DRAW");
    } else if (aIsBig(a, b)) {
      if (k === 1) {
        console.log("A");
      } else {
        console.log("B");
      }
    } else {
      if (k === 1) {
        console.log("B");
      } else {
        console.log("A");
      }
    }
  }
}

function aIsBig(aStr, bStr) {
  let m = aStr.length;
  let n = bStr.length;
  // console.log("aStr[0]:" + aStr[0]);
  // console.log("type of aStr[0]:" + typeof aStr[0]);
  if (m === n) {
    for (let i = 0; i < m; i++) {
      // aStr[i] 是 string，轉成 Number 試試 => 還是錯了
      // 忽略了每個位數比大小的細節邏輯
      if (Number(aStr[i]) < Number(bStr[i])) {
        return false;
      } else if (Number(aStr[i]) > Number(bStr[i])) {
        return true;
      }
    }
  } else if (m > n) {
    return true;
  } else if (m < n) {
    return false;
  }
}
