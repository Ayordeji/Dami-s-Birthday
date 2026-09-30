import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WelcomeSurprise from './components/WelcomeSurprise';
import WifeTribute from './components/WifeTribute';
import DaughterTribute from './components/DaughterTribute';
import Gallery from './components/Gallery';
import TributeWall from './components/TributeWall';
import TributeModal from './components/TributeModal';
import KeepsakeView from './components/KeepsakeView';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import AdminModerationModal from './components/AdminModerationModal';
import { 
  getLocalTributes, 
  saveLocalTributes, 
  fetchTributes, 
  createTribute, 
  likeTributeInDb, 
  subscribeToRealtimeTributes,
  approveTributeInDb,
  hideTributeInDb,
  deleteTributeFromDb
} from './services/tributeService';

export default function App() {
  const [tributes, setTributes] = useState(getLocalTributes);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Check URL params for ?admin=true or ?review=true
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') || params.get('review')) {
        setIsAdminOpen(true);
      }
    } catch (e) {}
  }, []);

  // Load from Supabase on mount & subscribe to live Realtime updates
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const liveData = await fetchTributes();
      if (isMounted && liveData) {
        setTributes(liveData);
        saveLocalTributes(liveData);
      }
    }

    loadData();

    // Subscribe to incoming tributes from other visitors live
    const unsubscribe = subscribeToRealtimeTributes((newTribute) => {
      setTributes(prev => {
        if (prev.some(t => t.id === newTribute.id)) return prev;
        const updated = [newTribute, ...prev];
        saveLocalTributes(updated);
        return updated;
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleAddTribute = async (newTribute) => {
    // Save to state
    setTributes(prev => {
      const updated = [newTribute, ...prev];
      saveLocalTributes(updated);
      return updated;
    });

    // Persist to Supabase if connected
    const saved = await createTribute(newTribute);
    if (saved && saved.id !== newTribute.id) {
      setTributes(prev => prev.map(t => t.id === newTribute.id ? saved : t));
    }
  };

  const handleApproveTribute = (id) => {
    setTributes(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, isApproved: true, status: 'approved' } : t);
      saveLocalTributes(updated);
      return updated;
    });
    approveTributeInDb(id);
  };

  const handleToggleHideTribute = (id) => {
    setTributes(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, isApproved: false, status: 'pending' } : t);
      saveLocalTributes(updated);
      return updated;
    });
    hideTributeInDb(id);
  };

  const handleDeleteTribute = (id) => {
    setTributes(prev => {
      const updated = prev.filter(t => t.id !== id);
      saveLocalTributes(updated);
      return updated;
    });
    deleteTributeFromDb(id);
  };

  const handleLikeTribute = (id) => {
    let currentLikes = 0;
    setTributes(prev => {
      const updated = prev.map(t => {
        if (t.id === id) {
          currentLikes = t.likes || 0;
          return { ...t, likes: currentLikes + 1 };
        }
        return t;
      });
      saveLocalTributes(updated);
      return updated;
    });

    likeTributeInDb(id, currentLikes);
  };

  return (
    <div className="celebration-app">
      {/* Navigation (Floating pill & drawer) */}
      <Navbar 
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenKeepsake={() => setIsKeepsakeOpen(true)}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
      />

      {/* Hero Section (Matches forty.framer.website exactly) */}
      <Hero 
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenKeepsake={() => setIsKeepsakeOpen(true)}
        onToggleNav={() => setIsNavOpen(prev => !prev)}
        isNavOpen={isNavOpen}
      />

      {/* Birthday Surprise Welcome Letter */}
      <WelcomeSurprise />

      {/* Special Dedication: Dolapo (Wife) */}
      <WifeTribute />

      {/* Special Dedication: Odunmoluwa (Daughter) */}
      <DaughterTribute />

      {/* Photo Memory Stream */}
      <Gallery />

      {/* Tribute & Prayer Wall */}
      <TributeWall 
        tributes={tributes}
        onLikeTribute={handleLikeTribute}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Footer */}
      <Footer 
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Ambient Music Player */}
      <MusicPlayer />

      {/* Interactive Form Modal */}
      <TributeModal 
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onAddTribute={handleAddTribute}
      />

      {/* Printable Memory Book Modal */}
      <KeepsakeView 
        isOpen={isKeepsakeOpen}
        onClose={() => setIsKeepsakeOpen(false)}
        tributes={tributes}
      />

      {/* Dolapo Review & Moderation Panel */}
      <AdminModerationModal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        tributes={tributes}
        onApproveTribute={handleApproveTribute}
        onDeleteTribute={handleDeleteTribute}
        onToggleHideTribute={handleToggleHideTribute}
      />
    </div>
  );
}
