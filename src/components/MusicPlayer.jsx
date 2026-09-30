import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  const playCelebrationChord = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    const baseFreq = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 3.0);
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playCelebrationChord();
      intervalRef.current = setInterval(playCelebrationChord, 2200);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-floating-player">
      <button 
        onClick={toggleMusic} 
        className={`audio-btn ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? "Pause Ambient Music" : "Play Celebration Chimes"}
      >
        {isPlaying ? (
          <>
            <Volume2 size={16} />
            <span className="audio-label">Music On</span>
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

      <style>{`
        .audio-floating-player {
          position: fixed;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 100;
        }
        .audio-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #ffffff;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 0.6rem 1.1rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          transition: all 0.22s ease;
        }
        .audio-btn:hover {
          background: var(--bg-card);
          transform: translateY(-1px);
        }
        .sound-wave {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }
        .bar {
          width: 2.5px;
          background: var(--text-primary);
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
        @media (max-width: 640px) {
          .audio-label {
            display: none;
          }
          .audio-btn {
            padding: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
