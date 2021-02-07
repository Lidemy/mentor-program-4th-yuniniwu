## 請簡單解釋什麼是 Single Page Application

簡稱 SPA，單頁式應用。大家常用的 Gmail 就是一種 SPA，讓網頁使用起來就像是在用一個 app 一樣順暢，SPA 主要是利用 Ajax 的特性，讓網頁即使沒有重新整理，也能在頁面上新增、刪除內容。

- 與 SPA 對應的概念是 MPA（Multiple Page Application）
- SPA 的網址還是可以變：JS 可以利用 history API 的 `history.pushState()` 來改變網址
- Ajax 可以非同步去呼叫 Server 的 API，並拿資料回來

## SPA 的優缺點為何

### 優點

1. 在適合的場景下可以增進使用者體驗，例如音樂播放頁面
2. 減少頻寬浪費：減少向伺服器要資料的頻率，降低伺服器的資料吞吐量
3. 前後端分離，方便各自維護

### 缺點

1. 即使一次只看一個頁面也需要一次下載一堆 JS、CSS 檔
2. SEO 很差，因為主要內容都是後來動態渲染出來的，搜尋引擎爬到的很有可能只是一個空殼，裡面只有基本的 html tag。
   > 解決方式：可以用 SSR (Server Side Rendering) 來解決，舉部落格的文章列表頁面為例，SSR 就是第一個頁面先由 server side render 出所有文章列表，接下來使用者的操作則還是由client side render，透過 Javascript 來動態處理(也就是 )。
3. 前端需要負責網頁的狀態管理，什麼時候該更新哪部分的畫面。狀態管理是前端做 SPA 時最難的部分。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

之前的做法，頁面是伺服器端渲染出來的(server side render)；這週的做法應用了 SPA 架構，把前後端分離，前端負責顯示資料、後端負責提供資料，頁面上的資料是利用 JS 拿到資料以後所動態產生的(client side render)


## 參考資料

- [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)
- [跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://hulitw.medium.com/introduction-mvc-spa-and-ssr-545c941669e9)