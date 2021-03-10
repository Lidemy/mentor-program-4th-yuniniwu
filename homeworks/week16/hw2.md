## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

##### 答案

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

for 迴圈會跑五圈，每一圈都會執行兩件事：
```
console.log('i: ' + i)
```
跟
```
setTimeout(() => {
  console.log(i)
}, i * 1000)
```

而 `setTimeout` 裡的第一個參數，在瀏覽器幫忙計時完畢後，會被排到 callback queue 中，等待執行。
```
() => {
  console.log(i)
}
``` 

當 log 出 `i: 4` 之後，call stack 中清空了。for 迴圈也跑完了。

此時 event loop 偵測到 call stack 是空的，便把 callback queue 中的 `() => { console.log(i) }` 依序放到 calll stack 中執行。

`() => { console.log(i) }` 其實在 `setTimeout` 執行的時候，就已經被初始化了。這裡的 `() => { console.log(i) }` 是一種 function expression 而不是 functon declaration。

function expression 在被初始化的時候，它的 \[[Scope]] 也會在這時候被記錄下來。這個例子中，這個匿名函式的 scope chain 首先是自己，接著就是 global 了

這裡 `() => { console.log(i) }` 要執行 `console.log(i)` 的時候，會根據 Scope Chain 去找 `i`。

在 `() => { }` 中找不到，接著往上一層找。於是就找到 global scope 中的 i 了。這時候 global scope 中的 i 是 5。

為什麼 for 迴圈跑完了，global scope 中的變數 i，卻沒有隨著 call stack 清空而被從底層的記憶體位置中清空呢？

因為 `() => { console.log(i) }` 在 `setTimeout` 執行的時候被初始化，而初始化的時候，這個 function 的 scope chain 用到了 global 的 variable object（簡稱 VO）。

由於 global 的 VO 被指到了匿名函式的 scope chain，因此 global 的變數 i 不會隨著 call stack 清空而消失。


**以上答案看完本週自我檢討後有修正過**：看完 [Function expression 的初始化](https://github.com/Lidemy/mentor-program-3rd-ClayGao/pull/24) 相關討論內容後，把初始化的部分寫詳細一點。