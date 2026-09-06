import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Beginner-friendly mock login
    alert(`Welcome back to Fashion World, ${formData.email}!`);
    navigate('/');
  };

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <span className="navbar-brand-text fs-3">
                  FASHION<span>WORLD</span>
                </span>
                <h2 className="h4 fw-bold mt-3 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                  Sign In to Your Account
                </h2>
                <p className="text-muted small">
                  Access your orders, saved wishlists, and customized recommendations.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email Address</label>
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
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold mb-0">Password</label>
                    <a href="#forgot" className="small text-muted text-decoration-none">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted">
                      <FaLock size={13} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberCheck"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  />
                  <label className="form-check-label small text-muted" htmlFor="rememberCheck">
                    Keep me signed in on this device
                  </label>
                </div>

                <button type="submit" className="btn btn-fashion-primary w-100 py-2 mb-3">
                  <FaSignInAlt size={14} className="me-2" />
                  <span>Sign In</span>
                </button>
              </form>

              <div className="text-center pt-3 border-top">
                <p className="text-muted small mb-0">
                  Don't have an account yet?{' '}
                  <Link to="/register" className="fw-bold text-dark text-decoration-underline">
                    Create one here
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
export default Login;
