## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState

```js
// 基本用法
const [count, setCount] = useState(initialValue)  
```

- 用來為 component 紀錄資料，這資料在 react 當中俗稱為 state。例如在一個計數器的元件中數到幾的那個數字會是一個 state，另一個例子：文字輸入框中輸入的資料也會是一個 state。
- 會回傳一個陣列，陣列中有兩個 element，第一個元素是一個常數(目前 state 的值)，第二個元素是一個 function。要改變 state 的時候，必須要利用 `setState()` 來改變。
- 要注意 `setState()` 是非同步執行的 function。如果需要利用上一個 state 的值來計算新的 state，要記得用 functional updates。

  ```js
  // 正確用法：使用 functional updates
  const Counter = ({initialValue}) => {
    const [count, setCount] = useState(initialValue)
    return(
      <>
        Count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        
          {/* 如果直接寫 setCount(count - 1) 是錯誤的用法 */}
        <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>  
        <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      </>
    )
  }
  ```

- state 的 initialValue 在每次 render 的時候，即使已經用不到了，還是會重新計算一次。當 initialValue 是透過複雜的運算而得時，可以使用 lazy initial state（傳入一個 function），這樣就不會每次 render 都重算一次。
  
  ```js
  const [count, setState] = useState(() => {
    const initialState = someExpensiveComputation(props)
    return initialState
  }) 
  ```
  
### useEffect
  
- 用來處理 side effect 的 hook。接收兩個參數，會在瀏覽器 paint 之後，執行第一個參數（function）。（side effect：發 API、訂閱）
- 第二個參數是一個陣列，儲存第一個參數中會參照到的變數。如果第二個參數為空，就代表這個 effect 只會被執行一次。
- 每次 component render 結束以後，都會執行 effect。
- 需要清除 effect 的時候，可讓 useEffect 回傳一個 clean-up function。這個 clean-up function 執行時間點，會是在 component 從 UI 移除之前。
  
  ```js
  useEffect(() => {
    // do something
    return () => {
      // clean up something
    }
  },[dependency array]) 
  ```

### useLayoutEffect

用法跟 `useEffect` 類似，唯一差別在執行的時機：

- 在 component render 之後，paint **之前**：`useLayoutEffect`
- 在 component render 之後，paint **之後**：`useEffect`

### useContext

不用一層層傳遞 props 就能拿到父層元素的某個值。例如要取得 theme 的色彩設定、取得 user 的登入狀態。

```js
// 沒有用 useContext，要一層層傳遞
const App = () => {
  return <Toolbar theme="dark" />;
}
// 想像如果有十幾層，一層層傳會很麻煩
const Toolbar(props) => {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  )
}

const  ThemedButton = (props) => {
  return <Button theme={props.theme} />;
}
```

```js
// 用 useContext，首先建立 context object
const ThemeContext = React.createContext('light')
const App = () => {
  return (
    // current context 的值會接收最接近的 provider 的 value，變成 dark
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 處於中間的元件不用傳遞 props，乾乾淨淨
const Toolbar() => {  
  return (
    <div>
      <ThemedButton /> 
    </div>
  )
}

const  ThemedButton = () => {
  // 在需要用到的子層 component 中，用 useContext 取得，這裡取得的值會是 dark
  const theme = useContext(ThemeContext)
  return <Button theme={theme} />;
}
```

### useReducer

- 用來管理更複雜的 state。
- `dispatch` 就像是條件化後的 `setState`，條件會在 `reducer` 這個函式裡設定。

- `reducer` 接收兩個參數，根據不同的 action，回傳不同的 state
  
  ```js
  const initialState = {count: 0};

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
    );
  }
  ```

### useCallback

回傳一個 function，這個 function  不會隨著 re-render 而產生新的 instance（除非 dependency 有變動）。

```js
const memoizedCallBack = useCallback(
  () => {
    fetchAPI(a, b)
  },
  [a, b]
)

```

### useMemo

用來記錄複雜的運算，讓這個運算不用每次 re-render 都算一次。
`const memoValue = useMemo(() => computeValue(a, b), [a, b])`

- 會回傳一個值。
- 會傳入兩個參數，第一個是一個 function，會在 render 的時候執行。
- 使用情境：用來存 derived state(能透過 state 推算出來的值)

### useRef

useRef 會回傳一個 object，這個 object 不會隨著 re-render 而產生不同的記憶體位置，可以給他一個參數作為初始值，這個初始值會存在 `object.current` 裡面。

- 使用情境：用來儲存不會導致畫面重新渲染的變數，例如 todo-list 中的 todo item 的 id、或是紀錄 component 的 render 次數。  
- 使用情境：用來選到 DOM 裡面某個 HTML 元素

  ```js
  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
      console.log(inputEl.current) // 會印出 <input type="text" />
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  ```

### useImperativeHandle

當用到 `ref` 的時候，用來客製化想給父層元素看到的值，通常會跟 `forwardRef` 一起用。

- 使用情境：父層元素是 `<App />`，裡面 render 子層元素 `<BaseInput />`，當我們想控制 `<BaseInput />` 的 `<input type='text'>` 的輸入框 focus 效果，就會需要用到 `useImperativeHandle`。

### useDebugValue

`useDebugValue(date, date => date.toDateString())`

- 讓 custom hooks 在 React DevTools 中能夠有所標示，方便 debug。
  
---

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

### Mounting

當 component 被加入 DOM 中時，以下這些方法(method)，會依序被呼叫

- `constructor()`：會在這個方法中初始化內部 state、為 event handler 綁定 instance。
- `static getDerivedStateFromProps()`
- `render()`：把 component 放到 DOM 上面
- `componentDidMount()`：當 component  被 render 到 DOM 之後會執行
  
### Update

一個 component 的 prop 或 state 有變化時，或是用到 `forceUpdate()`時，就會讓 component 進入 Update 的階段，以下方法會依序被呼叫

- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`：這個方法回傳的值是 false 的話，`render()`、`componentDidUpdate()` 就不會被呼叫
- `render()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`：component 更新後會馬上被呼叫，（這個方法在第一次 render 的時候不會被呼叫）

### Unmounting

當 component 從 DOM 中被移除的時候，此時只有一個方法會被呼叫

- `componentWillUnmount()`：當 component 從 DOM 中被移除後會馬上被呼叫。
  
---

## 請問 class component 與 function component 的差別是什麼？

[Dan Abramov 的文章](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)中有提到，這兩者在 `mind model` 上，有根本性的差異。

- class component：當開發者用 class compnent 開發的時候，會著重在思考「元件在什麼樣的生命週期該做什麼事」
- function component：會著重在元件每次 render 時所捕捉到的值。每次 render 這個 function 都會被 call 一次，而這個 function 只能看得見當次渲染所捕捉到的值。

### 基本語法比較

```js
// class component
class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        <p>{this.props.name}</p>
      </>
    )
  }
}
```

```js
// function component
function Input(props) {
  return(
    <>
      <h2>{props.content}</h2>
      <p>{props.name}</p>
    </>
  )
}
```

### state 比較

- **function component**
在 hooks 出現之後，就可以在 function component 中使用 `useState` 來表示狀態。對 function component 中的 `state`，只會是當下這次 render 所獲取的值，不會是最新的。

- **class component**
由於在建構子中宣告 state 的時候，會用到 this，而 `this` 的值，是 **mutable**，因此在 class component 當中的 state 會拿到最新的值。
  
---

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

使用 React 來實做表單相關的頁面時，會在這兩個技巧中選一個來用。

最主要的差別在於表單的資料有沒有被 component 控制，所謂被控制，是指用 `useState()` 搭配 `onChange` 的 handler 來取得使用者輸入的資料，相當於把資料交給 React 來處理。

通常會建議使用 controlled component 來實作表單，因為能做更多立即的表單驗證功能，例如能在使用者輸入的時候就立即做檢查、動態增加輸入欄位等等。

### controlled components

```js

function Form(） {
  const [inputValue, setInputValue] = useState({
    nickname:'',
    comment: ''
  })

  const {nickname, comment} = inputValue

  const handleInputChange = e => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(JSON.stringify(inputValue))
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nickname:
          <input type='text' value={nickname} name='nickname' onChange={handleInputChange}/>
        </label>
      </div>
      <div>
        <label>
          Comment:
          <input type='text' value={comment} name='comment' onChange={handleInputChange}/>
        </label>
      </div>
      <input type='submit' value='Submit' />
    </form>
  
  )
}
```

### uncontrolled components

```js
function NameForm () {
  const input = useRef();

  function handleSubmit(e) {
    alert('A name was submitted: ' + input.current.value);
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

## 參考資源

- [React 官網](https://reactjs.org/docs/hooks-reference.html)
- [How Are Function Components Different from Classes? - Dan Abramov](https://overreacted.io/how-are-function-components-different-from-classes/)
- [A Complete Guide to useEffect - Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
- [[React] 讓父層可以取得子層的 DOM 元素：ForwardRef 的使用 ~ PJCHENder](https://pjchender.blogspot.com/2021/03/react-dom-forwardref.html)
- [認識 React Hooks 之三](https://ithelp.ithome.com.tw/articles/10253073)
  