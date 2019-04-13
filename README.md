# 皮皮美食網

一個使用 Node.js + Express 打造的餐廳美食網站，使用者可依照餐廳名稱與類別進行搜尋

## ScreenShot - 專案畫面
![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/homePage.jpg)

![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/restaurantInfo.jpg)

![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/addNewRestaurant.jpg)

## Features - 產品功能 

1. 首頁顯示所有餐廳的資料，包含名稱、類別、評價
2. 使用者點擊任一餐廳後，則會顯示更多餐廳資訊，如地址、電話與簡介
3. 使用者可依照中文名稱、英文名稱、類別進行餐廳搜尋
4. 使用者可以新增一家餐廳
5. 使用者可以瀏覽一家餐廳的詳細資訊
6. 使用者可以瀏覽全部所有餐廳
7. 使用者可以修改一家餐廳的資訊
8. 使用者可以刪除一家餐廳

## Installing - 專案安裝流程 

1. 打開你的 terminal，Clone 此專案至本機電腦
```
git clone https://github.com/pierceshih15/restaurantList.git
```
2. 開啟終端機(Terminal)，進入存放此專案的資料夾
```
cd restaurantList
```
3. 安裝 npm 套件 
```
在 Terminal 輸入 npm install 指令
```

4. 安裝 nodemon 套件
```
在 Terminal 輸入 nodemon app.js 指令
```

5. 匯入種子檔案

```
在 Terminal 找到 restaurantSeeder.js 檔案

執行 node .\models\seeds\restaurantSeeder.js 匯入餐廳資料
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行
```
Mongodb is connected!

Restaurant date get done!
```

6. 啟動伺服器，執行 app.js 檔案
```
nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
```
The Express server is running on http://localhost:3000

Mongodb is connected!
```
現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始尋找美食餐廳囉！

## Contributor - 專案開發人員

> [Pierce Shih](https://github.com/pierceshih15)


