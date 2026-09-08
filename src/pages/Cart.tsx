import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaShoppingBag, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartSubtotal,
    shippingFee,
    cartTotal,
    totalQuantity,
  } = useCart();

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="container py-5 my-5 text-center">
        <div className="p-5 bg-light rounded-4 border mx-auto" style={{ maxWidth: '600px' }}>
          <div className="text-muted mb-3" style={{ fontSize: '3rem' }}>
            <FaShoppingBag />
          </div>
          <h2 className="fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Your Bag is Empty
          </h2>
          <p className="text-muted mb-4">
            Looks like you haven't added any luxury pieces to your cart yet. Explore our latest collection.
          </p>
          <Link to="/products" className="btn btn-fashion-primary px-4 py-2">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-4">
      <div className="container">
        {/* Page Title */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h1 className="h3 fw-bold mb-0" style={{ fontFamily: 'var(--font-serif)' }}>
            Shopping Bag ({totalQuantity} items)
          </h1>
          <button
            type="button"
            className="btn btn-sm btn-link text-danger text-decoration-none p-0"
            onClick={clearCart}
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="card border-0 bg-light p-3 rounded-3 mb-4">
          <div className="d-flex justify-content-between small fw-semibold mb-1">
            <span>
              {remainingForFreeShipping > 0
                ? `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping`
                : '🎉 You qualified for Free Standard Shipping!'}
            </span>
            <span>${cartSubtotal.toFixed(2)} / $150.00</span>
          </div>
          <div className="progress" style={{ height: '6px' }}>
            <div
              className={`progress-bar ${remainingForFreeShipping === 0 ? 'bg-success' : 'bg-warning'}`}
              role="progressbar"
              style={{ width: `${progressToFreeShipping}%` }}
              aria-valuenow={progressToFreeShipping}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => {
                const itemImg =
                  (item.product.colorImages && item.color && item.product.colorImages[item.color]?.[0]) ||
                  item.product.image;
                return (
                  <div key={item.id} className="card border rounded-3 p-3 shadow-sm bg-white">
                    <div className="row align-items-center g-3">
                      {/* Item Image */}
                      <div className="col-4 col-sm-3 col-md-2">
                        <img
                          src={itemImg}
                          alt={item.product.name}
                          className="img-fluid rounded-2 object-fit-cover"
                          style={{ height: '90px', width: '100%' }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>

                      {/* Item Info */}
                      <div className="col-8 col-sm-4 col-md-4">
                        <span className="badge bg-light text-muted small mb-1">{item.product.category}</span>
                        <h6 className="fw-bold mb-1">
                          <Link to={`/products/${item.product.id}`} className="text-dark text-decoration-none">
                            {item.product.name}
                          </Link>
                        </h6>
                        <p className="text-muted small mb-0">
                          Size: <span className="text-dark fw-semibold">{item.size}</span> | Color:{' '}
                          <span className="text-dark fw-semibold">{item.color}</span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-6 col-sm-3">
                        <div className="input-group input-group-sm" style={{ maxWidth: '110px' }}>
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center bg-white"
                            value={item.quantity}
                            readOnly
                            aria-label="Item quantity"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="col-6 col-sm-3 text-end">
                        <div className="fw-bold text-dark fs-6 mb-1">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-muted text-decoration-none p-0"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <FaTrash size={12} className="me-1 text-danger opacity-75" />
                          <span className="small text-danger">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Link to="/products" className="text-muted text-decoration-none small fw-semibold">
                &larr; Continue Exploring Products
              </Link>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="col-lg-4">
            <div className="card border rounded-3 p-4 shadow-sm bg-light">
              <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mb-2 small text-muted">
                <span>Items Subtotal</span>
                <span className="text-dark fw-semibold">${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2 small text-muted">
                <span>Shipping Estimate</span>
                <span className="text-dark fw-semibold">
                  {shippingFee === 0 ? <span className="text-success fw-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3 small text-muted">
                <span>Estimated Taxes</span>
                <span className="text-dark fw-semibold">Calculated at checkout</span>
              </div>

              {/* Promo Code Input */}
              <div className="mb-3 pt-2 border-top">
                <label className="form-label small text-muted fw-semibold">Promo Code</label>
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="e.g. FASHION10" />
                  <button className="btn btn-outline-dark" type="button">
                    Apply
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between py-3 border-top border-bottom mb-4">
                <span className="fw-bold fs-6">Estimated Total</span>
                <span className="fw-bold fs-5 text-dark">${cartTotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="btn btn-fashion-primary w-100 py-2 mb-3 shadow-sm">
                <span>Proceed to Checkout</span>
                <FaArrowRight size={13} />
              </Link>

              <div className="text-center text-muted small d-flex align-items-center justify-content-center gap-1">
                <FaShieldAlt className="text-success" />
                <span>Encrypted 256-Bit Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
