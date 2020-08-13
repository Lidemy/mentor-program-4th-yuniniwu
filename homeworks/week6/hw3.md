## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

- `<dl>` description list 定義清單
- `<dt>` description term 被定義的項目
- `<dd>` description details 對定義的解釋

#### 用法

> >

    <dl>
      <dt>Term</dt>
      <dd>Details</dd>
      <dt>Term 2</dt>
      <dd>Details 2</dd>
    </dl>

> >

## 請問什麼是盒模型（box modal）

- 盒模型是排版的基礎
- 一個元素，或者可以先想成一個區塊（block），由內而外分別有：
  - content-box：內容（文字或圖片）佔據的區塊
  - padding-box：內距
  - border-box：邊框
  - margin-box：外距
- `box-sizing: border-box`的應用：在排版時，一個元素的長度、寬度預設是作用在 content-box 上面的，使用 `box-sizing`，有時候可以把長寬改成作用在 border-box，讓調整版面變得更直覺。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

- inline：行內元素，不會佔據一整行。
  - inline 物件的 padding 只有視覺上的高度，在資料流中是沒有高度的。
  - 例如：`<span>、<a>、<img>`
- block：區塊元素，自己霸佔一整行，有寬度高度。
  - 例如：`<div>、<ul>、<li>、<p>、<h1>`
- inline-block:可以跟旁邊元素並排，也有寬高

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

- static：預設在資料流中的位置
- fixed：當元素被設定成 fixed，會從資料流中抽離，設定上下左右位置時，相對於視窗左上角偏移。
- relative：當元素被設定成 relative，且設定上下左右位置時，將相對於自己在資料流中原本的位置偏移顯示。
- absolute：當元素被設定成 absolute，會從資料流中抽離，有設定上下左右位置時，會根據父層的位置偏移顯示。父層也要有 position 的設定才行。（以下是看完自我檢討修正的）absolute 的定位點是往上找第一個 position 不是 static（fixed/ relative/ absolute/ stcky） 的元素。
