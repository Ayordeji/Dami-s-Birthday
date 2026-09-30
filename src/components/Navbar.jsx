import React, { useState, useEffect } from 'react';
import { X, Heart, Image, MessageSquareHeart, BookOpen, Share2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ onOpenSubmitModal, onOpenKeepsake, isNavOpen, setIsNavOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Celebrating Oluwadamilola Arilewola ❤️",
        text: "Join us in celebrating Dami's birthday! Leave a heartfelt tribute, memory, or prayer.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const closeNav = () => {
    if (setIsNavOpen) setIsNavOpen(false);
  };

  return (
    <>
      {/* Floating Sticky Pill on Scroll */}
      <header className={`navbar-floating-pill ${scrolled ? 'visible' : ''}`}>
        <div className="pill-nav-inner">
          <a href="#hero" className="pill-brand font-serif">Oluwadamilola</a>
          
          <div className="pill-links">
            <a href="#special-tributes" className="pill-link">Dedications</a>
            <a href="#memories" className="pill-link">Memories</a>
            <a href="#tribute-wall" className="pill-link">Tributes</a>
            <button onClick={onOpenKeepsake} className="pill-link pill-btn">Keepsake</button>
          </div>

          <button 
            onClick={onOpenSubmitModal} 
            className="forty-pink-pill-btn pill-cta"
          >
            <span>Leave a Tribute!</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Navigation Drawer (Triggered by Hamburger Menu) */}
      {isNavOpen && (
        <div className="nav-drawer-backdrop" onClick={closeNav}>
          <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="nav-drawer-header">
              <span className="brand-dot"></span>
              <span className="font-serif drawer-brand">Oluwadamilola</span>
              <button className="drawer-close-btn" onClick={closeNav}>
                <X size={22} />
              </button>
            </div>

            <nav className="drawer-nav-list font-serif">
              <a href="#hero" onClick={closeNav} className="drawer-nav-item">
                <span>01</span>
                <strong>Welcome</strong>
              </a>
              <a href="#special-tributes" onClick={closeNav} className="drawer-nav-item">
                <span>02</span>
                <strong>Special Dedications</strong>
              </a>
              <a href="#memories" onClick={closeNav} className="drawer-nav-item">
                <span>03</span>
                <strong>Memory Gallery</strong>
              </a>
              <a href="#tribute-wall" onClick={closeNav} className="drawer-nav-item">
                <span>04</span>
                <strong>Tributes & Prayers</strong>
              </a>
              <button 
                onClick={() => { closeNav(); onOpenKeepsake(); }} 
                className="drawer-nav-item drawer-btn-item"
              >
                <span>05</span>
                <strong>Keepsake Memory Book</strong>
              </button>
            </nav>

            <div className="drawer-footer">
              <button 
                onClick={() => { closeNav(); onOpenSubmitModal(); }}
                className="forty-pink-pill-btn drawer-cta"
              >
                <span>Write a Birthday Tribute</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={handleShare} className="drawer-share-btn font-sans">
                <Share2 size={16} />
                <span>{copied ? "Link Copied!" : "Share Website"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Floating Sticky Pill */
        .navbar-floating-pill {
          position: fixed;
          top: 12px;
          left: 50%;
          transform: translateX(-50%) translateY(-100px);
          z-index: 100;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          pointer-events: none;
          width: calc(100% - 24px);
          max-width: 520px;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .navbar-floating-pill {
            top: 16px;
            width: auto;
            max-width: none;
          }
        }
        .navbar-floating-pill.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .pill-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 0.8rem;
          background: rgba(251, 245, 231, 0.95);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--border-medium);
          padding: 0.45rem 0.55rem 0.45rem 1.1rem;
          border-radius: var(--radius-full);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        @media (min-width: 768px) {
          .pill-nav-inner {
            width: auto;
            gap: 1.2rem;
            padding: 0.45rem 0.6rem 0.45rem 1.2rem;
          }
        }
        .pill-brand {
          font-size: 1.05rem;
          color: #262626;
          text-decoration: none;
          font-weight: 400;
          white-space: nowrap;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .pill-brand {
            font-size: 1.15rem;
          }
        }
        .pill-links {
          display: none;
          align-items: center;
          gap: 0.3rem;
        }
        @media (min-width: 768px) {
          .pill-links {
            display: flex;
          }
        }
        .pill-link {
          padding: 0.4rem 0.85rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        .pill-link:hover {
          color: #262626;
          background: rgba(38, 38, 38, 0.06);
        }
        .pill-cta {
          padding: 0.52rem 1.1rem !important;
          font-size: 0.88rem !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        /* Fullscreen Navigation Drawer */
        .nav-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(38, 38, 38, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease;
        }
        .nav-drawer-panel {
          width: 100%;
          max-width: 420px;
          height: 100%;
          background: var(--bg-canvas);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-drawer-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .drawer-brand {
          font-size: 1.5rem;
          color: #262626;
        }
        .drawer-close-btn {
          margin-left: auto;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .drawer-nav-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem 0;
        }
        .drawer-nav-item {
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          text-decoration: none;
          color: #262626;
          font-size: 1.6rem;
          transition: all 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0;
        }
        .drawer-nav-item span {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .drawer-nav-item:hover {
          color: #737373;
          transform: translateX(6px);
        }
        .drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }
        .drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.9rem !important;
        }
        .drawer-share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid var(--border-medium);
          padding: 0.7rem;
          border-radius: var(--radius-full);
          color: #262626;
          cursor: pointer;
          font-size: 0.9rem;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
