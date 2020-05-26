# 待辦清單
#### 簡易的網路待辦紀錄清單，為Web App之基礎，已部屬在heroku [(點擊使用)](https://boiling-fortress-57396.herokuapp.com/users/login)
---
## 線上版測試號
+ 使用測試帳號登錄或是自行創建帳戶
```
帳號: 123@example.com
密碼: 123456
```
---
## 功能
+ 使用者可以瀏覽所有待辦
+ 使用者可以刪除特定的待辦
+ 使用者可以編輯特定的待辦
+ 具備註冊功能，可供多人使用
+ 支援Facebook登錄
---
## 配備需求
+ [Node.js](https://nodejs.org/en/)
+ [MongoDB](https://www.mongodb.com/)
---
## 安裝及設定
1. 建立資料夾
```
$ mkdir todo
```
2. 下載專案
```
$ git clone https://github.com/robert913152750/todo_heroku.git
$ cd todo
```
3. 安裝相依套件
```
$ npm install
```
4. 建立種子資料
```
$ npm run todoSeeder
```
5. 新增.env檔，並前往[facebooks for developers](https://developers.facebook.com/)獲取必要數據
```
//請自行至facebooks for developers創建專案
$ FACEBOOK_ID='創建的facebook開發專案id'
$ FACEBOOK_SECRET='創建的facebook開發專案secret'
$ FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```
6. 執行專案
```
$ node app.js
// 出現以下訊息即開啟成功
// App is running
// mongodb connected!
```
7. 使用測試帳號登錄或是自行創建帳戶
```
帳號: 123@example.com
密碼: 123
```
