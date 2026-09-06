import React, { useState } from 'react';
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
  FaCheck
} from 'react-icons/fa';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
    }, 2500);
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

        <div className="row g-5">
          {/* Product Image Column */}
          <div className="col-lg-6">
            <div className="card border-0 rounded-4 overflow-hidden shadow-sm bg-light">
              <img
                src={product.image}
                alt={product.name}
                className="w-100 object-fit-cover"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="col-lg-6">
            <div className="ps-lg-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-secondary text-white text-uppercase" style={{ letterSpacing: '1px' }}>
                  {product.category}
                </span>
                {product.badge && <span className="badge bg-dark text-white">{product.badge}</span>}
                {(product.stock > 0 || product.inStock) ? (
                  <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="badge bg-danger bg-opacity-10 text-danger">Sold Out</span>
                )}
              </div>

              <h1 className="h2 fw-bold text-dark mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="rating-stars">{renderStars(product.rating)}</div>
                <span className="fw-semibold text-dark small">{product.rating}</span>
                <span className="text-muted small">
                  ({product.reviews ?? product.reviewCount ?? 0} verified reviews)
                </span>
              </div>

              {/* Price */}
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

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-muted d-block mb-2">
                    Color: <span className="text-dark fw-semibold">{selectedColor}</span>
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`btn btn-sm ${
                          selectedColor === color ? 'btn-fashion-primary' : 'btn-outline-secondary'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fw-bold small text-uppercase text-muted mb-0">
                      Size: <span className="text-dark fw-semibold">{selectedSize}</span>
                    </label>
                    <span className="small text-muted text-decoration-underline cursor-pointer">
                      Size Guide
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`btn btn-sm px-3 ${
                          selectedSize === size ? 'btn-fashion-primary' : 'btn-outline-secondary'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTA */}
              <div className="row g-3 align-items-center mb-4 pt-2">
                <div className="col-auto">
                  <div className="input-group" style={{ width: '130px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center bg-white"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-fashion-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingBag />
                    <span>Add to Shopping Bag</span>
                  </button>
                </div>
              </div>

              {/* Perks Highlights */}
              <div className="p-3 bg-light rounded-3 border">
                <div className="d-flex flex-column gap-2 small text-muted">
                  <div className="d-flex align-items-center gap-2">
                    <FaTruck className="text-warning" />
                    <span>Free express shipping on orders over $150</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FaUndo className="text-warning" />
                    <span>30-day effortless return and exchange guarantee</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FaShieldAlt className="text-warning" />
                    <span>Authenticity and sustainable fabrics certified</span>
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
            <div className="row g-4">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="col-12 col-sm-6 col-md-3">
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
export default ProductDetails;
