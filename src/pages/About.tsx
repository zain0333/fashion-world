import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRecycle, FaGem, FaUsers } from 'react-icons/fa';

export const About: React.FC = () => {
  return (
    <div className="about-page py-4">
      <div className="container">
        {/* Hero Banner */}
        <div className="bg-light p-5 rounded-4 mb-5 text-center border">
          <span className="section-subtitle">Our Heritage</span>
          <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            Elevating Modern Fashion With Purpose
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '750px', fontSize: '1.05rem' }}>
            Founded on the philosophy that true luxury is defined by craftsmanship, sustainable materials, and timeless elegance, Fashion World creates clothing meant to be cherished for years.
          </p>
        </div>

        {/* Story Section */}
        <div className="row g-5 align-items-center mb-5 pb-4">
          <div className="col-lg-6">
            <span className="section-subtitle text-start d-block">Who We Are</span>
            <h2 className="section-title text-start mb-3">Designed For Everyday Expression</h2>
            <p className="text-muted mb-3">
              Fashion World started with a singular vision: to bridge the gap between runway-quality tailoring and accessible contemporary wardrobes. We believe what you wear is an extension of your confidence and personality.
            </p>
            <p className="text-muted mb-4">
              From our studio in Milan and New York, our designers work with master weavers and ethical ateliers worldwide. We test every stitch, button, and hemline to ensure unmatched fit and comfort.
            </p>
            <Link to="/products" className="btn btn-fashion-primary">
              Discover Our Creations
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 rounded-4 overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Fashion World Studio Atelier"
                className="img-fluid w-100"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="my-5 py-4">
          <div className="section-title-wrap">
            <span className="section-subtitle">Core Pillars</span>
            <h2 className="section-title">The Values That Guide Us</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border h-100 p-4 rounded-3 text-center shadow-sm">
                <div className="text-warning fs-2 mb-3">
                  <FaGem />
                </div>
                <h5 className="fw-bold mb-2">Uncompromising Quality</h5>
                <p className="text-muted small mb-0">
                  Premium organic cottons, pure cashmere, and full-grain leathers built to withstand time.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border h-100 p-4 rounded-3 text-center shadow-sm">
                <div className="text-warning fs-2 mb-3">
                  <FaRecycle />
                </div>
                <h5 className="fw-bold mb-2">Eco-Conscious</h5>
                <p className="text-muted small mb-0">
                  Zero plastic packaging, recycled fibers, and carbon-neutral distribution programs.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border h-100 p-4 rounded-3 text-center shadow-sm">
                <div className="text-warning fs-2 mb-3">
                  <FaUsers />
                </div>
                <h5 className="fw-bold mb-2">Ethical Ateliers</h5>
                <p className="text-muted small mb-0">
                  Fair living wages and safe working environments across all partner manufacturing facilities.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border h-100 p-4 rounded-3 text-center shadow-sm">
                <div className="text-warning fs-2 mb-3">
                  <FaHeart />
                </div>
                <h5 className="fw-bold mb-2">Customer First</h5>
                <p className="text-muted small mb-0">
                  Personal concierge styling, effortless returns, and lifetime tailoring support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Numbers / Stats */}
        <div className="bg-dark text-white rounded-4 p-5 my-5 text-center">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-warning mb-1" style={{ fontFamily: 'var(--font-serif)' }}>2018</h2>
              <p className="text-muted small mb-0">Year Established</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-warning mb-1" style={{ fontFamily: 'var(--font-serif)' }}>50K+</h2>
              <p className="text-muted small mb-0">Loyal Customers</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-warning mb-1" style={{ fontFamily: 'var(--font-serif)' }}>12+</h2>
              <p className="text-muted small mb-0">Global Boutiques</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold text-warning mb-1" style={{ fontFamily: 'var(--font-serif)' }}>99%</h2>
              <p className="text-muted small mb-0">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
