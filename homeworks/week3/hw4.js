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
  let str = String(lines);
  let newStr = "";
  let n = str.length - 1;
  for (let i = n; i >= 0; i--) {
    newStr += str[i];
  }
  if (str === newStr) {
    console.log("True");
  } else {
    console.log("False");
  }
}
