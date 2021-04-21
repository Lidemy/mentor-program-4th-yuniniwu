## 為什麼我們需要 React？可以不用嗎？

- 為什麼需要框架來開發？
  框架可以把一個專案切得更有邏輯，方便多人協作，例如跟畫面有關的歸類在一個資料夾，跟業務邏輯有關的則在另一個資料夾。這種把所有東西切成一塊一塊的好處是，能讓程式碼更有機會被重複使用。小專案可能感覺不出來。但是在大專案，框架帶來的好處就能讓人很有感。像是 FaceBook 、 Google 這種大型的公司，也許都是幾百個人以上在維護開發同一個專案，當程式碼的能被重複使用，能為整體專案帶來效益。

  使用框架除了能讓程式碼更容易被重複使用，也能避免各種類似變數污染的問題。
  框架提供像是 'create-react-app' 這種能幫你快速建好專案開發環境的工具，對沒有很講究設定細節的小專案來說，可以省去很多設定的工夫。
  
- 可以不用框架嗎？
  小型的專案應該還可以，大型專案如果不使用框架的話，很容易出現 bug，要除錯也會較為困難，經常會牽一髮而動全身。


- 為什麼要用 React？
  - Angular 進入門檻相對高很多，意味著新人訓練成本可能比較高。
  - React 生態系相對成熟，社群上有較多的資源可以參考。

## React 的思考模式跟以前的思考模式有什麼不一樣？

### 以前的思考模式

  - 切版切出來以後，針對要操作的元素利用 JavaScript 去選取，要改變資料的時候，就直接給這個變數賦予新的值，再放到畫面上。
  - 不容易切出 component，component 之間沒辦法劃分得很清楚，一個閃神就會寫出有 bug 的程式碼。

### React 的思考模式

  - React把任何東西都看作一個 component，component 之間通常能夠清楚地畫出界線，意味著每個 component 都是獨立的，能夠被拿去別的地方重複使用的。這種獨立的特性，在測試上也較容易對個別 component 進行測試。
  - React 以 state 為中心，UI 隨著 state 改變而改變。
  - 單向資料流，React 針對每個 state 設定一個 immutable 的初始值，要改變 state 的時候用  setState 去改變 state。這種機制能夠清晰地追蹤 state。


## state 跟 props 的差別在哪裡？

兩者最主要的差別在於 props 是由父層傳進來的參數，在子層 component 中不會去改變它。而 state 是擁有他的 component 的一部分，可以在這個 component 中透過 setState 改動。

### props

- props：properties 的簡寫，由父層 component 傳進來的參數，不會被改變。可以看作是構成這個 component 的其中一個零件。類似 function 中參數（arugument）的概念。
  - defaultProps：props 不是只能由父層傳進來的，有需要的時候，也可以直接設定
  - pure component：只有 props 的 component
  
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
  - 要改變 state ，必須透過 setState 來改變，要注意 setState 這個函式是一個非同步的函式，因此不能在呼叫 setState 後立刻使用 state 來計算新的值。應該傳一個函式進去。

```js
// 正確做法
const [state, setState] = useState()

setState((prevState, props) => {
  return { count: prevState.count + 1 }
})

// 錯誤做法 會因為非同步的特性導致錯誤
setState({
  count: this.state.count + 1
});

```