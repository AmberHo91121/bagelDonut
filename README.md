# 貝果 vs 甜甜圈辨識 APP

一個簡潔優雅的圖像辨識應用程式，用於區分貝果（Bagel）和甜甜圈（Donut）。採用現代化的圓形與點狀設計元素，提供流暢的使用體驗。

## 功能特色

- 📷 **拍照辨識**：使用設備攝像頭拍攝照片進行即時辨識
- 📁 **上傳辨識**：支援拖放或選擇圖片檔案進行辨識
- 🎨 **簡潔設計**：採用圓形與點狀元素，打造現代化介面
- 🚀 **快速響應**：即時的圖像辨識結果與信心度顯示

## 版本說明

### 🎯 純 HTML 版本（推薦快速使用）

**文件**：`index-pure.html`

- ✅ 單一 HTML 文件，包含所有功能
- ✅ 無需安裝依賴，直接開啟即可使用
- ✅ 完整功能：拍照、上傳、辨識、結果顯示

**快速開始**：雙擊 `index-pure.html` 即可使用！

詳細說明請查看：[純HTML版本說明.md](純HTML版本說明.md)

### ⚛️ React 版本（需要開發環境）

**目錄**：`src/`

- React 18 + Vite
- 模組化組件設計
- 需要 Node.js 和 npm

## 技術棧

### 純 HTML 版本
- 純 HTML/CSS/JavaScript
- HTML5 MediaDevices API（攝像頭存取）
- File API（圖片上傳）

### React 版本
- React 18
- Vite
- HTML5 MediaDevices API（攝像頭存取）
- File API（圖片上傳）

## 安裝與執行

### 前置需求

- Node.js 16+ 
- npm 或 yarn

### 安裝步驟

1. 安裝依賴套件：
```bash
npm install
```

2. 設定環境變數（可選）：
創建 `.env` 檔案並設定 Kaggle API 端點：
```
VITE_KAGGLE_API_URL=https://your-kaggle-api-endpoint.com/predict
VITE_KAGGLE_API_KEY=your-api-key
```

3. 啟動開發伺服器：
```bash
npm run dev
```

應用程式將在 `http://localhost:3000` 開啟

### 建置生產版本

```bash
npm run build
```

建置後的檔案將位於 `dist/` 目錄

## Kaggle 模型整合

本應用程式設計用於串接 Kaggle 模型 `my-first-project-e5dsa/1`。

### API 設定

1. **使用真實 API**：
   - 在 `src/services/api.js` 中更新 `API_URL` 為實際的 Kaggle 模型端點
   - 如果需要 API Key，在 `.env` 檔案中設定 `VITE_KAGGLE_API_KEY`

2. **API 回應格式**：
   應用程式期望的 API 回應格式為：
   ```json
   {
     "prediction": "貝果" | "甜甜圈",
     "confidence": 0.0-1.0
   }
   ```
   
   如果您的 API 使用不同的欄位名稱，請在 `src/services/api.js` 中的 `classifyImage` 函數中調整對應的欄位。

3. **開發模式**：
   如果 API 不可用，應用程式會自動使用模擬數據進行測試。

## 專案結構

```
.
├── src/
│   ├── components/          # React 組件
│   │   ├── ImageCapture.jsx    # 拍照組件
│   │   ├── ImageUpload.jsx     # 上傳組件
│   │   └── ResultDisplay.jsx   # 結果顯示組件
│   ├── services/
│   │   └── api.js           # API 服務層
│   ├── App.jsx              # 主應用組件
│   ├── App.css              # 主應用樣式
│   ├── main.jsx             # 應用入口
│   └── styles.css           # 全域樣式
├── index.html
├── package.json
└── vite.config.js
```

## 瀏覽器相容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 需要支援 MediaDevices API（攝像頭功能）

## 授權

MIT License
