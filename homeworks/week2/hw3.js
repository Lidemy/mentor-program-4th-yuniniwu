function reverse(str) {
  // --------------------use while loop--------------------
  // let n = str.length - 1;
  // let i = 0;
  // let newStr = "";
  // while (i <= n) {
  //   newStr += str[n - i];
  //   i++;
  // }
  // console.log(newStr);
  // --------------------use for loop--------------------
  let n = str.length;
  let newStr = "";
  for (let i = 1; i <= n; i++) {
    newStr += str[n - i];
  }
  console.log(newStr);
}

reverse("hello");
reverse("yoyoyo");
reverse("1abc2");
reverse("1,2,3,2,1");
