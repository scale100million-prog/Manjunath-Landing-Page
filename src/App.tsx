import React from 'react';
import { motion } from 'motion/react';
import { RESULT_CARDS } from './data';
import { ResultCard } from './components/ResultCard';
import { StickyFooter } from './components/StickyFooter';
import { WistiaPlayer } from './components/WistiaPlayer';
import { CtaButton } from './components/CtaButton';
import { LockedModal } from './components/LockedModal';
import { UnlockCountdownLine } from './components/UnlockCountdownLine';
import { GateProvider } from './context/GateContext';

function MainContent() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A2E] font-sans antialiased overflow-x-hidden relative">
      
      {/* =========================================================================
          SECTION 1: HERO & VSL (Cream gradient from #FFFDF0 top to #FFFFFF bottom)
          Padding: Top 80px desktop / 20px mobile, Bottom 80px desktop / 32px mobile, Horizontal: 48px desktop / 20px mobile
          ========================================================================= */}
      <section
        id="hero-vsl-section"
        className="w-full bg-gradient-to-b from-[#FFFDF0] to-[#FFFFFF] pt-[20px] md:pt-[80px] pb-[32px] md:pb-[80px] px-[20px] md:px-[48px] flex flex-col items-center text-center"
      >
        <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
          
          {/* Badge: #E24A17 at 8% opacity, border #E24A17 at 25%, padding 14px 32px (7px 14px mobile), text 16px/11px bold #E24A17 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-0 md:gap-[10px] bg-[#E24A17]/[0.08] border border-[#E24A17]/25 rounded-full py-[7px] px-[14px] md:py-[14px] md:px-[32px] shadow-[0_2px_10px_rgba(226,74,23,0.12)] text-center max-w-[300px] md:max-w-none mx-auto"
          >
            <span className="hidden md:block w-2 h-2 rounded-full bg-[#E24A17] shrink-0" />
            <span className="text-[11px] md:text-[16px] font-bold text-[#E24A17] leading-[1.3] md:leading-snug text-center">
              For Working Professionals Over 30 Who Want to Lose Their Weight.
            </span>
          </motion.div>

          {/* Badge to headline: 14px mobile / 28px desktop gap */}
          <div className="h-[14px] md:h-[28px]" />

          {/* Hero Headline: 72-80px desktop, 30px mobile, extrabold, line height 1.1 mobile / 1.05 desktop, max-width 1100px */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[1100px] text-[30px] sm:text-[48px] md:text-[76px] lg:text-[80px] font-extrabold text-center leading-[1.1] md:leading-[1.05] tracking-tight"
          >
            <span className="text-[#1A1A2E] block">
              Lose 8 to 16 KG in 12 Weeks
            </span>
            <span className="text-[#E24A17] block">
              With Prime Body OS™
            </span>
          </motion.h1>

          {/* Headline to subheadline: 12px mobile / 24px desktop gap */}
          <div className="h-[12px] md:h-[24px]" />

          {/* Subheadline: 14px mobile / 19px desktop, #4A4B65, centered, line height 1.5 mobile / 1.75 desktop, max-width 340px mobile / 700px desktop */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[340px] md:max-w-[700px] mx-auto text-[14px] md:text-[19px] text-[#4A4B65] text-center leading-[1.5] md:leading-[1.75]"
          >
            <span className="font-bold text-[#1A1A2E]">950+</span> working professionals across India and the US lost <span className="font-bold text-[#1A1A2E]">8 to 16 KG in 12 weeks</span> without extreme diet or endless gym hours. <span className="font-bold text-[#E24A17]">Lose the weight or 100% refund.</span>
          </motion.p>

          {/* Subheadline to video: 20px mobile / 48px desktop gap */}
          <div className="h-[20px] md:h-[48px]" />

          {/* VSL Video: Max width 960px, centered */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-[960px]"
          >
            <WistiaPlayer />
          </motion.div>

          {/* Video to countdown line: 12px mobile / 16px desktop gap */}
          <div className="h-[12px] md:h-[16px]" />

          {/* Live Unlock Countdown Line */}
          <UnlockCountdownLine />

          {/* Countdown line to CTA button: 16px mobile / 24px desktop gap */}
          <div className="h-[16px] md:h-[24px]" />

          {/* CTA 1 Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full flex justify-center"
          >
            <CtaButton id="hero-vsl-cta-btn" />
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SOCIAL PROOF (#F8F8FB)
          Padding: Top 80px desktop / 32px mobile, Bottom 110px (clears sticky footer), Horizontal: 48px / 20px
          ========================================================================= */}
      <section
        id="social-proof-section"
        className="w-full bg-[#F8F8FB] pt-[32px] md:pt-[80px] pb-[110px] px-[20px] md:px-[48px] flex flex-col items-center text-center"
      >
        <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center">
          
          {/* Section Headline: 48-56px desktop, 28px mobile, extrabold, #1A1A2E, max-width 960px */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[960px] text-[28px] sm:text-[44px] md:text-[52px] lg:text-[56px] font-extrabold text-[#1A1A2E] text-center leading-[1.15] md:leading-[1.1] tracking-tight"
          >
            Life Changing Transformations With Prime Body OS™
          </motion.h2>

          {/* Section headline to card grid: 28px mobile / 48px desktop gap */}
          <div className="h-[28px] md:h-[48px]" />

          {/* 6 Result Cards Grid: Max width 1080px, 3 col desktop, 2 col tablet, 1 col mobile, gap 24px */}
          <div className="w-full max-w-[1080px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] items-stretch">
            {RESULT_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-full"
              >
                <ResultCard card={card} />
              </motion.div>
            ))}
          </div>

          {/* Card grid to CTA button: 44px gap */}
          <div className="h-[44px]" />

          {/* CTA 2 Below Result Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <CtaButton id="social-proof-cta-btn" />
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          STICKY FOOTER (Fixed bottom 0, full width, 3rd CTA)
          ========================================================================= */}
      <StickyFooter />

      {/* =========================================================================
          LOCKED MODAL (Opens when clicking any locked CTA)
          ========================================================================= */}
      <LockedModal />

    </div>
  );
}

export default function App() {
  return (
    <GateProvider>
      <MainContent />
    </GateProvider>
  );
}
