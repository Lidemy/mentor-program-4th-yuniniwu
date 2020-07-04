function capitalize(str) {
  let char = str.charCodeAt(0);
  if (char >= 97 && char <= 122) {
    let newStr = str.slice(0, 1).toUpperCase();
    newStr += str.slice(1, str.length);
    return newStr;
  } else return str;
}

console.log(capitalize("hello"));
console.log(capitalize("nick"));
console.log(capitalize("Nick"));
console.log(capitalize(",hello"));

// line 4: str.slice(0.1).tuUpperCase() 是可以再接一個方法來用的！
// line 5: str.slice(1, str.length) 方法裡面是可以放 str.length 的！
