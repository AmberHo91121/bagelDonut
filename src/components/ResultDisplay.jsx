import React from 'react'
import './ResultDisplay.css'

function ResultDisplay({ result }) {
  if (result.error) {
    return (
      <div className="result-display error-result">
        <div className="result-circle error-circle">
          <span>⚠️</span>
        </div>
        <p className="result-message">{result.error}</p>
      </div>
    )
  }

  const isBagel = result.prediction === '貝果' || result.prediction.toLowerCase().includes('bagel')
  const isDonut = result.prediction === '甜甜圈' || result.prediction.toLowerCase().includes('donut')
  
  const confidence = Math.round(result.confidence * 100)

  return (
    <div className="result-display">
      <div className={`result-circle ${isBagel ? 'bagel-result' : isDonut ? 'donut-result' : ''}`}>
        <div className="result-emoji">
          {isBagel ? '🥯' : isDonut ? '🍩' : '❓'}
        </div>
      </div>
      
      <div className="result-info">
        <h2 className="result-title">
          {isBagel ? '這是貝果！' : isDonut ? '這是甜甜圈！' : result.prediction}
        </h2>
        
        <div className="confidence-bar">
          <div className="confidence-label">信心度</div>
          <div className="confidence-circle-container">
            <div className="confidence-circle" style={{
              '--progress': `${confidence}%`
            }}>
              <span>{confidence}%</span>
            </div>
          </div>
        </div>

        <div className="result-details">
          <div className="detail-dot"></div>
          <span>預測類別: {result.prediction}</span>
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay
