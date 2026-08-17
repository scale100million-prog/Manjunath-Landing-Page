import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Check } from 'lucide-react';
import { useGate } from '../context/GateContext';

interface StickyFooterProps {
  isUnlocked?: boolean;
  onLockedClick?: () => void;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({
  isUnlocked: isUnlockedProp,
  onLockedClick: onLockedClickProp,
}) => {
  const { isUnlocked: contextIsUnlocked, openModal } = useGate();
  const isUnlocked = isUnlockedProp !== undefined ? isUnlockedProp : contextIsUnlocked;
  const onLockedClick = onLockedClickProp !== undefined ? onLockedClickProp : openModal;

  return (
    <footer
      id="sticky-footer"
      className="fixed bottom-0 left-0 right-0 w-full h-[80px] bg-white/[0.97] backdrop-blur-[16px] border-t-2 border-[#E8E8F0] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-5 sm:px-10 z-50 flex items-center justify-between"
    >
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
        
        {/* LEFT — Icon circle + Unlock status text */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 48px circle, PRIMARY COLOR at 15% opacity */}
          <div className="w-12 h-12 rounded-full bg-[#E24A17]/15 flex items-center justify-center shrink-0">
            <AnimatePresence mode="wait">
              {!isUnlocked ? (
                <motion.div
                  key="locked-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Zap className="w-6 h-6 text-[#E24A17] fill-[#E24A17]" />
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Check className="w-6 h-6 text-[#E24A17] stroke-[3]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text status (hidden on mobile, visible on sm and up) with 300ms fade */}
          <div className="hidden sm:flex flex-col">
            <AnimatePresence mode="wait">
              {!isUnlocked ? (
                <motion.div
                  key="locked-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <span className="text-[15px] font-bold text-[#1A1A2E] leading-tight">
                    Watch the video to unlock your call
                  </span>
                  <span className="text-[11px] text-[#9090AA] mt-0.5 leading-tight">
                    Unlocks after the first minute
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <span className="text-[15px] font-bold text-[#1A1A2E] leading-tight">
                    Your call is unlocked
                  </span>
                  <span className="text-[11px] text-[#9090AA] mt-0.5 leading-tight">
                    Book your consultation now
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — button */}
        <div className="flex-1 sm:flex-initial flex justify-end">
          {isUnlocked ? (
            <a
              id="sticky-cta-btn"
              href="https://calendly.com/manjunathfitness/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead');
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="w-full sm:w-auto bg-[#FFD028] hover:scale-[1.03] text-[#1A1A2E] text-[15px] sm:text-[17px] font-bold rounded-full py-[14px] px-[24px] sm:py-[18px] sm:px-[52px] shadow-[0_6px_24px_rgba(0,0,0,0.15)] transition-transform duration-200 cursor-pointer text-center whitespace-nowrap inline-flex items-center justify-center"
            >
              Book Your Consultation
            </a>
          ) : (
            <button
              id="sticky-cta-btn"
              type="button"
              onClick={onLockedClick}
              className="w-full sm:w-auto bg-[#FFD028] hover:scale-[1.03] text-[#1A1A2E] text-[15px] sm:text-[17px] font-bold rounded-full py-[14px] px-[24px] sm:py-[18px] sm:px-[52px] shadow-[0_6px_24px_rgba(0,0,0,0.15)] transition-transform duration-200 cursor-pointer text-center whitespace-nowrap inline-flex items-center justify-center"
            >
              Book Your Consultation
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};
