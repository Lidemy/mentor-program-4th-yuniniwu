## hw1：好多星星
經過\[ALG101\] 單元五的摧殘，這一題很輕鬆地寫出來！好的開始是成功的一半！

## hw2：水仙花數
這題之前有寫過解不出來，正式寫的那天距離之前看解答影片是好幾天後的事了。
一開始期待自己可以不要看解答影片，看能不能獨立推敲出解法，
但在進度落後的壓力下，想了半小時後，還是決定找影片來看。

我發現我無法從題目直覺地聯想到「要先判斷有幾位數」這件事情，
焦點會太集中在「每一個數字的 n 次方加總等於自身」、「範圍要從 n 到 m」這兩件事上。
然後就一臉茫然的不知道該從何下手。

最後其實是有點半抄襲的完成這題。
這題得多做幾次練習才好。

## hw3：判斷質數
這題前後大概花了兩個半小時，忽略了第一個數字是「代表一共有幾個是數字」這件事，
「1 不是質數也不是合數」這個條件，讓我很猶豫要把他寫在判斷質數的函式裡還是主函式裡。
後來是寫了一遍無法 AC，看了解答影片後，跟著老師的思維，寫在了判斷質數的函式裡。

## hw4：判斷迴文
這題在練習的時候有寫過一次，印象中很順利的 AC 了。
看到他是作業還有點小開心，覺得自己應該可以寫很快，
結果卡在忽略了輸入的 `lines` 的型別，`lines` 型別是 `object`，但我卻把他當字串用。
會發現錯誤的靈感，是在看 slack 同學的發問時想到的，我覺得同學錯在忽略型別，我搞不好也是，果然。
寫題目寫多了就會忘記最基礎的型別判斷，要小心！

## hw5：聯誼順序比大小
這題是這次作業最難的，就像破關遊戲大魔王要放在最後打一樣，
Huli 真是用心良苦!

這題一開始就是很天真地寫完，自信滿滿地想去拿 AC，
結果看到 WA，回頭看一次程式碼，看一次題目，感覺 512 位數這行是唯一有問題的地方。
於是先找了輸入範圍的影片來看，又看了spectrum、slack大家的發問，
改成用字串比大小的方式來解，但還是 WA。

隔天下班後繼續解，確認不是忽略型別，那就是邏輯哪裡寫錯了。
終於讓我找到 bug，是我在判斷 A 是比較大的這個函式裡，
當字串長度相同時，對每個字元去比大小，這裡只顧著比大，忘記要比小要回傳`false`了。

這題最後 AC 的時候有點感動。 
