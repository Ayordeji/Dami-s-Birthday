import React, { useState } from 'react';
import { X, Sparkles, Upload, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TributeModal({ isOpen, onClose, onAddTribute }) {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    relationshipCategory: 'friends',
    threeWords: '',
    standoutQuality: '',
    birthdayWish: '',
    prayer: '',
    futureMessage: '',
    photoUrl: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Please select a photo under 8MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.birthdayWish.trim()) {
      alert("Please enter your name and birthday wish!");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newTribute = {
        id: "tribute-" + Date.now(),
        name: formData.name,
        relationship: formData.relationship || "Friend & Well-wisher",
        relationshipCategory: formData.relationshipCategory || "friends",
        threeWords: formData.threeWords,
        standoutQuality: formData.standoutQuality,
        birthdayWish: formData.birthdayWish,
        prayer: formData.prayer,
        futureMessage: formData.futureMessage,
        photoUrl: formData.photoUrl,
        date: new Date().toISOString().split('T')[0],
        likes: 1
      };

      onAddTribute(newTribute);
      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#262626', '#d4af37', '#ffccf6', '#c70101']
      });
    }, 500);
  };

  const handleClose = () => {
    setSubmitted(false);
    setActiveStep(1);
    setFormData({
      name: '',
      relationship: '',
      relationshipCategory: 'friends',
      threeWords: '',
      standoutQuality: '',
      birthdayWish: '',
      prayer: '',
      futureMessage: '',
      photoUrl: null
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="section-badge modal-badge">
              <Sparkles size={13} />
              <span>Celebrate Damilola</span>
            </span>
            <h3 className="modal-title font-serif">
              Leave a Birthday Tribute ❤️
            </h3>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="text-dark" />
            </div>
            <h4 className="font-serif success-heading">Thank You, {formData.name}!</h4>
            <p className="success-msg font-serif">
              Your heartfelt tribute, memories, and prayers have been added to Damilola's birthday wall and will be treasured in his keepsake book forever.
            </p>
            <button onClick={handleClose} className="btn btn-dark btn-lg">
              <span>View On Tribute Wall</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="tribute-form">
            
            {/* Step Indicators */}
            <div className="form-steps-nav">
              <button 
                type="button" 
                className={`step-btn ${activeStep === 1 ? 'active' : ''}`}
                onClick={() => setActiveStep(1)}
              >
                1. About You & Dami
              </button>
              <button 
                type="button" 
                className={`step-btn ${activeStep === 2 ? 'active' : ''}`}
                onClick={() => setActiveStep(2)}
              >
                2. Wishes & Prayers
              </button>
              <button 
                type="button" 
                className={`step-btn ${activeStep === 3 ? 'active' : ''}`}
                onClick={() => setActiveStep(3)}
              >
                3. Photo & 5-Yr Note
              </button>
            </div>

            {/* Step 1: Who is he to you */}
            {activeStep === 1 && (
              <div className="form-step-pane">
                <div className="form-group">
                  <label className="form-label">
                    Your Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g., Uncle Segun, Tunde, Grace"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      1. Who Is He to You?
                    </label>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="e.g., Brother, Childhood Friend, Colleague"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Category
                    </label>
                    <select
                      name="relationshipCategory"
                      value={formData.relationshipCategory}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="family">❤️ Family</option>
                      <option value="friends">🥂 Friends</option>
                      <option value="ministry">🙏🏽 Church / Ministry</option>
                      <option value="colleague">💼 Work & Colleagues</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    2. Describe him in 3 words
                  </label>
                  <input
                    type="text"
                    name="threeWords"
                    placeholder="e.g., Dependable, Wise, Joyful"
                    value={formData.threeWords}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    3. Tell Us About Him / Standout Quality
                  </label>
                  <textarea
                    name="standoutQuality"
                    rows="2"
                    placeholder="What is one thing or quality you genuinely appreciate about Damilola?"
                    value={formData.standoutQuality}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>

                <div className="form-step-actions">
                  <div></div>
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(2)} 
                    className="btn btn-dark"
                  >
                    <span>Next: Birthday Wishes & Prayer →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Birthday Wishes & Prayers */}
            {activeStep === 2 && (
              <div className="form-step-pane">
                <div className="form-group">
                  <label className="form-label">
                    🎂 Birthday Wishes <span className="req">*</span>
                  </label>
                  <textarea
                    name="birthdayWish"
                    rows="3"
                    required
                    placeholder="Write your heartfelt birthday message to Damilola..."
                    value={formData.birthdayWish}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    🙏🏽 Speak a Prayer Over Him
                  </label>
                  <p className="field-hint">
                    What is your prayer for Damilola in this new chapter?
                  </p>
                  <textarea
                    name="prayer"
                    rows="3"
                    placeholder="Speak words of blessing, grace, peace, and elevation over his life..."
                    value={formData.prayer}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>

                <div className="form-step-actions">
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(1)} 
                    className="btn btn-ghost"
                  >
                    <span>← Back</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(3)} 
                    className="btn btn-dark"
                  >
                    <span>Next: Photo & Time Capsule →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Photo & 5-Year Time Capsule */}
            {activeStep === 3 && (
              <div className="form-step-pane">
                <div className="form-group">
                  <label className="form-label">
                    ⏳ A Message He Can Read Later (5 Years From Now)
                  </label>
                  <p className="field-hint">
                    Imagine Damilola is reading this five years from now. What would you want him to remember about this season of his life?
                  </p>
                  <textarea
                    name="futureMessage"
                    rows="2"
                    placeholder="Your message for his future self..."
                    value={formData.futureMessage}
                    onChange={handleInputChange}
                    className="form-textarea"
                  />
                </div>

                {/* Photo Upload */}
                <div className="form-group">
                  <label className="form-label">
                    📸 Share a Photo / Throwback (Optional)
                  </label>
                  
                  <div className="photo-upload-box">
                    {formData.photoUrl ? (
                      <div className="uploaded-preview">
                        <img src={formData.photoUrl} alt="Preview" />
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, photoUrl: null }))}
                          className="remove-photo-btn"
                        >
                          <X size={14} /> Remove Photo
                        </button>
                      </div>
                    ) : (
                      <label className="upload-label">
                        <Upload size={22} className="text-muted" />
                        <span>Click to attach a photo together</span>
                        <span className="upload-sub">PNG, JPG up to 8MB</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handlePhotoUpload} 
                          className="file-input-hidden" 
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-step-actions">
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(2)} 
                    className="btn btn-ghost"
                  >
                    <span>← Back</span>
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn btn-dark btn-lg"
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? "Publishing..." : "Publish Tribute & Prayer"}</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(38, 38, 38, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .modal-dialog {
          width: 100%;
          max-width: 620px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2.2rem;
          border-radius: var(--radius-xl);
          background: var(--bg-canvas);
          border: 1px solid var(--border-medium);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        @media (max-width: 640px) {
          .modal-dialog {
            padding: 1.5rem;
          }
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .modal-badge {
          margin-bottom: 0.5rem;
          background: var(--bg-card);
        }
        .modal-title {
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--text-primary);
        }
        .modal-close-btn {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
          background: var(--bg-card-alt);
        }
        .form-steps-nav {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.8rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.8rem;
          overflow-x: auto;
        }
        .step-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .step-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          font-weight: 600;
        }
        .form-step-pane {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-label {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .field-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: -0.2rem;
          margin-bottom: 0.2rem;
        }
        .req {
          color: #c70101;
        }
        .form-step-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1.2rem;
          border-top: 1px solid var(--border-subtle);
        }
        .photo-upload-box {
          border: 2px dashed var(--border-medium);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: center;
          background: #ffffff;
        }
        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .upload-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .file-input-hidden {
          display: none;
        }
        .uploaded-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }
        .uploaded-preview img {
          max-height: 160px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .remove-photo-btn {
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: #c70101;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        /* Success State */
        .modal-success-state {
          text-align: center;
          padding: 2.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .success-icon-wrap {
          margin-bottom: 0.5rem;
        }
        .success-heading {
          font-size: 1.8rem;
          color: var(--text-primary);
        }
        .success-msg {
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
        }
      `}</style>
    </div>
  );
}
