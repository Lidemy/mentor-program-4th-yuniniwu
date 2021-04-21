## 為什麼我們需要 React？可以不用嗎？

- 為什麼需要框架來開發？
  - 框架可以把一個專案切得更有邏輯，讓後續接手維護的人（或是一個月後的自己），能更快瞭解每一段程式碼在寫什麼。
  - 框架將資料視為一種狀態，當狀態改變，畫面會隨之改變。這讓開發、維護變得方便許多。
  - 以 React 來說，強調 component 的概念。例如寫好一個按鈕 component，之後就能一直沿用，不需要在同一個專案中重寫一遍。讓開發變得更有效率。
  - component 的概念，讓測試更容易執行。

- 為什麼要用 React？
  - React 生態系相對成熟，社群上有較多的資源可以參考。

- 可以不用框架嗎？
  小型的專案應該還可以，中大型專案如果不使用框架的話，要找出 bug 會非常困難。

## React 的思考模式跟以前的思考模式有什麼不一樣？

最大的差別在於 state 的概念，state 就是資料，由資料來決定畫面。

過去的寫法把 UI 還有資料混在一起，當專案稍微長一點，要找出對應的 class 、 selector 都要花上一些時間。

但用了 React 之後，跟某一個 component 相關的 HTML、CSS、JavaScript 程式碼相對集中了，在讀 code 的時候，能更快找到相關的線索。因為 React 把資料從 UI 中抽取出來，以 state 來承裝資料。用到 state 的 UI component 會長什麼樣子，將會由 state 決定。

### 以前的作法

  - 根據設計稿切出畫面。如果有兩個 button，就要確實地寫出兩行 
     `<button> click </button>`
  - 切出靜態頁面時，先放假資料。
  - 以 JavaScript 選取到對應的 DOM node，再把資料塞進去。資料儲存在某個變數裡。


### React 的作法

  - 一個網頁是由許多 component 組成的，看到設計稿之後，先把畫面切成幾個 Component。
  - 切出靜態頁面時，每個 component 要顯示的資料，以 props 的形式傳進來。
  - 要找出最具代表性的 state。
    - 以一個有計數功能的 todo list 來說，最具代表性的 state 是 「todo item 的資料」。當我們想知道「目前剩下幾個 todo item」，可以透過「todo item 的資料」推算而來。todo list當中的 state 只有「todo item 的資料」，不需要包含「目前剩下幾個 todo item」。
  - 判斷哪些 component 要擁有 state。
    - 判斷哪些 component 是根據 state 來 render 畫面的
    - 如果有多個 component 共用到一個 state，試著找出他們兩個的父層 component。
    - 父層才是那個應該擁有 state 的 component。
  - 單向資料流，React 針對每個 state 設定一個 immutable 的初始值，要改變 state 的時候用 setState 去改變 state。這種機制能夠清晰地追蹤 state。
  - React 以 state 為中心，UI 隨著 state 改變而改變。


## state 跟 props 的差別在哪裡？

兩者最主要的差別在於 props 是由父層傳進來的參數，在子層 component 中不會被改變。而 state 是擁有他的 component 的一部分，可以在這個 component 中透過 setState 改動。

### props

- props：properties 的簡寫，由父層 component 傳進來的參數，不會被改變。可以看作是構成這個 component 的其中一個零件。類似 function 中參數（argument）的概念。
  - defaultProps：props 不是只能由父層傳進來的，有需要的時候，也可以直接設定
  
    ```js

    function Welcome(props) {
      return(
        <h1>Hello {props.name}</h1>
      )
    }

    Welcome.defaultProps = {
      theme: "dark",
      weekday: "Mon"
    };
    ```

### state

- state：紀錄會隨著時間改變的資料，UI 會因為 state 改變而改變。
  - state 對 component 的角色，類似 function 中變數的概念。state 會被某個 component 擁有，state 也只會在這個 component 的範圍當中被改變。


#### 參考文章

- [[FE] 為什麼現在的前端都在用「框架」？](https://ithelp.ithome.com.tw/articles/10224417)
- [用 React 思考 – React 官網](https://zh-hant.reactjs.org/docs/thinking-in-react.html)
- [Component State – React 官網](https://zh-hant.reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props)
