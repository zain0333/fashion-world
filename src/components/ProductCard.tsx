import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingBag, FaCheck } from 'react-icons/fa';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Render star ratings helper
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
    <div className="fashion-card">
      <Link to={`/products/${product.id}`} className="text-decoration-none text-reset">
        {/* Card Image Container */}
        <div className="fashion-card-img-wrapper">
          <img src={product.image} alt={product.name} className="fashion-card-img" loading="lazy" />

          {/* Badges */}
          {product.isNew && (
            <span className="card-badge bg-dark text-white">New Drop</span>
          )}
          {product.originalPrice && !product.isNew && (
            <span className="card-badge badge-sale">Sale</span>
          )}
        </div>
      </Link>

      {/* Card Details */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>
            {product.category}
          </span>
          <div className="rating-stars small">
            {renderStars(product.rating)}
            <span className="text-muted ms-1 small">({product.reviewCount})</span>
          </div>
        </div>

        <h5 className="card-title fs-6 fw-bold mb-2">
          <Link to={`/products/${product.id}`} className="text-dark text-decoration-none text-truncate d-block">
            {product.name}
          </Link>
        </h5>

        <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
          <div>
            <span className="fs-5 fw-bold text-dark">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through ms-2 small">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`btn btn-sm ${isAdded ? 'btn-success' : 'btn-fashion-primary'}`}
            onClick={handleAddToCart}
            title="Add to Shopping Bag"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <FaCheck size={12} />
                <span className="d-none d-md-inline ms-1">Added</span>
              </>
            ) : (
              <>
                <FaShoppingBag size={12} />
                <span className="d-none d-md-inline ms-1">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
