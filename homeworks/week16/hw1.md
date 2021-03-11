## hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
##### 答案

輸出結果會是：
```
1
3
5
2
4
```

Event Loop 可以比喻成瀏覽器中的一個小拼圖，功能是不斷偵測 call stack 是不是空的，如果是就把在 callback queue 排隊的 task 丟一個到 call stack 中執行。

程式執行到第一行會輸出 1。

接著到第二行，執行第一個 `setTimeout()`，`setTimeout()` 是一個非同步的 Web API，會讓瀏覽器啟動一個計時器，計時零秒，時間到了就把 `() => { console.log(2) }` 這個函式排進 callback queue。

執行到第三行，會輸出 3。

執行到第四行，跟第二行的時候一樣，`setTimeout()` 這個Web API 會請瀏覽器啟動一個計時器，計時零秒，時間到就把 `() => { console.log(４) }` 排進 callback queue，這邊這個匿名函式在 callback queue 中排在第二順位。

執行到第五行會輸出 5。

第五行輸出 5 之後，call stack 中沒有東西了。此時 event loop 偵測到 call stack 為空，便將 callback queue 中第一順位的任務 `() => { console.log(2) }`，移到 call stack 中執行。此時輸出 2。

輸出 2 之後，event loop 又再度偵測到 call stack 中沒有任務了，於是再把 callback queue 中的 `() => { console.log(４) }` 移到 call stack 執行，最後輸出 4。


- 這裡的回答已根據 [Week16 自我檢討](https://github.com/Lidemy/mentor-program-4th/tree/master/examples/week16) 修改。
> 然後還有另一個會搞錯的地方，那就是很多人以為是把 `console.log('hello')` 丟進去 callback queue，不是，這是一個 function call，不是一個 function。丟進去 callback queue 的是 `() => {console.log('hello')}` 這個 function。

