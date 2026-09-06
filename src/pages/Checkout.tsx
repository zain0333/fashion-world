import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaLock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export const Checkout: React.FC = () => {
  const { cart, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="container py-5 text-center my-5">
        <h3 className="fw-bold mb-3">Your shopping bag is empty</h3>
        <p className="text-muted mb-4">Please add some items to your bag before proceeding to checkout.</p>
        <Link to="/products" className="btn btn-fashion-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNumber(`FW-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="container py-5 my-5 text-center">
        <div className="p-5 bg-light rounded-4 border mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
          <div className="text-success mb-3" style={{ fontSize: '3.5rem' }}>
            <FaCheckCircle />
          </div>
          <h2 className="fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Thank You For Your Order!
          </h2>
          <p className="text-muted mb-4">
            Your order <strong>#{orderNumber}</strong> has been placed successfully. A confirmation email has been sent to <strong>{formData.email || 'your email'}</strong>.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-fashion-primary">
              Return to Home
            </Link>
            <Link to="/products" className="btn btn-fashion-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page py-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/cart" className="text-muted text-decoration-none">Bag</Link></li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">Checkout</li>
          </ol>
        </nav>

        <h1 className="h3 fw-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Secure Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Customer & Shipping Form */}
            <div className="col-lg-7">
              <div className="card border rounded-3 p-4 shadow-sm bg-white mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">1. Contact & Delivery Address</h5>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      required
                      placeholder="House number and street name"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-5">
                    <label className="form-label small fw-semibold">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label small fw-semibold">State / Region *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-3">
                    <label className="form-label small fw-semibold">Postal Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="card border rounded-3 p-4 shadow-sm bg-white">
                <h5 className="fw-bold mb-3 border-bottom pb-2">2. Payment Method</h5>

                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="pmCredit"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="pmCredit">
                      Credit or Debit Card
                    </label>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="pmPaypal"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="pmPaypal">
                      PayPal / Pay in 4
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'credit-card' && (
                  <div className="row g-3 p-3 bg-light rounded-3 border">
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="4532 •••• •••• 8892"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">Security CVC</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="CVC"
                        maxLength={4}
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Review Sidebar */}
            <div className="col-lg-5">
              <div className="card border rounded-3 p-4 shadow-sm bg-light sticky-top" style={{ top: '90px' }}>
                <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Order Summary
                </h5>

                {/* Items preview */}
                <div className="d-flex flex-column gap-2 mb-3 max-vh-50 overflow-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center small">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="rounded"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                          <p className="mb-0 fw-semibold text-dark text-truncate" style={{ maxWidth: '170px' }}>
                            {item.product.name}
                          </p>
                          <span className="text-muted">
                            Qty: {item.quantity} ({item.size})
                          </span>
                        </div>
                      </div>
                      <span className="fw-semibold text-dark">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Subtotal</span>
                    <span className="text-dark fw-semibold">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Shipping</span>
                    <span className="text-dark fw-semibold">
                      {shippingFee === 0 ? <span className="text-success fw-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-top border-bottom mb-4">
                    <span className="fw-bold fs-6">Total to Pay</span>
                    <span className="fw-bold fs-5 text-dark">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button type="submit" className="btn btn-fashion-primary w-100 py-3 shadow-sm mb-3">
                    <FaLock size={13} className="me-2" />
                    <span>Place Order Now</span>
                  </button>

                  <div className="text-center text-muted small d-flex align-items-center justify-content-center gap-1">
                    <FaShieldAlt className="text-success" />
                    <span>Guaranteed Safe & Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Checkout;
