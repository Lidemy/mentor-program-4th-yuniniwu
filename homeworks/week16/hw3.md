## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

##### 答案

```
undefined
5
6
20
1
10
100
```

- 第 1 行：`var a = 1` 宣告變數 a，並將 1 這個值指定給 a。
- 第 2 行：宣告一個函式 fn。
- 第 16 行：`fn()` 執行函式 fn。
- 第 3 行：`console.log(a)` 要印出 a，函式 fn 中有宣告變數 a，但由於 hoisting 特性的關係，在這一行執行時，只有宣告變數 a，但沒有對 a 賦值，此時會印出 undefined。
- 第 4 行：`var a = 5` 對 a 賦值，a 的值是 5。
- 第 5 行：`console.log(a)` 印出 5。
- 第 6 行：`a++` a 的值變成 6。
- 第 7 行：`var a` 變數 a 已經宣告過了，這一行對 a 沒有影響。
- 第 8 行：`fn2()` 執行函式 fn2。
- 第 11 行：`console.log(a)` 要印出 a，但函式 fn2 中沒有宣告變數 a，於是往上一層函式 fn 找變數 a，函式 fn 這一層中的變數 a 目前的值是 6，因此印出 6。
- 第 12 行：`a = 20` 要對 a 賦值，但函式 fn2 中沒有宣告變數 a，於是往上一層函式 fn 找變數 a，函式 fn 這一層中的變數 a 的值變成 20。
- 第 13 行：`b = 100` 要對 b 賦值，但函式 fn2、fn 都沒有宣告變數 b，於是在 global 宣告變數 b 並給值，在 global scope 的 b 是 100。
- 第 9 行：`console.log(a)` 要印出 a，此時 fn 這一層的變數 a 是 20，印出 20。
- 第 17 行：`console.log(a)` 要印出 a，此時 global scope 的 a 的值是 1。因此印出 1。
- 第 18 行：`a = 10`，global scope 的 a 的值變成 10。
- 第 19 行：`console.log(a)` 要印出 a，印出 10。
- 第 20 行：`console.log(b)` 要印出 b，由於第 13 行的時候宣告了一個 global 的變數 b，值是 100，因此印出 100。
