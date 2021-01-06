## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### 什麼是 DNS?

就像是人類世界會用地址來告訴別人我家在哪，而不是北緯24.15度，東經120.6，在網路世界中，domain name 是用來讓人更容易記得要去的網站。而 Domain Name System, DNS 就是用來將網域名稱（主要給人看）與 IP 位址（主要給機器看）對應起來的一套系統。

### Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

#### Google Public DNS 簡介

Google 提供的免費 DNS 服務

- IPv4 位址
  - 8.8.8.8 (google-public-dns-a.google.com)
  - 8.8.4.4 (google-public-dns-b.google.com)
- IPv6 位址 [1]
  - 2001:4860:4860::8888
  - 2001:4860:4860::8844
- DNS 位址
  - dns.google
  
#### 對 Google 的好處

- 能得到更多更精準的網路使用者行為資料
  - 雖然 Google [承諾](https://developers.google.com/speed/public-dns/privacy)不會利用 DNS 服務來作為投放廣告的依據。但這些資料可以做為 Google 研發其他服務時的參考。
  
- 提升企業形象

#### 對一般大眾的好處

- 瀏覽速度變快
- 比較安全

## 什麼是資料庫的 lock？為什麼我們需要 lock？

使用關聯式資料庫時，如果沒有用到 lock，容易發生「超賣」的情形。

而使用 lock 可以確保，某一個範圍的資料，在一定的時段內，只會受到一個來源的 request 修改。從而避免了超賣的情況。

## NoSQL 跟 SQL 的差別在哪裡？

- NoSQL 是指 not only SQL
- NoSQL 跟 SQL 的差別主要在於：分散式非關聯 vs 關聯。
- NoSQL 沒有嚴格的 schema，使用 Key-Value 來儲存資料，通常用來存一些結構不固定的資料。
- 而 SQL 必須透過 資料庫 schema 來確立 table 之間的關聯，資料庫啟用之後如果要進行欄位變更會十分麻煩

## 資料庫的 ACID 是什麼？

為了確保資料的完整性，關聯式資料庫採用了 transaction 的設計，讓資料在存取、異動的過程中不會出現差錯。

transaction 必須符合 ACID 原則：

1. 原子性(atomicity)： 一個 transaction 視為一個單位，其中的運作，要嘛全部失敗，要嘛全部成功。
2. 一致性(consistency)：確保資料的一致性（錢的總數相同）
3. 隔離性(isolation)：多筆 transaction 之間不會互相影響（不能同時改同一個值）
4. 持久性(durability)：一筆 transaction 成功後，寫入的資料不會不見


## 參考資料來源

[程式導師實驗計畫：Lesson 8-2 之資料庫](https://www.youtube.com/watch?v=iDG8Ha2uZPs)

[DNS 伺服器是什麼？如何運用？ - StockFeel 股感](https://www.stockfeel.com.tw/dns-%E4%BC%BA%E6%9C%8D%E5%99%A8%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8%EF%BC%9F/)

[Google Public DNS - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/Google_Public_DNS)

[了解NoSQL不可不知的5項觀念 | iThome](https://www.ithome.com.tw/news/92506)