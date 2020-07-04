function join(arr, concatStr) {
  let newStr = "";
  for (let i = 0; i < arr.length - 1; i++) {
    newStr += arr[i];
    newStr += concatStr;
  }
  newStr += arr[arr.length - 1];
  return newStr;
}

function repeat(str, times) {
  let newStr = "";
  for (let i = 0; i < times; i++) {
    newStr += str;
  }
  return newStr;
}

console.log(join([1, 2, 3], ""));
console.log(join(["a", "b", "c"], "!"));
console.log(join(["a", 1, "b", 2, "c", 3], ","));
console.log(join(["aaa", "bb", "c", "dddd"], ",,"));

console.log(repeat("a", 5));
console.log(repeat("yoyo", 2));
