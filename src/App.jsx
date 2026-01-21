import React, { useState } from 'react'
import ImageCapture from './components/ImageCapture'
import ImageUpload from './components/ImageUpload'
import ResultDisplay from './components/ResultDisplay'
import { classifyImage } from './services/api'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(null) // 'camera' or 'upload'

  const handleImageSelect = async (imageFile) => {
    setSelectedImage(URL.createObjectURL(imageFile))
    setResult(null)
    setLoading(true)

    try {
      const classification = await classifyImage(imageFile)
      setResult(classification)
    } catch (error) {
      console.error('辨識錯誤:', error)
      setResult({
        prediction: '錯誤',
        confidence: 0,
        error: error.message || '辨識失敗，請重試'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setResult(null)
    setMode(null)
  }

  return (
    <div className="app">
      <div className="app-container">
        {/* 裝飾性圓點背景 */}
        <div className="dots-background">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="dot" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          ))}
        </div>

        <header className="app-header">
          <div className="title-circle">
            <h1>🍩 貝果 vs 甜甜圈</h1>
          </div>
          <p className="subtitle">圖像辨識系統</p>
        </header>

        {!selectedImage && !mode && (
          <div className="mode-selector">
            <div className="mode-circle camera-circle" onClick={() => setMode('camera')}>
              <div className="mode-icon">📷</div>
              <span>拍照</span>
            </div>
            <div className="mode-circle upload-circle" onClick={() => setMode('upload')}>
              <div className="mode-icon">📁</div>
              <span>上傳</span>
            </div>
          </div>
        )}

        {mode === 'camera' && !selectedImage && (
          <ImageCapture onImageCapture={handleImageSelect} onCancel={() => setMode(null)} />
        )}

        {mode === 'upload' && !selectedImage && (
          <ImageUpload onImageSelect={handleImageSelect} onCancel={() => setMode(null)} />
        )}

        {selectedImage && (
          <div className="result-section">
            <div className="image-preview-circle">
              <img src={selectedImage} alt="預覽" />
            </div>

            {loading && (
              <div className="loading-circle">
                <div className="spinner"></div>
                <p>辨識中...</p>
              </div>
            )}

            {result && !loading && (
              <ResultDisplay result={result} />
            )}

            <button className="reset-button" onClick={handleReset}>
              <span className="reset-circle">⟲</span>
              重新選擇
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
