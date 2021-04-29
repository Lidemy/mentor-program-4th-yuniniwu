## 請列出 React 內建的所有 hook，並大概講解功能是什麼

#### State Hook - useState()
  用來記錄 state。會回傳兩個參數，第一個參數是一個常數(目前 state 的值)，第二個參數是一個 function。要改變 state 的時候，要利用第二個參數來改變。
  要注意使用 setState 時，不能立即拿 state 來用，因為 setState 是非同步的執行，如果立刻拿 state 來用，很有可能拿到舊的資料。

  ```js
  const [data, setData] = useState({id:1, name: Jack}) 
  ```

#### Effect Hook - useEffect()
  用來處理 side effect 的 hook。會在瀏覽器 paint 完畫面之後，執行第一個參數（function）。
  第二個參數是一個陣列，儲存第一個參數的 dependency。如果第二個參數為空，就代表這個 effect 只會被執行一次。
  每次 component render 結束以後，都會執行 effect。
  有些時候需要在 component unmount 以前，會需要清除一些 effect。


#### useContext
  不用層層傳遞 props 就能拿到 context

#### useReducer
  管理複雜的 component 的 local state

#### useCallback
  回傳一個 function，讓這個 function 只在 dependency 有改變的時候去重新 render 。

#### useMemo
  可以記錄複雜的運算，讓他不用在每次 render 的時候都算一次。

#### useRef
  可以用來計算 render 的次數，可以保留一個不被 React 操控的數值，這個數值，不會隨著每次 render 而產生新的 instance。

#### useLayoutEffet
  只會執行一次。

#### useImperativeHandle

#### useDebugValue
  用來在 DevTools 中顯示客製化 hooks 的某個特性

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

#### Mounting

當 component 被加入 DOM 中時，以下這些方法(method)，會依序被呼叫

- `constructor()`：初始化內部 state、綁定 event Handler function
- `static getDerivedStateFromProps()`
- `render()`
- `componentDidMount()`
  
#### Update

一個 component 的 prop 或 state 有變化時，就會讓這個 component 進入 Update 的階段，以下方法同樣也會依序被呼叫

- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`：return false 的話，`render()`、`componentDidUpdate()` 就不會被呼叫
- `render()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`：component 更新後會馬上被呼叫，（這個方法在第一次 render 的時候不會被呼叫）

#### Unmounting

當一個  component 從 DOM 中被移除的時候就是進入 unmount 的階段，此時只有一個方法會被呼叫

- `componentWillUnmount()`：當 component 被 unmount 後會馬上被呼叫。

## 請問 class component 與 function component 的差別是什麼？

class component 使用了 class 的語法來寫一個 component，而 function component 則使用了 function 的語法來寫。


## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

通常是指表單的部分