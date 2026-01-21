import React, { useRef, useState, useEffect } from 'react'
import './ImageCapture.css'

function ImageCapture({ onImageCapture, onCancel }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    startCamera()

    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // 使用後置鏡頭
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setError(null)
    } catch (err) {
      console.error('無法存取攝像頭:', err)
      setError('無法存取攝像頭，請檢查權限設定')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // 繪製到圓形區域
    context.save()
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 2

    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    context.clip()

    // 縮放並居中繪製
    const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight)
    const x = (canvas.width - video.videoWidth * scale) / 2
    const y = (canvas.height - video.videoHeight * scale) / 2

    context.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale)
    context.restore()

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
        stopCamera()
        onImageCapture(file)
      }
    }, 'image/jpeg', 0.9)
  }

  return (
    <div className="image-capture">
      <div className="camera-container">
        <div className="camera-circle-frame">
          {error ? (
            <div className="error-message">
              <div className="error-circle">⚠️</div>
              <p>{error}</p>
              <button className="cancel-button" onClick={onCancel}>返回</button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="camera-video"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          )}
        </div>
        <div className="capture-controls">
          <button className="control-circle cancel-btn" onClick={onCancel}>
            ✕
          </button>
          <button className="control-circle capture-btn" onClick={capturePhoto}>
            <div className="capture-inner"></div>
          </button>
          <div className="control-circle placeholder"></div>
        </div>
      </div>
    </div>
  )
}

export default ImageCapture
