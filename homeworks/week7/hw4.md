## 什麼是 DOM？

- Document Object Model，物件文件模型。
  瀏覽器收到 server 傳回來的 HTML 文件時，會把這個 HTML 文件透過 DOM 所定義的方法、架構，轉譯成 objects。
  進而使 Javascript（或其他的 scripting language）能夠透過操控 DOM，去改變網頁上最終呈現給使用者的畫面。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

- 事件在 DOM 裡面傳遞的順序會先從根節點開始，往下傳到 target，先捕獲再冒泡，在 target 本身時，事件是以 `addEventListener()` 的順序而定，沒有分捕獲與冒泡。
  - Capturing Phase 捕獲階段：事件由根節點一層層往下傳到 target
  - at Target
  - Bubbeling Phase 冒泡階段：事件由 target 一層層往上傳到根節點
  - `addEventListener()` 的第三個參數是
    - true：將 listener 加到捕獲階段
    - false：將 listener 加到冒泡階段（預設是 false）

## 什麼是 event delegation，為什麼我們需要它？

- 透過父節點來處理子節點的事件就叫做事件代理。
- 利用事件傳遞機制的特性，當我們把事件監聽綁定在 DOM 裡面較上層的 node（例如 window），就能方便地在一個 function 裡面偵測頁面中每一個元素的事件，而不用一個一個去加事件監聽。例如說有一個 `<ul>` 下面有 100 個 `<li>`，如果把事件監聽綁在 `<ul>`，就只要綁一次，而且當 `<li>` 數量有更動的時候，也不用再額外去處理監聽器。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

- `event.preventDefault()`
  - 取消瀏覽器預設的行為（例如點了超連結會開新分頁或跳轉、點了 form 的 submit 會送出表單），跟事件傳遞機制沒有關係。
- `event.stopPropagation()`
  - 取消事件傳遞，不會把事件傳給下一個節點。但如果同一個節點上有不只一個 listener，同ㄧ個層級的 listener 還是會被執行到。如果想要讓同一層級的其他 listener 不要被執行到的話，可以改用 `e.stopImmediatePropagation()`

## 參考資料

- [DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
- [Dom 的历史](https://zhuanlan.zhihu.com/p/27386734)
- [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
