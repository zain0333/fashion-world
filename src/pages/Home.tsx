import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaGem,
  FaLeaf,
  FaTruck,
  FaUndo,
  FaStar,
  FaBolt,
  FaQuoteLeft,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaRobot
} from 'react-icons/fa';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { PRODUCTS, CATEGORIES, REVIEWS } from '../data/products';

export const Home: React.FC = () => {
  // Filter products for each specific section
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const flashSaleProducts = PRODUCTS.filter((p) => p.isFlashSale);

  // Filter 4 core categories: Men, Women, Shoes, Accessories
  const targetCategories = CATEGORIES.filter((c) =>
    ['Men', 'Women', 'Shoes', 'Accessories'].includes(c.name)
  );

  // Interactive Live Countdown Timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="home-page pb-5">
      <div className="container">
        {/* ===================================================================
            SECTION 1 & 2: Hero Banner & Shop Now Button
           =================================================================== */}
        <Hero />

        {/* ===================================================================
            SECTION 3: Shop by Category (Men, Women, Shoes, Accessories)
           =================================================================== */}
        <section className="my-5 py-3">
          <div className="section-title-wrap">
            <span className="section-subtitle">Department Curation</span>
            <h2 className="section-title">Shop By Category</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: '550px' }}>
              Explore signature designs, tailored outerwear, and sculpted footwear across our core collections.
            </p>
          </div>

          <div className="row g-2 g-md-4">
            {targetCategories.map((category) => (
              <div key={category.id} className="col-6 col-lg-3">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: Featured Products
           =================================================================== */}
        <section className="my-5 py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="section-subtitle d-block text-start">Curated Highlights</span>
              <h2 className="section-title text-start mb-0">Featured Products</h2>
            </div>
            <Link
              to="/products"
              className="btn btn-fashion-outline mt-3 mt-md-0 align-self-start align-self-md-auto"
            >
              <span>View All Collection</span>
              <FaArrowRight size={13} />
            </Link>
          </div>

          <div className="row g-2 g-md-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: New Arrivals
           =================================================================== */}
        <section className="my-5 py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="section-subtitle d-block text-start">Fresh Runway Drops</span>
              <h2 className="section-title text-start mb-0">New Arrivals</h2>
            </div>
            <Link
              to="/products"
              className="btn btn-fashion-outline mt-3 mt-md-0 align-self-start align-self-md-auto"
            >
              <span>Explore New In</span>
              <FaArrowRight size={13} />
            </Link>
          </div>

          <div className="row g-2 g-md-4">
            {newArrivals.slice(0, 4).map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: Flash Sale (Countdown Timer + Special Discounts)
           =================================================================== */}
        <section className="my-5 py-4">
          <div className="flash-sale-card p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-6 text-center text-lg-start">
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-danger bg-opacity-25 border border-danger border-opacity-50 text-warning small fw-bold">
                  <FaBolt />
                  <span>LIMITED TIME PROMOTION</span>
                </div>

                <h2 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  Flash Sale &mdash; Up To 40% Off
                </h2>

                <p className="lead text-light opacity-75 mb-4 fs-6 pe-lg-4">
                  Enjoy exclusive seasonal reductions on luxury coats, handcrafted footwear, and statement evening dresses. Offer expires when the timer runs out!
                </p>

                {/* Countdown Timer Boxes */}
                <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
                  <div className="countdown-box">
                    <div className="countdown-number">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="countdown-label">Hours</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="countdown-label">Mins</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="countdown-label">Secs</div>
                  </div>
                </div>

                <Link to="/products" className="btn btn-warning fw-bold px-4 py-3 shadow-lg">
                  <span>Shop Flash Sale Now</span>
                  <FaArrowRight className="ms-2" size={13} />
                </Link>
              </div>

              {/* Flash Sale Product Previews */}
              <div className="col-lg-6">
                <div className="row g-3">
                  {flashSaleProducts.slice(0, 2).map((product) => (
                    <div key={product.id} className="col-sm-6">
                      <div className="card border-0 rounded-4 overflow-hidden shadow bg-white">
                        <div className="position-relative" style={{ height: '220px' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-100 h-100 object-fit-cover"
                          />
                          <span className="position-absolute top-0 start-0 m-2 badge bg-danger fw-bold">
                            {product.discountPercent ? `-${product.discountPercent}% OFF` : 'FLASH SALE'}
                          </span>
                        </div>
                        <div className="p-3">
                          <h6 className="fw-bold mb-1 text-truncate text-dark">{product.name}</h6>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-dark fs-5">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-muted text-decoration-line-through small">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6.5: AI Fashion Assistant Interactive Spotlight Banner
           =================================================================== */}
        <section className="my-5">
          <div className="card border-0 rounded-4 overflow-hidden text-white shadow-lg position-relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2a1f14 100%)' }}>
            <div className="p-4 p-md-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-7">
                  <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 mb-3 small fw-bold">
                    <FaRobot size={14} />
                    <span>Meet Your AI Fashion Stylist 🤖</span>
                  </div>
                  <h2 className="display-6 fw-bold mb-3 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    Not Sure What To Wear? Let AI Style Your Entire Look.
                  </h2>
                  <p className="lead text-white-50 mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Ask about upcoming weddings, business meetings, date nights, or color matching. Our intelligent stylist curates head-to-toe coordinated outfits with matching shirts, pants, footwear, and luxury accents.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-fashion-primary px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm rounded-pill fw-bold"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist', { detail: { prompt: 'What should I wear for a wedding?' } }))}
                    >
                      <FaRobot size={14} />
                      <span>Ask: "What to wear for a wedding?"</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-light px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1 small"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist'))}
                    >
                      <span>Explore AI Stylist</span>
                      <FaArrowRight size={11} />
                    </button>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="bg-white bg-opacity-10 backdrop-blur rounded-4 p-4 border border-white border-opacity-15 shadow-sm">
                    <span className="text-warning small fw-bold text-uppercase d-block mb-2">⚡ Popular Styling Inquiries</span>
                    <div className="d-flex flex-column gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-dark text-start border border-secondary text-white py-2 px-3 rounded-3 d-flex justify-content-between align-items-center"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist', { detail: { prompt: 'What should I wear for a wedding?' } }))}
                      >
                        <span>💍 "What should I wear for a wedding?"</span>
                        <FaArrowRight size={10} className="text-warning" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-dark text-start border border-secondary text-white py-2 px-3 rounded-3 d-flex justify-content-between align-items-center"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist', { detail: { prompt: 'Recommend a smart business casual look' } }))}
                      >
                        <span>💼 "Recommend a smart business casual look"</span>
                        <FaArrowRight size={10} className="text-warning" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-dark text-start border border-secondary text-white py-2 px-3 rounded-3 d-flex justify-content-between align-items-center"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist', { detail: { prompt: 'What pants and shoes match the Classic Men’s Jacket?' } }))}
                      >
                        <span>🧥 "What shoes and pants match the jacket?"</span>
                        <FaArrowRight size={10} className="text-warning" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: Why Choose Fashion World
           =================================================================== */}
        <section className="my-5 py-4">
          <div className="section-title-wrap">
            <span className="section-subtitle">Our Guarantee</span>
            <h2 className="section-title">Why Choose Fashion World</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: '550px' }}>
              We set the gold standard in premium fashion with sustainable fabrics, flawless finishes, and white-glove service.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="feature-value-card">
                <div className="feature-icon-wrapper">
                  <FaGem />
                </div>
                <h5 className="fw-bold text-dark mb-2">Artisan Craftsmanship</h5>
                <p className="text-muted small mb-0">
                  Tailored by master ateliers utilizing pure silks, organic linens, and durable full-grain leathers.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="feature-value-card">
                <div className="feature-icon-wrapper">
                  <FaLeaf />
                </div>
                <h5 className="fw-bold text-dark mb-2">Sustainable & Ethical</h5>
                <p className="text-muted small mb-0">
                  Committed to 100% eco-friendly dyes, fair-wage workshops, and zero-plastic packaging.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="feature-value-card">
                <div className="feature-icon-wrapper">
                  <FaTruck />
                </div>
                <h5 className="fw-bold text-dark mb-2">Express Shipping</h5>
                <p className="text-muted small mb-0">
                  Complimentary tracked express delivery on all orders over $150 with protective luxury garment bags.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="feature-value-card">
                <div className="feature-icon-wrapper">
                  <FaUndo />
                </div>
                <h5 className="fw-bold text-dark mb-2">30-Day Effortless Returns</h5>
                <p className="text-muted small mb-0">
                  Free pre-paid return labels and immediate replacements if sizing or fit isn't completely perfect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: Customer Reviews
           =================================================================== */}
        <section className="my-5 py-4">
          <div className="section-title-wrap">
            <span className="section-subtitle">Verified Clients</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: '550px' }}>
              Over 50,000 fashion enthusiasts trust Fashion World for their wardrobe investments.
            </p>
          </div>

          <div className="row g-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="col-12 col-md-4">
                <div className="review-card">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-1 text-warning">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>
                    <span className="text-muted opacity-50 fs-4">
                      <FaQuoteLeft />
                    </span>
                  </div>

                  <p className="text-muted small mb-4 flex-grow-1 fst-italic">
                    "{review.comment}"
                  </p>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <h6 className="fw-bold text-dark mb-0">{review.name}</h6>
                        <FaCheckCircle className="text-primary" size={12} title="Verified Purchase" />
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                        {review.role} &bull; {review.city}
                      </p>
                      <span className="badge bg-light text-muted border small mt-1" style={{ fontSize: '0.68rem' }}>
                        Purchased: {review.productName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: Newsletter Subscription
           =================================================================== */}
        <section className="my-5 py-5 rounded-4 bg-light border p-4 p-md-5 text-center">
          <div className="mx-auto" style={{ maxWidth: '650px' }}>
            <div className="d-inline-flex p-3 bg-white rounded-circle text-warning fs-3 mb-3 shadow-sm border">
              <FaEnvelopeOpenText />
            </div>

            <h2 className="display-6 fw-bold text-dark mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Join The Fashion World Circle
            </h2>

            <p className="text-muted mb-4 fs-6">
              Subscribe to unlock <strong>15% off</strong> your inaugural order, early access to private seasonal drops, and insider styling lookbooks.
            </p>

            {isSubscribed ? (
              <div className="alert alert-success d-flex align-items-center justify-content-center gap-2 shadow-sm">
                <FaCheckCircle className="text-success" />
                <span className="fw-semibold">
                  Welcome to the circle! Use code <strong>WELCOME15</strong> at checkout for 15% off.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <div className="row g-2 justify-content-center">
                  <div className="col-12 col-sm-8">
                    <input
                      type="email"
                      required
                      className="form-control form-control-lg bg-white border"
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <button
                      type="submit"
                      className="btn btn-fashion-primary btn-lg w-100 h-100 fs-6"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <small className="text-muted d-block mt-2" style={{ fontSize: '0.75rem' }}>
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime with 1-click.
                </small>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
