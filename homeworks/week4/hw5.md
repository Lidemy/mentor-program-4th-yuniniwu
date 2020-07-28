## 請以自己的話解釋 API 是什麼
- API 是一種能讓彼此交換資料的介面，全名是(Application Programming Interface)。
「彼此」可能是指前端與後端、伺服器與瀏覽器、OS 跟 app 之間。

- 我們目前學的是 Web API，透過瀏覽器發送 request 來交換資料。

- 很常聽到的串接API，指的是讓雙方交換資料的行為。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- 410：當要求的內容在 server 端已經被刪除時，會回傳這個 status code。
- 429：一定時間內發出太多 request
- 431：request 的 Header 欄位太大，server 不願意處理

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

# Resturants API
- URL : https//api.restaurants.tw
- GET
  - 回傳所有餐廳資料
  - path：/restaurants
- GET
  - 回傳單一餐廳資料
  - path：/restaurants/:id
- DELETE
  - 刪除餐廳
  - path：/restaurants/:id
- POST
  - 新增餐廳
  - path：/restaurants
  - 參數： name: 餐廳名稱
- PATCH
  - 更改餐廳
  - path：/restaurants/:id
  - 參數：name: 餐廳名稱

