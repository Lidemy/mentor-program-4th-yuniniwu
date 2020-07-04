``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 1 行，進入名為 isValid 的 function，並傳入一個陣列 arr
2. 執行第 2 行，設定變數 i 是 0，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
3. 執行第 3 行，判斷 arr[0] 是否 <= 0，否
4. 第一圈迴圈結束，跑回第 2 行，i++，i 變成 1，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
5. 執行第 3 行，判斷 arr[1] 是否 <= 0，否
6. 第二圈迴圈結束，跑回第 2 行，i++，i 變成 2，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
7. 執行第 3 行，判斷 arr[2] 是否 <= 0，否
8. 第三圈迴圈結束，跑回第 2 行，i++，i 變成 3，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
9. 執行第 3 行，判斷 arr[3] 是否 <= 0，否
10. 第四圈迴圈結束，跑回第 2 行，i++，i 變成 4，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
11. 執行第 3 行，判斷 arr[4] 是否 <= 0，否
12. 第五圈迴圈結束，跑回第 2 行，i++，i 變成  5，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
13. 執行第 3 行，判斷 arr[5] 是否 <= 0，否
14. 第六圈迴圈結束，跑回第 2 行，i++，i 變成  6，檢查 i 是否 < 陣列長度(arr.length)，否
15. 執行第 5 行，設定變數 i 是 2，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
16. 執行第 6 行，判斷 arr[2] 不等於 arr[1] ＋ arr[0]，否
17. 第一圈迴圈結束，跑回第 5 行，i++，i 變成 3，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
18. 執行第 6 行，判斷 arr[3] 不等於 arr[2] ＋ arr[1]，否
19. 第二圈迴圈結束，跑回第 5 行，i++，i 變成 4，檢查 i 是否 < 陣列長度(arr.length)，是，繼續執行
20. 執行第 6 行，判斷 arr[4] 不等於 arr[3] ＋ arr[2]，是，回傳 invalid
21. 執行完畢

## 猜測這支程式在做什麼？
判斷是不是費式數列（Fibonacci Numbers）