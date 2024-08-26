# One House Website Backend

## 專案說明
此專案為 One House 網站的後端，主要用途為：
- 建立專案
- 刪除專案
- 專案後台管理

## 建立專案說明
1. 手動將檔案上傳到指定的 S3 資料夾。
2. 前端網頁將自動加入 S3/CDN 的 domain。
3. 建立檔案圖片時，請直接輸入檔案名稱。
4. 專案資料依 timestamp 排序，建立時請按照從最舊資料到最新資料的順序建立。未來可以在開發時手動建立日期對應 timestamp，這樣操作會更加方便。

## 使用語言與技術
- **GitHub Repository**: [One-house-web](https://github.com/SiaoChi/one-house-web-backend)
- **前端技術**: Vite.js
- **後端技術**: AWS Lambda
- **資料庫**: Firestore
- **後台儀表板**: Firestore + React + S3 + CloudFront + GitHub Pages (gh-pages)
- **大量上傳**: excel + firebase
