## 為什麼我們需要 React？可以不用嗎？

## React 的思考模式跟以前的思考模式有什麼不一樣？


## state 跟 props 的差別在哪裡？


- props：properties 的簡寫，由父層 component 傳進來的參數，不會被改變。可以看作是構成這個 component 的其中一個零件。props 之於 component 類似於 argument 之於一個 function。
  - defaultProps：props 不是只能由父層傳進來的，有需要的時候，也可以直接設定
  - pure component：只有 props 的 component
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

Welcome.defaultProps = {
  name: "world",
};
```
- state：紀錄會隨著時間改變的資料，UI 會因為 state 改變而改變。
  - 關於改變
  - 要改變 state ，必須透過 setState 來改變
    - 非同步：setState 可能是非同步
```js
// 正確做法
updateCount() {
  this.setState((prevState, props) => {
    return { count: prevState.count + 1 }
  });
}

// 錯誤做法 會因為非同步的特性導致錯誤
this.setState({
  count: this.state.count + 1
});
```