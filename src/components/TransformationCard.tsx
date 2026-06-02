import { Transformation } from '../types';

interface TransformationCardProps {
  item: Transformation;
  key?: string | number;
}

export default function TransformationCard({ item }: TransformationCardProps) {
  const labelType = item.labelType || 'before-after-red';

  return (
    <div className="relative group transition-all duration-300 hover:scale-[1.015]">
      {/* Sleek shadow depth effect behind the white frame */}
      <div className="absolute inset-0 bg-red-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
      
      {/* Thick white border frame matching the original screenshots */}
      <div id={`transformation-card-${item.id}`} className="relative border-4 border-white bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl flex flex-row">
        
        {/* Left Side (Before) */}
        <div className="w-1/2 aspect-[4/5] relative overflow-hidden">
          <img
            src={item.imageBefore}
            alt="Physical transformation before"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Render Before/Day1/Fat weight labels based on layout style */}
          {labelType === 'before-after-red' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="bg-[#cc1111] text-white font-sans text-xs sm:text-base font-extrabold px-4 sm:px-5 py-2 rounded-md shadow-md uppercase tracking-wide leading-none select-none border border-red-500/30">
                Before
              </span>
            </div>
          )}

          {labelType === 'before-now-gold' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="text-[#ebeb00] font-sans text-lg sm:text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                BEFORE
              </span>
            </div>
          )}

          {labelType === 'fat-to-fit' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="text-[#ebeb00] font-sans text-lg sm:text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                FAT
              </span>
            </div>
          )}

          {labelType === 'weight-tag-yellow' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="text-[#e2f10b] font-sans text-lg sm:text-2xl font-black uppercase tracking-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                {item.weightBefore || '120kg'}
              </span>
            </div>
          )}

          {labelType === 'day1-day90-red' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="bg-[#b31414] text-white font-sans text-xs sm:text-lg font-bold px-6 py-2 rounded shadow-md tracking-wide leading-none select-none">
                Day 1
              </span>
            </div>
          )}
        </div>

        {/* Separator Line */}
        <div className="w-1 bg-white/70 relative z-20" />

        {/* Right Side (After) */}
        <div className="w-1/2 aspect-[4/5] relative overflow-hidden">
          <img
            src={item.imageAfter}
            alt="Physical transformation after"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />

          {/* Render After/Day90/Fit/Weight labels based on layout style */}
          {labelType === 'before-after-red' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="bg-[#cc1111] text-white font-sans text-xs sm:text-base font-extrabold px-4 sm:px-6 py-2 rounded-md shadow-md uppercase tracking-wide leading-none select-none border border-red-500/30">
                After
              </span>
            </div>
          )}

          {labelType === 'before-now-gold' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="text-[#ebeb00] font-sans text-lg sm:text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                NOW
              </span>
            </div>
          )}

          {labelType === 'fat-to-fit' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="text-[#ebeb00] font-sans text-lg sm:text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                FIT
              </span>
            </div>
          )}

          {labelType === 'weight-tag-yellow' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="text-[#e2f10b] font-sans text-lg sm:text-2xl font-black uppercase tracking-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
                {item.weightAfter || '107kg'}
              </span>
            </div>
          )}

          {labelType === 'day1-day90-red' && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 px-2">
              <span className="bg-[#b31414] text-white font-sans text-xs sm:text-lg font-bold px-6 py-2 rounded shadow-md tracking-wide leading-none select-none">
                Day 90
              </span>
            </div>
          )}
        </div>

        {/* Absolute curved arrow connector linking before and after, matching the screenshot */}
        {labelType !== 'fat-to-fit' && (
          <div className="absolute left-0 right-0 bottom-14 flex items-center justify-center pointer-events-none z-30">
            <div className="relative transform translate-y-3 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              {/* Elegant curved SVG arrow with custom arrowhead */}
              <svg className="w-14 sm:w-20 h-8 sm:h-12 text-white" fill="none" viewBox="0 0 80 40" stroke="currentColor" strokeWidth={4.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 25c15-18 45-18 60 0" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M60 25h10v-10" />
              </svg>
            </div>
          </div>
        )}

        {/* Separated FAT TO FIT centered "TO" text display, matching Screenshot 2 right-most element */}
        {labelType === 'fat-to-fit' && (
          <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center pointer-events-none z-30">
            <span className="text-[#ebeb00] font-sans text-lg sm:text-2xl font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none">
              TO
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
