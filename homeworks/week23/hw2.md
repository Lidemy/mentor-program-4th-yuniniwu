## 為什麼我們需要 Redux？

當專案規模變大之後，state 可能會被各個不同階層的元件取用，此時就會需要把 state 集中管理，讓我們能夠更清楚地追蹤、預測 state 的變化，也更方便 debug。

Redux 把 state 儲存在 store 當中，當我們需要修改 state 的時候，就必須透過 redux 規定的方式去修改。這種只能透過 store 修改 state 的流程能讓開發者輕鬆地預測 state 的變化。

要注意的是，Redux 是為了管理大型專案中的狀態而產生的一個工具，在相對小型的專案中使用 Redux，會有種殺雞焉用牛刀的感覺。

- 適合使用 Redux 的情況：
  - 在 app 中有大量的資料 (state)，這些資料需要在不同的元件中被使用
  - 在 app 中隨著時間推移， state 經常會被改變
  - 改變 state 的邏輯有點複雜
  - 多人協作的中大型的 app

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一種給 JavaScript apps 使用的狀態容器，能讓狀態變得更好預測、追蹤；他能在不同的環境上跑，像是 client、server、native，而且容易測試。同時 Redux 也提供了很好的 debug tool。Redux 是個輕量，但卻有豐富生態系的 library。

### Redux 資料流 

#### 單向資料流（one-way data flow）概念

- state 是用來描述 app 在特定時間點下的狀態
- UI 會根據 state 進行 render
- 當有事情發生的時候（例如使用者按下按鈕），state 根據發生的事（actions）被更新
- UI 根據 ** 新的 state ** 進行 render
  
#### 在 Redux 當中，我們可以把上面這些步驟拆得更細來看

- state 的初始設定
  - 一個 Redux store 被建立（根據 root reducer 函式建立）
  - store 呼叫一次 root reducer，並儲存 root reducer 的回傳值，這個值就是 initial state
  - 當 UI 第一次 render，UI 元件從 the Redux store 拿到目前的 state，並根據這個 state 來決定要怎麼 render。UI 元件同時也會訂閱（subscribe）未來任何 store 的更新，根據需要進行 re-render
- state 有更新時，會發生的事
  - app 裡有事情發生的時候，例如使用者按下按鈕
  - 發出 (dispatch) action 到 store： `dispatch({type: 'counter/increment'})`
  - store 會再跑一次 reducer function。reducer 用舊的 state 跟目前收到的 action 去產生新的 state，並回傳新的 state
  - store 通知那些有訂閱 state 的更新狀態的 UI 元件
  - UI 元件確認自己有沒有需要根據更新後的 state 變動，有需要的話就會觸發 re-render
  
### Redux 元件簡介

#### Actions

actions 有點類似於 app 當中一個事件的感覺，是一個物件，裡面會記錄兩個值：type、payload。

- type 是一個用來描述 action 的字串，要讓人看得懂這個 action 的功能。命名慣例是 "domain/eventName"，例如：`counter/incremented`、`user/banned`
- payload 則是用來記錄執行這個 action 所需的額外資訊。
- action creator：通常會把 action 寫成 function，方便使用。
- action types：另外為了避免寫錯 type，會把 type 寫成 actionTypes，如果有 typo 錯誤，Redux 會提醒我們。

```js
// action types
const ADD_TODO = 'add_todo';

// action creator
const addTodo = content => {
  return {
    type: ADD_TODO,
    payload: content,
  }
}

```

#### Reducers
當 store 裡的 state 需要根據 action 進行改變時，就會由 reducer 函式來負責處理要怎麼改變 state
- `(state, action) ⇒ newState`
- 在 reducer 當中傳入舊的 state、action，回傳新的 state
- 在 reducer 裡的 update，一定都是 immutable update
- 在 reducer 裡不會處理非同步的邏輯、也不會去產生隨機的值、或做任何會產生 side effect 的事
- 可以用各種邏輯來判斷新的 state：`if/else`、 `switch`、 loops 等等，但最常用 `switch` 的語法。

```js
  const initialState = { todos: [] }

  function todoReducer(state = initialState, action) {
    switch (action.type) {
      case (ADD_TODO):
        return {
          ...state,
          {
            content: state.payload.content,
            isDone: false,
          }
        }
      default:
        return state
    }
  }
```

#### Store

儲存目前 state 的地方，會傳入 reducer

- store 裡的值不會直接被改變。
- 一定是透過 dispatch 一個 action 到 store 才能進行改變。
- 當一個 action 被 dispatch，store 就會去跑 root reducer，藉由它來算出新的 state（根據 action + 舊的 state)。
- store 通知有訂閱 state 的 UI component，視情況進行 re-render。

```js
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';

export const store = createStore(rootReducer);

```

#### Dispatch

要改變 state，就必須透過 `dispatch()`，傳入參數 action（通常是傳 action creator）。store 執行 `dispatch()` 之後，就會跑對應的 reducer，reducer 結合 dispatch 傳來的 action 與舊的 state 產生出新的 state。

dispatching actions 可以想成是觸發一個事件的感覺，而 reducer 就像是 event listener 的概念，當 reducer 監聽到了跟自己相關的 event，就會去做相對應的更新（產生新的 state）。

#### Selectors

能讓我們讀取 store 裡的的部分 state 的 function。當 app 變大，state 的結構越來越複雜，有時候只需要讀取 state 的某一部分。此時就可以利用 selector 來幫我們去擷取想用到的資料片段。

```js
export const selectTodos = (store) => store.todoState.todos;

```

- 參考資源：[Redux Essentials, Part 1: Redux Overview and Concepts | Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-application-data-flow)
  
## 該怎麼把 React 跟 Redux 串起來？

假設現在有一個 React 的 app，我們需要進行以下步驟來為這個專案加入 Redux 相關的邏輯

- 安裝 redux、react-redux
  
```bash
npm install redux react-redux
```

- 建立基本 redux 相關元件
  
```js
// 檔案結構
src
|-- redux
    |-- store.js
    |-- reducers
        |-- todos.js
        |-- filter.js
        |-- index.js
    |-- action.js
    |-- actionTypes.js
    |-- selectors.js
|    
|-- index.js
|-- App.js
|-- components
    |-- AddTodo.js
    |-- Todo.js
    |-- TodoList.js
    |-- FilterGroup.js
```

### 寫好 redux 基本元件

- 建立 store : 使用 `createStore` API，並引入 reducer
  
  ```js
  // store.js
  import { createStore } from 'redux';
  import rootReducer from './reducers'

  export default createStore(rootReducer)
  
  ```

- 建立好 actions、actionTypes

  ```js
  // src/redux/actionTypes.js

  export const ADD_TODO = 'add_todo'

  ```

  ```js

  // src/redux/actions.js

  import { ADD_TODO } from './actionTypes';

  export const addTodo = (content) => ({
    type: ADD_TODO,
    payload: {
      content
    },
  });

  ```

- 建立 reducer，並定義 initial state。

  ```js
  // src/redux/reducers/todos.js

  import { ADD_TODO } from '../actionTypes';

  let todoID = 1;
  const initialState = { todos };

  export default function todosReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO: {
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: todoID++,
              content: action.payload.content,
              isDone: false,
            },
          ],
        };
      }

      default:
        return state;
    }
  }

  ```

- 如有多個 reducer，可以用 `combineReducer` 連結起來

  ```js
  // src/redux/reducers/index.js

  // 多個 reducer 的話，在 reducer 資料夾裡，會再新增一個 index.js
  // 使用 combineReducer 把各個 reducer 連起來

  import { combineReducers } from 'redux'
  import todos from './todos'
  import filter from './filter'

  export default combineReducers({
    todos,
    filter,
  })
  ```

- 視需求建立 selectors
  
  ```js
  // src/redux/selectors.js

  import { VISIBILITY_FILTERS } from '../constants/constants';

  export const selectTodos = (store) => store.todoState.todos;

  export const getTodosByFilter = (store) => {
    const todos = selectTodos(store);

    switch (store.visibilityFilter) {
      case VISIBILITY_FILTERS.COMPLETED:
        return todos.filter((todo) => todo.isDone);

      case VISIBILITY_FILTERS.INCOMPLETED:
        return todos.filter((todo) => !todo.isDone);

      case VISIBILITY_FILTERS.ALL:
      default:
        return todos;
    }
  };

  ```

- 在 React 根目錄分別引入 `store`、`Provider`，用 `Provider` 可以讓 app 的其他元件也能拿到 store 的值
  
  ```js
  // src/index.js

  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import { store } from './redux/store';  
  import { Provider } from 'react-redux';

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
    document.getElementById('root')
  );
  ```

-  Dispatching actions
   在需要改變 state 的時候，用 dispatch actions 的方式改變 state

   ```js
    store.dispatch({ type: 'counter/incremented' }) 
   ```

### 如何把 React 跟 Redux 串起來

#### hooks APIs - React hooks 的用法
- `useSelector()` 拿到 store 裡的值
- `useDispatch()` 拿到 dispatch 這個方法

  ```js
  // src/App.js
  import { useSelector, useDispatch } from 'react-redux';
  import { useState } from 'react';
  import { addTodo } from './redux/actions'
  
  function App() {
    const [inputValue, setInputValue] = useState('')

    // 用 useSelector 拿到 store 裡面的 state
    const todos = useSelector(store => store.todoReducer.todos);
    // 用  useDispatch 拿到 dispatch()
    const dispatch = useDispatch()

    return (
      <>
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
        />
        <button 
          onClick={() => dispatch(addTodos(inputValue))}
        >新增</button>

        <ul>
          {todos.map((todo) => (
            <li>
              {todo.id} {todo.content}
            </li>
          ))}
        </ul>
      </>
    );
  }

  export default App;
  ```

### connect：class component 的用法

實務上更常見的是用 `connect` 把 React、Redux 關聯起來，因為早期沒有 hooks，大家都習慣用 `connnect`。

#### 兩個參數

- `mapStateToProps` 跟 selector 的概念蠻像的，可以從 store 裡拿到想拿的 state，這個 state 就會成 props。
- `mapDispatchToProps` 怎麼把 dispatch 對應到你的 props
  
#### 特色

- 比起用 hooks APIs，`connect` 的優點是方便測試。
- 使用 connect 常見的檔案結構：用 container、component 區分 smart component、dumb component

  ```js
  src
  |-- redux
      |-- store.js
      |-- reducers
          |-- todos.js
          |-- filter.js
          |-- index.js
      |-- action.js
      |-- actionTypes.js
  |    
  |-- index.js
  |-- App.js            // import 的會是 負責 redux 的 container/AddTodo
  |-- container       
      |-- AddTodo.js    // 只負責 redux 邏輯
  |-- components      
      |-- AddTodo.js    // 只負責 UI
  ```

  ```js
  // src/container/AddTodo.js
  // smart component 知道 redux 的存在，會被 import 到 App.js 中使用

  import { connect } from "react-redux"
  import { addTodo } from "../redux/actions"
  import AddTodo from "../components/AddTodo"

  const mapStateToProps = store => {
    return {
      todos: store.todoState.todos,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      addTodo: (payload) => dispatch(addTodo(payload))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
  ```

  ```js

  // src/component/AddTodo.js
  // dumb component，只負責 UI 的顯示，不知道 redux 的存在，透過傳入 props 來拿到 state
  
  export default function AddTodo({ addTodo}) {
    return (
      <>
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
        />
        <button 
          onClick={() => {addTodo(inputValue)}}
        >新增</button>
      </>
    );

  ```
