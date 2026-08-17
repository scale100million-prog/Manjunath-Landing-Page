import React from 'react';
import { useGate } from '../context/GateContext';

interface CtaButtonProps {
  id?: string;
  isUnlocked?: boolean;
  onLockedClick?: () => void;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  id,
  isUnlocked: isUnlockedProp,
  onLockedClick: onLockedClickProp,
}) => {
  const { isUnlocked: contextIsUnlocked, openModal } = useGate();
  const isUnlocked = isUnlockedProp !== undefined ? isUnlockedProp : contextIsUnlocked;
  const onLockedClick = onLockedClickProp !== undefined ? onLockedClickProp : openModal;

  return (
    <div className="w-full flex justify-center">
      {isUnlocked ? (
        <a
          id={id}
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
          className="w-full sm:w-auto bg-[#FFD028] text-[#1A1A2E] font-bold text-[16px] rounded-full py-[18px] px-[52px] shadow-[0_8px_28px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-transform duration-200 cursor-pointer text-center inline-flex items-center justify-center"
        >
          Book Your Consultation
        </a>
      ) : (
        <button
          id={id}
          type="button"
          onClick={onLockedClick}
          className="w-full sm:w-auto bg-[#FFD028] text-[#1A1A2E] font-bold text-[16px] rounded-full py-[18px] px-[52px] shadow-[0_8px_28px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-transform duration-200 cursor-pointer text-center inline-flex items-center justify-center"
        >
          Book Your Consultation
        </button>
      )}
    </div>
  );
};
