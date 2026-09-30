import React, { useState, useEffect } from 'react';
import { PartyPopper, Menu, X, ArrowRight, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CELEBRANT_INFO } from '../data/initialData';

export default function Hero({ onOpenSubmitModal, onOpenKeepsake, onToggleNav, isNavOpen }) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const target = 35;
    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(1 + easeProgress * (target - 1));
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#262626', '#ffccf6', '#d4af37', '#c70101']
    });
  };

  return (
    <section id="hero" className="forty-hero-section">
      
      {/* Mobile Top Bar: Placed before the image on mobile */}
      <div className="forty-mobile-topbar">
        <div className="forty-top-tag">
          <span className="mufc-tag-clean" title="Manchester United Faithful">
            <Shield size={13} className="text-red" />
            <span>Man United 🔴</span>
          </span>
        </div>

        <button 
          className="forty-menu-btn" 
          onClick={onToggleNav} 
          aria-label="Toggle Navigation Menu"
        >
          {isNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="forty-hero-wrapper">
        
        {/* Left Column: Full-Height Image Card with Pink Stamp */}
        <div className="forty-hero-left">
          <div className="forty-image-container">
            <img 
              src="/images/PS_Trad_Dami1.webp" 
              alt="Oluwadamilola Arilewola"
              className="forty-hero-img"
            />

            {/* Forty Rotating Pink Circular Stamp */}
            <div className="forty-stamp" onClick={fireConfetti} title="Click to Celebrate!">
              <div className="stamp-rotator spin-slow">
                <svg viewBox="0 0 100 100" className="stamp-svg">
                  <path
                    id="stamp-path"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="stamp-svg-text">
                    <textPath href="#stamp-path" startOffset="0%">
                      Happy Birthday – Happy Birthday –
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="stamp-icon">
                <PartyPopper size={22} color="#262626" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Editorial Split Screen */}
        <div className="forty-hero-right">
          
          {/* Top Bar on Desktop: Nav Trigger & Tag */}
          <div className="forty-hero-topbar desktop-only-topbar">
            <div className="forty-top-tag">
              <span className="mufc-tag-clean" title="Manchester United Faithful">
                <Shield size={13} className="text-red" />
                <span>Man United 🔴</span>
              </span>
            </div>

            <button 
              className="forty-menu-btn" 
              onClick={onToggleNav} 
              aria-label="Toggle Navigation Menu"
            >
              {isNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center Main Content: "Celebrating Damilola," + Big Milestone */}
          <div className="forty-hero-center">
            <h1 className="forty-celebrating-title font-serif">
              Celebrating Damilola,
            </h1>
            <div className="forty-giant-number font-serif">
              {count}
            </div>
            <p className="forty-headline-sub font-serif">
              “Celebrating a Man Worth Celebrating ❤️”
            </p>
          </div>

          {/* Bottom Bar: Date on Left, Pink Pill Button on Right */}
          <div className="forty-hero-bottombar">
            <div className="forty-date-text font-sans">
              21 Oct, 2026
            </div>

            <button 
              onClick={() => {
                fireConfetti();
                onOpenSubmitModal();
              }}
              className="forty-pink-pill-btn"
            >
              <span>Leave a Tribute!</span>
            </button>
          </div>

        </div>

      </div>

      <style>{`
        .forty-hero-section {
          padding: 16px;
          min-height: 100vh;
          height: auto;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-canvas);
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }
        @media (min-width: 900px) {
          .forty-hero-section {
            padding: 24px;
            min-height: 100vh;
            margin-bottom: 3rem;
          }
        }
        .forty-mobile-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 14px;
        }
        @media (min-width: 900px) {
          .forty-mobile-topbar {
            display: none;
          }
        }
        .forty-hero-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          width: 100%;
          min-height: calc(100vh - 48px);
          align-items: stretch;
          flex: 1;
        }
        @media (min-width: 900px) {
          .forty-hero-wrapper {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 32px;
          }
        }

        /* Left Image Container */
        .forty-hero-left {
          position: relative;
          min-height: 480px;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
        }
        @media (min-width: 900px) {
          .forty-hero-left {
            min-height: calc(100vh - 48px);
            max-height: 92vh;
          }
        }
        .forty-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          border-radius: 24px;
          overflow: hidden;
          background: #e8e6d1;
        }
        .forty-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        /* Pink Rotating Stamp (Matches Forty) */
        .forty-stamp {
          position: absolute;
          top: 24px;
          left: 24px;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background-color: #ffccf6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.25s ease;
        }
        @media (max-width: 640px) {
          .forty-stamp {
            width: 80px;
            height: 80px;
            top: 16px;
            left: 16px;
          }
        }
        .forty-stamp:hover {
          transform: scale(1.06);
        }
        .stamp-rotator {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .stamp-svg {
          width: 100%;
          height: 100%;
        }
        .stamp-svg-text {
          font-family: var(--font-sans);
          font-size: 10.5px;
          font-weight: 500;
          fill: #262626;
          letter-spacing: 0.08em;
        }
        .stamp-icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Right Column */
        .forty-hero-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px 8px;
          min-height: 480px;
        }
        @media (min-width: 900px) {
          .forty-hero-right {
            padding: 16px 24px 16px 12px;
            min-height: calc(100vh - 48px);
            max-height: 92vh;
          }
        }

        /* Top Bar */
        .forty-hero-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        @media (min-width: 900px) {
          .forty-hero-topbar {
            display: flex;
          }
        }
        .mufc-tag-clean {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #262626;
          background: rgba(38, 38, 38, 0.05);
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
        }
        .text-red {
          color: #c70101;
        }
        .forty-menu-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          color: #262626;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .forty-menu-btn:hover {
          background: #f0e9de;
          transform: scale(1.05);
        }

        /* Center Content */
        .forty-hero-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: auto 0;
          padding: 1.5rem 0;
        }
        .forty-celebrating-title {
          font-size: 2.2rem;
          font-weight: 400;
          color: #262626;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }
        @media (min-width: 768px) {
          .forty-celebrating-title {
            font-size: 3rem;
          }
        }
        @media (min-width: 1200px) {
          .forty-celebrating-title {
            font-size: 3.4rem;
          }
        }
        .forty-giant-number {
          font-size: clamp(6rem, 13vw, 13rem);
          font-weight: 400;
          color: #262626;
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin: 0.25rem 0 0.75rem;
          user-select: none;
        }
        .forty-headline-sub {
          font-size: 1.15rem;
          color: var(--text-secondary);
          font-style: italic;
          max-width: 440px;
        }
        @media (min-width: 768px) {
          .forty-headline-sub {
            font-size: 1.25rem;
          }
        }

        /* Bottom Bar */
        .forty-hero-bottombar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-top: 1rem;
        }
        .forty-date-text {
          font-size: 1.05rem;
          color: #262626;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .forty-pink-pill-btn {
          background-color: #ffccf6;
          color: #262626;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.75rem 1.6rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(255, 204, 246, 0.4);
        }
        .forty-pink-pill-btn:hover {
          filter: brightness(0.95);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(255, 204, 246, 0.6);
        }
      `}</style>
    </section>
  );
}
