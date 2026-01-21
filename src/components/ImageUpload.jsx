import React, { useRef } from 'react'
import './ImageUpload.css'

function ImageUpload({ onImageSelect, onCancel }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="image-upload">
      <div 
        className="upload-area-circle"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon-circle">
          <div className="upload-icon">📁</div>
        </div>
        <p className="upload-text">點擊或拖放圖片到這裡</p>
        <p className="upload-hint">支援 JPG、PNG 格式</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <button className="cancel-upload-button" onClick={onCancel}>
        <span className="cancel-circle">✕</span>
        取消
      </button>
    </div>
  )
}

export default ImageUpload
