import React from 'react';
import { X, Printer, BookOpen, Heart } from 'lucide-react';
import { CELEBRANT_INFO, GALLERY_ITEMS } from '../data/initialData';

export default function KeepsakeView({ isOpen, onClose, tributes }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="keepsake-modal-backdrop" onClick={onClose}>
      <div className="keepsake-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Action Bar */}
        <div className="keepsake-toolbar">
          <div className="toolbar-left">
            <BookOpen size={18} />
            <span className="toolbar-title font-serif">The Keepsake Memory Book</span>
          </div>

          <div className="toolbar-actions">
            <button onClick={handlePrint} className="btn btn-dark btn-sm print-action-btn">
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={onClose} className="btn-close-keepsake">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Memory Book Layout */}
        <div className="keepsake-book-paper">
          
          {/* Cover Page */}
          <div className="book-cover-page">
            <div className="cover-ornament top-ornament">✦ ✦ ✦</div>
            <span className="cover-badge font-sans">A CELEBRATION OF LIFE & PURPOSE</span>
            <h1 className="cover-title font-serif">Oluwadamilola Arilewola</h1>
            <div className="cover-headline font-serif">“Celebrating a Man Worth Celebrating ❤️”</div>
            <div className="cover-date">21 October, 2026 • Official Keepsake</div>
            <div className="cover-divider"></div>

            <div className="cover-portrait-frame">
              <img src="/images/IMG_9182.webp" alt="Oluwadamilola" className="cover-portrait" />
            </div>

            <div className="cover-curated-by font-serif">
              Curated with love by Dolapo, Odunmoluwa, Family & Friends
            </div>
            <div className="cover-ornament bottom-ornament">✦ ✦ ✦</div>
          </div>

          {/* Wife's Dedication Page */}
          <div className="book-page">
            <div className="page-header">
              <span className="page-num">Special Dedication</span>
              <span className="page-tag">From The Wife</span>
            </div>

            <h2 className="book-page-title font-serif">
              From the Woman Who Gets to Call You Husband
            </h2>

            <div className="wife-dedication-layout">
              <img src="/images/IMG_9174.webp" alt="Dolapo and Dami" className="book-inline-img" />
              <div className="book-text-body font-serif">
                <p>
                  Walking by your side is one of God's greatest blessings in my life. You are a man of profound wisdom, boundless patience, unwavering integrity, and a heart that loves so deeply. Every day, I watch you show up for our family with strength, gentleness, and grace.
                </p>
                <p>
                  Thank you for being my anchor, my best friend, my greatest cheerleader, and the most incredible father to Odunmoluwa. Watching you hold her and guide our home brings tears of joy to my eyes.
                </p>
                <p className="book-prayer-box font-sans">
                  <strong>My Birthday Prayer For You:</strong><br />
                  As you mark this special milestone, my prayer is that the Lord enlarges your coast, grants you the deepest desires of your heart, surrounds you with favour as with a shield, and satisfies you with long life, joy, and unfailing peace.
                </p>
                <div className="book-sign">
                  <em>With all my love forever,</em><br />
                  <strong>Dolapo (Your Wife)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Daughter's Dedication Page */}
          <div className="book-page">
            <div className="page-header">
              <span className="page-num">Father & Daughter</span>
              <span className="page-tag">From Odunmoluwa</span>
            </div>

            <h2 className="book-page-title font-serif">
              From Your Little Blessing, Odunmoluwa 🍼
            </h2>

            <div className="wife-dedication-layout">
              <img src="/images/IMG_family_navy_suit_daughter.webp" alt="Odunmoluwa & Dami" className="book-inline-img" />
              <div className="book-text-body font-serif">
                <p>To the best Daddy in the whole wide world! 🌟</p>
                <p>
                  Thank you for all the warm hugs, the playful laughs, the piggyback rides, and the way you always make Mommy and me smile so brightly. I am so blessed to have you as my Daddy!
                </p>
                <p className="book-prayer-box font-sans">
                  “I may be little now, but I already know that I have the greatest, sweetest, and coolest Daddy ever! Happy Birthday Daddy!” 💕
                </p>
                <div className="book-sign">
                  <em>All my baby love & kisses,</em><br />
                  <strong>Odunmoluwa 👶</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid in Book */}
          <div className="book-page">
            <div className="page-header">
              <span className="page-num">Visual Journey</span>
              <span className="page-tag">Memories Through Time</span>
            </div>

            <h2 className="book-page-title font-serif">The Man Behind the Memories</h2>

            <div className="book-photo-grid">
              {GALLERY_ITEMS.slice(0, 8).map(item => (
                <div key={item.id} className="book-photo-item">
                  <img src={item.src} alt={item.title} />
                  <span className="book-photo-caption font-sans">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Tributes in Book */}
          <div className="book-page">
            <div className="page-header">
              <span className="page-num">Words of Love & Honor</span>
              <span className="page-tag">Tributes & Prayers</span>
            </div>

            <h2 className="book-page-title font-serif">Tributes, Prayers & Wishes</h2>

            <div className="book-tributes-list">
              {tributes.map((tribute, idx) => (
                <div key={tribute.id || idx} className="book-tribute-entry">
                  <div className="entry-header">
                    <strong>{tribute.name}</strong>
                    <span className="entry-rel font-sans">({tribute.relationship})</span>
                  </div>

                  {tribute.threeWords && (
                    <div className="entry-3words font-sans">
                      <em>In 3 Words:</em> {tribute.threeWords}
                    </div>
                  )}

                  {tribute.birthdayWish && (
                    <p className="entry-wish font-serif">
                      “{tribute.birthdayWish}”
                    </p>
                  )}

                  {tribute.prayer && (
                    <div className="entry-prayer font-sans">
                      <strong>Prayer:</strong> {tribute.prayer}
                    </div>
                  )}

                  {tribute.futureMessage && (
                    <div className="entry-future font-sans">
                      <strong>5-Year Capsule:</strong> {tribute.futureMessage}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Back Cover */}
          <div className="book-back-cover font-serif">
            <div className="back-ornament">✦ ✦ ✦</div>
            <p>
              “The Lord bless you and keep you; The Lord make His face shine upon you, and be gracious to you; The Lord lift up His countenance upon you, and give you peace.”
            </p>
            <span className="bible-verse font-serif">— Numbers 6:24-26</span>
            <div className="back-tagline font-sans">
              Happy Birthday Damilola! ❤️ Glory Glory Man United 🔴
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .keepsake-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(38, 38, 38, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 1200;
          display: flex;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
        }
        .keepsake-dialog {
          width: 100%;
          max-width: 850px;
          margin: auto;
          position: relative;
        }
        .keepsake-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          padding: 1rem 1.5rem;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .toolbar-title {
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .btn-close-keepsake {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .keepsake-book-paper {
          background: #ffffff;
          color: #262626;
          padding: 3.5rem 3rem;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .book-cover-page {
          text-align: center;
          padding: 3rem 1rem 4rem;
          border-bottom: 2px solid var(--border-subtle);
          margin-bottom: 3.5rem;
        }
        .cover-ornament {
          color: #c29b38;
          letter-spacing: 0.5em;
          margin: 1rem 0;
        }
        .cover-badge {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: #737373;
          display: block;
          margin-bottom: 0.5rem;
        }
        .cover-title {
          font-size: 2.5rem;
          color: #262626;
          margin-bottom: 0.4rem;
        }
        .cover-headline {
          font-size: 1.3rem;
          color: #737373;
          font-style: italic;
          margin-bottom: 0.4rem;
        }
        .cover-date {
          font-size: 0.9rem;
          color: #737373;
          margin-bottom: 1.5rem;
        }
        .cover-divider {
          width: 80px;
          height: 1px;
          background: var(--text-primary);
          margin: 0 auto 2rem;
        }
        .cover-portrait-frame {
          max-width: 280px;
          margin: 0 auto 2rem;
          border: 4px solid var(--bg-card);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          border-radius: 8px;
          overflow: hidden;
        }
        .cover-portrait {
          width: 100%;
          height: 340px;
          object-fit: cover;
          display: block;
        }
        .cover-curated-by {
          color: #737373;
          font-size: 1rem;
        }

        .book-page {
          margin-bottom: 3.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #737373;
          margin-bottom: 1rem;
        }
        .book-page-title {
          font-size: 1.6rem;
          color: #262626;
          margin-bottom: 1.5rem;
        }
        .wife-dedication-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: flex-start;
        }
        @media (min-width: 640px) {
          .wife-dedication-layout {
            grid-template-columns: 220px 1fr;
          }
        }
        .book-inline-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
        }
        .book-text-body {
          font-size: 1rem;
          line-height: 1.75;
          color: #4a4a4a;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .book-prayer-box {
          background: var(--bg-card);
          border-left: 3px solid #262626;
          padding: 0.8rem 1rem;
          border-radius: 4px;
          color: #262626;
          font-size: 0.92rem;
        }
        .book-sign {
          margin-top: 0.5rem;
          color: #262626;
        }

        .book-photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .book-photo-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .book-photo-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 6px;
        }
        .book-photo-caption {
          font-size: 0.75rem;
          color: #737373;
          display: block;
          margin-top: 0.3rem;
          text-align: center;
        }

        .book-tributes-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .book-tribute-entry {
          background: var(--bg-canvas);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 1.25rem;
        }
        .entry-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }
        .entry-header strong {
          color: #262626;
        }
        .entry-rel {
          color: #737373;
          font-size: 0.85rem;
        }
        .entry-3words {
          font-size: 0.85rem;
          color: #737373;
          margin-bottom: 0.5rem;
        }
        .entry-wish {
          font-size: 1rem;
          color: #262626;
          line-height: 1.6;
          margin-bottom: 0.6rem;
        }
        .entry-prayer {
          font-size: 0.9rem;
          color: #1e3a8a;
          background: #eff6ff;
          padding: 0.5rem 0.8rem;
          border-radius: 4px;
          margin-bottom: 0.4rem;
        }
        .entry-future {
          font-size: 0.88rem;
          color: #581c87;
          background: #faf5ff;
          padding: 0.5rem 0.8rem;
          border-radius: 4px;
        }

        .book-back-cover {
          text-align: center;
          padding: 3rem 1.5rem 1rem;
          color: #737373;
        }
        .back-ornament {
          color: #c29b38;
          letter-spacing: 0.5em;
          margin-bottom: 1.5rem;
        }
        .bible-verse {
          display: block;
          margin: 0.8rem 0 1.5rem;
          color: #262626;
          font-weight: 500;
        }
        .back-tagline {
          font-size: 0.9rem;
          color: #737373;
        }
      `}</style>
    </div>
  );
}
