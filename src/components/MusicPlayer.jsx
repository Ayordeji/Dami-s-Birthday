import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, SkipForward, Music, Disc } from 'lucide-react';

const PLAYLIST = [
  {
    id: 'track-1',
    title: 'Make You Feel My Love',
    artist: 'Anendlessocean',
    src: '/audio/Anendlessocean_Make_You_Feel_My_Love.mp3'
  },
  {
    id: 'track-2',
    title: 'Revival',
    artist: 'Anendlessocean',
    src: '/audio/Anendlessocean_Revival.mp3'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Autoplay blocked by browser until user gesture:', err);
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const nextTrack = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
  };

  const selectTrack = (idx) => {
    setCurrentTrackIndex(idx);
    setIsMenuOpen(false);
  };

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      playAudio();
    }
  }, [currentTrackIndex]);

  // Autoplay attempt on mount & auto-resume on first interaction
  useEffect(() => {
    playAudio();

    const unlockEvents = ['click', 'touchstart', 'scroll', 'keydown'];
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio();
      }
      unlockEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
    };

    unlockEvents.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { passive: true }));

    return () => {
      unlockEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
    };
  }, []);

  return (
    <div className="audio-floating-player">
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        loop={false}
        onEnded={nextTrack}
        preload="auto"
      />

      {/* Track Selector Popup Menu */}
      {isMenuOpen && (
        <div className="track-menu-popup">
          <div className="track-menu-header">
            <Music size={13} />
            <span>Celebration Playlist</span>
          </div>
          {PLAYLIST.map((track, i) => (
            <button
              key={track.id}
              onClick={() => selectTrack(i)}
              className={`track-item-btn ${i === currentTrackIndex ? 'active' : ''}`}
            >
              <Disc size={13} className={i === currentTrackIndex && isPlaying ? 'spin-slow' : ''} />
              <div className="track-info">
                <span className="track-name">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main Floating Pill Button */}
      <div className="audio-pill-wrap">
        <button 
          onClick={togglePlay} 
          className={`audio-btn ${isPlaying ? 'playing' : ''}`}
          title={isPlaying ? `Pause (${currentTrack.title})` : `Play (${currentTrack.title})`}
        >
          {isPlaying ? (
            <>
              <Volume2 size={16} />
              <div className="audio-text-group" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(prev => !prev); }}>
                <span className="audio-title">{currentTrack.title}</span>
                <span className="audio-artist">{currentTrack.artist}</span>
              </div>
              <div className="sound-wave">
                <span className="bar b1"></span>
                <span className="bar b2"></span>
                <span className="bar b3"></span>
              </div>
            </>
          ) : (
            <>
              <VolumeX size={16} />
              <span className="audio-label">Play Music 🎵</span>
            </>
          )}
        </button>

        {/* Next Song Button */}
        <button 
          onClick={nextTrack} 
          className="audio-next-btn"
          title="Next Track (Anendlessocean)"
        >
          <SkipForward size={14} />
        </button>
      </div>

      <style>{`
        .audio-floating-player {
          position: fixed;
          bottom: 1.25rem;
          left: 1.25rem;
          z-index: 1000;
        }
        .audio-pill-wrap {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          padding: 0.3rem 0.4rem 0.3rem 0.5rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.22s ease;
        }
        .audio-pill-wrap:hover {
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
        }
        .audio-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: transparent;
          border: none;
          color: var(--text-primary);
          padding: 0.3rem 0.5rem;
          border-radius: var(--radius-full);
          cursor: pointer;
        }
        .audio-text-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          line-height: 1.15;
          cursor: pointer;
        }
        .audio-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #262626;
          white-space: nowrap;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .audio-artist {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
        .audio-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: #262626;
        }
        .audio-next-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #262626;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audio-next-btn:hover {
          background: #ffccf6;
          border-color: #ffccf6;
        }
        .sound-wave {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
          margin-left: 0.2rem;
        }
        .bar {
          width: 2.5px;
          background: #262626;
          border-radius: 1px;
          animation: wave 1s infinite ease-in-out alternate;
        }
        .b1 { height: 40%; animation-delay: 0.1s; }
        .b2 { height: 90%; animation-delay: 0.3s; }
        .b3 { height: 60%; animation-delay: 0.2s; }
        @keyframes wave {
          0% { height: 20%; }
          100% { height: 100%; }
        }
        .track-menu-popup {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 0;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 0.6rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          width: 240px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          animation: fadeIn 0.2s ease;
        }
        .track-menu-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.4rem 0.4rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .track-item-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.6rem;
          border-radius: var(--radius-md);
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: background 0.15s ease;
        }
        .track-item-btn:hover {
          background: var(--bg-card);
        }
        .track-item-btn.active {
          background: #fff8e1;
          color: #262626;
        }
        .track-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .track-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #262626;
        }
        .track-artist {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .audio-artist {
            display: none;
          }
          .audio-title {
            max-width: 110px;
          }
        }
      `}</style>
    </div>
  );
}
