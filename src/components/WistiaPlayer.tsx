import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useGate } from '../context/GateContext';
import '../wistia.d.ts';

interface WistiaPlayerProps {
  mediaId?: string;
}

export const WistiaPlayer: React.FC<WistiaPlayerProps> = ({ mediaId = 'hp3uhhs1jy' }) => {
  const { playVideo, hasStartedPlaying } = useGate();
  const [localStarted, setLocalStarted] = useState(false);

  const isStarted = hasStartedPlaying || localStarted;

  const handlePlayClick = () => {
    setLocalStarted(true);
    playVideo();
  };

  return (
    <div
      id="vsl-video-container"
      className="w-full max-w-[960px] mx-auto rounded-[14px] md:rounded-[20px] border-[2px] md:border-[3px] border-[#FFFFFF] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden bg-black relative"
    >
      <wistia-player media-id={mediaId} aspect="1.7777777777777777"></wistia-player>

      {/* Custom Play Button Overlay (Unmounts entirely once video has started) */}
      {!isStarted && (
        <div
          id="vsl-play-overlay"
          onClick={handlePlayClick}
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#0F0F1A]/25 cursor-pointer"
        >
          {/* Play Button Container with Expanding Pulse Ring */}
          <div className="relative flex items-center justify-center">
            {/* Slow infinite pulse ring in #FFD028 at 40% opacity */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-[#FFD028] -z-10 pointer-events-none"
            />

            {/* Main 96px circle (72px on mobile), #FFD028 background, hover scale(1.08) */}
            <div className="w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] rounded-full bg-[#FFD028] flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:scale-[1.08] transition-transform duration-200">
              <Play className="w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] text-[#1A1A2E] fill-[#1A1A2E] ml-1 shrink-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
