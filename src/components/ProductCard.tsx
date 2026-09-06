import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingBag,
  FaCheck,
  FaHeart,
  FaRegHeart,
  FaEye,
  FaPlay,
  FaSyncAlt,
  FaFeatherAlt
} from 'react-icons/fa';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductVideoModal from './ProductVideoModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fashion_world_wishlist');
      const wishlist: number[] = saved ? JSON.parse(saved) : [];
      return wishlist.includes(product.id);
    } catch {
      return false;
    }
  });

  // 3D Perspective Rotation & Specular Sheen State
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Multi-angle Scrubbing Index
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const multiAngles = product.multiAngleImages || [product.image];

  // Video Preview Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const cardImgWrapperRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('fashion_world_wishlist');
      let wishlist: number[] = saved ? JSON.parse(saved) : [];
      if (isWishlisted) {
        wishlist = wishlist.filter((id) => id !== product.id);
        setIsWishlisted(false);
      } else {
        wishlist.push(product.id);
        setIsWishlisted(true);
      }
      localStorage.setItem('fashion_world_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Failed to update wishlist', err);
      setIsWishlisted(!isWishlisted);
    }
  };

  // 3D Clothes Smooth Rotation & Perspective Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardImgWrapperRef.current) return;
    const rect = cardImgWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (smooth subtle clothes tilt)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 14;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out',
    });

    // Calculate specular lighting glint across the cloth
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.55,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`,
    });

    // Multi-angle horizontal scrubbing if multi-angle images exist
    if (multiAngles.length > 1) {
      const angleStep = rect.width / multiAngles.length;
      const angleIdx = Math.min(multiAngles.length - 1, Math.max(0, Math.floor(x / angleStep)));
      setActiveAngleIndex(angleIdx);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoPreviewRef.current && product.videoUrl) {
      videoPreviewRef.current.currentTime = 0;
      videoPreviewRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease',
    });
    setActiveAngleIndex(0);
    if (videoPreviewRef.current) {
      videoPreviewRef.current.pause();
    }
  };

  // Helper to calculate discount percentage if oldPrice exists
  const effectiveOldPrice = product.oldPrice ?? product.originalPrice;
  const discountPercent =
    product.discountPercent ??
    (effectiveOldPrice && effectiveOldPrice > product.price
      ? Math.round(((effectiveOldPrice - product.price) / effectiveOldPrice) * 100)
      : null);

  // Helper for stock indicator
  const stockCount = product.stock ?? (product.inStock ? 20 : 0);
  const isOutOfStock = stockCount <= 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;

  // Star ratings helper
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-muted opacity-40" />);
      }
    }
    return stars;
  };

  const currentDisplayedImage = multiAngles[activeAngleIndex] || product.image;

  return (
    <>
      <div className="fashion-card h-100">
        {/* Top Image Container with 3D Rotate on Hover, Video Preview, Badges & Wishlist */}
        <div
          ref={cardImgWrapperRef}
          className="fashion-card-img-wrapper"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Link to={`/products/${product.id}`} className="d-block w-100 h-100">
            {/* Main Interactive Cloth Image with 3D Smooth Tilt */}
            <img
              src={currentDisplayedImage}
              alt={product.name}
              className="fashion-card-img"
              style={tiltStyle}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Seamless Video Preview Overlay on Hover (For Products with Video) */}
            {product.videoUrl && (
              <video
                ref={videoPreviewRef}
                src={product.videoUrl}
                className={`card-hover-video-preview ${isHovered ? 'visible' : ''}`}
                muted
                loop
                playsInline
                preload="none"
              />
            )}

            {/* Dynamic Specular Sheen Lighting Glare across Fabric */}
            <div className="card-cloth-specular-glare" style={glareStyle} />
          </Link>

          {/* Badges Stack */}
          <div className="card-badge-stack">
            {discountPercent ? (
              <span className="card-badge badge-discount">
                -{discountPercent}% OFF
              </span>
            ) : product.badge ? (
              <span className="card-badge badge-tag-custom">
                {product.badge}
              </span>
            ) : product.isNew ? (
              <span className="card-badge badge-tag-custom">
                New
              </span>
            ) : null}

            {/* 360 Spin Badge if Multi-Angle Available */}
            {multiAngles.length > 1 && (
              <span className="card-badge badge-360-interactive">
                <FaSyncAlt className={isHovered ? 'spin-slow' : ''} size={10} />
                <span>360° Angle</span>
              </span>
            )}

            {/* Runway Video Badge */}
            {product.videoUrl && (
              <button
                type="button"
                className="card-badge badge-video-preview border-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsVideoModalOpen(true);
                }}
                title="Watch Full Runway Video"
              >
                <FaPlay size={8} />
                <span>Runway Video</span>
              </button>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
          </button>

          {/* Fabric Wave Hint Floating Pill */}
          {product.fabricDetails && (
            <div className="card-fabric-preview-hint">
              <FaFeatherAlt size={10} />
              <span>{product.fabricDetails.weave.split(' ')[0]}</span>
            </div>
          )}
        </div>

        {/* Card Body Details */}
        <div className="p-3 d-flex flex-column flex-grow-1">
          {/* Category & Stock Status Row */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span
              className="text-uppercase text-muted fw-bold"
              style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}
            >
              {product.category}
            </span>

            {/* Stock Status Indicator */}
            <span
              className={`stock-pill ${
                isOutOfStock
                  ? 'text-danger'
                  : isLowStock
                  ? 'text-warning'
                  : 'text-success'
              }`}
            >
              <span
                className={`stock-dot ${
                  isOutOfStock
                    ? 'out-stock'
                    : isLowStock
                    ? 'low-stock'
                    : 'in-stock'
                }`}
              />
              {isOutOfStock
                ? 'Out of Stock'
                : isLowStock
                ? `Only ${stockCount} left`
                : 'In Stock'}
            </span>
          </div>

          {/* Product Title */}
          <h5 className="card-title fs-6 fw-bold mb-2">
            <Link
              to={`/products/${product.id}`}
              className="text-dark text-decoration-none text-truncate d-block"
              title={product.name}
            >
              {product.name}
            </Link>
          </h5>

          {/* Ratings and Review Count */}
          <div className="d-flex align-items-center gap-1 mb-2">
            <div className="rating-stars small">{renderStars(product.rating)}</div>
            <span className="fw-semibold text-dark small" style={{ fontSize: '0.75rem' }}>
              {product.rating}
            </span>
            <span className="text-muted ms-1 small" style={{ fontSize: '0.75rem' }}>
              ({product.reviews ?? product.reviewCount ?? 0})
            </span>
          </div>

          {/* Pricing Area */}
          <div className="mb-3">
            <span className="fs-5 fw-bold text-dark">${product.price.toFixed(2)}</span>
            {effectiveOldPrice && effectiveOldPrice > product.price && (
              <span className="text-muted text-decoration-line-through ms-2 small">
                ${effectiveOldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action Buttons Row: View Details & Add to Cart */}
          <div className="mt-auto pt-2 border-top d-flex gap-2">
            {/* View Details Button */}
            <Link
              to={`/products/${product.id}`}
              className="btn btn-outline-secondary card-btn-action d-inline-flex align-items-center justify-content-center gap-1 flex-grow-1"
              title="View Product Details"
            >
              <FaEye size={13} />
              <span>Details</span>
            </Link>

            {/* Add to Cart Button */}
            <button
              type="button"
              className={`btn card-btn-action d-inline-flex align-items-center justify-content-center gap-1 flex-grow-1 ${
                isAdded ? 'btn-success text-white' : 'btn-fashion-primary'
              }`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              title={isOutOfStock ? 'Item is out of stock' : 'Add to Shopping Bag'}
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdded ? (
                <>
                  <FaCheck size={12} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <FaShoppingBag size={12} />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Runway Video Modal */}
      {isVideoModalOpen && (
        <ProductVideoModal
          product={product}
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
