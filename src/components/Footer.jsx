import React from 'react';
import { Shield, ArrowUp, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenSubmitModal, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        
        <div className="footer-card editorial-card">
          <div className="footer-grid">
            
            {/* Left Info */}
            <div className="footer-brand-col">
              <span className="footer-dot"></span>
              <h3 className="footer-title font-serif">
                Oluwadamilola Arilewola
              </h3>
              <p className="footer-desc font-serif">
                “Celebrating a Man Worth Celebrating ❤️”
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-links-col">
              <h4 className="footer-heading font-serif">Navigation</h4>
              <ul className="footer-nav-list">
                <li><a href="#hero">Welcome</a></li>
                <li><a href="#special-tributes">Special Dedications</a></li>
                <li><a href="#memories">Memory Gallery</a></li>
                <li><a href="#tribute-wall">Tributes & Prayers</a></li>
              </ul>
            </div>

            {/* CTA */}
            <div className="footer-cta-col">
              <h4 className="footer-heading font-serif">Leave Your Mark</h4>
              <p className="footer-cta-text font-serif">
                Be part of Dami's birthday keepsake. Share your favourite memory or prayer today.
              </p>
              <button onClick={onOpenSubmitModal} className="btn btn-dark btn-sm">
                <span>Write a Tribute</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <span>Made with love by <a href="https://praisetechy.com" target="_blank" rel="noopener noreferrer" className="praisetechy-link">PraiseTechy</a></span>
              <button onClick={onOpenAdmin} className="admin-footer-link" title="Dolapo Review & Moderation Desk">
                <ShieldCheck size={13} />
                <span>Review Submissions</span>
              </button>
            </div>

            <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
              <ArrowUp size={15} />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .footer-section {
          padding: 1.5rem 0 2.5rem;
        }
        @media (min-width: 768px) {
          .footer-section {
            padding: 2rem 0 3.5rem;
          }
        }
        .footer-card {
          padding: 1.75rem 1.25rem;
          background: var(--bg-card);
        }
        @media (min-width: 768px) {
          .footer-card {
            padding: 3rem 2.5rem;
          }
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1.2fr;
          }
        }
        .footer-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-primary);
          display: block;
          margin-bottom: 0.8rem;
        }
        .footer-title {
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }
        .footer-desc {
          color: var(--text-secondary);
          font-size: 1.05rem;
          margin-bottom: 1.2rem;
          font-style: italic;
        }
        .mufc-easter-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #990000;
          background: var(--accent-red-soft);
          border: 1px solid rgba(199, 1, 1, 0.2);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-weight: 500;
        }
        .text-red {
          color: #c70101;
        }
        .footer-heading {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-bottom: 1.2rem;
        }
        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-nav-list a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.92rem;
          transition: all 0.2s ease;
        }
        .footer-nav-list a:hover {
          color: var(--text-primary);
          padding-left: 3px;
        }
        .footer-cta-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.2rem;
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .praisetechy-link {
          color: #262626;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: all 0.2s ease;
        }
        .praisetechy-link:hover {
          color: #d81b60;
        }
        .admin-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 0.78rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          margin-left: 0.75rem;
          transition: all 0.2s ease;
        }
        .admin-footer-link:hover {
          background: #ffffff;
          color: #262626;
          border-color: #262626;
        }
        .back-to-top-btn {
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }
        .back-to-top-btn:hover {
          background: var(--bg-card-alt);
        }
      `}</style>
    </footer>
  );
}
