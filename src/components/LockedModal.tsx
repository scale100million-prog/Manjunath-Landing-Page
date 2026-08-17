import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { useGate } from '../context/GateContext';

interface LockedModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  watchedCount?: number;
  onWatchVideo?: () => void;
}

export const LockedModal: React.FC<LockedModalProps> = ({
  isOpen: isOpenProp,
  onClose: onCloseProp,
  watchedCount: watchedCountProp,
  onWatchVideo: onWatchVideoProp,
}) => {
  const gate = useGate();
  const isOpen = isOpenProp !== undefined ? isOpenProp : gate.isModalOpen;
  const onClose = onCloseProp !== undefined ? onCloseProp : gate.closeModal;
  const watchedCount = watchedCountProp !== undefined ? watchedCountProp : gate.watchedSeconds.size;
  const onWatchVideo = onWatchVideoProp !== undefined ? onWatchVideoProp : gate.handleModalWatchVideo;

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const secondsLeft = Math.max(0, 60 - watchedCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="locked-modal-overlay"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F0F1A]/75 backdrop-blur-[8px]"
        >
          <motion.div
            id="locked-modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[460px] bg-white rounded-[24px] p-[36px] sm:p-[40px] shadow-[0_24px_60px_rgba(0,0,0,0.25)] flex flex-col items-center text-center"
          >
            {/* Icon at top: 56px circle, #E24A17 at 10% opacity, play triangle in #E24A17 */}
            <div className="w-[56px] h-[56px] rounded-full bg-[#E24A17]/10 flex items-center justify-center mb-6 shrink-0">
              <Play className="w-6 h-6 text-[#E24A17] fill-[#E24A17] ml-0.5" />
            </div>

            {/* Headline: 22px extrabold #1A1A2E, centered */}
            <h3 className="text-[22px] font-extrabold text-[#1A1A2E] leading-tight">
              Please watch the video first.
            </h3>

            {/* Body: 16px #4A4B65, centered, 16px below headline */}
            <p className="mt-[16px] text-[16px] text-[#4A4B65] leading-relaxed">
              Watch the video and your consultation unlocks automatically.
            </p>

            {/* Live counter: 14px bold #E24A17, 20px below body */}
            <p className="mt-[20px] text-[14px] font-bold text-[#E24A17]">
              {secondsLeft} seconds left to unlock
            </p>

            {/* Primary modal button: 28px below counter */}
            <div className="mt-[28px] w-full">
              <button
                id="modal-watch-video-btn"
                type="button"
                onClick={onWatchVideo}
                className="w-full bg-[#FFD028] hover:scale-[1.02] text-[#1A1A2E] font-bold text-[16px] rounded-full py-[16px] px-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-200 cursor-pointer text-center"
              >
                Watch the Video
              </button>
            </div>

            {/* Text link below the button: 13px #9090AA */}
            <button
              id="modal-close-link"
              type="button"
              onClick={onClose}
              className="mt-[16px] text-[13px] text-[#9090AA] hover:text-[#1A1A2E] transition-colors cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
