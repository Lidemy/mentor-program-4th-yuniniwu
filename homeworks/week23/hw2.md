## 為什麼我們需要 Redux？

當專案規模變大之後，同一個 state 可能會需要被各個不同分頁裡的元件取用，此時就會需要把 state 集中管理，讓我們能夠更清楚地追蹤、預測 state 的變化。

Redux 把 state 儲存在 store 當中，當我們需要修改 state 的時候，就必須透過一套固定的流程去修改。這種很固定的流程能讓開發者輕鬆地預測 state 的變化。

要注意的是，Redux 是為了管理大型專案中的狀態而產生的一個工具，在相對小型的專案中使用 Redux，反而會變得多此一舉。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一種給 JavaScript apps 使用的狀態容器，能讓狀態變得更好預測、追蹤；他能在不同的環境上跑，像是 client、server、native，而且容易測試。同時 Redux 也提供了很好的 debug tool。結合其他工具，Redux 是個輕量，但卻有豐富生態系的 library。

Redux 官網推薦使用 Redux Toolkit 來寫 Redux 相關的邏輯，實務上也常使用 `react-redux` 這個套件來把 React 跟 Redux 串連起來

## 該怎麼把 React 跟 Redux 串起來？

1. `connect`
2. `react-redux`