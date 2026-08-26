import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useGate } from '../context/GateContext';

interface UnlockCountdownLineProps {
  watchedCount?: number;
  isUnlocked?: boolean;
  hasStartedPlaying?: boolean;
}

export const UnlockCountdownLine: React.FC<UnlockCountdownLineProps> = ({
  watchedCount: watchedCountProp,
  isUnlocked: isUnlockedProp,
  hasStartedPlaying: hasStartedPlayingProp,
}) => {
  const gate = useGate();
  if (!gate.gateEnabled) {
    return null;
  }

  const watchedCount = watchedCountProp !== undefined ? watchedCountProp : gate.watchedSeconds.size;
  const isUnlocked = isUnlockedProp !== undefined ? isUnlockedProp : gate.isUnlocked;
  const hasStartedPlaying = hasStartedPlayingProp !== undefined ? hasStartedPlayingProp : gate.hasStartedPlaying;

  const showLine = hasStartedPlaying || isUnlocked || watchedCount > 0;
  const remaining = Math.max(0, 60 - watchedCount);

  return (
    <div className="w-full max-w-[960px] mx-auto min-h-[24px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {showLine && (
          <motion.div
            key="unlock-countdown-line-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {!isUnlocked && remaining > 0 ? (
                <motion.div
                  key="locked-countdown"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-[10px]"
                >
                  {/* Small filled dot, 8px, #E24A17, with soft pulse animation (opacity 1 to 0.4 to 1, 1.5s loop) */}
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-2 h-2 rounded-full bg-[#E24A17] shrink-0"
                  />
                  <span className="text-[14px] md:text-[16px] font-bold text-[#E24A17] text-center leading-none">
                    Consultation unlocks in {remaining} sec
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked-countdown"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-[10px]"
                >
                  {/* Small checkmark icon in #E24A17 instead of the dot */}
                  <Check className="w-4 h-4 text-[#E24A17] stroke-[3] shrink-0" />
                  <span className="text-[14px] md:text-[16px] font-bold text-[#E24A17] text-center leading-none">
                    Your consultation is unlocked
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
