import CountdownTimer from './CountdownTimer';
import { ArrowRight } from 'lucide-react';

interface StickyBottomBarProps {
  onBookClick: () => void;
}

export default function StickyBottomBar({ onBookClick }: StickyBottomBarProps) {
  return (
    <div
      onClick={() => {
        try {
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead');
          }
        } catch (e) {}
        onBookClick();
      }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 hover:bg-neutral-950 backdrop-blur-lg border-t border-neutral-800 shadow-2xl pt-2 pb-3.5 px-3 sm:py-4 sm:px-6 md:py-5 md:px-12 transition-all duration-300 cursor-pointer select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between md:justify-center gap-2 sm:gap-4 md:gap-14">
        
        {/* Top (on Mobile) / Left (on Desktop): Thin White Border Capsule */}
        <div className="w-full md:w-auto border border-white md:border-2 md:border-neutral-700/60 rounded py-1.5 px-4 md:px-6 md:py-3.5 bg-black md:bg-neutral-950 font-sans tracking-wide text-center flex items-center justify-center">
          <span className="text-white text-xs sm:text-sm md:text-xl font-black flex items-center gap-2 justify-center whitespace-nowrap">
            <span className="text-base sm:text-lg md:text-2xl animate-bounce">💪</span> Trained 2,000+ Happy Clients
          </span>
        </div>

        {/* Lower Row on Mobile / Right group on Desktop */}
        <div className="w-full md:w-auto flex flex-row items-center justify-between md:justify-center gap-3 sm:gap-6">
          {/* Centered/Left Countdown Timer on Mobile */}
          <div className="flex-shrink-0">
            <CountdownTimer />
          </div>

          {/* Right Red Pill CTA Button with white circular arrow emblem */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              try {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'Lead');
                }
              } catch (err) {}
              onBookClick();
            }}
            className="flex-grow md:flex-grow-0 h-12 sm:h-13 md:h-15 bg-red-600 hover:bg-red-500 hover:scale-[1.03] text-white font-black tracking-wide uppercase px-4.5 sm:px-6 md:px-9 rounded-full flex items-center justify-center gap-2 sm:gap-2.5 transition-all shadow-lg border border-red-500 animate-pulse cursor-pointer"
          >
            <span className="w-5.5 h-5.5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center text-red-600 shrink-0 shadow-sm">
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-none stroke-[3.5px]" />
            </span>
            <span className="text-[12px] sm:text-xs md:text-sm tracking-wider whitespace-nowrap font-extrabold">Talk with expert</span>
          </button>
        </div>

      </div>
    </div>
  );
}
