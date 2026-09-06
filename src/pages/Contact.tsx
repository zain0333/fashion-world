import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaCheck } from 'react-icons/fa';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSent(false);
    }, 3000);
  };

  return (
    <div className="contact-page py-4">
      <div className="container">
        {/* Header */}
        <div className="bg-light p-5 rounded-4 mb-5 text-center border">
          <span className="section-subtitle">Get In Touch</span>
          <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            We'd Love To Hear From You
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1rem' }}>
            Have a question regarding your order, styling advice, or custom tailoring? Our concierge team is here to help.
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Details Card */}
          <div className="col-lg-5">
            <div className="card border rounded-4 p-4 p-md-5 bg-dark text-white h-100 shadow-sm">
              <h3 className="fw-bold mb-4 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                Client Concierge
              </h3>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-circle text-warning fs-5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white">Flagship Boutique</h6>
                    <p className="text-muted small mb-0">540 Madison Avenue, New York, NY 10022</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-circle text-warning fs-5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white">Telephone Concierge</h6>
                    <p className="text-muted small mb-0">+1 (800) 456-7890 (Toll Free)</p>
                    <p className="text-muted small mb-0">+1 (212) 555-0199 (Direct)</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-circle text-warning fs-5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white">Electronic Inquiries</h6>
                    <p className="text-muted small mb-0">concierge@fashionworld.com</p>
                    <p className="text-muted small mb-0">press@fashionworld.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-circle text-warning fs-5">
                    <FaClock />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-white">Boutique Hours</h6>
                    <p className="text-muted small mb-0">Mon – Fri: 9:00 AM – 8:00 PM EST</p>
                    <p className="text-muted small mb-0">Sat – Sun: 10:00 AM – 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border rounded-4 p-4 p-md-5 bg-white shadow-sm">
              <h3 className="fw-bold mb-2 text-dark" style={{ fontFamily: 'var(--font-serif)' }}>
                Send Us A Message
              </h3>
              <p className="text-muted small mb-4">
                Fill out the form below and a representative will reply within 24 business hours.
              </p>

              {isSent && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                  <FaCheck className="text-success" />
                  <span>Thank you! Your message has been sent successfully. We will be in touch soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Order Inquiry / Sizing Assistance"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Message *</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-fashion-primary px-4 py-2 d-inline-flex align-items-center gap-2"
                    >
                      <FaPaperPlane size={13} />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
