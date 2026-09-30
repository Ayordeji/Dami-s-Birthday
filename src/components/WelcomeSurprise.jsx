import React from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';

export default function WelcomeSurprise() {
  return (
    <section className="section welcome-surprise-section">
      <div className="container">
        <div className="welcome-card editorial-card">
          
          <div className="welcome-badge-row">
            <span className="welcome-badge">
              <Crown size={14} className="crown-gold" />
              <span>A Special Surprise For Dami (Kabiyesi) 👑</span>
            </span>
          </div>

          <h2 className="welcome-heading font-serif">
            Kabiyesi 👑, this is a little corner created just for you. ❤️
          </h2>

          <div className="welcome-letter-body font-serif">
            <p className="lead-paragraph">
              Some people come into our lives and leave memories behind. Some become a part of our everyday lives, our stories, our prayers, and our hearts.
            </p>
            
            <p>
              Today, we celebrate one of those special people.
            </p>

            <p>
              This is a place where the people who love you, appreciate you, look up to you, and have been blessed by knowing you can pause for a moment and tell you what you mean to them. There are words that sometimes go unsaid, prayers that deserve to be spoken, memories worth remembering, and wishes that deserve to be heard.
            </p>

            <p>
              So, on your birthday, we’ve gathered a few of those words here just for you.
            </p>

            <div className="welcome-highlight-box font-sans">
              <p>
                Take your time. Read them. Smile. Laugh.
              </p>
              <p className="highlight-strong">
                “You are loved. You are appreciated. You are celebrated. And your life is a blessing to more people than you probably realise.”
              </p>
            </div>

            <p className="welcome-signature font-script">
              Welcome to your little birthday surprise. 🎉❤️
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .welcome-surprise-section {
          padding: 1.25rem 0 1.5rem;
        }
        @media (min-width: 768px) {
          .welcome-surprise-section {
            padding: 2rem 0 2.5rem;
          }
        }
        .welcome-card {
          padding: 2.2rem 1.6rem;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xl);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .welcome-card {
            padding: 3.5rem 3rem;
          }
        }
        .welcome-badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #ffccf6;
          color: #262626;
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .crown-gold {
          color: #b78103;
        }
        .welcome-heading {
          font-size: 1.85rem;
          color: #262626;
          line-height: 1.25;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        @media (min-width: 768px) {
          .welcome-heading {
            font-size: 2.6rem;
            margin-bottom: 2rem;
          }
        }
        .welcome-letter-body {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #444444;
          max-width: 740px;
          margin: 0 auto;
          text-align: left;
        }
        @media (min-width: 768px) {
          .welcome-letter-body {
            font-size: 1.2rem;
            line-height: 1.85;
          }
        }
        .lead-paragraph {
          font-size: 1.15rem;
          color: #262626;
        }
        @media (min-width: 768px) {
          .lead-paragraph {
            font-size: 1.25rem;
          }
        }
        .welcome-highlight-box {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-left: 4px solid #262626;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          padding: 1.25rem 1.5rem;
          margin: 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.98rem;
          color: #262626;
        }
        .highlight-strong {
          font-weight: 600;
          font-size: 1.05rem;
          color: #262626;
          line-height: 1.5;
        }
        .welcome-signature {
          font-size: 1.8rem;
          color: #c70101;
          text-align: center;
          margin-top: 0.75rem;
        }
        @media (min-width: 768px) {
          .welcome-signature {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
