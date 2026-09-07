import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingBag,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaArrowLeft,
  FaCheck,
  FaCamera,
  FaSyncAlt,
  FaPlay,
  FaTshirt,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaTachometerAlt,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaRulerHorizontal,
  FaFire,
  FaBoxOpen,
  FaInfoCircle
} from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Product3DViewer from '../components/Product3DViewer';
import FabricInspector from '../components/FabricInspector';

// Comprehensive color code mapping for visual swatches
const COLOR_MAP: Record<string, { bg: string; border?: string }> = {
  'Camel': { bg: '#c49b63' },
  'Midnight Black': { bg: '#111827' },
  'Black': { bg: '#111827' },
  'Triple Black': { bg: '#09090b' },
  'Onyx Black': { bg: '#18181b' },
  'Washed Black': { bg: '#27272a' },
  'Black Calfskin': { bg: '#18181b' },
  'Olive': { bg: '#556b2f' },
  'Pure White': { bg: '#ffffff', border: '#d1d5db' },
  'Crisp White': { bg: '#ffffff', border: '#d1d5db' },
  'White/Gum': { bg: 'linear-gradient(135deg, #ffffff 60%, #d97706 60%)', border: '#d1d5db' },
  'Charcoal': { bg: '#374151' },
  'Navy': { bg: '#1e3a8a' },
  'Navy Blue': { bg: '#1e3a8a' },
  'Midnight Navy': { bg: '#0f172a' },
  'Obsidian Blue': { bg: '#1e293b' },
  'Sage': { bg: '#87a987' },
  'Vintage Indigo': { bg: '#264653' },
  'Dark Wash': { bg: '#1e3a8a' },
  'Floral Emerald': { bg: '#047857' },
  'Gold / Emerald': { bg: 'linear-gradient(135deg, #d4af37 50%, #047857 50%)' },
  'Sunburst Coral': { bg: '#e76f51' },
  'Rose Gold': { bg: '#e0a899' },
  'Ivory Bloom': { bg: '#fdfbf7', border: '#e5e7eb' },
  'Ecru Cream': { bg: '#f5f0eb', border: '#e5e7eb' },
  'Alabaster': { bg: '#f8fafc', border: '#e2e8f0' },
  'Cognac Tan': { bg: '#9a3412' },
  'Cognac Burnish': { bg: '#854d0e' },
  'Rich Brown': { bg: '#78350f' },
  'Dark Brown Suede': { bg: '#451a03' },
  'Crimson/Black': { bg: 'linear-gradient(135deg, #dc2626 50%, #111827 50%)' },
  'Ruby Wine': { bg: '#881337' },
  'Volt Gray': { bg: '#94a3b8' },
  'Stone Gray': { bg: '#78716c' },
  'Heather Gray': { bg: '#9ca3af' },
  'Slate Gray': { bg: '#64748b' },
  'Sand Beige': { bg: '#d6cfc7' },
  'Classic Khaki': { bg: '#c2b280' },
  'Oatmeal': { bg: '#e5dec9' },
  'Oatmeal Heather': { bg: '#d7cec7' },
  'Champagne Gold': { bg: '#d4af37' },
  'Metallic Gold': { bg: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 100%)' },
  'Soft Blush': { bg: '#fbcfe8' },
  'Blush Nude': { bg: '#f5d0c5' },
  'Espresso Brown': { bg: '#3e2723' },
  'Silver / Black Leather': { bg: 'linear-gradient(135deg, #e2e8f0 50%, #18181b 50%)' },
  'Rose Gold / Brown Leather': { bg: 'linear-gradient(135deg, #e0a899 50%, #78350f 50%)' },
  'Gunmetal / Smoke': { bg: '#475569' },
  'Royal Blue / Gold': { bg: 'linear-gradient(135deg, #1d4ed8 50%, #eab308 50%)' },
  'Burgundy / Cream': { bg: 'linear-gradient(135deg, #7f1d1d 50%, #fef3c7 50%)' }
};

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Active Media Showcase Tab: 'photo' | '360' | 'video' | 'fabric'
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | '360' | 'video' | 'fabric'>('photo');

  // Photo Gallery: Multiple Product Images
  const galleryImages = product?.images && product.images.length > 0
    ? product.images
    : product?.multiAngleImages && product.multiAngleImages.length > 0
    ? product.multiAngleImages
    : product ? [product.image] : [];
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Image Interaction Mode: 'zoom' (Fabric Zoom Lens) vs 'tilt' (3D Perspective Tilt)
  const [photoInteractionMode, setPhotoInteractionMode] = useState<'zoom' | 'tilt'>('zoom');

  // Hover Magnifier Zoom Lens State
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomLensPos, setZoomLensPos] = useState({ x: 50, y: 50, clientX: 0, clientY: 0 });
  const photoStageRef = useRef<HTMLDivElement>(null);

  // Fullscreen Fabric Zoom Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1.5);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Size Guide Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideUnit, setSizeGuideUnit] = useState<'inches' | 'cm'>('inches');

  // 3D Tilt for Main Photo
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  // Runway Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);

  // Sync state if product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || '');
      setActivePhotoIndex(0);
      setQuantity(1);
    }
  }, [product]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMediaTab !== 'photo' || galleryImages.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMediaTab, galleryImages.length]);

  if (!product) {
    return (
      <div className="container py-5 text-center my-5">
        <h2 className="fw-bold mb-3">Product Not Found</h2>
        <p className="text-muted mb-4">The item you are looking for may have been retired or moved.</p>
        <Link to="/products" className="btn btn-fashion-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Stock Status Helper
  const stockCount = product.stock ?? (product.inStock ? 20 : 0);
  const isOutOfStock = stockCount <= 0 || product.inStock === false;
  const isLowStock = stockCount > 0 && stockCount <= 5;
  const maxAvailableQty = Math.max(1, isOutOfStock ? 1 : stockCount);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
    }, 3000);
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  // Mouse move handler for Zoom lens & 3D tilt
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoStageRef.current) return;
    const rect = photoStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    if (photoInteractionMode === 'zoom') {
      setIsZoomActive(true);
      setZoomLensPos({
        x: Math.max(0, Math.min(100, percentX)),
        y: Math.max(0, Math.min(100, percentY)),
        clientX: x,
        clientY: y
      });
    } else {
      // 3D Tilt mode
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 12;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out',
      });

      setGlareStyle({
        opacity: 0.5,
        background: `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`,
      });
    }
  };

  const handlePhotoMouseLeave = () => {
    setIsZoomActive(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease',
    });
  };

  // Lightbox Pan & Zoom Handlers
  const handleLightboxMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - lightboxPan.x, y: e.clientY - lightboxPan.y };
  };

  const handleLightboxMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setLightboxPan({
      x: e.clientX - panStartRef.current.x,
      y: e.clientY - panStartRef.current.y
    });
  };

  const handleLightboxMouseUp = () => {
    setIsPanning(false);
  };

  // Video Controls
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const toggleVideoSpeed = () => {
    const nextSpeed = videoSpeed === 1 ? 0.5 : videoSpeed === 0.5 ? 0.75 : 1;
    setVideoSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-muted opacity-50" />);
      }
    }
    return stars;
  };

  const currentActiveImg = galleryImages[activePhotoIndex] || product.image;

  return (
    <div className="product-details-page py-4">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-muted text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products" className="text-muted text-decoration-none">
                Shop
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/products?category=${product.category}`}
                className="text-muted text-decoration-none"
              >
                {product.category}
              </Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          className="btn btn-sm btn-link text-decoration-none text-muted mb-4 ps-0 d-inline-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={12} />
          <span>Back to products</span>
        </button>

        {/* Added Alert banner */}
        {addedAlert && (
          <div className="alert alert-success d-flex align-items-center justify-content-between mb-4 shadow-sm">
            <div className="d-flex align-items-center gap-2">
              <FaCheck className="text-success" />
              <span>
                Added <strong>{quantity}x {product.name}</strong> ({selectedSize}, {selectedColor}) to your bag!
              </span>
            </div>
            <Link to="/cart" className="btn btn-sm btn-success fw-semibold">
              View Bag
            </Link>
          </div>
        )}

        <div className="row g-4 g-lg-5">
          {/* =========================================================================
              LEFT COLUMN: Interactive Media Showcase (Multiple Images & Zoom)
             ========================================================================= */}
          <div className="col-lg-6">
            {/* Interactive Media Navigation Tabs */}
            <div className="media-tabs-nav scroll-touch-pills gap-1 gap-sm-2 mb-3">
              <button
                type="button"
                className={`media-tab-btn ${activeMediaTab === 'photo' ? 'active' : ''}`}
                onClick={() => setActiveMediaTab('photo')}
              >
                <FaCamera size={13} />
                <span>Gallery & Fabric Zoom</span>
              </button>

              <button
                type="button"
                className={`media-tab-btn ${activeMediaTab === '360' ? 'active' : ''}`}
                onClick={() => setActiveMediaTab('360')}
              >
                <FaSyncAlt size={13} />
                <span>360° Studio Spin</span>
              </button>

              {product.videoUrl && (
                <button
                  type="button"
                  className={`media-tab-btn badge-video-tab ${activeMediaTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveMediaTab('video')}
                >
                  <FaPlay size={11} />
                  <span>Runway Motion</span>
                </button>
              )}

              <button
                type="button"
                className={`media-tab-btn ${activeMediaTab === 'fabric' ? 'active' : ''}`}
                onClick={() => setActiveMediaTab('fabric')}
              >
                <FaTshirt size={13} />
                <span>Fabric Lab</span>
              </button>
            </div>

            {/* TAB 1: 📸 Multiple Product Images Gallery & 🔎 Fabric Image Zoom */}
            {activeMediaTab === 'photo' && (
              <div>
                {/* Mode Selector & Action Bar (Zoom vs 3D Tilt) */}
                <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                  <div className="btn-group btn-group-sm rounded-pill p-1 bg-light border shadow-2xs">
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                        photoInteractionMode === 'zoom' ? 'btn-fashion-primary shadow-xs' : 'btn-light text-muted'
                      }`}
                      onClick={() => setPhotoInteractionMode('zoom')}
                      title="Inspect fabric details with cursor zoom lens"
                    >
                      <FaSearchPlus size={11} />
                      <span style={{ fontSize: '0.78rem' }}>Fabric Zoom Lens</span>
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                        photoInteractionMode === 'tilt' ? 'btn-fashion-primary shadow-xs' : 'btn-light text-muted'
                      }`}
                      onClick={() => setPhotoInteractionMode('tilt')}
                      title="Tilt cloth in 3D perspective"
                    >
                      <FaSyncAlt size={11} />
                      <span style={{ fontSize: '0.78rem' }}>3D Tilt View</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1"
                    onClick={() => {
                      setLightboxZoom(2);
                      setLightboxPan({ x: 0, y: 0 });
                      setIsLightboxOpen(true);
                    }}
                    title="Open Fullscreen Fabric Deep Zoom"
                    style={{ fontSize: '0.78rem' }}
                  >
                    <FaExpand size={11} />
                    <span className="d-none d-sm-inline">Fullscreen Zoom</span>
                  </button>
                </div>

                {/* Main Image Stage Container */}
                <div
                  ref={photoStageRef}
                  className="card border-0 rounded-4 overflow-hidden shadow-sm bg-light position-relative photo-tilt-stage"
                  onMouseMove={handlePhotoMouseMove}
                  onMouseLeave={handlePhotoMouseLeave}
                  onClick={() => {
                    if (photoInteractionMode === 'zoom') {
                      setLightboxZoom(2);
                      setLightboxPan({ x: 0, y: 0 });
                      setIsLightboxOpen(true);
                    }
                  }}
                  style={{ maxHeight: '580px', cursor: photoInteractionMode === 'zoom' ? 'crosshair' : 'grab' }}
                >
                  <img
                    src={currentActiveImg}
                    alt={product.name}
                    className="w-100 object-fit-cover photo-tilt-img"
                    style={photoInteractionMode === 'tilt' ? tiltStyle : undefined}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* 3D Specular lighting glare (When in tilt mode) */}
                  {photoInteractionMode === 'tilt' && (
                    <div className="card-cloth-specular-glare" style={glareStyle} />
                  )}

                  {/* 🔎 Interactive Fabric Magnifier Loupe Lens (When in zoom mode and hovering) */}
                  {photoInteractionMode === 'zoom' && isZoomActive && (
                    <div
                      className="fabric-zoom-loupe"
                      style={{
                        left: `${zoomLensPos.clientX}px`,
                        top: `${zoomLensPos.clientY}px`,
                        backgroundImage: `url(${currentActiveImg})`,
                        backgroundPosition: `${zoomLensPos.x}% ${zoomLensPos.y}%`,
                        backgroundSize: '320%',
                      }}
                    >
                      <div className="fabric-loupe-reticle" />
                      <span className="fabric-loupe-tag">3.2x Weave Zoom</span>
                    </div>
                  )}

                  {/* Navigation Arrows for Multiple Images */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="gallery-nav-btn gallery-nav-prev"
                        onClick={handlePrevPhoto}
                        aria-label="Previous product image"
                        title="Previous Image"
                      >
                        <FaChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        className="gallery-nav-btn gallery-nav-next"
                        onClick={handleNextPhoto}
                        aria-label="Next product image"
                        title="Next Image"
                      >
                        <FaChevronRight size={14} />
                      </button>
                    </>
                  )}

                  {/* Top Image Counter Badge */}
                  <div className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded-pill bg-dark bg-opacity-75 text-white small d-inline-flex align-items-center gap-1 shadow-sm">
                    <FaCamera size={10} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>
                      {activePhotoIndex + 1} / {galleryImages.length}
                    </span>
                  </div>

                  {/* Interactive Status Hint Banner */}
                  <div className="position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill bg-dark bg-opacity-75 text-white small d-inline-flex align-items-center gap-2 shadow-sm">
                    {photoInteractionMode === 'zoom' ? (
                      <>
                        <FaSearchPlus size={10} className="text-warning" />
                        <span style={{ fontSize: '0.74rem' }}>Hover to magnify fabric weave • Click for full screen</span>
                      </>
                    ) : (
                      <>
                        <FaSyncAlt size={10} className="spin-slow text-info" />
                        <span style={{ fontSize: '0.74rem' }}>Move mouse to tilt garment in 3D</span>
                      </>
                    )}
                  </div>
                </div>

                {/* 📸 Multiple Product Images Thumbnail Strip */}
                {galleryImages.length > 1 && (
                  <div className="d-flex align-items-center gap-2 mt-3 overflow-x-auto pb-2 custom-scrollbar">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn p-0 rounded-3 overflow-hidden position-relative product-thumb-btn ${
                          activePhotoIndex === idx ? 'active-thumb' : ''
                        }`}
                        onClick={() => setActivePhotoIndex(idx)}
                        style={{ width: '70px', height: '70px', flexShrink: 0 }}
                        title={`View angle ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Product angle ${idx + 1}`}
                          className="w-100 h-100 object-fit-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <span className="thumb-idx-badge">{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: 360° Studio Turntable Viewer */}
            {activeMediaTab === '360' && (
              <Product3DViewer product={product} />
            )}

            {/* TAB 3: Runway Video in Motion */}
            {activeMediaTab === 'video' && product.videoUrl && (
              <div className="card border-0 rounded-4 overflow-hidden shadow-sm bg-black position-relative" style={{ minHeight: '480px' }}>
                <video
                  ref={videoRef}
                  src={product.videoUrl}
                  poster={product.image}
                  className="w-100 h-100 object-fit-cover"
                  style={{ maxHeight: '600px' }}
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                />

                {/* Video Controls Bar */}
                <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-light py-1 px-3 d-inline-flex align-items-center gap-1"
                      onClick={toggleVideoPlay}
                    >
                      {isVideoPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                      <span>{isVideoPlaying ? 'Pause' : 'Play'}</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-light py-1 px-2"
                      onClick={toggleVideoMute}
                      title={isVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isVideoMuted ? <FaVolumeMute size={13} /> : <FaVolumeUp size={13} />}
                    </button>

                    <button
                      type="button"
                      className={`btn btn-sm ${videoSpeed < 1 ? 'btn-warning' : 'btn-outline-light'} py-1 px-2 d-inline-flex align-items-center gap-1`}
                      onClick={toggleVideoSpeed}
                      title="Slow Motion for Fabric Flow Inspection"
                    >
                      <FaTachometerAlt size={11} />
                      <span>{videoSpeed}x</span>
                    </button>
                  </div>

                  <span className="badge bg-danger text-white px-2 py-1 small fw-bold">
                    RUNWAY MOTION
                  </span>
                </div>
              </div>
            )}

            {/* TAB 4: Fabric & Texture Feel Lab */}
            {activeMediaTab === 'fabric' && (
              <FabricInspector product={product} />
            )}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Product Info, Size/Color Selectors, Stock & Checkout
             ========================================================================= */}
          <div className="col-lg-6">
            <div className="ps-lg-3">
              {/* Category & Badge Row */}
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <span className="badge bg-secondary text-white text-uppercase" style={{ letterSpacing: '1px' }}>
                  {product.category}
                </span>
                {product.badge && <span className="badge bg-dark text-white">{product.badge}</span>}

                {/* 📦 Stock Status Indicator Badge */}
                {isOutOfStock ? (
                  <span className="badge stock-badge-out d-inline-flex align-items-center gap-1">
                    <span className="stock-pulse-dot bg-danger" />
                    <span>Out of Stock</span>
                  </span>
                ) : isLowStock ? (
                  <span className="badge stock-badge-low d-inline-flex align-items-center gap-1">
                    <span className="stock-pulse-dot bg-warning" />
                    <FaFire size={11} className="text-warning" />
                    <span>Only {stockCount} Left in Stock</span>
                  </span>
                ) : (
                  <span className="badge stock-badge-in d-inline-flex align-items-center gap-1">
                    <span className="stock-pulse-dot bg-success" />
                    <span>In Stock ({stockCount} available)</span>
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="h2 fw-bold text-dark mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="rating-stars">{renderStars(product.rating)}</div>
                <span className="fw-semibold text-dark small">{product.rating}</span>
                <span className="text-muted small">
                  ({product.reviews ?? product.reviewCount ?? 0} verified reviews)
                </span>
              </div>

              {/* Price Row */}
              <div className="d-flex align-items-baseline gap-3 mb-4 pb-3 border-bottom">
                <span className="display-6 fw-bold text-dark">${product.price.toFixed(2)}</span>
                {(product.oldPrice || product.originalPrice) && (
                  <>
                    <span className="text-muted text-decoration-line-through fs-5">
                      ${(product.oldPrice ?? product.originalPrice ?? 0).toFixed(2)}
                    </span>
                    <span className="badge bg-danger">
                      Save ${( (product.oldPrice ?? product.originalPrice ?? 0) - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted mb-4 lead fs-6">{product.description}</p>

              {/* 🎨 COLOR SELECTOR: Choose Available Colors with Visual Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fw-bold small text-uppercase text-muted mb-0">
                      Color:{' '}
                      <span className="text-dark fw-bold text-capitalize">{selectedColor}</span>
                    </label>
                    <span className="text-muted small">
                      {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'} available
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    {product.colors.map((color) => {
                      const swatch = COLOR_MAP[color] || { bg: '#64748b' };
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          className={`color-swatch-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedColor(color)}
                          title={`Select ${color}`}
                          aria-label={`Select color ${color}`}
                        >
                          <span
                            className="color-swatch-dot"
                            style={{
                              background: swatch.bg,
                              border: swatch.border ? `1px solid ${swatch.border}` : undefined,
                            }}
                          >
                            {isSelected && (
                              <FaCheck
                                size={10}
                                className={
                                  color.toLowerCase().includes('white') ||
                                  color.toLowerCase().includes('cream') ||
                                  color.toLowerCase().includes('ivory') ||
                                  color.toLowerCase().includes('alabaster')
                                    ? 'text-dark'
                                    : 'text-white'
                                }
                              />
                            )}
                          </span>
                          <span className="color-swatch-name">{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 📏 SIZE SELECTOR: S, M, L, XL, XXL with Size Guide Modal */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fw-bold small text-uppercase text-muted mb-0">
                      Size: <span className="text-dark fw-bold">{selectedSize}</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-decoration-underline text-muted d-inline-flex align-items-center gap-1"
                      onClick={() => setIsSizeGuideOpen(true)}
                    >
                      <FaRulerHorizontal size={12} />
                      <span>Size Guide & Fit</span>
                    </button>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          className={`btn size-selector-pill ${
                            isSelected ? 'active btn-fashion-primary' : 'btn-outline-secondary'
                          }`}
                          onClick={() => setSelectedSize(size)}
                          disabled={isOutOfStock}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 📦 STOCK STATUS CALLOUT & URGENCY METER */}
              <div className="mb-4">
                {isOutOfStock ? (
                  <div className="p-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-3 d-flex align-items-center gap-3">
                    <FaBoxOpen className="text-danger fs-4 flex-shrink-0" />
                    <div>
                      <h6 className="fw-bold text-danger mb-0">Currently Out of Stock</h6>
                      <p className="text-muted small mb-0">
                        This item is temporarily sold out. Check back soon for restock.
                      </p>
                    </div>
                  </div>
                ) : isLowStock ? (
                  <div className="p-3 bg-warning bg-opacity-15 border border-warning border-opacity-30 rounded-3">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <FaFire className="text-warning fs-5" />
                        <span className="fw-bold text-dark small">
                          High Demand — Only {stockCount} left in stock!
                        </span>
                      </div>
                      <span className="badge bg-warning text-dark fw-bold small">
                        Low Stock
                      </span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${(stockCount / 5) * 100}%` }}
                        aria-valuenow={stockCount}
                        aria-valuemin={0}
                        aria-valuemax={5}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <FaBoxOpen className="text-success" />
                      <span className="text-success fw-semibold small">
                        In Stock • Ready for immediate dispatch
                      </span>
                    </div>
                    <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-25 small">
                      {stockCount} Available
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity & CTA Button */}
              <div className="row g-3 align-items-center mb-4 pt-1">
                <div className="col-auto">
                  <div className="input-group" style={{ width: '130px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={isOutOfStock || quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center bg-white"
                      value={quantity}
                      readOnly
                      disabled={isOutOfStock}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(maxAvailableQty, q + 1))}
                      disabled={isOutOfStock || quantity >= maxAvailableQty}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col">
                  <button
                    type="button"
                    className={`btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm ${
                      isOutOfStock ? 'btn-secondary disabled' : 'btn-fashion-primary'
                    }`}
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                  >
                    <FaShoppingBag />
                    <span>{isOutOfStock ? 'Out of Stock' : 'Add to Shopping Bag'}</span>
                  </button>
                </div>
              </div>

              {/* Perks Highlights */}
              <div className="p-3 bg-light rounded-3 border">
                <div className="d-flex flex-column gap-2 small text-muted">
                  <div className="d-flex align-items-center gap-2">
                    <FaTruck className="text-warning" />
                    <span>Free express delivery on orders over $150</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FaUndo className="text-warning" />
                    <span>30-day effortless returns & exchanges</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FaShieldAlt className="text-warning" />
                    <span>Authentic craftsmanship & certified sustainable fabrics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-5 pt-5 border-top">
            <div className="section-title-wrap text-start mb-4">
              <span className="section-subtitle">You May Also Like</span>
              <h3 className="section-title">Related In {product.category}</h3>
            </div>
            <div className="row g-2 g-md-4">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="col-6 col-md-3">
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* =========================================================================
          MODAL 1: Fullscreen Deep Fabric Zoom Lightbox Modal
         ========================================================================= */}
      {isLightboxOpen && (
        <div className="fabric-zoom-modal-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div className="fabric-zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="fabric-zoom-modal-header">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark fw-bold">FABRIC DEEP ZOOM</span>
                <span className="text-white small d-none d-sm-inline">
                  {product.name} • {galleryImages.length} High-Res Angles
                </span>
              </div>

              {/* Controls */}
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                  onClick={() => setLightboxZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))))}
                  title="Zoom Out"
                >
                  <FaSearchMinus size={12} />
                </button>
                <span className="text-white small px-1 fw-bold">{Math.round(lightboxZoom * 100)}%</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                  onClick={() => setLightboxZoom((z) => Math.min(4, Number((z + 0.5).toFixed(1))))}
                  title="Zoom In"
                >
                  <FaSearchPlus size={12} />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light px-2"
                  onClick={() => {
                    setLightboxZoom(1.5);
                    setLightboxPan({ x: 0, y: 0 });
                  }}
                  title="Reset Zoom"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light ms-2 px-2"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close zoom modal"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {/* Stage Pan & Zoom Viewport */}
            <div
              className="fabric-zoom-viewport"
              onMouseDown={handleLightboxMouseDown}
              onMouseMove={handleLightboxMouseMove}
              onMouseUp={handleLightboxMouseUp}
              onMouseLeave={handleLightboxMouseUp}
              style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            >
              <img
                src={currentActiveImg}
                alt={product.name}
                className="fabric-zoom-modal-img"
                style={{
                  transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                  transition: isPanning ? 'none' : 'transform 0.15s ease-out'
                }}
                draggable={false}
              />
            </div>

            {/* Modal Bottom Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="fabric-zoom-modal-footer">
                <div className="d-flex justify-content-center gap-2 overflow-x-auto p-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`btn p-0 rounded-2 overflow-hidden border ${
                        activePhotoIndex === idx ? 'border-warning border-2' : 'border-secondary opacity-60'
                      }`}
                      onClick={() => setActivePhotoIndex(idx)}
                      style={{ width: '50px', height: '50px' }}
                    >
                      <img src={img} alt={`Angle ${idx + 1}`} className="w-100 h-100 object-fit-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: Interactive Size Guide & Fit Advisor Modal
         ========================================================================= */}
      {isSizeGuideOpen && (
        <div className="fabric-zoom-modal-backdrop" onClick={() => setIsSizeGuideOpen(false)}>
          <div
            className="card border-0 rounded-4 shadow-lg p-4 bg-white"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <FaRulerHorizontal className="text-warning fs-5" />
                <h5 className="fw-bold mb-0 text-dark">Size Guide & Fit Advisor</h5>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsSizeGuideOpen(false)}
                aria-label="Close Size Guide"
              />
            </div>

            {/* Units Toggle */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">Standard Garment Sizing Specifications</span>
              <div className="btn-group btn-group-sm">
                <button
                  type="button"
                  className={`btn btn-sm ${sizeGuideUnit === 'inches' ? 'btn-dark' : 'btn-outline-secondary'}`}
                  onClick={() => setSizeGuideUnit('inches')}
                >
                  Inches
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${sizeGuideUnit === 'cm' ? 'btn-dark' : 'btn-outline-secondary'}`}
                  onClick={() => setSizeGuideUnit('cm')}
                >
                  CM
                </button>
              </div>
            </div>

            {/* Size Chart Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-hover text-center align-middle small mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Size</th>
                    <th>Chest / Bust</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={selectedSize === 'S' ? 'table-warning fw-bold' : ''}>
                    <td><span className="badge bg-dark">S</span></td>
                    <td>{sizeGuideUnit === 'inches' ? '36" - 38"' : '91 - 96 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '29" - 31"' : '74 - 79 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '37" - 39"' : '94 - 99 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '27.5"' : '70 cm'}</td>
                  </tr>
                  <tr className={selectedSize === 'M' ? 'table-warning fw-bold' : ''}>
                    <td><span className="badge bg-dark">M</span></td>
                    <td>{sizeGuideUnit === 'inches' ? '39" - 41"' : '99 - 104 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '32" - 34"' : '81 - 86 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '40" - 42"' : '101 - 107 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '28.5"' : '72 cm'}</td>
                  </tr>
                  <tr className={selectedSize === 'L' ? 'table-warning fw-bold' : ''}>
                    <td><span className="badge bg-dark">L</span></td>
                    <td>{sizeGuideUnit === 'inches' ? '42" - 44"' : '107 - 112 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '35" - 37"' : '89 - 94 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '43" - 45"' : '109 - 114 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '29.5"' : '75 cm'}</td>
                  </tr>
                  <tr className={selectedSize === 'XL' ? 'table-warning fw-bold' : ''}>
                    <td><span className="badge bg-dark">XL</span></td>
                    <td>{sizeGuideUnit === 'inches' ? '45" - 47"' : '114 - 119 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '38" - 40"' : '96 - 101 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '46" - 48"' : '117 - 122 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '30.5"' : '77 cm'}</td>
                  </tr>
                  <tr className={selectedSize === 'XXL' ? 'table-warning fw-bold' : ''}>
                    <td><span className="badge bg-dark">XXL</span></td>
                    <td>{sizeGuideUnit === 'inches' ? '48" - 50"' : '122 - 127 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '41" - 43"' : '104 - 109 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '49" - 51"' : '124 - 130 cm'}</td>
                    <td>{sizeGuideUnit === 'inches' ? '31.5"' : '80 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Fit Advice Note */}
            <div className="p-3 bg-light rounded-3 d-flex align-items-start gap-2 small text-muted">
              <FaInfoCircle className="text-primary mt-1 flex-shrink-0" />
              <div>
                <strong>Fit Recommendation:</strong> This garment runs <em>True to Size</em>. If you are between sizes or prefer a relaxed tailored silhouette for layering, we recommend ordering one size up.
              </div>
            </div>

            <div className="mt-4 text-end">
              <button
                type="button"
                className="btn btn-fashion-primary px-4"
                onClick={() => setIsSizeGuideOpen(false)}
              >
                Got It, Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
