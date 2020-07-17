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
  let temp = lines[0].split(" ");
  let n = Number(temp[0]);
  let m = Number(temp[1]);
  // 印出範圍 n~m 的水仙花數
  for (let i = n; i <= m; i++) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}

function isNarcissistic(num) {
  // 判斷 num 是幾位數，let power = 幾位數
  let m = num;
  let digits = isDigit(m);
  let sum = 0;
  // 判斷 num的 n 次方(power)加總等於自身(num)
  while (m !== 0) {
    let n = m % 10;
    sum += n ** digits;
    m = Math.floor(m / 10);
  }
  return sum === num;
}

function isDigit(num) {
  if (num === 0) return 1;
  let power = 0;
  while (num !== 0) {
    num = Math.floor(num / 10);
    power++;
  }
  return power;
}
