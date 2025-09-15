import { useState } from "react";
import DefaultNavbar from "./DefaultNavbar";
import "../index.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save contact form data
    const existingContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const newContact = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };
    existingContacts.push(newContact);
    localStorage.setItem('contactSubmissions', JSON.stringify(existingContacts));
    
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: ""
    });
  };

  return (
    <div className="contact-container">
      <DefaultNavbar />
      <div className="contact-header">
        <h1 className="contact-title">📞 Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team for support, partnerships, or general inquiries</p>
      </div>

      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info-section">
          <h3>Get in Touch</h3>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">📧</div>
              <div className="method-details">
                <h4>Email</h4>
                <p>contact@carbonlens.com</p>
                <p>partnerships@carbonlens.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">📱</div>
              <div className="method-details">
                <h4>Phone</h4>
                <p>+91 9100899879</p>
                <p>Mon-Sat, 9 AM - 6 PM EST</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">📍</div>
              <div className="method-details">
                <h4>Address</h4>
                <p>TPC</p>
                <p>JORHAT ENGINEERING COLLEGE</p>
              </div>
            </div>
            
            {/* <div className="contact-method">
              <div className="method-icon">💬</div>
              <div className="method-details">
                <h4>Live Chat</h4>
                <p>Available 24/7</p>
                <button className="chat-button">Start Chat</button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <h3>Send us a Message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="verification">Project Verification</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief subject line"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell us how we can help you..."
                rows="6"
              />
            </div>

            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do I get my project verified?</h4>
            <p>Submit your project through the "Add Project" page with all required documentation. Our verification team will review within 5-7 business days.</p>
          </div>
          
          <div className="faq-item">
            <h4>What types of blue carbon projects are accepted?</h4>
            <p>We accept mangrove restoration, seagrass conservation, salt marsh restoration, oyster reef restoration, and kelp forest conservation projects.</p>
          </div>
          
          <div className="faq-item">
            <h4>How are carbon credits priced?</h4>
            <p>Credit prices are set by project owners based on market conditions, project quality, and verification standards. Typical range is $20-50 per credit.</p>
          </div>
          
          <div className="faq-item">
            <h4>What payment methods do you accept?</h4>
            <p>We accept major credit cards, bank transfers, and cryptocurrency payments for carbon credit transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
