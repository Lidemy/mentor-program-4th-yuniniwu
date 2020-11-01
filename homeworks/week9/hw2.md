## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

#### VARCHAR

- 可設定最大字元長度(0 to 65,535)，適合用在長度可變的資料類型，例如帳號密碼。


#### TEXT

- 不需要設定字元長度上限，適合用在儲存不確定長度的字串內容，像是一篇留言、報導。
- 跟 TEXT 類似的還有 TINYTEXT, MEDIUMTEXT, LONGTEXT。根據其該型態可以儲存的最大長度來區分。以 utf-8 一個中文字等於 3 個 byte 來換算，TEXT 最多可存 21,845 個中文字。
  
  - TINYTEXT：小於  2<sup>8</sup>  byte
  - TEXT：小於 2<sup>16</sup> byte
  - MEDIUMTEXT：小於 2<sup>24</sup> byte
  - LONGTEXT：小於 2<sup>32</sup> byte


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是存在瀏覽器裡的一些資訊。

Cookie 是用來實作 Session 機制的，有了 Session 機制，能把沒有狀態的 Request (Server 記不住訪客資訊)，變成有狀態的 (Server 能辨別這個訪客是不是之前有來過、有買過東西)。

當瀏覽器第一次拜訪一個網站，向 Server 發送一個 Request 的時候，Server 會給瀏覽器指令，要瀏覽器設置 Cookie，瀏覽器就會把使用者的相關資訊，例如瀏覽紀錄或是 ID 等等，暫存在 Cookie 裡面。

下次同一個裝置的瀏覽器再拜訪同一個網站的時候，瀏覽器會把存有資訊的 Cookie，夾帶在 Request 裡，一起發送給 Server，Server 就能分辨這是不是同一個使用者。是的話就能接續上一次該使用者的瀏覽內容。能提供使用者更流暢的使用體驗。

為了避免 Cookie 裡夾帶的資料被隨意竄改，比較保險的做法是在 Cookie 裡存一個隨機亂數產生的 SeesionID，再把 SessionID 所對應的使用者資訊存在 Server 端。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

- 瀏覽器會跳出通知請我們變更密碼，應該是密碼在某個很容易被看到的公開檔案裡


### 參考文章
[Difference between VARCHAR and TEXT in MySQL [duplicate]](https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql)

[白話 Session 與 Cookie：從經營雜貨店開始. 在 Web 開發裡面有一個歷久不衰的議題，那就是 Session 與… | by Huli | Medium](https://hulitw.medium.com/session-and-cookie-15e47ed838bc)

[什麼是 Cookie？如何管理Cookie，防範網路隱私外洩? – 資安趨勢部落格](https://blog.trendmicro.com.tw/?p=63387)