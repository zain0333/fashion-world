import React, { useState, useRef, useEffect } from 'react';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCamera,
  FaCheckCircle,
  FaThumbsUp,
  FaTimes,
  FaUpload,
  FaFilter,
  FaSortAmountDown,
  FaPen,
  FaSearch,
  FaTh,
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
  FaTshirt,
  FaExpand
} from 'react-icons/fa';
import type { Product, Review } from '../data/products';
import { REVIEWS } from '../data/products';

interface CustomerReviewsProps {
  product: Product;
  onOpenWriteModalDirectly?: () => void;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: '1 Star - Poor: Did not meet expectations',
  2: '2 Stars - Fair: Needs material or sizing improvements',
  3: '3 Stars - Good: Satisfactory quality and fit',
  4: '4 Stars - Great: Very pleased with styling & drape',
  5: '5 Stars - Outstanding: Exceeded all expectations!'
};

const SAMPLE_PHOTO_PRESETS = [
  {
    label: '🌿 Outdoor Casual Look',
    url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    tag: '#CasualStyle'
  },
  {
    label: '🏙️ City Street Chic',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    tag: '#Streetwear'
  },
  {
    label: '🥂 Evening Gala Fit',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    tag: '#EveningGala'
  },
  {
    label: '💼 Minimalist Studio',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    tag: '#Minimalist'
  }
];

const POPULAR_STYLE_TAGS = [
  '#ParisianChic',
  '#Streetwear',
  '#TailoredFit',
  '#Minimalist',
  '#WeekendVibe',
  '#SummerGala',
  '#WorkwearEssential',
  '#DateNight'
];

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ product }) => {
  // Local storage review loader
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('fashion_world_product_reviews');
      const allSaved: Review[] = saved ? JSON.parse(saved) : [];
      const productSaved = allSaved.filter((r) => r.productId === product.id);
      const defaultProductReviews = REVIEWS.filter(
        (r) => r.productId === product.id || (!r.productId && r.productName === product.name)
      );

      // Fallback if no specific reviews exist for this product
      if (productSaved.length === 0 && defaultProductReviews.length === 0) {
        return [
          {
            id: 101,
            productId: product.id,
            name: 'Charlotte Vance',
            role: 'Verified Customer',
            city: 'London, UK',
            rating: 5,
            headline: 'Exquisite silhouette and premium texture',
            comment: `The quality of the ${product.name} is remarkable. The fabric feels luxurious, breathable, and fits with effortless structure. Exactly as shown on the runway video!`,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            productName: product.name,
            date: 'March 2026',
            verifiedPurchase: true,
            fitFeedback: 'True to Size',
            selectedSize: product.sizes[0] || 'M',
            selectedColor: product.colors[0] || 'Classic',
            styleTags: ['#ParisianChic', '#TailoredFit'],
            qualityRating: 5,
            comfortRating: 5,
            likes: 14,
            photos: [
              product.image,
              ...(product.images ? product.images.slice(1, 2) : [])
            ]
          },
          {
            id: 102,
            productId: product.id,
            name: 'Liam Davenport',
            role: 'Verified Customer',
            city: 'Melbourne, Australia',
            rating: 5,
            headline: 'Flawless tailoring and prompt delivery',
            comment: `Arrived in 2 business days in cedar packaging. The attention to stitching and material finish is exceptional. Pairs effortlessly with my existing wardrobe.`,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            productName: product.name,
            date: 'February 2026',
            verifiedPurchase: true,
            fitFeedback: 'True to Size',
            selectedSize: product.sizes[1] || 'L',
            selectedColor: product.colors[1] || product.colors[0] || 'Default',
            styleTags: ['#Minimalist', '#WardrobeCapsule'],
            qualityRating: 5,
            comfortRating: 5,
            likes: 9
          }
        ];
      }
      return [...productSaved, ...defaultProductReviews];
    } catch {
      return REVIEWS.filter((r) => r.productId === product.id);
    }
  });

  // Filter & Search & Sort State
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | '5' | '4' | '3' | 'critical'>('all');
  const [fitFilter, setFitFilter] = useState<'all' | 'True to Size' | 'Runs Small' | 'Runs Large'>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');

  // UGC Outfit Gallery View Mode: 'reel' vs 'grid'
  const [outfitGalleryMode, setOutfitGalleryMode] = useState<'reel' | 'grid'>('reel');
  const reelContainerRef = useRef<HTMLDivElement>(null);

  // Modal State for Writing a Review
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formRating, setFormRating] = useState<number>(5);
  const [formQualityRating, setFormQualityRating] = useState<number>(5);
  const [formComfortRating, setFormComfortRating] = useState<number>(5);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formHeadline, setFormHeadline] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formSize, setFormSize] = useState(product.sizes[0] || 'M');
  const [formColor, setFormColor] = useState(product.colors[0] || '');
  const [formFit, setFormFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [formTags, setFormTags] = useState<string[]>(['#TailoredFit']);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [submitSuccessToast, setSubmitSuccessToast] = useState(false);

  // Lightbox Modal for Customer Photos
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Helpful Upvote State
  const [likedReviewIds, setLikedReviewIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('fashion_world_liked_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compile all customer photos across reviews
  const allCustomerPhotos = reviewsList.flatMap((r) =>
    (r.photos || []).map((photo) => ({ photo, review: r }))
  );

  // Handle Reel Scroll Buttons
  const scrollReel = (direction: 'left' | 'right') => {
    if (reelContainerRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      reelContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setUploadedPhotos((prev) => [...prev, event.target!.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleRemoveUploadedPhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddPresetPhoto = (url: string, tag?: string) => {
    if (!uploadedPhotos.includes(url)) {
      setUploadedPhotos((prev) => [...prev, url]);
      if (tag && !formTags.includes(tag)) {
        setFormTags((prev) => [...prev, tag]);
      }
    }
  };

  const toggleStyleTag = (tag: string) => {
    setFormTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Submit Review Form
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      productId: product.id,
      name: formName.trim(),
      role: 'Verified Buyer',
      city: formCity.trim() || 'Global Shopper',
      rating: formRating,
      headline: formHeadline.trim() || 'Exceptional Quality & Fit',
      comment: formComment.trim(),
      productName: product.name,
      date: 'Just now',
      verifiedPurchase: true,
      fitFeedback: formFit,
      selectedSize: formSize,
      selectedColor: formColor,
      styleTags: formTags.length > 0 ? formTags : undefined,
      qualityRating: formQualityRating,
      comfortRating: formComfortRating,
      likes: 1,
      photos: uploadedPhotos.length > 0 ? uploadedPhotos : undefined
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);

    // Save to localStorage
    try {
      const saved = localStorage.getItem('fashion_world_product_reviews');
      const allSaved: Review[] = saved ? JSON.parse(saved) : [];
      localStorage.setItem('fashion_world_product_reviews', JSON.stringify([newReview, ...allSaved]));
    } catch (err) {
      console.error('Failed to save review to storage', err);
    }

    // Reset Form
    setIsWriteModalOpen(false);
    setFormHeadline('');
    setFormComment('');
    setUploadedPhotos([]);
    setSubmitSuccessToast(true);
    setTimeout(() => {
      setSubmitSuccessToast(false);
    }, 5000);
  };

  // Upvote Helpful Review
  const handleToggleLike = (reviewId: number) => {
    if (likedReviewIds.includes(reviewId)) {
      setLikedReviewIds((prev) => {
        const next = prev.filter((id) => id !== reviewId);
        localStorage.setItem('fashion_world_liked_reviews', JSON.stringify(next));
        return next;
      });
      setReviewsList((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, likes: Math.max(0, (r.likes || 1) - 1) } : r))
      );
    } else {
      setLikedReviewIds((prev) => {
        const next = [...prev, reviewId];
        localStorage.setItem('fashion_world_liked_reviews', JSON.stringify(next));
        return next;
      });
      setReviewsList((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, likes: (r.likes || 0) + 1 } : r))
      );
    }
  };

  // Calculate Metrics
  const totalReviews = reviewsList.length;
  const averageRating =
    totalReviews > 0
      ? (reviewsList.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : product.rating.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviewsList.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, count, percentage };
  });

  const trueToSizeCount = reviewsList.filter((r) => r.fitFeedback === 'True to Size').length;
  const runsSmallCount = reviewsList.filter((r) => r.fitFeedback === 'Runs Small').length;
  const runsLargeCount = reviewsList.filter((r) => r.fitFeedback === 'Runs Large').length;

  const trueToSizePercent = totalReviews > 0 ? Math.round((trueToSizeCount / totalReviews) * 100) : 92;
  const runsSmallPercent = totalReviews > 0 ? Math.round((runsSmallCount / totalReviews) * 100) : 5;
  const runsLargePercent = totalReviews > 0 ? Math.round((runsLargeCount / totalReviews) * 100) : 3;

  // Filtered & Sorted Reviews
  const filteredReviews = reviewsList
    .filter((r) => {
      // Star filter
      if (activeFilter === 'photos' && (!r.photos || r.photos.length === 0)) return false;
      if (activeFilter === '5' && Math.round(r.rating) !== 5) return false;
      if (activeFilter === '4' && Math.round(r.rating) !== 4) return false;
      if (activeFilter === '3' && Math.round(r.rating) !== 3) return false;
      if (activeFilter === 'critical' && Math.round(r.rating) > 2) return false;

      // Fit filter
      if (fitFilter !== 'all' && r.fitFeedback !== fitFilter) return false;

      // Size filter
      if (sizeFilter !== 'all' && r.selectedSize !== sizeFilter) return false;

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesComment = r.comment.toLowerCase().includes(q);
        const matchesHeadline = r.headline?.toLowerCase().includes(q);
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesTag = r.styleTags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesComment && !matchesHeadline && !matchesName && !matchesTag) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      if (sortBy === 'helpful') return (b.likes || 0) - (a.likes || 0);
      return b.id - a.id;
    });

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push(<FaStar key={i} />);
      } else if (score >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-muted opacity-40" />);
      }
    }
    return stars;
  };

  const activeLightboxItem =
    activePhotoIndex !== null && allCustomerPhotos[activePhotoIndex]
      ? allCustomerPhotos[activePhotoIndex]
      : null;

  const handleNextLightboxPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % allCustomerPhotos.length);
    }
  };

  const handlePrevLightboxPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + allCustomerPhotos.length) % allCustomerPhotos.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') handleNextLightboxPhoto();
      if (e.key === 'ArrowLeft') handlePrevLightboxPhoto();
      if (e.key === 'Escape') setActivePhotoIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, allCustomerPhotos.length]);

  return (
    <section className="customer-reviews-section my-5 pt-4 border-top" id="customer-reviews">
      {/* Toast Notification */}
      {submitSuccessToast && (
        <div className="alert alert-success d-flex align-items-center justify-content-between mb-4 shadow-sm border-0 rounded-4 p-3 animate-fade-in">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2 bg-success text-white rounded-circle d-flex align-items-center justify-content-center">
              <FaCheckCircle size={18} />
            </div>
            <div>
              <strong className="d-block text-dark">Thank you for your outfit review!</strong>
              <span className="text-muted small">
                Your styling feedback and outfit photos have been published to the community reel.
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setSubmitSuccessToast(false)}
            aria-label="Close"
          />
        </div>
      )}

      {/* Section Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <span className="section-subtitle text-start d-block">Verified Feedback & UGC</span>
          <h3 className="section-title text-start mb-0">Customer Reviews & Outfit Gallery</h3>
        </div>

        <button
          type="button"
          className="btn btn-fashion-primary px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm fw-semibold"
          onClick={() => setIsWriteModalOpen(true)}
        >
          <FaPen size={13} />
          <span>Write a Review & Share Outfit</span>
        </button>
      </div>

      {/* =========================================================================
          REVIEW SUMMARY DASHBOARD & RATING BREAKDOWN
         ========================================================================= */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-light mb-4">
        <div className="row g-4 align-items-center">
          {/* Overall Rating Big Score */}
          <div className="col-12 col-md-4 text-center border-end-md">
            <div className="display-4 fw-bold text-dark mb-1">{averageRating}</div>
            <div className="rating-stars fs-5 text-warning mb-2 justify-content-center">
              {renderStars(Number(averageRating))}
            </div>
            <p className="text-muted small mb-0">
              Based on <strong>{totalReviews}</strong> verified customer reviews
            </p>
            <div className="mt-2 badge bg-success bg-opacity-15 text-success border border-success border-opacity-25 px-3 py-1 rounded-pill small">
              <FaCheckCircle className="me-1" size={11} />
              {trueToSizePercent}% say True to Size
            </div>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="col-12 col-md-5">
            <div className="d-flex flex-column gap-2">
              {starCounts.map((row) => (
                <div
                  key={row.stars}
                  className="d-flex align-items-center gap-2 small cursor-pointer star-bar-hover-row"
                  onClick={() => setActiveFilter(String(row.stars) as any)}
                  title={`Click to filter by ${row.stars} stars`}
                >
                  <span className="text-muted text-nowrap fw-semibold" style={{ width: '50px' }}>
                    {row.stars} star
                  </span>
                  <div className="progress flex-grow-1" style={{ height: '9px', borderRadius: '6px' }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${row.percentage}%`, borderRadius: '6px' }}
                      aria-valuenow={row.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <span className="text-muted text-nowrap text-end" style={{ width: '45px' }}>
                    {row.count} ({row.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fit & Feel Advisor Snapshot */}
          <div className="col-12 col-md-3">
            <div className="p-3 bg-white rounded-3 border shadow-2xs">
              <h6 className="fw-bold mb-2 small text-dark d-flex align-items-center gap-1">
                <FaTshirt className="text-muted" size={12} />
                Fit & Feel Advisor
              </h6>

              <div className="d-flex justify-content-between small text-muted mb-1" style={{ fontSize: '0.72rem' }}>
                <span>Runs Small ({runsSmallPercent}%)</span>
                <span className="fw-bold text-success">True to Size ({trueToSizePercent}%)</span>
                <span>Runs Large ({runsLargePercent}%)</span>
              </div>

              <div className="progress" style={{ height: '7px', borderRadius: '4px' }}>
                <div
                  className="progress-bar bg-secondary opacity-50"
                  style={{ width: `${runsSmallPercent}%` }}
                  title={`Runs Small: ${runsSmallPercent}%`}
                />
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${trueToSizePercent}%` }}
                  title={`True to Size: ${trueToSizePercent}%`}
                />
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${runsLargePercent}%` }}
                  title={`Runs Large: ${runsLargePercent}%`}
                />
              </div>

              <p className="text-muted small mt-2 mb-0" style={{ fontSize: '0.74rem' }}>
                {trueToSizePercent >= 80
                  ? 'Shoppers confirm this garment aligns perfectly with our standard sizing guide.'
                  : 'Consider checking the size guide measurements before checkout.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          REAL CUSTOMER OUTFIT PHOTOS REEL (UGC GALLERY)
         ========================================================================= */}
      {allCustomerPhotos.length > 0 && (
        <div className="customer-photos-reel-wrap mb-5">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-warning bg-opacity-15 text-warning rounded-circle d-flex align-items-center justify-content-center">
                <FaCamera size={14} />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0">Community Outfit Gallery ({allCustomerPhotos.length})</h5>
                <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
                  Real fits styled by our global customer community
                </span>
              </div>
            </div>

            {/* Gallery Controls (Reel vs Grid View & Scroll Arrows) */}
            <div className="d-flex align-items-center gap-2">
              <div className="btn-group btn-group-sm rounded-pill p-1 bg-light border shadow-2xs">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                    outfitGalleryMode === 'reel' ? 'btn-fashion-primary' : 'btn-light text-muted'
                  }`}
                  onClick={() => setOutfitGalleryMode('reel')}
                  title="Horizontal scroll reel"
                >
                  <FaList size={11} />
                  <span style={{ fontSize: '0.75rem' }}>Carousel</span>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                    outfitGalleryMode === 'grid' ? 'btn-fashion-primary' : 'btn-light text-muted'
                  }`}
                  onClick={() => setOutfitGalleryMode('grid')}
                  title="Expand to full grid lookbook"
                >
                  <FaTh size={11} />
                  <span style={{ fontSize: '0.75rem' }}>Lookbook Grid</span>
                </button>
              </div>

              {outfitGalleryMode === 'reel' && (
                <div className="d-flex gap-1">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                    onClick={() => scrollReel('left')}
                    aria-label="Scroll left in outfits reel"
                  >
                    <FaChevronLeft size={11} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                    onClick={() => scrollReel('right')}
                    aria-label="Scroll right in outfits reel"
                  >
                    <FaChevronRight size={11} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mode 1: Horizontal Scroll Reel */}
          {outfitGalleryMode === 'reel' ? (
            <div
              ref={reelContainerRef}
              className="d-flex gap-3 overflow-x-auto pb-3 custom-scrollbar customer-reel-container"
              style={{ scrollBehavior: 'smooth' }}
            >
              {allCustomerPhotos.map((item, idx) => (
                <div
                  key={idx}
                  className="customer-photo-card position-relative rounded-3 overflow-hidden flex-shrink-0 cursor-pointer shadow-sm"
                  onClick={() => setActivePhotoIndex(idx)}
                  title={`Styled by ${item.review.name} (${item.review.selectedColor || ''}) - Click to inspect look`}
                >
                  <img
                    src={item.photo}
                    alt={`Customer outfit style by ${item.review.name}`}
                    className="w-100 h-100 object-fit-cover transition-transform"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = product.image;
                    }}
                  />
                  <div className="customer-photo-overlay p-2 d-flex flex-column justify-content-between">
                    <span className="badge bg-dark bg-opacity-75 text-white align-self-start small" style={{ fontSize: '0.68rem' }}>
                      ★ {item.review.rating}.0
                    </span>
                    <div>
                      {item.review.styleTags && item.review.styleTags[0] && (
                        <span className="badge bg-fashion-gold text-dark mb-1 d-inline-block small" style={{ fontSize: '0.62rem' }}>
                          {item.review.styleTags[0]}
                        </span>
                      )}
                      <span className="text-white fw-bold d-block text-truncate small">
                        {item.review.name}
                      </span>
                      <span className="text-white-50 small" style={{ fontSize: '0.68rem' }}>
                        {item.review.selectedColor} • {item.review.selectedSize}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Mode 2: Lookbook Masonry Grid */
            <div className="row g-3">
              {allCustomerPhotos.map((item, idx) => (
                <div key={idx} className="col-6 col-md-4 col-lg-3">
                  <div
                    className="customer-photo-card w-100 rounded-3 overflow-hidden cursor-pointer shadow-sm position-relative"
                    style={{ height: '260px' }}
                    onClick={() => setActivePhotoIndex(idx)}
                  >
                    <img
                      src={item.photo}
                      alt={`Customer outfit style by ${item.review.name}`}
                      className="w-100 h-100 object-fit-cover transition-transform"
                    />
                    <div className="customer-photo-overlay p-3 d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-dark bg-opacity-75 text-white small">
                          ★ {item.review.rating}.0
                        </span>
                        <span className="badge bg-white text-dark small" style={{ fontSize: '0.68rem' }}>
                          <FaExpand size={10} className="me-1" /> Zoom Look
                        </span>
                      </div>
                      <div>
                        {item.review.styleTags && item.review.styleTags[0] && (
                          <span className="badge bg-fashion-gold text-dark mb-1 d-inline-block small">
                            {item.review.styleTags[0]}
                          </span>
                        )}
                        <span className="text-white fw-bold d-block text-truncate">{item.review.name}</span>
                        <span className="text-white-50 small" style={{ fontSize: '0.72rem' }}>
                          {item.review.selectedColor} &bull; Size {item.review.selectedSize}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          FILTER, SEARCH & SORT CONTROLS BAR
         ========================================================================= */}
      <div className="d-flex flex-column gap-3 mb-4 pb-3 border-bottom">
        {/* Row 1: Search & Sort */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2">
          {/* Keyword Search */}
          <div className="input-group input-group-sm" style={{ maxWidth: '340px' }}>
            <span className="input-group-text bg-white border-end-0 text-muted">
              <FaSearch size={12} />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search reviews (e.g. fabric, warm, fit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={() => setSearchQuery('')}
              >
                <FaTimes size={10} />
              </button>
            )}
          </div>

          {/* Sizing & Fit Dropdown Selectors */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <div className="d-flex align-items-center gap-1">
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Size:</span>
              <select
                className="form-select form-select-sm rounded-pill w-auto"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
              >
                <option value="all">All Sizes</option>
                {product.sizes.map((s) => (
                  <option key={s} value={s}>Size {s}</option>
                ))}
              </select>
            </div>

            <div className="d-flex align-items-center gap-1">
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Fit:</span>
              <select
                className="form-select form-select-sm rounded-pill w-auto"
                value={fitFilter}
                onChange={(e) => setFitFilter(e.target.value as any)}
              >
                <option value="all">All Fits</option>
                <option value="True to Size">True to Size</option>
                <option value="Runs Small">Runs Small</option>
                <option value="Runs Large">Runs Large</option>
              </select>
            </div>

            <div className="d-flex align-items-center gap-1">
              <span className="text-muted small d-inline-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                <FaSortAmountDown size={10} /> Sort:
              </span>
              <select
                className="form-select form-select-sm rounded-pill w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful Upvotes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Star & Photo Filter Pills */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="text-muted small d-inline-flex align-items-center gap-1">
            <FaFilter size={11} /> Filter:
          </span>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 ${
              activeFilter === 'all' ? 'btn-fashion-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All ({reviewsList.length})
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
              activeFilter === 'photos' ? 'btn-fashion-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveFilter('photos')}
          >
            <FaCamera size={11} />
            <span>With Photos ({allCustomerPhotos.length})</span>
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 ${
              activeFilter === '5' ? 'btn-fashion-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveFilter('5')}
          >
            ★ 5 Stars ({reviewsList.filter((r) => Math.round(r.rating) === 5).length})
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 ${
              activeFilter === '4' ? 'btn-fashion-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveFilter('4')}
          >
            ★ 4 Stars ({reviewsList.filter((r) => Math.round(r.rating) === 4).length})
          </button>

          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 ${
              activeFilter === '3' ? 'btn-fashion-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveFilter('3')}
          >
            ★ 3 Stars ({reviewsList.filter((r) => Math.round(r.rating) === 3).length})
          </button>

          {(searchQuery || sizeFilter !== 'all' || fitFilter !== 'all' || activeFilter !== 'all') && (
            <button
              type="button"
              className="btn btn-sm btn-link text-muted p-0 ms-2 text-decoration-none small"
              onClick={() => {
                setActiveFilter('all');
                setSizeFilter('all');
                setFitFilter('all');
                setSearchQuery('');
              }}
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          CUSTOMER REVIEWS LIST
         ========================================================================= */}
      <div className="d-flex flex-column gap-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4 p-4 border">
            <FaCamera size={36} className="text-muted mb-2 opacity-50" />
            <h5 className="fw-bold text-dark">No reviews matching your current filters</h5>
            <p className="text-muted small mb-3">Try adjusting your filters or be the first to share an outfit look!</p>
            <div className="d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                onClick={() => {
                  setActiveFilter('all');
                  setSizeFilter('all');
                  setFitFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
              <button
                type="button"
                className="btn btn-fashion-primary btn-sm rounded-pill px-4"
                onClick={() => setIsWriteModalOpen(true)}
              >
                Write Review
              </button>
            </div>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const isLiked = likedReviewIds.includes(rev.id);

            return (
              <div key={rev.id} className="card border rounded-4 p-4 shadow-sm bg-white review-item-card">
                <div className="row g-3">
                  {/* Left: Reviewer Info */}
                  <div className="col-12 col-md-3 border-end-md">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {rev.avatar ? (
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="rounded-circle object-fit-cover shadow-2xs"
                          style={{ width: '44px', height: '44px' }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
                          style={{ width: '44px', height: '44px', fontSize: '0.9rem' }}
                        >
                          {rev.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h6 className="fw-bold mb-0 text-dark small">{rev.name}</h6>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                          {rev.city || 'Verified Buyer'}
                        </span>
                      </div>
                    </div>

                    {rev.verifiedPurchase && (
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 small mb-2 d-inline-flex align-items-center gap-1">
                        <FaCheckCircle size={10} />
                        <span>Verified Purchase</span>
                      </span>
                    )}

                    {/* Fit & Variant Information */}
                    {(rev.selectedSize || rev.selectedColor || rev.fitFeedback) && (
                      <div className="small text-muted border-top pt-2 mt-1" style={{ fontSize: '0.74rem' }}>
                        {rev.selectedSize && (
                          <div className="mb-1">Size Worn: <strong className="text-dark">{rev.selectedSize}</strong></div>
                        )}
                        {rev.selectedColor && (
                          <div className="mb-1">Color: <strong className="text-dark">{rev.selectedColor}</strong></div>
                        )}
                        {rev.fitFeedback && (
                          <div className="mt-1">
                            Fit: <span className="badge bg-light text-dark border small">{rev.fitFeedback}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Review Content & Photos */}
                  <div className="col-12 col-md-9 ps-md-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rating-stars text-warning small">{renderStars(rev.rating)}</div>
                        <span className="fw-bold text-dark small">{rev.rating}.0</span>

                        {/* Sub-ratings badges if available */}
                        {rev.qualityRating && (
                          <span className="badge bg-light text-muted border small d-none d-sm-inline" style={{ fontSize: '0.68rem' }}>
                            Fabric: {rev.qualityRating}/5
                          </span>
                        )}
                        {rev.comfortRating && (
                          <span className="badge bg-light text-muted border small d-none d-sm-inline" style={{ fontSize: '0.68rem' }}>
                            Comfort: {rev.comfortRating}/5
                          </span>
                        )}
                      </div>
                      <span className="text-muted small" style={{ fontSize: '0.74rem' }}>
                        {rev.date}
                      </span>
                    </div>

                    {rev.headline && (
                      <h6 className="fw-bold text-dark mb-2">{rev.headline}</h6>
                    )}

                    <p className="text-muted small mb-3 lead" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {rev.comment}
                    </p>

                    {/* Style tags */}
                    {rev.styleTags && rev.styleTags.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {rev.styleTags.map((tag, tIdx) => (
                          <span key={tIdx} className="badge bg-light text-muted border small" style={{ fontSize: '0.7rem' }}>
                            <FaTag size={8} className="me-1 opacity-75" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Customer Outfit Photos Attached */}
                    {rev.photos && rev.photos.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {rev.photos.map((photo, pIdx) => {
                          const globalIdx = allCustomerPhotos.findIndex((item) => item.photo === photo);
                          return (
                            <div
                              key={pIdx}
                              className="review-attached-photo position-relative rounded-3 overflow-hidden cursor-pointer shadow-2xs border"
                              onClick={() => setActivePhotoIndex(globalIdx >= 0 ? globalIdx : 0)}
                              style={{ width: '90px', height: '90px' }}
                              title="Click to zoom customer outfit look"
                            >
                              <img
                                src={photo}
                                alt={`Customer outfit ${pIdx + 1}`}
                                className="w-100 h-100 object-fit-cover"
                              />
                              <span className="position-absolute bottom-0 end-0 m-1 badge bg-dark bg-opacity-75 text-white p-1" style={{ fontSize: '0.6rem' }}>
                                <FaCamera size={9} />
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Helpful Action Button */}
                    <div className="d-flex align-items-center gap-2 pt-2 border-top">
                      <span className="text-muted small" style={{ fontSize: '0.74rem' }}>
                        Was this review helpful?
                      </span>
                      <button
                        type="button"
                        className={`btn btn-sm rounded-pill py-0 px-3 d-inline-flex align-items-center gap-1 ${
                          isLiked ? 'btn-success text-white' : 'btn-outline-secondary'
                        }`}
                        style={{ fontSize: '0.75rem', height: '26px' }}
                        onClick={() => handleToggleLike(rev.id)}
                      >
                        <FaThumbsUp size={10} />
                        <span>Helpful ({rev.likes || 0})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* =========================================================================
          MODAL 1: WRITE A REVIEW & UPLOAD OUTFIT PHOTOS MODAL
         ========================================================================= */}
      {isWriteModalOpen && (
        <div className="fabric-zoom-modal-backdrop" onClick={() => setIsWriteModalOpen(false)}>
          <div
            className="card border-0 rounded-4 shadow-2xl p-4 bg-white write-review-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '660px', width: '94%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div>
                <h5 className="fw-bold mb-0 text-dark">Write an Outfit Review</h5>
                <span className="text-muted small">Share your styling feedback and outfit photos to guide other shoppers</span>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsWriteModalOpen(false)}
                aria-label="Close"
              />
            </div>

            {/* Product Summary Mini Card */}
            <div className="d-flex align-items-center gap-3 p-2 bg-light rounded-3 mb-3 border">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-2 object-fit-cover"
                style={{ width: '48px', height: '48px' }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-bold text-dark text-truncate" style={{ maxWidth: '280px' }}>
                  {product.name}
                </h6>
                <span className="text-muted small">${product.price.toFixed(2)} &bull; {product.category}</span>
              </div>
              <span className="badge bg-success bg-opacity-15 text-success border border-success border-opacity-25 small">
                Verified Item
              </span>
            </div>

            <form onSubmit={handleSubmitReview}>
              {/* 1. Star Rating Picker */}
              <div className="mb-3 text-center p-3 bg-light rounded-3 border">
                <label className="form-label fw-bold text-dark small d-block mb-1">
                  Your Overall Rating *
                </label>
                <div className="d-flex justify-content-center gap-2 mb-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="btn p-0 border-0 fs-2 text-warning bg-transparent transition-transform"
                      style={{ transform: (hoverRating || formRating) >= star ? 'scale(1.1)' : 'scale(1)' }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      aria-label={`${star} star`}
                    >
                      {(hoverRating || formRating) >= star ? <FaStar /> : <FaRegStar className="opacity-40" />}
                    </button>
                  ))}
                </div>
                <span className="text-muted small fw-semibold" style={{ fontSize: '0.78rem' }}>
                  {RATING_DESCRIPTIONS[hoverRating || formRating]}
                </span>
              </div>

              {/* Sub-ratings: Fabric Quality & Comfort */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2 bg-light rounded-3 border text-center">
                    <label className="form-label small text-muted mb-1 d-block" style={{ fontSize: '0.72rem' }}>
                      Fabric Quality ({formQualityRating}/5)
                    </label>
                    <div className="d-flex justify-content-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="btn p-0 border-0 text-warning bg-transparent"
                          onClick={() => setFormQualityRating(s)}
                        >
                          {formQualityRating >= s ? <FaStar size={14} /> : <FaRegStar size={14} className="opacity-40" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-2 bg-light rounded-3 border text-center">
                    <label className="form-label small text-muted mb-1 d-block" style={{ fontSize: '0.72rem' }}>
                      Comfort & Wearability ({formComfortRating}/5)
                    </label>
                    <div className="d-flex justify-content-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="btn p-0 border-0 text-warning bg-transparent"
                          onClick={() => setFormComfortRating(s)}
                        >
                          {formComfortRating >= s ? <FaStar size={14} /> : <FaRegStar size={14} className="opacity-40" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Reviewer Details Row */}
              <div className="row g-2 mb-3">
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold text-muted">Your Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Jessica M."
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label small fw-semibold text-muted">City / Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. New York, NY"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                  />
                </div>
              </div>

              {/* 3. Purchased Size, Color & Fit Feedback */}
              <div className="row g-2 mb-3">
                <div className="col-4">
                  <label className="form-label small fw-semibold text-muted">Size Worn</label>
                  <select
                    className="form-select form-select-sm"
                    value={formSize}
                    onChange={(e) => setFormSize(e.target.value)}
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label small fw-semibold text-muted">Color</label>
                  <select
                    className="form-select form-select-sm"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                  >
                    {product.colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label small fw-semibold text-muted">Fit Impression</label>
                  <select
                    className="form-select form-select-sm"
                    value={formFit}
                    onChange={(e) => setFormFit(e.target.value as any)}
                  >
                    <option value="Runs Small">Runs Small</option>
                    <option value="True to Size">True to Size</option>
                    <option value="Runs Large">Runs Large</option>
                  </select>
                </div>
              </div>

              {/* 4. Style Tags Picker */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted d-block mb-1">
                  Outfit Style Tags (Optional)
                </label>
                <div className="d-flex flex-wrap gap-1">
                  {POPULAR_STYLE_TAGS.map((tag) => {
                    const isSelected = formTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`btn btn-xs rounded-pill px-2 py-1 ${
                          isSelected ? 'btn-dark' : 'btn-outline-secondary'
                        }`}
                        style={{ fontSize: '0.7rem' }}
                        onClick={() => toggleStyleTag(tag)}
                      >
                        {tag} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Review Headline & Comment */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Review Headline</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Summarize your experience (e.g. Perfect for summer weddings!)"
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Your Review *</label>
                <textarea
                  className="form-control form-control-sm"
                  rows={3}
                  placeholder="How was the fit, fabric feel, and styling versatility? Share details that help other shoppers..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  required
                />
              </div>

              {/* 6. Outfit Photo Upload Dropzone */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-dark d-flex justify-content-between align-items-center mb-1">
                  <span>
                    <FaCamera className="me-1 text-warning" />
                    Upload Your Outfit Photos
                  </span>
                  <span className="text-muted fw-normal small">JPG, PNG, WebP supported</span>
                </label>

                {/* Dropzone Trigger */}
                <div
                  className="p-3 border border-2 border-dashed rounded-3 text-center bg-light cursor-pointer outfit-upload-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaUpload size={22} className="text-muted mb-2 opacity-75" />
                  <p className="small text-dark fw-semibold mb-0">
                    Click to select outfit photos from your device
                  </p>
                  <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                    Show others how you styled this look!
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="d-none"
                    onChange={handlePhotoUpload}
                  />
                </div>

                {/* Quick Sample Presets (Optional shortcuts) */}
                <div className="mt-2">
                  <span className="text-muted small d-block mb-1" style={{ fontSize: '0.72rem' }}>
                    Or try a 1-click test outfit preset:
                  </span>
                  <div className="d-flex flex-wrap gap-1">
                    {SAMPLE_PHOTO_PRESETS.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        className="btn btn-xs btn-outline-secondary rounded-pill py-0 px-2"
                        style={{ fontSize: '0.7rem' }}
                        onClick={() => handleAddPresetPhoto(preset.url, preset.tag)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Uploaded Photo Previews */}
                {uploadedPhotos.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-3 p-2 bg-white rounded-3 border">
                    {uploadedPhotos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        className="position-relative rounded-2 overflow-hidden border shadow-2xs"
                        style={{ width: '70px', height: '70px' }}
                      >
                        <img src={photo} alt="Uploaded outfit preview" className="w-100 h-100 object-fit-cover" />
                        <button
                          type="button"
                          className="btn btn-danger btn-xs position-absolute top-0 end-0 m-1 p-0 rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '18px', height: '18px' }}
                          onClick={() => handleRemoveUploadedPhoto(pIdx)}
                          title="Remove photo"
                        >
                          <FaTimes size={9} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm px-3 rounded-pill"
                  onClick={() => setIsWriteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-fashion-primary btn-sm px-4 rounded-pill fw-bold"
                  disabled={!formName.trim() || !formComment.trim()}
                >
                  Publish Review & Outfit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: EXPANDED CUSTOMER OUTFIT PHOTO LIGHTBOX WITH PREV/NEXT ARROWS
         ========================================================================= */}
      {activeLightboxItem && (
        <div className="fabric-zoom-modal-backdrop" onClick={() => setActivePhotoIndex(null)}>
          <div
            className="card border-0 rounded-4 shadow-2xl overflow-hidden bg-white customer-photo-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '900px', width: '95%', maxHeight: '92vh' }}
          >
            <div className="row g-0">
              {/* Photo Display Left */}
              <div
                className="col-md-7 bg-black d-flex align-items-center justify-content-center position-relative"
                style={{ minHeight: '400px' }}
              >
                <img
                  src={activeLightboxItem.photo}
                  alt={`Outfit look by ${activeLightboxItem.review.name}`}
                  className="w-100 h-100 object-fit-contain"
                  style={{ maxHeight: '580px' }}
                />

                {/* Prev/Next Navigation Controls inside Lightbox */}
                {allCustomerPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="btn btn-dark bg-opacity-75 text-white position-absolute start-0 top-50 translate-middle-y ms-2 rounded-circle d-flex align-items-center justify-content-center shadow"
                      style={{ width: '38px', height: '38px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevLightboxPhoto();
                      }}
                      aria-label="Previous outfit photo"
                      title="Previous Outfit (Left Arrow)"
                    >
                      <FaChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark bg-opacity-75 text-white position-absolute end-0 top-50 translate-middle-y me-2 rounded-circle d-flex align-items-center justify-content-center shadow"
                      style={{ width: '38px', height: '38px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextLightboxPhoto();
                      }}
                      aria-label="Next outfit photo"
                      title="Next Outfit (Right Arrow)"
                    >
                      <FaChevronRight size={14} />
                    </button>
                  </>
                )}

                {/* Photo Counter Badge */}
                <div className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white small">
                  Photo {activePhotoIndex! + 1} of {allCustomerPhotos.length}
                </div>
              </div>

              {/* Review Context Right */}
              <div className="col-md-5 p-4 d-flex flex-column justify-content-between bg-white">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-2">
                      {activeLightboxItem.review.avatar ? (
                        <img
                          src={activeLightboxItem.review.avatar}
                          alt={activeLightboxItem.review.name}
                          className="rounded-circle object-fit-cover shadow-2xs"
                          style={{ width: '42px', height: '42px' }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
                          style={{ width: '42px', height: '42px', fontSize: '0.85rem' }}
                        >
                          {activeLightboxItem.review.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">{activeLightboxItem.review.name}</h6>
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                          {activeLightboxItem.review.city || 'Verified Buyer'} &bull; {activeLightboxItem.review.date}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setActivePhotoIndex(null)}
                      aria-label="Close"
                    />
                  </div>

                  <div className="rating-stars text-warning small mb-2">
                    {renderStars(activeLightboxItem.review.rating)}
                  </div>

                  {activeLightboxItem.review.headline && (
                    <h6 className="fw-bold text-dark mb-2">{activeLightboxItem.review.headline}</h6>
                  )}

                  <p className="text-muted small mb-3" style={{ lineHeight: '1.5' }}>
                    "{activeLightboxItem.review.comment}"
                  </p>

                  {/* Customer Specs Box */}
                  <div className="p-3 bg-light rounded-3 border small mb-3">
                    <div className="text-muted small mb-1" style={{ fontSize: '0.7rem' }}>Customer Styling Specs:</div>
                    <div className="fw-semibold text-dark mb-1">
                      Size: {activeLightboxItem.review.selectedSize || 'Standard'} &bull; Color: {activeLightboxItem.review.selectedColor || 'Classic'}
                    </div>
                    {activeLightboxItem.review.fitFeedback && (
                      <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-25 small">
                        Fit: {activeLightboxItem.review.fitFeedback}
                      </span>
                    )}
                  </div>

                  {/* Style Tags if available */}
                  {activeLightboxItem.review.styleTags && activeLightboxItem.review.styleTags.length > 0 && (
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {activeLightboxItem.review.styleTags.map((tag, tIdx) => (
                        <span key={tIdx} className="badge bg-light text-muted border small" style={{ fontSize: '0.68rem' }}>
                          <FaTag size={8} className="me-1 opacity-75" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 ${
                      likedReviewIds.includes(activeLightboxItem.review.id)
                        ? 'btn-success text-white'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => handleToggleLike(activeLightboxItem.review.id)}
                  >
                    <FaThumbsUp size={11} />
                    <span>Helpful ({activeLightboxItem.review.likes || 0})</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-fashion-primary btn-sm rounded-pill px-3"
                    onClick={() => setActivePhotoIndex(null)}
                  >
                    Close Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviews;
