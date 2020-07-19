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
  for (let i = 1; i <= lines; i++) {
    printStar(i);
  }
}

function printStar(num) {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += "*";
  }
  console.log(str);
}
