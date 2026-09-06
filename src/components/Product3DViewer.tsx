import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaSyncAlt, FaUndo, FaPlay, FaPause, FaExpand, FaCompress } from 'react-icons/fa';
import type { Product } from '../data/products';

interface Product3DViewerProps {
  product: Product;
  className?: string;
  onSelectAngle?: (angleIndex: number) => void;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  product,
  className = '',
}) => {
  // Use product multiAngleImages or generate virtual rotation angles
  const images = product.multiAngleImages && product.multiAngleImages.length > 1
    ? product.multiAngleImages
    : [product.image];

  const totalFrames = images.length > 1 ? images.length : 8; // Virtual multi-angle tilt steps if single image
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate turntable loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isAutoSpinning) {
      interval = setInterval(() => {
        setRotationDegrees((prev) => (prev + 3) % 360);
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSpinning, totalFrames]);

  // Handle Drag / Scrubbing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 10) {
      const step = Math.sign(deltaX);
      setRotationDegrees((prev) => (prev + step * 6 + 360) % 360);
      setCurrentFrame((prev) => {
        const next = prev - step;
        if (next < 0) return totalFrames - 1;
        if (next >= totalFrames) return 0;
        return next;
      });
      setStartX(e.clientX);
    }
  }, [isDragging, startX, totalFrames]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch Support for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setIsAutoSpinning(false);
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 10) {
      const step = Math.sign(deltaX);
      setRotationDegrees((prev) => (prev + step * 6 + 360) % 360);
      setCurrentFrame((prev) => {
        const next = prev - step;
        if (next < 0) return totalFrames - 1;
        if (next >= totalFrames) return 0;
        return next;
      });
      setStartX(e.touches[0].clientX);
    }
  }, [isDragging, startX, totalFrames]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const displayedImage = images.length > 1
    ? images[currentFrame % images.length]
    : product.image;

  // Calculate dynamic 3D simulated rotation angle when single image is used
  const simulatedRotateY = images.length === 1
    ? Math.sin((rotationDegrees * Math.PI) / 180) * 22
    : 0;

  return (
    <div className={`product-3d-turntable-container ${className}`}>
      {/* 360 Top Indicator Header */}
      <div className="d-flex justify-content-between align-items-center mb-2 px-2">
        <div className="d-flex align-items-center gap-2">
          <span className="badge-360-active d-inline-flex align-items-center gap-1">
            <FaSyncAlt className={isAutoSpinning ? 'spin-infinite' : ''} size={11} />
            <span>360° Studio Rotate</span>
          </span>
          <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
            {Math.round(rotationDegrees)}° View
          </span>
        </div>

        <div className="d-flex align-items-center gap-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-0 px-2 d-inline-flex align-items-center gap-1"
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            title={isAutoSpinning ? 'Pause Auto-Spin' : 'Start Auto-Spin'}
            style={{ fontSize: '0.75rem', height: '26px' }}
          >
            {isAutoSpinning ? <FaPause size={10} /> : <FaPlay size={10} />}
            <span className="d-none d-sm-inline">{isAutoSpinning ? 'Pause' : 'Auto-Spin'}</span>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-0 px-2"
            onClick={() => {
              setRotationDegrees(0);
              setCurrentFrame(0);
              setIsAutoSpinning(false);
            }}
            title="Reset Angle"
            style={{ fontSize: '0.75rem', height: '26px' }}
          >
            <FaUndo size={10} />
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-0 px-2"
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            style={{ fontSize: '0.75rem', height: '26px' }}
          >
            {isZoomed ? <FaCompress size={10} /> : <FaExpand size={10} />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage with Dynamic 3D Transform & Specular Sheen */}
      <div
        ref={containerRef}
        className={`turntable-stage ${isDragging ? 'is-dragging' : ''} ${isZoomed ? 'is-zoomed' : ''}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="turntable-3d-wrapper"
          style={{
            transform: `perspective(1200px) rotateY(${simulatedRotateY}deg) scale(${isZoomed ? 1.3 : 1})`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <img
            src={displayedImage}
            alt={`${product.name} 360 view angle ${currentFrame + 1}`}
            className="turntable-image"
            draggable={false}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = product.image;
            }}
          />

          {/* Dynamic Light Sheen Glint based on rotation degree */}
          <div
            className="turntable-glare-overlay"
            style={{
              background: `linear-gradient(${
                115 + (rotationDegrees % 180)
              }deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)`,
              opacity: 0.65
            }}
          />
        </div>

        {/* Drag Hint Overlay */}
        <div className="turntable-drag-pill">
          <FaSyncAlt size={11} className="me-1" />
          <span>Drag horizontally to rotate 360°</span>
        </div>

        {/* Turntable Base Ring Platform */}
        <div className="turntable-pedestal-ring" />
      </div>

      {/* Angle Scrubbing Slider Bar */}
      <div className="mt-3 px-2">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small" style={{ fontSize: '0.72rem' }}>0°</span>
          <input
            type="range"
            min={0}
            max={360}
            value={Math.round(rotationDegrees)}
            onChange={(e) => {
              const val = Number(e.target.value);
              setRotationDegrees(val);
              const frameIndex = Math.floor((val / 360) * totalFrames) % totalFrames;
              setCurrentFrame(frameIndex);
              setIsAutoSpinning(false);
            }}
            className="form-range flex-grow-1 fashion-turntable-range"
          />
          <span className="text-muted small" style={{ fontSize: '0.72rem' }}>360°</span>
        </div>

        {/* Multi-angle Thumbnail Previews if available */}
        {images.length > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`btn p-0 border rounded-2 overflow-hidden turntable-thumb-btn ${
                  currentFrame === idx ? 'active-thumb' : 'opacity-70'
                }`}
                onClick={() => {
                  setCurrentFrame(idx);
                  setRotationDegrees(Math.round((idx / images.length) * 360));
                  setIsAutoSpinning(false);
                }}
                style={{ width: '44px', height: '44px' }}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="w-100 h-100 object-fit-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product3DViewer;
