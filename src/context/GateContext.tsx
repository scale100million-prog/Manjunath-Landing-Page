import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const WISTIA_MEDIA_ID = 'hp3uhhs1jy';
const GATE_ENABLED = false;

export interface GateContextType {
  watchedSeconds: Set<number>;
  isUnlocked: boolean;
  gateEnabled: boolean;
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
  const isUnlocked = !GATE_ENABLED || failOpen || watchedSeconds.size >= 60;
  const remaining = Math.max(0, 60 - watchedSeconds.size);

  // Helper to record watched time in seconds
  const recordTime = (t: number) => {
    if (typeof t !== 'number' || !Number.isFinite(t) || t < 0) return;
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
  };

  // Helper to read current video time from player handles safely without throwing
  const getCurrentTime = (): number | null => {
    // 1. (window as any)._wq handle stored in a ref from onReady
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
        if (typeof el.time === 'function') {
          const t = el.time();
          if (typeof t === 'number' && Number.isFinite(t)) {
            return t;
          }
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

    // 3. Fallback to Wistia.api ONLY if Wistia is confirmed initialized
    try {
      const wistiaObj = (window as any).Wistia;
      if (wistiaObj && wistiaObj._initialized === true && typeof wistiaObj.api === 'function') {
        const wistiaApi = wistiaObj.api(WISTIA_MEDIA_ID);
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
      }
    } catch (err) {
      // ignore
    }

    return null;
  };

  // Step 1: Hook _wq handle and custom element events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: WISTIA_MEDIA_ID,
      onReady: (video: any) => {
        wqHandleRef.current = video;
        handleFoundRef.current = true;
        setHandleFound(true);

        try {
          if (typeof video.bind === 'function') {
            video.bind('timechange', (t: number) => {
              recordTime(t);
            });
            video.bind('play', () => {
              setHasStartedPlaying(true);
            });
          }
        } catch (e) {
          // ignore
        }
      },
    });

    // Also attach listeners to <wistia-player> if present
    const el = document.querySelector('wistia-player');
    const handleTimeChange = (e: any) => {
      const t = e?.detail?.seconds ?? e?.detail?.time ?? (el as any)?.currentTime ?? (el as any)?.time?.();
      if (typeof t === 'number') {
        recordTime(t);
      }
    };
    const handlePlayEvent = () => {
      setHasStartedPlaying(true);
    };

    if (el) {
      el.addEventListener('timechange', handleTimeChange);
      el.addEventListener('play', handlePlayEvent);
    }

    return () => {
      if (el) {
        el.removeEventListener('timechange', handleTimeChange);
        el.removeEventListener('play', handlePlayEvent);
      }
    };
  }, []);

  // Step 2: The Polling Loop (250ms interval) as fallback tracker
  useEffect(() => {
    const id = setInterval(() => {
      const t = getCurrentTime();
      if (t === null) return; // handle not ready yet
      recordTime(t);
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

  // Method to trigger play on the video safely
  const playVideo = () => {
    setHasStartedPlaying(true);
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', 'VSLPlay');
      }
    } catch (e) {}

    // 1. Try the _wq onReady handle
    if (wqHandleRef.current && typeof wqHandleRef.current.play === 'function') {
      try {
        wqHandleRef.current.play();
        return;
      } catch (e) {}
    }

    // 2. Try the <wistia-player> DOM element
    try {
      const el = document.querySelector('wistia-player') as any;
      if (el && typeof el.play === 'function') {
        el.play();
        return;
      }
    } catch (e) {}

    // 3. Fallback to Wistia.api only if Wistia is initialized
    try {
      const wistiaObj = (window as any).Wistia;
      if (wistiaObj && wistiaObj._initialized === true && typeof wistiaObj.api === 'function') {
        const wistiaApi = wistiaObj.api(WISTIA_MEDIA_ID);
        if (wistiaApi && typeof wistiaApi.play === 'function') {
          wistiaApi.play();
          return;
        }
      }
    } catch (e) {}
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
    gateEnabled: GATE_ENABLED,
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
