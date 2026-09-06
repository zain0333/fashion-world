import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaShieldAlt, FaTruck, FaClock } from 'react-icons/fa';

export const Hero: React.FC = () => {
  return (
    <section className="hero-luxury-banner my-3 shadow-lg position-relative">
      {/* Background Photography Overlay */}
      <div
        className="hero-bg-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85')`
        }}
      />
      <div className="hero-gradient-mask" />

      {/* Main Content Container */}
      <div className="container position-relative z-2 py-5 px-4 px-md-5">
        <div className="row align-items-center min-vh-50 py-lg-4">
          <div className="col-lg-7 text-center text-lg-start">
            {/* Tag Badge */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-20 animate-fade-in-up">
              <FaStar className="text-warning" size={12} />
              <span
                className="text-white text-uppercase fw-semibold"
                style={{ letterSpacing: '2px', fontSize: '0.75rem' }}
              >
                New Season Collection 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="display-3 fw-bold text-white mb-3 animate-fade-in-up-delay-1"
              style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.5px' }}
            >
              Define Your Style
            </h1>

            {/* Subheading */}
            <p className="lead text-light opacity-90 mb-4 fs-6 pe-lg-4 animate-fade-in-up-delay-2" style={{ maxWidth: '580px' }}>
              Discover an exclusive curation of contemporary silhouettes, luxury tailoring, and seasonal wardrobe essentials crafted with sustainable fabrics for the modern lifestyle.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start animate-fade-in-up-delay-3">
              <Link to="/products" className="btn btn-fashion-accent px-4 py-3 shadow-lg fs-6">
                <span>Shop Now</span>
                <FaArrowRight size={14} />
              </Link>
              <Link
                to="/products?category=Women"
                className="btn btn-outline-light px-4 py-3 fs-6"
                style={{ borderRadius: '6px' }}
              >
                <span>Explore Trends</span>
              </Link>
            </div>

            {/* Mini Trust Highlights Strip */}
            <div className="row g-3 mt-4 pt-4 border-top border-white border-opacity-15 text-start animate-fade-in-up-delay-3 d-none d-sm-flex">
              <div className="col-4 d-flex align-items-center gap-2">
                <FaTruck className="text-warning fs-5" />
                <div>
                  <h6 className="text-white mb-0 small fw-bold">Free Shipping</h6>
                  <span className="text-white-50 small" style={{ fontSize: '0.72rem' }}>Orders $150+</span>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center gap-2">
                <FaShieldAlt className="text-warning fs-5" />
                <div>
                  <h6 className="text-white mb-0 small fw-bold">Authentic</h6>
                  <span className="text-white-50 small" style={{ fontSize: '0.72rem' }}>100% Certified</span>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center gap-2">
                <FaClock className="text-warning fs-5" />
                <div>
                  <h6 className="text-white mb-0 small fw-bold">Fast Support</h6>
                  <span className="text-white-50 small" style={{ fontSize: '0.72rem' }}>24/7 Concierge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Visual Card */}
          <div className="col-lg-5 d-none d-lg-block text-center position-relative">
            <div className="position-relative d-inline-block">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80"
                alt="Haute Couture Fashion"
                className="rounded-4 shadow-lg border border-white border-opacity-25 img-fluid animate-float"
                style={{ width: '360px', height: '440px', objectFit: 'cover' }}
              />

              {/* Floating Sale Tag */}
              <div
                className="position-absolute bg-white text-dark p-3 rounded-3 shadow-lg border text-start"
                style={{ bottom: '-15px', left: '-25px', width: '210px' }}
              >
                <span className="badge bg-danger text-uppercase px-2 py-1 mb-1" style={{ fontSize: '0.68rem' }}>
                  Hot Trending
                </span>
                <p className="fw-bold mb-0 text-truncate small">Silk Trench & Dresses</p>
                <div className="d-flex align-items-center gap-1 text-warning small mt-1">
                  <FaStar size={11} />
                  <FaStar size={11} />
                  <FaStar size={11} />
                  <FaStar size={11} />
                  <FaStar size={11} />
                  <span className="text-muted ms-1" style={{ fontSize: '0.7rem' }}>(4.9)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
