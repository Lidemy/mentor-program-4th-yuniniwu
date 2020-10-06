## 什麼是 Ajax？

#### 前情提要

網頁能夠動態的產生資料給使用者看，是瀏覽器在 client 端與 server 端之間不停地交換資訊訊所造就的成果。透過使用者在網頁上觸發了某種事件（例如點擊按鈕），透過瀏覽器發送 Request 到 server，server 收到後再回傳 Response 給瀏覽器，瀏覽器再根據收到東西重新渲染（render）出使用者看到的頁面。

早期的網頁，還沒發展出非同步的方式，要傳送資料給 server，通常是用 `<form>` 來發送 Request。在這種方式下，每一個跟 Javascript 相關的動作，對於使用者來說，都要等待很久很久才會有回應出現在網頁上。

為了改善這種情況，有位大師 Jesse James Garrett 提出了 AJAX 的方式，讓網頁在頁面沒有重新整理的狀態下，也能即時地更新網頁內容，大大改善了使用者體驗。

#### 到底什麼是 Ajax

全名是 Asynchronous Javascript and XML，AJAX 不是指單一個技術，而是有機的利用了一系列相關的技術，讓網頁透過 Javascript 以特定格式來回傳資料，讓網頁能夠非同步更新網頁內容。

非同步的概念就是，當用戶端發送 Request 的時候，不用等待 Response 回來才能繼續做事，等收到 Response 之後，瀏覽器會自己幫我們把結果送過來。舉生活上的例子來幫助理解，就像是去摩斯漢堡內用的時候，你點完餐會拿到一個號碼牌，就可以離開櫃檯去找位置），等餐點好了，店員就會幫你把餐點送過來。而不是必須得待在原地等餐點好了才能去找位置。

## 用 Ajax 與我們用表單送出資料的差別在哪？

最大的差別在於收到 Response 之後不用重新渲染（render）出一個頁面。

用表單送出資料，所收到的 Response 會由瀏覽器重新渲染（render）出一個新的頁面，但前後兩個頁面中的大部分程式碼其實是相同的，這麼做浪費了許多頻寬。

而使用 AJAX，可以只向伺服器傳送並取回必要的資訊，瀏覽器收到 Response 時，不會重新 render 一個頁面，而是把這個 Response 丟給 Javascript 來處理，只更新需要更新的部分。

## JSONP 是什麼？

是另一種前後端交換資料的方式，目前已經比較少人用了。JSONP 利用了有些 HTML 標籤不受同源政策束縛的特性 (像是`<img> <script>`)，把需要交換的資訊，透過這些標籤來向伺服器要到資料。

## 要如何存取跨網域的 API？

server 必須在發送 Response 時，在 header 帶上允許跨域瀏覽的資訊，開啟 Access-Control-Allow-Origin 的設定。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為在第四週時是用電腦發送 Request，這週是使用瀏覽器發送 Request。

使用瀏覽器發送的 Request 基本上都必須受到同源政策的束縛，只要 client 端跟 server 端是不同網域，就不能接收到 Response。
但在實際的應用上，大部分的 client 端與 server 端都是不同的網域，因此有 CROS 產生，如果 server 需要回應不同網域的 Request，就必須在 Response 的 header 上開啟 "Access-Control-Allow-Origin " 的設定。

基於資訊安全考量，我們對伺服器發送的 Request，如果沒有被對方伺服器允許，是收不到 Response 的。
否則所有人都能看到 google 資料庫裡的所有東西，包含帳號、密碼、個資等等。

瀏覽器可以說是 client、server 之間資料交換的管理員，幫忙加了很多規範。

#### 參考資料

[輕鬆理解 Ajax 與跨來源請求](https://blog.huli.tw/2017/08/27/ajax-and-cors/)
[[JS] AJAX 筆記](https://medium.com/%E9%A6%AC%E6%A0%BC%E8%95%BE%E7%89%B9%E7%9A%84%E5%86%92%E9%9A%AA%E8%80%85%E6%97%A5%E8%AA%8C/js-ajax-%E7%AD%86%E8%A8%98-b9a57976fa60)
[維基百科](https://zh.wikipedia.org/wiki/AJAX)
