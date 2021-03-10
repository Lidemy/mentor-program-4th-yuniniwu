## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

##### 答案

```
2
2
undefined
```

- this 的值跟他在哪裡被呼叫的有關，跟他在程式的哪裡被宣告沒有關係。
- 所有的函式都可以轉化成用 `call()` 的方式來呼叫，在 `call()` 中第一個參數就是 this
---
`obj.inner.hello()` 如果用 `call()` 的方式來看就是 `obj.inner.hello.call(obj.inner)`；
此時 this 是 `obj.inner`；
`this.value` 相當於 `obj.inner.value` 相當於 2。

---
`obj2.hello()` 可以看作是 `obj2.hello.call(obj2)`；
this 是 `obj2`相當於 `obj.inner`；
同上一段，`this.value` 等於 `obj.inner.value` 等於 2，
這一行也會印出 2。

---
`hello()` 可以看作是 `hello.call()`；
在非嚴格模式的狀況下`this`在 node.js 的環境下跑會是 `global`，在瀏覽器的環境下跑會是 `window`；
`global.value` 或是 `window.value` 都會是 `undefined`

