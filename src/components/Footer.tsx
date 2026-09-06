import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaUndo
} from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-fashion pt-5 pb-4 mt-auto">
      <div className="container">
        {/* Brand Promise / Features Strip */}
        <div className="row g-4 pb-5 mb-4 border-bottom border-secondary border-opacity-25 text-white">
          <div className="col-12 col-md-4 d-flex align-items-center gap-3">
            <div className="p-3 bg-dark rounded-circle text-warning fs-4">
              <FaTruck />
            </div>
            <div>
              <h6 className="mb-1 text-white fw-bold">Complimentary Shipping</h6>
              <p className="mb-0 text-muted small">On all orders over $150 across the country.</p>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center gap-3">
            <div className="p-3 bg-dark rounded-circle text-warning fs-4">
              <FaUndo />
            </div>
            <div>
              <h6 className="mb-1 text-white fw-bold">Hassle-Free Returns</h6>
              <p className="mb-0 text-muted small">30-day effortless return and exchange policy.</p>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center gap-3">
            <div className="p-3 bg-dark rounded-circle text-warning fs-4">
              <FaShieldAlt />
            </div>
            <div>
              <h6 className="mb-1 text-white fw-bold">Secure Checkout</h6>
              <p className="mb-0 text-muted small">100% encrypted and protected payment channels.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="row g-4 py-2">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h4 className="navbar-brand-text text-white mb-3">
              FASHION<span className="text-warning">WORLD</span>
            </h4>
            <p className="text-muted small pe-lg-4 mb-4">
              Curating elevated modern apparel, timeless wardrobe essentials, and statement luxury pieces designed to empower individual expression.
            </p>
            <div className="d-flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Pinterest">
                <FaPinterestP size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/about" className="footer-link">Our Story</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading">Collections</h6>
            <ul className="list-unstyled mb-0">
              <li><Link to="/products?category=Women" className="footer-link">Women's Edit</Link></li>
              <li><Link to="/products?category=Men" className="footer-link">Men's Apparel</Link></li>
              <li><Link to="/products?category=Outerwear" className="footer-link">Outerwear</Link></li>
              <li><Link to="/products?category=Shoes" className="footer-link">Footwear</Link></li>
              <li><Link to="/products?category=Accessories" className="footer-link">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Join The Circle</h6>
            <p className="text-muted small mb-3">
              Subscribe to receive early access to private seasonal drops, curated edits, and exclusive insider offers.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Fashion World!'); }} className="mb-4">
              <div className="input-group">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="form-control form-control-sm bg-dark text-white border-secondary"
                  style={{ borderRadius: '6px 0 0 6px' }}
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-warning fw-semibold px-3"
                  style={{ borderRadius: '0 6px 6px 0' }}
                >
                  Join
                </button>
              </div>
            </form>
            <div className="text-muted small d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-warning" />
                <span>540 Madison Ave, New York, NY 10022</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-warning" />
                <span>+1 (800) 456-7890</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-warning" />
                <span>concierge@fashionworld.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-top border-secondary border-opacity-25 mt-4 pt-3 d-flex flex-column flex-sm-row justify-content-between align-items-center text-muted small">
          <p className="mb-1 mb-sm-0">
            &copy; {new Date().getFullYear()} Fashion World Inc. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <span className="cursor-pointer hover-white">Privacy Policy</span>
            <span className="cursor-pointer hover-white">Terms of Service</span>
            <span className="cursor-pointer hover-white">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
