import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt,
  FaCheckCircle,
  FaLock,
  FaCreditCard,
  FaMoneyBillWave,
  FaTruck,
  FaArrowLeft
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

type PaymentMethodType = 'cod' | 'easypaisa' | 'jazzcash' | 'card';

export const Checkout: React.FC = () => {
  const { cart, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'Pakistan',
    deliveryNotes: '',
    // Payment specific details
    paymentMethod: 'cod' as PaymentMethodType,
    // Card fields
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    // Easypaisa fields
    easypaisaNumber: '',
    easypaisaAccountTitle: '',
    // JazzCash fields
    jazzcashNumber: '',
    jazzcashCnicLast6: '',
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="p-5 bg-light rounded-4 border mx-auto shadow-sm" style={{ maxWidth: '540px' }}>
          <div className="text-muted mb-3 fs-1">
            <FaTruck />
          </div>
          <h3 className="fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Your Bag is Empty
          </h3>
          <p className="text-muted mb-4">
            Please add some pieces to your shopping bag before proceeding to checkout.
          </p>
          <Link to="/products" className="btn btn-fashion-primary px-4 py-2">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSelect = (method: PaymentMethodType) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNumber(`FW-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsOrdered(true);
    clearCart();
  };

  const getPaymentMethodLabel = (method: PaymentMethodType) => {
    switch (method) {
      case 'cod':
        return 'Cash on Delivery (COD)';
      case 'easypaisa':
        return 'Easypaisa Mobile Wallet';
      case 'jazzcash':
        return 'JazzCash Mobile Account';
      case 'card':
        return 'Credit / Debit Card';
      default:
        return 'Standard Payment';
    }
  };

  if (isOrdered) {
    return (
      <div className="container py-5 my-5 text-center">
        <div className="p-5 bg-white rounded-4 border mx-auto shadow-sm" style={{ maxWidth: '640px' }}>
          <div className="text-success mb-3" style={{ fontSize: '3.5rem' }}>
            <FaCheckCircle />
          </div>
          <h2 className="fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Order Placed Successfully!
          </h2>
          <p className="text-muted mb-4">
            Thank you for shopping with <strong>Fashion World</strong>. Your order has been placed and is currently being prepared for shipment.
          </p>

          <div className="bg-light p-3 rounded-3 text-start mb-4 border small">
            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
              <span className="text-muted">Order Reference:</span>
              <strong className="text-dark">#{orderNumber}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
              <span className="text-muted">Customer Name:</span>
              <span className="fw-semibold text-dark">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
              <span className="text-muted">Email Address:</span>
              <span className="text-dark">{formData.email}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
              <span className="text-muted">Shipping Destination:</span>
              <span className="text-dark text-end">{formData.address}, {formData.city}, {formData.state}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Payment Method:</span>
              <span className="badge bg-dark">{getPaymentMethodLabel(formData.paymentMethod)}</span>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
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
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-muted text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/cart" className="text-muted text-decoration-none">Bag</Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              Checkout
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <h1 className="h3 fw-bold mb-0" style={{ fontFamily: 'var(--font-serif)' }}>
            Checkout
          </h1>
          <Link to="/cart" className="btn btn-sm btn-link text-muted text-decoration-none p-0 d-inline-flex align-items-center gap-1">
            <FaArrowLeft size={11} />
            <span>Return to bag</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Left Column: Customer Details, Address, and Payment Method */}
            <div className="col-lg-7">
              {/* SECTION 1: Customer Information */}
              <div className="card border rounded-3 p-4 shadow-sm bg-white mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  1. Customer Information
                </h5>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-muted">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      required
                      placeholder="e.g. Sarah"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-muted">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      required
                      placeholder="e.g. Khan"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-muted">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-muted">Mobile Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      required
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Shipping Address */}
              <div className="card border rounded-3 p-4 shadow-sm bg-white mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  2. Shipping Address
                </h5>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      required
                      placeholder="House / Flat #, Street, Block, Area"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Apartment, Suite, Unit (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="apartment"
                      placeholder="Apartment, suite, or landmark"
                      value={formData.apartment}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-4">
                    <label className="form-label small fw-semibold text-muted">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      required
                      placeholder="e.g. Lahore / Karachi"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-4">
                    <label className="form-label small fw-semibold text-muted">State / Province *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      required
                      placeholder="e.g. Punjab / Sindh"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-4">
                    <label className="form-label small fw-semibold text-muted">Postal Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      required
                      placeholder="e.g. 54000"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Delivery Instructions (Optional)</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      name="deliveryNotes"
                      placeholder="Notes about your order (e.g. call before delivery)"
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Payment Method Options */}
              <div className="card border rounded-3 p-4 shadow-sm bg-white mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  3. Payment Method
                </h5>

                {/* Selectable Payment Cards */}
                <div className="d-flex flex-column gap-3 mb-3">
                  {/* 1. Cash on Delivery (COD) */}
                  <div
                    className={`payment-method-card ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => handlePaymentSelect('cod')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => handlePaymentSelect('cod')}
                          id="methodCod"
                        />
                        <div>
                          <label className="form-check-label fw-bold text-dark cursor-pointer mb-0" htmlFor="methodCod">
                            Cash on Delivery (COD)
                          </label>
                          <p className="text-muted small mb-0">Pay with physical cash upon receiving parcel</p>
                        </div>
                      </div>
                      <div className="text-success fs-5">
                        <FaMoneyBillWave />
                      </div>
                    </div>

                    {formData.paymentMethod === 'cod' && (
                      <div className="p-3 bg-light rounded-3 mt-3 border small text-muted">
                        Pay in cash upon doorstep delivery. Please keep exact amount ready for the courier.
                      </div>
                    )}
                  </div>

                  {/* 2. Easypaisa */}
                  <div
                    className={`payment-method-card ${formData.paymentMethod === 'easypaisa' ? 'active' : ''}`}
                    onClick={() => handlePaymentSelect('easypaisa')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'easypaisa'}
                          onChange={() => handlePaymentSelect('easypaisa')}
                          id="methodEasypaisa"
                        />
                        <div>
                          <label className="form-check-label fw-bold text-dark cursor-pointer mb-0" htmlFor="methodEasypaisa">
                            Easypaisa Mobile Wallet
                          </label>
                          <p className="text-muted small mb-0">Pay instantly from your Easypaisa account</p>
                        </div>
                      </div>
                      <span className="badge bg-success payment-badge-pill">Easypaisa</span>
                    </div>

                    {formData.paymentMethod === 'easypaisa' && (
                      <div className="p-3 bg-light rounded-3 mt-3 border">
                        <div className="row g-2">
                          <div className="col-sm-6">
                            <label className="form-label small fw-semibold text-muted">Easypaisa Mobile Number *</label>
                            <input
                              type="tel"
                              className="form-control form-control-sm"
                              placeholder="03XXXXXXXXX"
                              required={formData.paymentMethod === 'easypaisa'}
                              name="easypaisaNumber"
                              value={formData.easypaisaNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label small fw-semibold text-muted">Account Title *</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Account Holder Name"
                              required={formData.paymentMethod === 'easypaisa'}
                              name="easypaisaAccountTitle"
                              value={formData.easypaisaAccountTitle}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-12 mt-2">
                            <p className="small text-muted mb-0">
                              ℹ️ You will receive an authorization push prompt on your Easypaisa mobile app to confirm payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. JazzCash */}
                  <div
                    className={`payment-method-card ${formData.paymentMethod === 'jazzcash' ? 'active' : ''}`}
                    onClick={() => handlePaymentSelect('jazzcash')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'jazzcash'}
                          onChange={() => handlePaymentSelect('jazzcash')}
                          id="methodJazzcash"
                        />
                        <div>
                          <label className="form-check-label fw-bold text-dark cursor-pointer mb-0" htmlFor="methodJazzcash">
                            JazzCash Mobile Account
                          </label>
                          <p className="text-muted small mb-0">Pay directly using your JazzCash wallet</p>
                        </div>
                      </div>
                      <span className="badge bg-danger payment-badge-pill">JazzCash</span>
                    </div>

                    {formData.paymentMethod === 'jazzcash' && (
                      <div className="p-3 bg-light rounded-3 mt-3 border">
                        <div className="row g-2">
                          <div className="col-sm-6">
                            <label className="form-label small fw-semibold text-muted">JazzCash Mobile Number *</label>
                            <input
                              type="tel"
                              className="form-control form-control-sm"
                              placeholder="03XXXXXXXXX"
                              required={formData.paymentMethod === 'jazzcash'}
                              name="jazzcashNumber"
                              value={formData.jazzcashNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label small fw-semibold text-muted">CNIC (Last 6 Digits) *</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="e.g. 123456"
                              maxLength={6}
                              required={formData.paymentMethod === 'jazzcash'}
                              name="jazzcashCnicLast6"
                              value={formData.jazzcashCnicLast6}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-12 mt-2">
                            <p className="small text-muted mb-0">
                              ℹ️ An MPIN verification prompt will be sent to your JazzCash registered mobile number.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Card Payment UI (Credit / Debit Card) */}
                  <div
                    className={`payment-method-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => handlePaymentSelect('card')}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => handlePaymentSelect('card')}
                          id="methodCard"
                        />
                        <div>
                          <label className="form-check-label fw-bold text-dark cursor-pointer mb-0" htmlFor="methodCard">
                            Credit / Debit Card
                          </label>
                          <p className="text-muted small mb-0">Visa, Mastercard, PayPak, UnionPay</p>
                        </div>
                      </div>
                      <div className="text-dark fs-5">
                        <FaCreditCard />
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="p-3 bg-light rounded-3 mt-3 border">
                        <div className="row g-2">
                          <div className="col-12">
                            <label className="form-label small fw-semibold text-muted">Cardholder Name *</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Name on card"
                              required={formData.paymentMethod === 'card'}
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label small fw-semibold text-muted">Card Number *</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="4214 •••• •••• 8842"
                              maxLength={19}
                              required={formData.paymentMethod === 'card'}
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label small fw-semibold text-muted">Expiry Date *</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="MM/YY"
                              maxLength={5}
                              required={formData.paymentMethod === 'card'}
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label small fw-semibold text-muted">Security CVC *</label>
                            <input
                              type="password"
                              className="form-control form-control-sm"
                              placeholder="CVC"
                              maxLength={4}
                              required={formData.paymentMethod === 'card'}
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order Button */}
            <div className="col-lg-5">
              <div className="card border rounded-3 p-4 shadow-sm bg-light sticky-top" style={{ top: '90px' }}>
                <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Order Summary
                </h5>

                {/* Items Preview List */}
                <div className="d-flex flex-column gap-3 mb-3 max-vh-50 overflow-auto pe-1">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center small">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="rounded object-fit-cover"
                          style={{ width: '48px', height: '48px' }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div>
                          <p className="mb-0 fw-semibold text-dark text-truncate" style={{ maxWidth: '170px' }}>
                            {item.product.name}
                          </p>
                          <span className="text-muted small">
                            Qty: {item.quantity} | {item.size}
                          </span>
                        </div>
                      </div>
                      <span className="fw-bold text-dark">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Items Subtotal</span>
                    <span className="text-dark fw-semibold">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Delivery Shipping</span>
                    <span className="text-dark fw-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-success fw-bold">FREE</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between py-2 border-top border-bottom mb-4">
                    <span className="fw-bold fs-6">Total Amount</span>
                    <span className="fw-bold fs-5 text-dark">${cartTotal.toFixed(2)}</span>
                  </div>

                  {/* Place Order CTA Button */}
                  <button
                    type="submit"
                    className="btn btn-fashion-primary w-100 py-3 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaLock size={13} />
                    <span>Place Order &bull; ${cartTotal.toFixed(2)}</span>
                  </button>

                  <div className="text-center text-muted small d-flex align-items-center justify-content-center gap-1">
                    <FaShieldAlt className="text-success" />
                    <span>Encrypted Safe & Secure Checkout</span>
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
