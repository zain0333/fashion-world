import React, { useState, useRef, useEffect } from 'react';
import {
  FaTimes,
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaShoppingBag,
  FaCheck,
  FaTachometerAlt,
  FaRedo
} from 'react-icons/fa';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductVideoModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductVideoModal: React.FC<ProductVideoModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [isOpen, product, playbackSpeed]);

  if (!isOpen || !product || !product.videoUrl) return null;

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedToggle = () => {
    const nextSpeed = playbackSpeed === 1 ? 0.5 : playbackSpeed === 0.5 ? 0.75 : 1;
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div
        className="video-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          className="video-modal-close-btn"
          onClick={onClose}
          aria-label="Close video preview"
        >
          <FaTimes size={18} />
        </button>

        <div className="row g-0 h-100 flex-column flex-lg-row">
          {/* Left / Top: High Definition Video Player */}
          <div className="col-lg-7 position-relative bg-black d-flex align-items-center justify-content-center overflow-hidden">
            <video
              ref={videoRef}
              src={product.videoUrl}
              poster={product.image}
              className="w-100 h-100 object-fit-cover video-element"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={handlePlayPause}
            />

            {/* Video Progress Bar */}
            <div className="video-progress-bar-wrap">
              <div
                className="video-progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Video Overlay Controls */}
            <div className="video-overlay-controls d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn-video-ctrl"
                  onClick={handlePlayPause}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <FaPause size={13} /> : <FaPlay size={13} />}
                </button>

                <button
                  type="button"
                  className="btn-video-ctrl"
                  onClick={handleToggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                </button>

                {/* Slow Motion Rate Button */}
                <button
                  type="button"
                  className={`btn-video-ctrl ${playbackSpeed < 1 ? 'active-speed' : ''}`}
                  onClick={handleSpeedToggle}
                  title="Toggle Slow Motion for Fabric Detail"
                >
                  <FaTachometerAlt size={12} className="me-1" />
                  <span>{playbackSpeed}x</span>
                </button>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-danger bg-opacity-90 px-2 py-1 small fw-bold">
                  LIVE MOTION
                </span>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Product Details Summary & Add to Bag */}
          <div className="col-lg-5 p-4 d-flex flex-column justify-content-between bg-white video-modal-details">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-secondary text-white text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  {product.category}
                </span>
                {product.badge && (
                  <span className="badge bg-dark text-white">{product.badge}</span>
                )}
              </div>

              <h3 className="h4 fw-bold text-dark mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                {product.name}
              </h3>

              <div className="mb-3">
                <span className="fs-4 fw-bold text-dark">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-muted text-decoration-line-through ms-2 small">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-muted small mb-4">
                {product.description}
              </p>

              {/* Dynamic Fabric Detail Callout */}
              {product.fabricDetails && (
                <div className="p-3 bg-light rounded-3 border mb-4">
                  <div className="small fw-bold text-dark mb-1 d-flex align-items-center gap-1">
                    <FaRedo className="text-warning" size={11} />
                    <span>Runway Motion Dynamics</span>
                  </div>
                  <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>
                    {product.fabricDetails.composition} &mdash; {product.fabricDetails.stretch}.
                  </p>
                </div>
              )}
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-3 border-top">
              <button
                type="button"
                className={`btn w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 ${
                  isAdded ? 'btn-success text-white' : 'btn-fashion-primary'
                }`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <FaCheck size={14} />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <FaShoppingBag size={14} />
                    <span>Add to Bag &bull; ${product.price.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVideoModal;
