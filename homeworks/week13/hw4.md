## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是一個 module bundeler，能讓我們的網頁原始碼引入第三方模組，並把這些模組打包好，變成一個可以在瀏覽器上執行的程式。

Webpack 強大的地方在於它延伸了模組的概念，甚至連圖片、CSS 也可以被當作資源引入進來。為了達到引入各種資源的功能，Webpack 寫了各種 loader，要載入各種不同的資源會有[不同的 loader](https://webpack.js.org/loaders/)。

例如 sass-loader 可以幫我們在引入 `.sass` 的時候，順便 compile 成 `.css`；而 babel-loader 則可以把 `.js` 中較新的語法轉成 ES5

##### 為什麼需要 Webpack ?
  
為了要在瀏覽器上使用類似 CommonJS 的模組機制，就必須用工具把原始碼打包才能做到。Webpack 就是這個工具，能夠幫你把原始碼打包起來，打包完的檔案才能在瀏覽器上使用模組的機制。

雖然 ES6 有推出了模組的機制，但相容性並不好，也無法兼容 npm。因此普遍還是需要透過 Webpack 來幫忙。

## gulp 跟 Webpack 有什麼不一樣？

  儘管 gulp 跟 Webpack 能做到的事有很大一部分的重疊，但他們本質上是很不一樣的工具。

  gulp 是 task manager，能做的事比 Webpack 多很多，例如定時 call 某一支 API、校正時間。
  
  而 Webpack 主要做的事是 bundle，也就是打包各種模組，相對於 gulp，Webpack 就做不到校正時間這種 task。

## CSS Selector 權重的計算方式為何？

#### CSS Selector 權重的計算方式

- 當同一個 element 同時被指定了很多樣式時，才會有權重之分，權重分數最高的樣式，才會被渲染出來。

- 選取器的權重計算，可以想成一組三位數的數字(a - b - c)，分到該位數的選取器每出現一次，該位數就 +1。
  - a : `ID Selector`
  - b : `class Selector` ＝ `psuedo-class Selector` = `attribute Selector`
  - c : `element Selector` 
- 例如：
```
// style.css
/* 權重是(1-0-1) */
#pop p {
  color: pink;
}

/* 權重是(1-0-0) */
#pop {
  color: red;
}

/* 權重是(0-1-0) */
.content {
  color: yellow;
}
 
/* 權重是(0-0-1) */
p {
  color: black;
}

-------------------------------------
// index.html  
// <p> 會是粉紅色的字

<div class="class">
  <section class="streams" id="pop">
    <p>Top 20 popular live streams sorted by current viewers</p>
  </section>
</div>

```

#### CSS 檔案中的優先權
- `!important` 優先權高於所有 Selector，常被說要謹慎使用。
- 繼承而來的樣式優先權很低。
- 權重相等的時候，同一份 code 中，寫在較下面的樣式會蓋過上面的樣式。
- `*` 這個全域選取器在權重中會被忽略不計。
- 關於優先權的整理：
  `!important` > inline style > `ID Selector` >   `class Selector` >  `element Selector` > `*`



#### 參考資料：

- [webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)

  
- [Day14 CSS：權重](https://ithelp.ithome.com.tw/articles/10221486?sc=rss.iron)
