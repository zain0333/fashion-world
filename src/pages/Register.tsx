import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaUserPlus } from 'react-icons/fa';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please verify.');
      return;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the Terms and Conditions.');
      return;
    }

    alert(`Account created successfully for ${formData.fullName}! You are now logged in.`);
    navigate('/');
  };

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <span className="navbar-brand-text fs-3">
                  FASHION<span>WORLD</span>
                </span>
                <h2 className="h4 fw-bold mt-3 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                  Create Your Account
                </h2>
                <p className="text-muted small">
                  Join Fashion World for member-only perks, private sales, and express checkout.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full Name *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <FaUser size={13} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Alex Mercer"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email Address *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <FaEnvelope size={13} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Create Password *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <FaLock size={13} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="At least 6 characters"
                      minLength={6}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Confirm Password *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <FaLock size={13} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Repeat password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheck"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  />
                  <label className="form-check-label small text-muted" htmlFor="termsCheck">
                    I agree to the <span className="text-dark fw-semibold">Terms of Service</span> and{' '}
                    <span className="text-dark fw-semibold">Privacy Policy</span>.
                  </label>
                </div>

                <button type="submit" className="btn btn-fashion-primary w-100 py-2 mb-3">
                  <FaUserPlus size={14} className="me-2" />
                  <span>Register Account</span>
                </button>
              </form>

              <div className="text-center pt-3 border-top">
                <p className="text-muted small mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="fw-bold text-dark text-decoration-underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
