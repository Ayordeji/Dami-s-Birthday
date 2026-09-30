import React, { useState } from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WifeTribute() {
  const [likes, setLikes] = useState(48);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#262626', '#ffccf6', '#c70101']
      });
    }
  };

  return (
    <section id="special-tributes" className="section wife-section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-badge">
            <Heart size={14} fill="#c70101" color="#c70101" />
            <span>A Special Tribute</span>
          </span>
          <h2 className="section-heading font-serif">
            From the Woman Who Gets to Call You Husband
          </h2>
          <p className="section-subheading font-serif">
            A love letter of gratitude, devotion, and prayers for an exceptional partner.
          </p>
        </div>

        <div className="wife-card-wrapper editorial-card">
          <div className="wife-card-grid">
            
            {/* Left Photo */}
            <div className="wife-media-col">
              <div className="wife-image-frame">
                <img 
                  src="/images/PS_Dami_and_Dolapo1.webp" 
                  alt="Dami and Dolapo" 
                  className="wife-couple-img"
                />
                <div className="wife-image-overlay">
                  <span className="wife-tag-badge">
                    <Sparkles size={13} />
                    <span>Dami & Dolapo • Husband & Wife</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Letter Body */}
            <div className="wife-content-col">
              <div className="quote-icon-wrap">
                <Quote size={36} className="quote-icon" />
              </div>

              <h3 className="wife-card-title font-serif">
                Oluwadamilola,
              </h3>

              <div className="wife-letter-body font-serif">
                <p className="font-script intro-sweetness" style={{ fontSize: '1.45rem', color: '#c70101', margin: '0 0 0.5rem' }}>
                  Oh, how sweet is your love.
                </p>
                <p>
                  Sometimes I sit back and think about how far we’ve come, and I’m genuinely grateful that God chose you for me. From being my husband to becoming my best friend, my safe place, my biggest cheerleader, and now the most amazing father to our little girl, watching you grow into all these roles has been one of the most beautiful things for me.
                </p>
                <p>
                  You are not perfect, and neither am I, but I love that we get to do life together. Through the good days, the stressful days, the laughter, the disagreements, the prayers, and all the little moments in between, I would still choose you.
                </p>
                <p>
                  Thank you for loving me in the ways you do. Thank you for being patient with me, for showing up, for caring, for praying, and for being the man you are. And thank you for being such a beautiful father to Odunmoluwa. Watching you with her is one of those things that makes my heart so full. ❤️
                </p>
                <div className="wife-prayer-highlight font-sans">
                  <strong>My Prayer For You:</strong> I pray that this new year brings you closer to everything God has prepared for you. May God strengthen you, enlarge you, bless the work of your hands, and give you wisdom for every season ahead. May you never lack help, favour, peace, or genuine people around you. May you continue to grow into the man God has called you to be, and always have the grace to fulfil your purpose.
                </div>
                <p>
                  I’m proud of you, Dami. More than I probably say. And if I had to do this life all over again, I would still want it to be with you.
                </p>
                <p style={{ fontStyle: 'italic', fontWeight: '500', color: 'var(--text-primary)' }}>
                  Happy Birthday, my love. ❤️
                </p>
              </div>

              <div className="wife-signature-wrap">
                <div className="wife-sign-text">
                  <span className="font-script sign-name">Forever your girl,</span>
                  <strong className="sign-author font-sans">Your wife (Dolapo) ❤️</strong>
                </div>

                <button 
                  onClick={handleLike} 
                  className={`btn-wife-heart ${hasLiked ? 'liked' : ''}`}
                  title="Send Love to the Couple"
                >
                  <Heart size={16} fill={hasLiked ? "#c70101" : "none"} color={hasLiked ? "#c70101" : "#262626"} />
                  <span>{likes} {hasLiked ? "Loved" : "Send Love"}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      <style>{`
        .wife-section {
          position: relative;
          z-index: 2;
          padding: 1.25rem 0 1.5rem;
          clear: both;
        }
        @media (min-width: 768px) {
          .wife-section {
            padding: 2.5rem 0 3rem;
          }
        }
        .wife-card-wrapper {
          padding: 1.5rem 1.25rem;
          background: var(--bg-card);
        }
        @media (min-width: 768px) {
          .wife-card-wrapper {
            padding: 2.5rem 2.2rem;
          }
        }
        .wife-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .wife-card-grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 3.5rem;
          }
        }
        .wife-media-col {
          display: flex;
          justify-content: center;
        }
        .wife-image-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card-alt);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-soft);
        }
        .wife-couple-img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .wife-image-frame:hover .wife-couple-img {
          transform: scale(1.03);
        }
        .wife-image-overlay {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          justify-content: center;
        }
        .wife-tag-badge {
          background: rgba(251, 245, 231, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.4rem 0.95rem;
          color: var(--text-primary);
          font-size: 0.8rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .quote-icon-wrap {
          color: var(--text-muted);
          opacity: 0.6;
          margin-bottom: 0.5rem;
        }
        .wife-card-title {
          font-size: 1.8rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .wife-letter-body {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }
        .wife-prayer-highlight {
          color: var(--text-primary);
          background: var(--bg-card-alt);
          border-left: 3px solid var(--text-primary);
          padding: 1rem 1.2rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: 0.95rem;
          line-height: 1.65;
        }
        .wife-signature-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
        }
        .sign-name {
          font-size: 1.8rem;
          color: var(--text-primary);
          display: block;
          line-height: 1.1;
        }
        .sign-author {
          font-size: 0.95rem;
          color: var(--text-secondary);
          display: block;
        }
        .btn-wife-heart {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 0.55rem 1.2rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-wife-heart:hover, .btn-wife-heart.liked {
          background: var(--accent-pink);
          border-color: rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
