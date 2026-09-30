import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Sparkles, Calendar, ArrowRight, Search, Quote, Sparkle, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES } from '../data/initialData';

export default function TributeWall({ tributes, onLikeTribute, onOpenSubmitModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTributes = tributes.filter(t => {
    const matchesCat = selectedCategory === 'all' || t.relationshipCategory === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.birthdayWish && t.birthdayWish.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.prayer && t.prayer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.threeWords && t.threeWords.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleLike = (id) => {
    onLikeTribute(id);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#262626', '#ffccf6', '#c70101']
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = parseInt(parts[1], 10) - 1;
        return `${parseInt(parts[2], 10)} ${months[monthIndex] || parts[1]}, ${parts[0]}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="tribute-wall" className="section tribute-wall-section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-badge">
            <MessageSquareHeart size={14} />
            <span>Heartfelt Words & Prayers</span>
          </span>
          <h2 className="section-heading font-serif">
            The Tribute & Prayer Wall
          </h2>
          <p className="section-subheading font-serif">
            Messages, prayers, and cherished memories shared by family, brethren, and friends from all over the world.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="tribute-controls-wrap">
          <div className="search-bar-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text"
              placeholder="Search by name, memory, or prayer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-pills-row">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Luxury Editorial Tribute Cards Grid */}
        <div className="tribute-cards-grid">
          {filteredTributes.map((tribute) => (
            <div 
              key={tribute.id} 
              className={`tribute-editorial-card ${tribute.isWife ? 'is-wife-card' : ''} ${tribute.isDaughter ? 'is-daughter-card' : ''}`}
            >
              
              {/* Card Header */}
              <div className="tribute-card-top">
                <div className="author-info-group">
                  <div className="author-avatar-badge">
                    {tribute.name.charAt(0)}
                  </div>
                  <div className="author-text-meta">
                    <h4 className="author-title font-serif">{tribute.name}</h4>
                    <span className="author-relationship-pill">{tribute.relationship}</span>
                  </div>
                </div>

                <div className="tribute-formatted-date font-sans">
                  {formatDate(tribute.date)}
                </div>
              </div>

              {/* 3 Words Tag - Chic Minimalist */}
              {tribute.threeWords && (
                <div className="three-words-editorial">
                  <span className="three-words-prefix">In 3 words:</span>
                  <span className="three-words-content font-serif">“{tribute.threeWords}”</span>
                </div>
              )}

              {/* Main Birthday Wish - Big Elegant Serif */}
              {tribute.birthdayWish && (
                <div className="main-wish-wrap">
                  <p className="main-wish-text font-serif">
                    “{tribute.birthdayWish}”
                  </p>
                </div>
              )}

              {/* Prayer Section - Warm Cream Container with subtle border */}
              {tribute.prayer && (
                <div className="editorial-prayer-box">
                  <div className="prayer-box-header">
                    <span className="prayer-label font-sans">🙏🏽 Prayer for this chapter</span>
                  </div>
                  <p className="prayer-body font-serif">
                    {tribute.prayer}
                  </p>
                </div>
              )}

              {/* What stands out / Appreciation */}
              {(tribute.standoutQuality || tribute.appreciation) && (
                <div className="editorial-detail-row">
                  <span className="detail-tag font-sans">✨ What stands out</span>
                  <p className="detail-text font-sans">
                    {tribute.standoutQuality || tribute.appreciation}
                  </p>
                </div>
              )}

              {/* 5-Year Time Capsule Note */}
              {tribute.futureMessage && (
                <div className="editorial-detail-row future-detail-row">
                  <span className="detail-tag font-sans">⏳ Note for 5 years later</span>
                  <p className="detail-text font-sans">
                    {tribute.futureMessage}
                  </p>
                </div>
              )}

              {/* Attached Photo */}
              {tribute.photoUrl && (
                <div className="attached-photo-frame">
                  <img src={tribute.photoUrl} alt="Memory with Damilola" />
                </div>
              )}

              {/* Card Footer with Heart Reaction */}
              <div className="tribute-card-bottom">
                <button 
                  onClick={() => handleLike(tribute.id)} 
                  className="heart-pill-action"
                  title="Send Love"
                >
                  <Heart size={15} fill="#c70101" color="#c70101" />
                  <span className="like-count">{tribute.likes || 0}</span>
                </button>

                <div className="tribute-card-tagline font-script">
                  Blessings & Love
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="cta-banner editorial-card">
          <div className="cta-content">
            <h3 className="cta-title font-serif">Have a word, memory, or prayer for Damilola?</h3>
            <p className="cta-subtitle font-serif">Your message will be preserved in his official birthday keepsake book forever.</p>
          </div>
          <button onClick={onOpenSubmitModal} className="btn btn-dark btn-lg">
            <span>Leave a Birthday Message</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        .tribute-wall-section {
          padding: 5rem 0 6rem;
        }
        .tribute-controls-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }
        .search-bar-wrap {
          position: relative;
          max-width: 460px;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          padding: 0.8rem 1.2rem 0.8rem 2.8rem;
          color: var(--text-primary);
          font-size: 0.92rem;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }
        .search-input:focus {
          border-color: var(--text-primary);
          box-shadow: 0 0 0 3px rgba(38, 38, 38, 0.06);
        }
        .category-pills-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
        }
        /* Masonry Multi-Column Grid (Lumon / Pinterest Style) */
        .tribute-cards-grid {
          column-count: 1;
          column-gap: 1.25rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 680px) {
          .tribute-cards-grid {
            column-count: 2;
            column-gap: 1.25rem;
          }
        }
        @media (min-width: 1040px) {
          .tribute-cards-grid {
            column-count: 3;
            column-gap: 1.25rem;
          }
        }

        /* Compact Masonry Editorial Tribute Card */
        .tribute-editorial-card {
          break-inside: avoid;
          page-break-inside: avoid;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.4rem;
          margin-bottom: 1.25rem;
          box-shadow: 0 3px 14px rgba(38, 38, 38, 0.03);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .tribute-editorial-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(38, 38, 38, 0.07);
          border-color: var(--border-medium);
        }
        .tribute-editorial-card.is-wife-card {
          background: #ffffff;
          border-color: rgba(199, 1, 1, 0.2);
          box-shadow: 0 4px 18px rgba(199, 1, 1, 0.05);
        }
        .tribute-editorial-card.is-daughter-card {
          background: #ffffff;
          border-color: rgba(255, 204, 246, 0.8);
          box-shadow: 0 4px 18px rgba(255, 204, 246, 0.15);
        }

        /* Card Top */
        .tribute-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .author-info-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .author-avatar-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          color: #262626;
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .author-text-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .author-title {
          font-size: 1.15rem;
          font-weight: 500;
          color: #262626;
          line-height: 1.2;
        }
        .author-relationship-pill {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .tribute-formatted-date {
          font-size: 0.78rem;
          color: var(--text-muted);
          white-space: nowrap;
          padding-top: 0.15rem;
        }

        /* 3 Words Tag */
        .three-words-editorial {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
          background: var(--bg-card);
          border-radius: var(--radius-full);
          padding: 0.35rem 0.85rem;
          width: fit-content;
        }
        .three-words-prefix {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .three-words-content {
          font-size: 0.9rem;
          color: #262626;
          font-style: italic;
        }

        /* Main Wish */
        .main-wish-wrap {
          padding: 0.1rem 0;
        }
        .main-wish-text {
          font-size: 1.08rem;
          line-height: 1.6;
          color: #262626;
          font-weight: 400;
        }

        /* Prayer Box */
        .editorial-prayer-box {
          background: var(--bg-canvas);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid #262626;
          border-radius: 0 10px 10px 0;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .prayer-box-header {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .prayer-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .prayer-body {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #333333;
          font-style: italic;
        }

        /* Detail Rows */
        .editorial-detail-row {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding-top: 0.5rem;
          border-top: 1px dashed var(--border-subtle);
        }
        .detail-tag {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .detail-text {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Attached Photo */
        .attached-photo-frame {
          border-radius: 12px;
          overflow: hidden;
          max-height: 220px;
          border: 1px solid var(--border-subtle);
        }
        .attached-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Card Bottom */
        .tribute-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }
        .heart-pill-action {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          color: #262626;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .heart-pill-action:hover {
          background: var(--accent-pink);
          transform: translateY(-1px);
        }
        .like-count {
          font-weight: 600;
        }
        .tribute-card-tagline {
          font-size: 1.35rem;
          color: var(--text-muted);
          opacity: 0.8;
        }

        /* CTA Banner */
        .cta-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 3.5rem 3rem;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
        }
        .cta-title {
          font-size: 1.8rem;
          color: #262626;
          margin-bottom: 0.3rem;
        }
        .cta-subtitle {
          color: var(--text-secondary);
          font-size: 1.05rem;
        }
        @media (max-width: 640px) {
          .cta-banner {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
