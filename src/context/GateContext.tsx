import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const WISTIA_MEDIA_ID = 'hp3uhhs1jy';

export interface GateContextType {
  watchedSeconds: Set<number>;
  isUnlocked: boolean;
  remaining: number;
  handleFound: boolean;
  hasStartedPlaying: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleModalWatchVideo: () => void;
  playVideo: () => void;
}

const GateContext = createContext<GateContextType | null>(null);

export const useGate = (): GateContextType => {
  const context = useContext(GateContext);
  if (!context) {
    throw new Error('useGate must be used within a GateProvider');
  }
  return context;
};

export const GateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Restore watched seconds from sessionStorage on mount (v2 key, wipe old key)
  const [watchedSeconds, setWatchedSeconds] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set<number>();
    try {
      sessionStorage.removeItem('pbos_watched');
      const stored = sessionStorage.getItem('pbos_watched_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const validNumbers = parsed
            .filter((n: any) => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 3600);
          return new Set<number>(validNumbers);
        }
      }
    } catch (err) {
      console.error(err);
    }
    return new Set<number>();
  });

  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(() => watchedSeconds.size > 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handleFound, setHandleFound] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  const wqHandleRef = useRef<any>(null);
  const handleFoundRef = useRef(false);
  const hasFiredUnlockedEventRef = useRef(false);
  const previousUnlockedStateRef = useRef(watchedSeconds.size >= 60);

  // Derived values computed fresh on every render
  const isUnlocked = failOpen || watchedSeconds.size >= 60;
  const remaining = Math.max(0, 60 - watchedSeconds.size);

  // Helper to read current video time from player handles
  const getCurrentTime = (): number | null => {
    // 1. (window as any).Wistia?.api?.("hp3uhhs1jy")
    try {
      const wistiaApi = (window as any).Wistia?.api?.(WISTIA_MEDIA_ID);
      if (wistiaApi) {
        if (!handleFoundRef.current) {
          handleFoundRef.current = true;
          setHandleFound(true);
        }
        if (typeof wistiaApi.time === 'function') {
          const t = wistiaApi.time();
          if (typeof t === 'number' && Number.isFinite(t)) {
            return t;
          }
        }
      }
    } catch (err) {
      // ignore
    }

    // 2. document.querySelector('wistia-player')
    try {
      const el = document.querySelector('wistia-player') as any;
      if (el) {
        if (!handleFoundRef.current) {
          handleFoundRef.current = true;
          setHandleFound(true);
        }
        if (typeof el.currentTime === 'number' && Number.isFinite(el.currentTime)) {
          return el.currentTime;
        }
        if (el.video && typeof el.video.time === 'function') {
          const t = el.video.time();
          if (typeof t === 'number' && Number.isFinite(t)) {
            return t;
          }
        }
      }
    } catch (err) {
      // ignore
    }

    // 3. (window as any)._wq handle stored in a ref from onReady
    if (wqHandleRef.current) {
      try {
        const v = wqHandleRef.current;
        if (!handleFoundRef.current) {
          handleFoundRef.current = true;
          setHandleFound(true);
        }
        if (typeof v.time === 'function') {
          const t = v.time();
          if (typeof t === 'number' && Number.isFinite(t)) {
            return t;
          }
        }
      } catch (err) {
        // ignore
      }
    }

    return null;
  };

  // Step 1: Hook _wq handle in ref
  useEffect(() => {
    if (typeof window === 'undefined') return;
    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: WISTIA_MEDIA_ID,
      onReady: (video: any) => {
        wqHandleRef.current = video;
        handleFoundRef.current = true;
        setHandleFound(true);
      },
    });
  }, []);

  // Step 2: The Polling Loop (250ms interval)
  useEffect(() => {
    const id = setInterval(() => {
      const t = getCurrentTime();
      if (t === null) return; // handle not ready yet

      const sec = Math.floor(t);
      if (!Number.isFinite(sec) || sec < 0) return;

      setHasStartedPlaying(true);
      setWatchedSeconds((prev) => {
        if (prev.has(sec)) return prev;
        const next = new Set(prev);
        next.add(sec);
        try {
          const arr = Array.from(next).filter((n) => typeof n === 'number' && Number.isFinite(n));
          sessionStorage.setItem('pbos_watched_v2', JSON.stringify(arr));
        } catch (err) {
          console.error(err);
        }
        return next;
      });
    }, 250);

    return () => clearInterval(id);
  }, []);

  // Step 6: Fail Open after 15s if no handle found
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!handleFoundRef.current) {
        console.warn('No Wistia player handle found within 15s, failing open.');
        setFailOpen(true);
      }
    }, 15000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Pixel event when unlocked
  useEffect(() => {
    if (isUnlocked && !previousUnlockedStateRef.current) {
      previousUnlockedStateRef.current = true;
      if (!hasFiredUnlockedEventRef.current) {
        hasFiredUnlockedEventRef.current = true;
        try {
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('trackCustom', 'VSLUnlocked');
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [isUnlocked]);

  // Method to trigger play on the video
  const playVideo = () => {
    setHasStartedPlaying(true);
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', 'VSLPlay');
      }
    } catch (e) {}

    try {
      const wistiaApi = (window as any).Wistia?.api?.(WISTIA_MEDIA_ID);
      if (wistiaApi && typeof wistiaApi.play === 'function') {
        wistiaApi.play();
        return;
      }
    } catch (e) {}

    try {
      const el = document.querySelector('wistia-player') as any;
      if (el && typeof el.play === 'function') {
        el.play();
        return;
      }
    } catch (e) {}

    if (wqHandleRef.current && typeof wqHandleRef.current.play === 'function') {
      try {
        wqHandleRef.current.play();
      } catch (e) {}
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleModalWatchVideo = () => {
    setIsModalOpen(false);
    const videoEl = document.getElementById('vsl-video-container');
    if (videoEl) {
      videoEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    playVideo();
  };

  // Rebuilt context value on every render so consumers re-render automatically
  const contextValue: GateContextType = {
    watchedSeconds,
    isUnlocked,
    remaining,
    handleFound,
    hasStartedPlaying,
    isModalOpen,
    openModal,
    closeModal,
    handleModalWatchVideo,
    playVideo,
  };

  return (
    <GateContext.Provider value={contextValue}>
      {children}
    </GateContext.Provider>
  );
};
