# 純 HTML 版本說明

## 📄 文件說明

已創建純 HTML 版本的應用程式：`index-pure.html`

## 🚀 使用方式

### 方法 1: 直接開啟（最簡單）

1. 找到 `index-pure.html` 文件
2. 雙擊檔案，會在預設瀏覽器中開啟
3. 無需安裝任何依賴，無需啟動伺服器

### 方法 2: 使用本地伺服器（推薦）

為了避免 CORS 問題（特別是使用攝像頭功能），建議使用本地伺服器：

#### 使用 Python（如果有安裝）

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然後在瀏覽器訪問：`http://localhost:8000/index-pure.html`

#### 使用 Node.js（如果有安裝）

```bash
npx http-server -p 8000
```

然後在瀏覽器訪問：`http://localhost:8000/index-pure.html`

#### 使用 VS Code Live Server

1. 在 VS Code 中安裝 "Live Server" 擴展
2. 右鍵點擊 `index-pure.html`
3. 選擇 "Open with Live Server"

## ✨ 功能特色

- ✅ **完全獨立**：單一 HTML 文件，包含所有功能
- ✅ **無需編譯**：直接開啟即可使用
- ✅ **無依賴**：不需要 Node.js、React 或其他框架
- ✅ **所有功能**：
  - 拍照辨識
  - 上傳圖片辨識
  - 結果顯示與信心度
  - 簡潔的圓形設計界面

## 📁 檔案結構

```
index-pure.html  ← 完整的應用程式（包含 HTML、CSS、JavaScript）
```

## 🔧 與 React 版本的差異

| 特性 | React 版本 | 純 HTML 版本 |
|------|-----------|-------------|
| 文件數量 | 多個文件 | 單一文件 |
| 依賴 | 需要 React、Vite | 無需依賴 |
| 編譯 | 需要編譯 | 無需編譯 |
| 直接開啟 | ❌ 需要啟動開發伺服器 | ✅ 可直接開啟 |
| 功能 | 完整 | 完整 |

## 🎯 使用場景

- **快速演示**：可以直接開啟展示
- **簡單部署**：只需上傳一個 HTML 文件
- **學習參考**：可以查看完整的 HTML/CSS/JS 代碼
- **離線使用**：下載後可完全離線使用（除了 API 調用）

## 📝 注意事項

1. **攝像頭權限**：使用拍照功能時，瀏覽器會要求允許存取攝像頭
2. **API 端點**：Kaggle API 端點配置在 JavaScript 中，可根據需要修改
3. **瀏覽器相容性**：建議使用現代瀏覽器（Chrome、Firefox、Edge、Safari）
4. **HTTPS 要求**：某些瀏覽器可能需要 HTTPS 才能使用攝像頭功能

## 🔄 如需更新

所有代碼都在 `index-pure.html` 文件中，直接編輯即可：
- **HTML 結構**：在 `<body>` 標籤中
- **CSS 樣式**：在 `<style>` 標籤中
- **JavaScript 邏輯**：在 `<script>` 標籤中
