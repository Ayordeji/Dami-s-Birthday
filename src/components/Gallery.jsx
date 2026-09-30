import React, { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight, Maximize2, Tag, Heart } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/initialData';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const filterCategories = [
    { id: 'all', label: 'All Moments' },
    { id: 'recent', label: 'Portraits' },
    { id: 'dolapo_and_dami', label: 'Couple & Love' },
    { id: 'family', label: 'Family & Joy' },
    { id: 'ministry', label: 'Faith & Purpose' },
    { id: 'random', label: 'Candid & Smiles' }
  ];

  const filteredPhotos = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const togglePhotoLike = (e, id) => {
    e.stopPropagation();
    setLikedPhotos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="memories" className="section gallery-section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-badge">
            <Image size={14} />
            <span>Memory Lane</span>
          </span>
          <h2 className="section-heading font-serif">
            The Man Behind the Memories 📸
          </h2>
          <p className="section-subheading font-serif">
            A visual retrospective of joy, purpose, unforgettable milestones, and cherished moments through the years.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="gallery-filters">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`filter-pill ${selectedFilter === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="gallery-grid">
          {filteredPhotos.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-card editorial-card"
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-img-container">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="gallery-img"
                  loading="lazy"
                />
                
                <div className="gallery-card-meta">
                  <div className="meta-text">
                    <span className="meta-badge-text">{item.categoryLabel}</span>
                    <h4 className="meta-title font-serif">{item.title}</h4>
                  </div>

                  <button 
                    onClick={(e) => togglePhotoLike(e, item.id)}
                    className={`gallery-heart-btn ${likedPhotos[item.id] ? 'liked' : ''}`}
                    title="Like Photo"
                  >
                    <Heart 
                      size={16} 
                      fill={likedPhotos[item.id] ? "#c70101" : "none"} 
                      color={likedPhotos[item.id] ? "#c70101" : "#262626"} 
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={22} />
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={prevPhoto} aria-label="Previous Photo">
              <ChevronLeft size={28} />
            </button>

            <button className="lightbox-nav lightbox-next" onClick={nextPhoto} aria-label="Next Photo">
              <ChevronRight size={28} />
            </button>

            <div className="lightbox-content editorial-card">
              <div className="lightbox-media-wrap">
                <img 
                  src={filteredPhotos[activePhotoIndex].src} 
                  alt={filteredPhotos[activePhotoIndex].title}
                  className="lightbox-img"
                />
              </div>

              <div className="lightbox-info">
                <span className="section-badge">
                  {filteredPhotos[activePhotoIndex].categoryLabel}
                </span>
                <h3 className="lightbox-title font-serif">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <p className="lightbox-caption font-serif">
                  {filteredPhotos[activePhotoIndex].caption}
                </p>
                <div className="lightbox-counter">
                  Photo {activePhotoIndex + 1} of {filteredPhotos.length}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .gallery-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2.8rem;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }
        .gallery-card {
          cursor: pointer;
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 0.75rem;
          background: var(--bg-card);
        }
        .gallery-img-container {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .gallery-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: var(--radius-md);
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.02);
        }
        .gallery-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.2rem 0.4rem;
        }
        .meta-badge-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
        }
        .meta-title {
          font-size: 1.05rem;
          font-weight: 400;
          color: var(--text-primary);
        }
        .gallery-heart-btn {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .gallery-heart-btn:hover {
          background: var(--accent-pink);
          transform: scale(1.1);
        }

        /* Lightbox Modal */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(38, 38, 38, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .lightbox-container {
          position: relative;
          max-width: 960px;
          width: 100%;
          max-height: 90vh;
        }
        .lightbox-close {
          position: absolute;
          top: -3.2rem;
          right: 0;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }
        .lightbox-prev { left: -1.2rem; }
        .lightbox-next { right: -1.2rem; }
        @media (max-width: 640px) {
          .lightbox-prev { left: 0.5rem; }
          .lightbox-next { right: 0.5rem; }
        }
        .lightbox-content {
          display: grid;
          grid-template-columns: 1fr;
          background: var(--bg-canvas);
          border-radius: var(--radius-xl);
          overflow: hidden;
          max-height: 80vh;
          width: 100%;
        }
        @media (min-width: 768px) {
          .lightbox-content {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
        .lightbox-media-wrap {
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
        }
        .lightbox-info {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .lightbox-title {
          font-size: 1.6rem;
          color: var(--text-primary);
          margin: 1rem 0 0.8rem;
        }
        .lightbox-caption {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .lightbox-counter {
          font-size: 0.8rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
        }
      `}</style>
    </section>
  );
}
