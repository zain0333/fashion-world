import React, { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaShoppingBag,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaRegHeart,
  FaHeart,
  FaSun,
  FaMoon,
  FaRobot
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { totalQuantity } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [wishlistCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('fashion_world_wishlist');
      return saved ? JSON.parse(saved).length : 2;
    } catch {
      return 2;
    }
  });
  const [showWishlistToast, setShowWishlistToast] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsNavCollapsed(true);
    }
  };

  const focusSearchInput = () => {
    setIsNavCollapsed(false);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 150);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWishlistToast(true);
    setTimeout(() => {
      setShowWishlistToast(false);
    }, 2500);
  };

  const handleLinkClick = () => {
    setIsNavCollapsed(true);
  };

  return (
    <header className="sticky-top bg-white" style={{ zIndex: 1030 }}>
      {/* Top Announcement Bar */}
      <div className="announcement-bar text-center">
        <div className="container d-flex justify-content-center align-items-center">
          <span>
            ✨ Complimentary Express Shipping on orders over $150 &bull; Use code <strong>FW2026</strong>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-fashion" aria-label="Main Navigation">
        <div className="container">
          {/* Brand Name Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center me-3 me-xl-4"
            onClick={handleLinkClick}
            aria-label="Fashion World Homepage"
          >
            <span className="navbar-brand-text">
              FASHION<span>WORLD</span>
            </span>
          </Link>

          {/* Action Icons for Mobile (Theme, Search, Wishlist, Cart) before Hamburger */}
          <div className="d-flex align-items-center gap-1 d-lg-none ms-auto me-2">
            <button
              type="button"
              className="nav-icon-btn"
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <FaSun size={16} className="text-warning" /> : <FaMoon size={15} />}
            </button>

            {/* AI Stylist Mobile Button */}
            <button
              type="button"
              className="nav-icon-btn nav-ai-icon-mobile"
              onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist'))}
              title="Open AI Fashion Stylist"
              aria-label="Open AI Fashion Stylist"
            >
              <FaRobot size={16} className="text-warning" />
            </button>

            <button
              type="button"
              className="nav-icon-btn"
              onClick={focusSearchInput}
              aria-label="Toggle Search"
            >
              <FaSearch size={16} />
            </button>

            <button
              type="button"
              className="nav-icon-btn"
              onClick={handleWishlistClick}
              aria-label="View Wishlist"
            >
              <FaRegHeart size={16} />
              {wishlistCount > 0 && (
                <span className="nav-action-badge">{wishlistCount}</span>
              )}
            </button>

            <Link
              to="/cart"
              className="nav-icon-btn"
              onClick={handleLinkClick}
              aria-label="Shopping Cart"
            >
              <FaShoppingBag size={16} />
              {totalQuantity > 0 && (
                <span className="nav-action-badge nav-action-badge-cart">{totalQuantity}</span>
              )}
            </Link>
          </div>

          {/* Bootstrap Hamburger Toggle Button */}
          <button
            className="navbar-toggler border-0 p-2 shadow-none"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            aria-controls="fashionNavbarCollapse"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation menu"
          >
            {isNavCollapsed ? (
              <FaBars size={22} color="#111827" />
            ) : (
              <FaTimes size={22} color="#111827" />
            )}
          </button>

          {/* Collapsible Menu */}
          <div
            className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}
            id="fashionNavbarCollapse"
          >
            {/* Nav Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1 gap-xl-2 align-items-lg-center">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                  }
                  onClick={handleLinkClick}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                  }
                  end
                  onClick={handleLinkClick}
                >
                  Shop
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products?category=Men"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${
                      isActive && window.location.search.includes('Men') ? 'active' : ''
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Men
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products?category=Women"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${
                      isActive && window.location.search.includes('Women') ? 'active' : ''
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Women
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products?category=Shoes"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${
                      isActive && window.location.search.includes('Shoes') ? 'active' : ''
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Shoes
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products?category=Accessories"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${
                      isActive && window.location.search.includes('Accessories') ? 'active' : ''
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  Accessories
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                  }
                  onClick={handleLinkClick}
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                  }
                  onClick={handleLinkClick}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* Desktop Action Icons & Login Button */}
            <div className="d-flex align-items-center gap-2 pt-3 pt-lg-0 border-top border-lg-0">
              {/* Desktop Search */}
              <div className="d-none d-lg-block navbar-search-wrapper">
                <form onSubmit={handleSearchSubmit}>
                  <FaSearch className="navbar-search-icon-pos" size={13} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="navbar-search-input"
                    placeholder="Search styles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search clothing and accessories"
                  />
                </form>
              </div>

              {/* AI Stylist Desktop Button */}
              <button
                type="button"
                className="btn btn-outline-dark btn-sm rounded-pill d-none d-lg-inline-flex align-items-center gap-1 nav-ai-stylist-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('open-ai-stylist'))}
                title="Ask AI Stylist for Outfit Advice"
              >
                <FaRobot size={14} className="text-warning" />
                <span className="fw-semibold" style={{ fontSize: '0.78rem' }}>AI Stylist</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                className="nav-icon-btn d-none d-lg-inline-flex"
                onClick={toggleTheme}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <FaSun size={17} className="text-warning" />
                ) : (
                  <FaMoon size={16} />
                )}
              </button>

              {/* Wishlist Icon Button */}
              <button
                type="button"
                className="nav-icon-btn d-none d-lg-inline-flex"
                onClick={handleWishlistClick}
                title="Your Wishlist"
                aria-label="Wishlist"
              >
                <FaRegHeart size={18} />
                {wishlistCount > 0 && (
                  <span className="nav-action-badge">{wishlistCount}</span>
                )}
              </button>

              {/* Shopping Cart Icon Button */}
              <Link
                to="/cart"
                className="nav-icon-btn d-none d-lg-inline-flex"
                onClick={handleLinkClick}
                title="View Shopping Bag"
                aria-label="Shopping Cart"
              >
                <FaShoppingBag size={18} />
                {totalQuantity > 0 && (
                  <span className="nav-action-badge nav-action-badge-cart">{totalQuantity}</span>
                )}
              </Link>

              {/* Login Button */}
              <Link
                to="/login"
                className="btn btn-fashion-primary btn-sm ms-lg-2 w-100 w-lg-auto d-inline-flex align-items-center justify-content-center gap-2 shadow-sm"
                onClick={handleLinkClick}
              >
                <FaUser size={13} />
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile Search Bar inside expanded drawer */}
            <div className="d-lg-none mt-3 pt-3 border-top">
              <form onSubmit={handleSearchSubmit}>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaSearch size={13} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0"
                    placeholder="Search styles, apparel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-fashion-primary btn-sm" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Wishlist Interactive Toast Alert */}
      {showWishlistToast && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-4 p-3 z-3"
          style={{ maxWidth: '380px', width: '90%' }}
        >
          <div className="alert alert-dark shadow-lg d-flex align-items-center justify-content-between mb-0 border-0 rounded-3 text-white">
            <div className="d-flex align-items-center gap-2">
              <FaHeart className="text-danger" size={16} />
              <span className="small fw-semibold">
                You have {wishlistCount} items saved in your Wishlist!
              </span>
            </div>
            <Link
              to="/products"
              className="btn btn-sm btn-outline-light py-0 px-2 small"
              onClick={() => setShowWishlistToast(false)}
            >
              Browse
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
