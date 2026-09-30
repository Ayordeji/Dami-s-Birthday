import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Trash2, 
  EyeOff, 
  Eye, 
  Lock, 
  Clock, 
  Heart, 
  Sparkles, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ADMIN_PIN = 'dolapo'; // Passcode for Dolapo

export default function AdminModerationModal({ 
  isOpen, 
  onClose, 
  tributes, 
  onApproveTribute, 
  onDeleteTribute, 
  onToggleHideTribute 
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved'
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState(null);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = pinInput.trim().toLowerCase();
    if (clean === ADMIN_PIN || clean === 'dami2026' || clean === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode. Please try "dolapo" or "dami2026"');
    }
  };

  const pendingTributes = tributes.filter(t => t.isApproved === false || t.status === 'pending');
  const approvedTributes = tributes.filter(t => t.isApproved !== false && t.status !== 'pending');

  return (
    <div className="admin-backdrop" onClick={onClose}>
      <div className="admin-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-title">
            <div className="admin-badge">
              <ShieldCheck size={16} />
              <span>Dolapo's Review & Moderation Desk</span>
            </div>
            <h3 className="font-serif">Tribute Wall Management</h3>
          </div>
          <button className="admin-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="admin-auth-box">
            <div className="auth-icon-wrap">
              <Lock size={36} />
            </div>
            <h4 className="font-serif auth-title">Enter Review Passcode</h4>
            <p className="auth-sub">
              Enter your secret passcode to review, approve, or manage birthday tributes before they go live on the wall.
            </p>
            
            <div className="auth-input-group">
              <input
                type="password"
                placeholder="Enter passcode (e.g. dolapo)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="admin-input"
                autoFocus
              />
              <button type="submit" className="btn btn-dark">
                <span>Unlock Review Panel</span>
              </button>
            </div>

            {errorMsg && (
              <div className="auth-error">
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>
        ) : (
          <div className="admin-content">
            
            {/* Tabs */}
            <div className="admin-tabs">
              <button 
                className={`admin-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                <Clock size={16} />
                <span>Pending Review</span>
                {pendingTributes.length > 0 && (
                  <span className="tab-count-badge pulse">{pendingTributes.length}</span>
                )}
              </button>

              <button 
                className={`admin-tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >
                <CheckCircle2 size={16} />
                <span>Live on Wall ({approvedTributes.length})</span>
              </button>
            </div>

            {/* Tab: Pending Tributes */}
            {activeTab === 'pending' && (
              <div className="tribute-list-pane">
                {pendingTributes.length === 0 ? (
                  <div className="admin-empty-state">
                    <CheckCircle2 size={42} className="text-muted" />
                    <h5 className="font-serif">All Caught Up! 🎉</h5>
                    <p>There are no pending tributes waiting for review right now. New submissions will appear here for your approval.</p>
                  </div>
                ) : (
                  <div className="admin-cards-grid">
                    {pendingTributes.map((t) => (
                      <div key={t.id} className="admin-tribute-card pending-card">
                        <div className="card-top">
                          <div>
                            <h4 className="font-serif author-name">{t.name}</h4>
                            <span className="rel-tag">{t.relationship} • {t.relationshipCategory || 'friends'}</span>
                          </div>
                          <span className="pending-pill">Needs Approval</span>
                        </div>

                        {t.threeWords && (
                          <div className="admin-snippet">
                            <strong>3 Words:</strong> “{t.threeWords}”
                          </div>
                        )}

                        <div className="admin-snippet wish-snippet">
                          <strong>Birthday Wish:</strong>
                          <p className="font-serif">“{t.birthdayWish}”</p>
                        </div>

                        {t.prayer && (
                          <div className="admin-snippet prayer-snippet">
                            <strong>Prayer:</strong>
                            <p className="font-serif">“{t.prayer}”</p>
                          </div>
                        )}

                        {t.photoUrl && (
                          <div className="admin-photo-preview-wrap">
                            <button 
                              type="button" 
                              onClick={() => setSelectedPhotoPreview(t.photoUrl)} 
                              className="photo-thumb-btn"
                            >
                              <img src={t.photoUrl} alt="Attached by sender" />
                              <span><ImageIcon size={13} /> View Attached Photo</span>
                            </button>
                          </div>
                        )}

                        <div className="admin-card-actions">
                          <button 
                            onClick={() => onApproveTribute(t.id)} 
                            className="btn-approve"
                            title="Approve and publish to wall"
                          >
                            <Check size={16} />
                            <span>Approve & Post to Wall</span>
                          </button>
                          
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to decline this tribute from ${t.name}?`)) {
                                onDeleteTribute(t.id);
                              }
                            }} 
                            className="btn-delete"
                            title="Reject and delete"
                          >
                            <Trash2 size={16} />
                            <span>Decline</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Approved / Live Tributes */}
            {activeTab === 'approved' && (
              <div className="tribute-list-pane">
                <div className="admin-cards-grid">
                  {approvedTributes.map((t) => (
                    <div key={t.id} className="admin-tribute-card approved-card">
                      <div className="card-top">
                        <div>
                          <h4 className="font-serif author-name">{t.name}</h4>
                          <span className="rel-tag">{t.relationship}</span>
                        </div>
                        <span className="live-pill">Live on Wall</span>
                      </div>

                      <div className="admin-snippet wish-snippet">
                        <p className="font-serif">“{t.birthdayWish}”</p>
                      </div>

                      {t.photoUrl && (
                        <div className="admin-photo-preview-wrap">
                          <button 
                            type="button" 
                            onClick={() => setSelectedPhotoPreview(t.photoUrl)} 
                            className="photo-thumb-btn"
                          >
                            <img src={t.photoUrl} alt="Attached" />
                            <span><ImageIcon size={13} /> Photo Included</span>
                          </button>
                        </div>
                      )}

                      <div className="admin-card-actions">
                        <button 
                          onClick={() => onToggleHideTribute(t.id)} 
                          className="btn-hide"
                          title="Hide from public view"
                        >
                          <EyeOff size={15} />
                          <span>Move to Pending</span>
                        </button>
                        
                        <button 
                          onClick={() => {
                            if (confirm(`Remove tribute by ${t.name} from the wall?`)) {
                              onDeleteTribute(t.id);
                            }
                          }} 
                          className="btn-delete"
                        >
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Photo Lightbox Popup */}
        {selectedPhotoPreview && (
          <div className="photo-modal-overlay" onClick={() => setSelectedPhotoPreview(null)}>
            <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedPhotoPreview} alt="Enlarged Memory" />
              <button className="photo-modal-close" onClick={() => setSelectedPhotoPreview(null)}>
                <X size={18} />
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .admin-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .admin-dialog {
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          border-radius: var(--radius-xl);
          background: var(--bg-canvas);
          border: 1px solid var(--border-medium);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          position: relative;
        }
        @media (max-width: 640px) {
          .admin-dialog {
            padding: 1.25rem;
          }
        }
        .admin-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #262626;
          background: #ffccf6;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.4rem;
        }
        .admin-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .admin-auth-box {
          text-align: center;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .auth-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #262626;
        }
        .auth-title {
          font-size: 1.6rem;
          color: #262626;
        }
        .auth-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 440px;
          line-height: 1.5;
        }
        .auth-input-group {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          max-width: 380px;
          margin-top: 0.5rem;
        }
        @media (max-width: 500px) {
          .auth-input-group {
            flex-direction: column;
          }
        }
        .admin-input {
          flex: 1;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          outline: none;
        }
        .admin-input:focus {
          border-color: #262626;
        }
        .auth-error {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #c70101;
          font-size: 0.85rem;
        }
        .admin-tabs {
          display: flex;
          gap: 0.6rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .admin-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          background: #ffffff;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }
        .admin-tab-btn.active {
          background: #262626;
          color: #ffffff;
          border-color: #262626;
        }
        .tab-count-badge {
          background: #c70101;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
        }
        .admin-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .admin-tribute-card {
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }
        .pending-card {
          border-left: 4px solid #d4af37;
        }
        .approved-card {
          border-left: 4px solid #2e7d32;
        }
        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.6rem;
        }
        .author-name {
          font-size: 1.15rem;
          color: #262626;
          margin-bottom: 0.15rem;
        }
        .rel-tag {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .pending-pill {
          background: #fff8e1;
          color: #b78103;
          border: 1px solid #ffe082;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .live-pill {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #c8e6c9;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .admin-snippet {
          font-size: 0.9rem;
          color: #444444;
          line-height: 1.5;
        }
        .admin-snippet p {
          margin-top: 0.2rem;
          font-size: 0.95rem;
        }
        .admin-photo-preview-wrap {
          display: flex;
          align-items: center;
        }
        .photo-thumb-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          cursor: pointer;
        }
        .photo-thumb-btn img {
          width: 32px;
          height: 32px;
          object-fit: cover;
          border-radius: 4px;
        }
        .admin-card-actions {
          display: flex;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }
        .btn-approve {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #262626;
          color: #ffffff;
          border: none;
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-approve:hover {
          background: #000000;
        }
        .btn-hide {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: #262626;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          cursor: pointer;
        }
        .btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #fff0f0;
          border: 1px solid #ffd6d6;
          color: #c70101;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          cursor: pointer;
          margin-left: auto;
        }
        .btn-delete:hover {
          background: #ffe0e0;
        }
        .admin-empty-state {
          text-align: center;
          padding: 3.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
        }
        .admin-empty-state h5 {
          font-size: 1.4rem;
          color: #262626;
        }
        .photo-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 1300;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .photo-modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
        }
        .photo-modal-content img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: 12px;
          object-fit: contain;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .photo-modal-close {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: none;
          color: #262626;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
