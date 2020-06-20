## 交作業流程

1. clone 遠端的專案下來本地端：`git clone 遠端專案的URL`
2. 開一條新的 branch：`git branch week1`
3. 切換到新的 branch上：`git checkout -b week1`
4. 在新的 branch 上編輯指定的作業檔案
5. 如果作業有新增額外檔案，記得加進 git：`git add .`
6. 寫好作業後在剛新開的那條 branch 上面 commit：`git commit -am "message"`
7. 當週的所有作業都 commit 好了以後
8. 自我檢查作業
9. 把本地的這個 branch 推到遠端去：`git push origin week1` 
10. 到自己的 repo 發 PR 合併回 master 
11. 到學習系統 >> 作業列表 >> 新增作業，貼 PR 的連結貼到該週的作業去
12. 等助教批改完 merge 後
13. 在 local 端，切回 master：`git checkout master`
14. 把遠端跟local的 master 同步：`git pull origin master`
15. 刪掉本地端的 branch：`git branch -d week1`