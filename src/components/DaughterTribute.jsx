import React, { useState } from 'react';
import { Heart, Smile, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DaughterTribute() {
  const [likes, setLikes] = useState(36);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffccf6', '#262626', '#e8e6d1']
      });
    }
  };

  return (
    <section className="section daughter-section">
      <div className="container">
        <div className="daughter-card-wrapper editorial-card">
          <div className="daughter-card-grid">

            {/* Left Column Message */}
            <div className="daughter-content-col">
              <div className="daughter-badge-wrap">
                <span className="section-badge daughter-badge">
                  <Star size={14} />
                  <span>Daddy's Little Princess</span>
                </span>
              </div>

              <h3 className="daughter-card-title font-serif">
                Happy Birthday, Daddy! 🍼
              </h3>

              <div className="daughter-letter-body font-serif">
                <p>
                  I may be too little to write this myself, but Mummy says I should tell you how much I love you.
                </p>
                <p>
                  Thank you for always carrying me, cuddling me, playing with me and making me feel so loved and safe. I love being your little girl, and I hope you know that you are already my favourite Daddy in the whole world. ❤️
                </p>
                <p>
                  I may not understand what birthdays are yet, but I know that today is a special day because it is the day my Daddy was born.
                </p>
                <div className="daughter-highlight font-sans">
                  “Mummy says you are a wonderful husband, but to me, you are simply <strong>Daddy</strong> — my safe place, my strong arms and the person who loves me so much.”
                </div>
                <p>
                  I pray that God keeps you for me for a very, very long time. May He bless you, protect you, make you happy and give you everything your heart desires.
                </p>
                <p style={{ fontStyle: 'italic', color: '#c70101', fontWeight: '500' }}>
                  I love you so much, Daddy. Happy Birthday to my first love. ❤️
                </p>
              </div>

              <div className="daughter-footer-wrap">
                <div className="daughter-sign font-script">
                  Love, your little girl, <span className="name-bold font-sans">Odunmoluwa 🥹💕</span>
                </div>

                <button
                  onClick={handleLike}
                  className={`btn-baby-heart ${hasLiked ? 'liked' : ''}`}
                >
                  <Smile size={18} />
                  <span>{likes} {hasLiked ? "Smiles Sent" : "Send a Hug"}</span>
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="daughter-media-col">
              <div className="daughter-image-frame">
                <img
                  src="/images/PS_Odun_and_Daddy3.webp"
                  alt="Dami and baby Odunmoluwa"
                  className="daughter-img"
                />
                <div className="daughter-image-caption">
                  <span>Pure Joy & Fatherly Love ✨</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .daughter-section {
          padding: 0.75rem 0 1.5rem;
        }
        @media (min-width: 768px) {
          .daughter-section {
            padding: 1rem 0 3rem;
          }
        }
        .daughter-card-wrapper {
          padding: 1.5rem 1.25rem;
          background: var(--bg-card-alt);
        }
        @media (min-width: 768px) {
          .daughter-card-wrapper {
            padding: 2.5rem 2.2rem;
          }
        }
        .daughter-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .daughter-card-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 3.5rem;
          }
        }
        .daughter-badge {
          background: #ffffff;
          border-color: var(--border-medium);
        }
        .daughter-card-title {
          font-size: 1.8rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .daughter-letter-body {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 1.8rem;
        }
        .daughter-highlight {
          color: var(--text-primary);
          background: #ffffff;
          border-left: 3px solid var(--text-primary);
          padding: 0.9rem 1.1rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .daughter-footer-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
        }
        .daughter-sign {
          font-size: 1.7rem;
          color: var(--text-primary);
        }
        .name-bold {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
          display: inline-block;
          margin-left: 0.3rem;
        }
        .btn-baby-heart {
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
        .btn-baby-heart:hover, .btn-baby-heart.liked {
          background: var(--accent-pink);
          transform: translateY(-1px);
        }
        .daughter-media-col {
          display: flex;
          justify-content: center;
        }
        .daughter-image-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-soft);
        }
        .daughter-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .daughter-image-frame:hover .daughter-img {
          transform: scale(1.03);
        }
        .daughter-image-caption {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(251, 245, 231, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 0.4rem 0.9rem;
          font-size: 0.8rem;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
}
