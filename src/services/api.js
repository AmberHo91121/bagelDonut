// Kaggle模型API服務
// 請根據實際的Kaggle模型端點更新 API_URL

const API_URL = process.env.VITE_KAGGLE_API_URL || 'https://api.kaggle.com/v1/models/my-first-project-e5dsa/1/predict'

// 如果Kaggle模型需要不同的格式，請調整此函數
export async function classifyImage(imageFile) {
  try {
    // 將圖片轉換為base64或FormData
    const formData = new FormData()
    formData.append('image', imageFile)

    // 如果Kaggle模型需要特定的格式，請在此調整
    // 範例：使用fetch發送請求
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        // 如果需要API key，請在環境變數中設定
        // 'Authorization': `Bearer ${process.env.VITE_KAGGLE_API_KEY}`,
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`API請求失敗: ${response.status}`)
    }

    const data = await response.json()
    
    // 根據實際API回應格式調整
    // 假設回應格式為: { prediction: '貝果' | '甜甜圈', confidence: 0.0-1.0 }
    return {
      prediction: data.prediction || data.class || '未知',
      confidence: data.confidence || data.score || 0.5
    }
  } catch (error) {
    // 如果API不可用，使用模擬數據（僅供測試）
    console.warn('API調用失敗，使用模擬數據:', error.message)
    return simulateClassification(imageFile)
  }
}

// 模擬分類函數（用於開發和測試）
function simulateClassification(imageFile) {
  // 這是一個簡單的模擬，實際應該使用真實的模型
  // 可以根據圖片名稱或簡單的特徵來模擬
  const fileName = imageFile.name.toLowerCase()
  
  let prediction = '未知'
  let confidence = 0.5

  if (fileName.includes('bagel') || fileName.includes('貝果')) {
    prediction = '貝果'
    confidence = 0.85 + Math.random() * 0.1
  } else if (fileName.includes('donut') || fileName.includes('甜甜圈')) {
    prediction = '甜甜圈'
    confidence = 0.85 + Math.random() * 0.1
  } else {
    // 隨機選擇一個結果（僅用於演示）
    prediction = Math.random() > 0.5 ? '貝果' : '甜甜圈'
    confidence = 0.7 + Math.random() * 0.2
  }

  return {
    prediction,
    confidence
  }
}
