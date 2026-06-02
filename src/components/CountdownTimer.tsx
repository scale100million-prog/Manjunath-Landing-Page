import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

export default function CountdownTimer({ initialMinutes = 12, initialSeconds = 50 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Check if there is an existing count down in progress in localStorage
    const saved = localStorage.getItem('healthynation_countdown');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return initialMinutes * 60 + initialSeconds;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      // Auto reset to keep urgency alive for simple landing pages
      setTimeLeft(15 * 60 + 0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem('healthynation_countdown', next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <div id="countdown-widget" className="flex items-center gap-1.5 sm:gap-2 font-mono text-base sm:text-2xl font-extrabold tracking-tight select-none">
      <div className="flex flex-col items-center">
        <div id="countdown-hours" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-14 text-sm sm:text-base md:text-2xl font-black bg-white text-red-600 rounded-full md:rounded-xl flex items-center justify-center shadow-md border border-gray-200">
          {pad(h)}
        </div>
      </div>
      <span className="hidden md:inline text-white font-sans text-base sm:text-2xl leading-none select-none -translate-y-[1px] sm:-translate-y-[2px]">:</span>
      <div className="flex flex-col items-center">
        <div id="countdown-minutes" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-14 text-sm sm:text-base md:text-2xl font-black bg-white text-red-600 rounded-full md:rounded-xl flex items-center justify-center shadow-md border border-gray-200">
          {pad(m)}
        </div>
      </div>
      <span className="hidden md:inline text-white font-sans text-base sm:text-2xl leading-none select-none -translate-y-[1px] sm:-translate-y-[2px]">:</span>
      <div className="flex flex-col items-center">
        <div id="countdown-seconds" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-14 text-sm sm:text-base md:text-2xl font-black bg-white text-red-600 rounded-full md:rounded-xl flex items-center justify-center shadow-md border border-gray-200">
          {pad(s)}
        </div>
      </div>
    </div>
  );
}
