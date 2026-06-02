import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  Target, 
  Flame, 
  ShieldCheck,
  Zap,
  Check,
  Video
} from 'lucide-react';
import ReviewPill from './components/ReviewPill';
import BookingModal from './components/BookingModal';
import StickyBottomBar from './components/StickyBottomBar';
import FaqSection from './components/FaqSection';

// Define path constants to avoid TypeScript module resolution errors during build
const gymHeroBg = "/src/assets/images/gym_hero_bg_1780308842248.png";
const superhumanSwitch = "/src/assets/images/superhuman_switch_1780308861342.png";
const torsoSwitchGlow = "/src/assets/images/torso_switch_glow_1780308880034.png";
const coachPortrait = "/src/assets/images/coach_portrait_1780308902426.png";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleCtaClick = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
    } catch (e) {
      console.error('Meta Pixel check error:', e);
    }
    window.open("https://calendly.com/manjunathfitness/30min", "_blank");
  };



  return (
    <div className="bg-black text-gray-150 min-h-screen font-sans antialiased selection:bg-red-650 selection:text-white pb-28">
      
      {/* SECTION 1: HERO CONTAINER (Gym dramatic overlay backdrop) */}
      <section id="hero" className="relative h-auto md:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-10 pb-8 sm:pt-20 sm:pb-14 md:pt-28 md:pb-16 overflow-hidden border-b border-neutral-900">
        
        {/* Background Image Element */}
        <div className="absolute inset-0 z-0">
          <img
            src={gymHeroBg}
            alt="Moody gym background"
            className="w-full h-full object-cover opacity-50 sm:opacity-35 filter brightness-75 md:brightness-50"
            referrerPolicy="no-referrer"
          />
          {/* Lighter vignettes on mobile so gym background is clearly visible exactly as in image 2 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_95%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6 sm:gap-10">
          
          {/* Floating customer social validation pill */}
          <ReviewPill />

          {/* Attention Copywriter Main Header Heading (matches serif red-orange style) */}
          <h1 id="hero-headline" className="text-3xl sm:text-5xl md:text-[64px] font-extrabold font-serif text-red-500 leading-tight tracking-tight max-w-4xl drop-shadow-md select-none">
            Attention: Busy Men Over 30 Struggling To Lose Weight & Build Muscle?
          </h1>

          {/* Core subheadline section with dynamic background indicators from the screenshot */}
          <p id="hero-subheading" className="text-[14px] sm:text-xl md:text-2xl text-neutral-200 leading-relaxed max-w-3xl font-medium tracking-normal select-none px-2">
            Introducing: Superhuman Fat Shredding—The New Way To{' '}
            <span className="bg-[#FF3E24] text-white font-extrabold px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded shadow-sm inline-block whitespace-nowrap mx-0.5">
              Lose Fat,
            </span>{' '}
            <span className="bg-[#FF3E24] text-white font-extrabold px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded shadow-sm inline-block whitespace-nowrap mx-0.5">
              Build Muscle,
            </span>{' '}
            And Transform Your Body In Just 12 Weeks—{' '}
            <span className="inline-block bg-[#FF3E24] text-white font-extrabold px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded shadow-sm mx-0.5 mt-1">
              Without Extreme Diets Or Endless Gym Hours!
            </span>
          </p>

          {/* Main Action CTAs */}
          <div className="flex flex-col items-center mt-2 w-full max-w-sm sm:max-w-md px-2">
            <button
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead');
                  }
                } catch (e) {}
                handleCtaClick();
              }}
              className="w-full bg-[#FF2E16] hover:bg-[#E0220C] hover:scale-[1.015] text-white rounded-full py-4.5 px-6 flex flex-col items-center justify-center gap-1.5 transition-all shadow-xl shadow-red-950/45 border border-red-500 cursor-pointer duration-200"
            >
              <div className="flex items-center gap-2.5 font-black text-lg sm:text-xl tracking-wide">
                <span className="w-5.5 h-5.5 bg-white rounded-full flex items-center justify-center text-[#FF2E16] shrink-0 font-bold shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[4.5px]" />
                </span>
                <span>Talk with expert</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-red-100 uppercase tracking-widest opacity-95">
                Limited Spots | Filling Fast
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: SOCIAL PROOF GRID ("See Real People Achieve Real Results!") */}
      <section id="proof" className="dark-grid-pattern pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-20 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Title (Matches Playfair Serif with colored accent) */}
          <div className="text-center mb-16 select-none">
            <h2 className="text-3xl sm:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
              See Real People Achieve <span className="text-[#FF523B]">Real Results!</span>
            </h2>
          </div>          {/* Featured Spotlights showcasing premium user-specified result images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
            {[
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m1.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m2.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m3.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m4.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m5.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m6.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m7.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m8.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m9.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m10.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m11.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m12.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m13.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m14.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m15.png",
              "https://raw.githubusercontent.com/scale100million-prog/my-images/main/m16.png",
            ].map((imgUrl, idx) => (
              <div key={idx} className="relative group transition-all duration-300 hover:scale-[1.015] w-full">
                <div className="absolute inset-0 bg-red-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                <div className="relative border-4 border-white bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={imgUrl}
                    alt={`Elite result progression ${idx + 1}`}
                    className="w-full h-auto object-cover block select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>



        </div>
      </section>

      {/* SECTION 3: THE PROBLEM & BREAKTHROUGH ("Struggling To Lose Fat? Here's What You're Missing") */}
      <section id="problem-breakthrough" className="bg-neutral-50 text-neutral-900 pt-16 pb-8 px-4 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="text-red-600 font-extrabold text-base tracking-widest uppercase mb-1 block">
            Struggling To Lose Fat?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight mb-12">
            Here's What You're Missing
          </h2>

          {/* Central Holographic Dashboard Box switch asset, built as in Screenshot 5 */}
          <div className="my-10 max-w-lg mx-auto relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
            <img
              src={superhumanSwitch}
              alt="Superhuman Switch console"
              className="relative w-full h-auto rounded-xl object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Compelling Copywriters details with salmon-themed highlighting background cards */}
          <div className="space-y-8 text-[15px] sm:text-[21px] text-neutral-800 leading-relaxed sm:leading-loose font-normal mt-12 max-w-3xl mx-auto text-center px-4">
            <p className="leading-relaxed sm:leading-loose select-none">
              You've Tried{' '}
              <span className="inline bg-orange-100/80 border-b-2 border-orange-500 text-orange-950 font-bold px-1.5 py-0.5 rounded-sm transition duration-150">
                Everything—Low-Carb Diets, HIIT Workouts, Expensive Gym
              </span>{' '}
              <span className="inline bg-orange-100/80 border-b-2 border-orange-500 text-orange-950 font-bold px-1.5 py-0.5 rounded-sm transition duration-150">
                Memberships.
              </span>{' '}
              Yet,{' '}
              <span className="inline bg-orange-100/80 border-b-2 border-orange-500 text-orange-950 font-bold px-1.5 py-0.5 rounded-sm transition duration-150">
                You’re Still Stuck.
              </span>{' '}
              Why? Because You Still Haven't{' '}
              <span className="inline bg-orange-100/80 border-b-2 border-orange-500 text-orange-950 font-bold px-1.5 py-0.5 rounded-sm transition duration-150">
                Activated The Superhuman Switch Within You!
              </span>
            </p>

            <p className="font-bold text-[#002B49] mt-8 leading-relaxed sm:leading-loose select-none">
              When You Activate This Switch, Your Body{' '}
              <span className="underline decoration-blue-600 decoration-[3px] underline-offset-4 font-extrabold text-blue-900 px-0.5">AUTOMATICALLY</span> Starts{' '}
              <span className="italic text-[#FF3E24] font-black tracking-wide bg-red-50 px-1 py-0.5 rounded-sm border-b border-red-200">Shredding FAT And Building Muscle</span>—{' '}
              <span className="underline decoration-[#FF3E24] decoration-[3px] underline-offset-4 font-black">On Its Own!</span> This Is Called-{' '}
              <strong className="text-slate-900 border-b border-neutral-300">Superhuman Fat Shredding!</strong> The Ultimate Secret Of Fat Loss & Muscle GAIN!
            </p>
          </div>

          {/* Grid of 3 black cards highlighting what if statements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            
            {/* Card 1 */}
            <div className="bg-black border border-neutral-800 rounded-[20px] p-6 sm:p-7.5 relative shadow-[5px_5px_0px_0px_#FF523B] transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#FF523B]">
              <p className="text-sm sm:text-base md:text-[17px] text-white leading-relaxed font-medium">
                What If You Could Stop The Trial-And-Error And Get A <strong className="text-white font-extrabold">Clear Path To Sustainable Fat Loss & Muscle Gain</strong>?
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-black border border-neutral-800 rounded-[20px] p-6 sm:p-7.5 relative shadow-[5px_5px_0px_0px_#FF523B] transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#FF523B]">
              <p className="text-sm sm:text-base md:text-[17px] text-white leading-relaxed font-medium">
                What If You Had <strong className="text-white font-extrabold">Expert Guidance</strong> To Ensure You're <strong className="text-white font-extrabold">Doing Everything Right</strong>?
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-black border border-neutral-800 rounded-[20px] p-6 sm:p-7.5 relative shadow-[5px_5px_0px_0px_#FF523B] transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_#FF523B]">
              <p className="text-sm sm:text-base md:text-[17px] text-white leading-relaxed font-medium">
                What If, In Just <strong className="text-white font-extrabold">One Call</strong>, You Could Find Out If This <strong className="text-white font-extrabold">12-Week Program</strong> Is The <strong className="text-white font-extrabold">Right Fit</strong> For You?
              </p>
            </div>

          </div>

          {/* Target Strategy Badge capsule in standard centered position */}
          <div className="mt-12 inline-flex items-center gap-2 bg-neutral-950 text-white rounded-full px-5 py-2.5 shadow-lg max-w-full font-sans text-xs sm:text-sm font-extrabold border border-neutral-850">
            <span className="text-base">🎯</span>
            <span>Book A 1-On-1 Strategy Call To See If We’re The Right Fit!</span>
          </div>

          {/* Strategy action button triggers call */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <button
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead');
                  }
                } catch (e) {}
                handleCtaClick();
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-black text-base uppercase tracking-wider px-8 py-4.5 rounded-full flex items-center gap-2.5 transition transform hover:scale-[1.02] shadow-xl border border-red-500 font-sans"
            >
              <Video className="w-5 h-5" />
              <span>Talk with expert</span>
            </button>
            <span className="text-red-600 font-bold tracking-widest text-[10px] uppercase">
              Limited Spots | Filling Fast
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 4: WHY MOST DIETS & WORKOUTS FAIL */}
      <section id="why-fail" className="bg-neutral-100 text-neutral-900 pt-10 pb-16 px-4 md:px-10 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight text-center mb-10">
            Why Most Diets & Workouts Fail
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts checklist */}
            <div className="md:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <p className="text-lg font-bold text-slate-850">Here’s the truth:</p>
                <p className="text-base text-slate-700 leading-relaxed">
                  If diets and workouts really worked, you’d already have the body you want, right? <br />
                  But instead, you’re stuck in a cycle of:
                </p>
              </div>

              {/* Ticks representation */}
              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-orange-600/10 text-orange-600 rounded flex items-center justify-center shrink-0 mt-0.5 border border-orange-200">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-base font-extrabold text-slate-800">Frustration from not seeing results</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-orange-600/10 text-orange-600 rounded flex items-center justify-center shrink-0 mt-0.5 border border-orange-200">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-base font-extrabold text-slate-800 font-sans">Guilt from 'falling off the wagon'</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-orange-600/10 text-orange-600 rounded flex items-center justify-center shrink-0 mt-0.5 border border-orange-200">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-base font-extrabold text-slate-800">Confusion about what actually works</span>
                </li>
              </ul>

              {/* Alert notification block from the screenshot */}
              <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-xl p-4.5 flex gap-3.5 mt-8 border border-rose-200/50">
                <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-rose-950 leading-relaxed">
                  The problem isn’t you—it’s the <span className="underline decoration-2 decoration-rose-500">Outdated advice</span> and one-size-fits-all programs that don't fit YOUR lifestyle.
                </p>
              </div>

              <p className="text-base sm:text-lg font-black text-[#001c3d] pt-4">
                🚀 Superhuman Fat Shredding is the solution to end all struggles, once & for all!
              </p>

            </div>

            {/* Right muscular chest illustration from the screenshots */}
            <div className="md:col-span-5 relative group justify-self-center">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-600 to-rose-600 rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-300" />
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-2xl bg-white aspect-[3/4] max-w-[340px]">
                <img
                  src={torsoSwitchGlow}
                  alt="Metabolic pathways switch illustration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: WHO IS THIS CALL FOR? */}
      <section id="who-is-for" className="bg-neutral-50 text-neutral-900 pt-6 pb-12 sm:py-16 px-4 md:px-10 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left Texts panel */}
            <div className="md:col-span-6 space-y-6">
              
              <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight leading-none">
                Who is this Call for?
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-semibold">
                This call is for anyone looking to achieve sustainable weight loss and improve overall fitness, no matter their starting point.
              </p>

              <hr className="border-slate-200" />

              {/* Detailed custom styled bullets */}
              <div className="space-y-5">
                
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-extrabold text-lg shrink-0 mt-0.5">»</span>
                  <p className="text-[15px] text-slate-800 leading-relaxed">
                    <strong className="text-[#FF3E24] font-extrabold">Beginners:</strong> Step-by-step guidance to build a strong foundation.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-extrabold text-lg shrink-0 mt-0.5">»</span>
                  <p className="text-[15px] text-slate-800 leading-relaxed">
                    <strong className="text-[#FF3E24] font-extrabold font-sans">Busy Professionals:</strong> Simple, effective strategies that fit into your schedule.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-extrabold text-lg shrink-0 mt-0.5">»</span>
                  <p className="text-[15px] text-slate-800 leading-relaxed">
                    <strong className="text-[#FF3E24] font-extrabold">Those Stuck in a Plateau:</strong> Breakthrough methods to restart progress.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-extrabold text-lg shrink-0 mt-0.5">»</span>
                  <p className="text-[15px] text-slate-800 leading-relaxed">
                    <strong className="text-[#FF3E24] font-extrabold">Fat Loss & Metabolism Boosters:</strong> Optimize fat-burning and energy levels naturally.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-neutral-900 font-black text-lg shrink-0 mt-0.5">»</span>
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                    <strong className="text-[#FF3E24] font-black block sm:inline">Sustainable Weight Loss Seekers:</strong> No extreme diets or workouts—just lasting results.
                  </p>
                </div>

              </div>

              <div className="pt-4">
                <p className="text-[15px] text-slate-800 font-bold border-l-4 border-red-500 pl-3 leading-relaxed">
                  Get the right tools, guidance, and motivation to transform your body and build lifelong healthy habits!
                </p>
              </div>

            </div>

            {/* Right Column: Cards Grid + CTA Button below (as in image 2) */}
            <div className="md:col-span-6 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Card 1 */}
                <div className="bg-black text-white rounded-[20px] p-6 border border-neutral-900 shadow-[5px_5px_0px_0px_#FF3E24] hover:shadow-[7px_7px_0px_0px_#FF3E24] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-300 relative overflow-hidden group">
                  <div className="w-7 h-7 bg-[#FF3E24] text-white rounded-full flex items-center justify-center mb-3.5">
                    <Check className="w-4 h-4 stroke-[4.5px]" />
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold leading-snug">
                    You Want To Lose Weight & Build Muscle But Feel Stuck
                  </h4>
                </div>

                {/* Card 2 */}
                <div className="bg-black text-white rounded-[20px] p-6 border border-neutral-900 shadow-[5px_5px_0px_0px_#FF3E24] hover:shadow-[7px_7px_0px_0px_#FF3E24] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-300 relative overflow-hidden group">
                  <div className="w-7 h-7 bg-[#FF3E24] text-white rounded-full flex items-center justify-center mb-3.5">
                    <Check className="w-4 h-4 stroke-[4.5px]" />
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold leading-snug">
                    You’ve Tried Diets & Workouts Before But Never See Lasting Results
                  </h4>
                </div>

                {/* Card 3 */}
                <div className="bg-black text-white rounded-[20px] p-6 border border-neutral-900 shadow-[5px_5px_0px_0px_#FF3E24] hover:shadow-[7px_7px_0px_0px_#FF3E24] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-300 relative overflow-hidden group">
                  <div className="w-7 h-7 bg-[#FF3E24] text-white rounded-full flex items-center justify-center mb-3.5">
                    <Check className="w-4 h-4 stroke-[4.5px]" />
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold leading-snug">
                    You Want A Structured, Expert-Led Approach Instead Of Guessing
                  </h4>
                </div>

                {/* Card 4 */}
                <div className="bg-black text-white rounded-[20px] p-6 border border-neutral-900 shadow-[5px_5px_0px_0px_#FF3E24] hover:shadow-[7px_7px_0px_0px_#FF3E24] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-300 relative overflow-hidden group">
                  <div className="w-7 h-7 bg-[#FF3E24] text-white rounded-full flex items-center justify-center mb-3.5">
                    <Check className="w-4 h-4 stroke-[4.5px]" />
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold leading-snug">
                    You’re Ready To Commit To A Plan That Actually Works
                  </h4>
                </div>

              </div>

              {/* Styled Red CTA Button below cards matching image 2 structure */}
              <div className="w-full mt-2">
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined' && (window as any).fbq) {
                        (window as any).fbq('track', 'Lead');
                      }
                    } catch (e) {}
                    handleCtaClick();
                  }}
                  className="w-full bg-red-600 hover:bg-red-500 hover:scale-[1.015] text-white rounded-3xl py-4.5 px-6 flex flex-col items-center justify-center gap-1 transition-all shadow-xl border border-red-500 cursor-pointer duration-200"
                >
                  <div className="flex items-center gap-2.5 font-black text-lg sm:text-xl tracking-wide">
                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-600 shrink-0 font-bold shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[4.5px]" />
                    </span>
                    <span>Talk with expert</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-red-100 uppercase tracking-widest opacity-95">
                    Limited Spots | Filling Fast
                  </span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: WHAT HAPPENS AFTER THE CALL? (Detailed White bordered card/block layout) */}
      <section id="after-call" className="bg-white text-slate-900 pt-6 pb-12 sm:py-16 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Container framed by a clean white card structure */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-red-500/10 bg-gradient-to-br from-red-50/20 via-white to-red-50/10 p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Texts listing instructions & ticks */}
            <div className="md:col-span-7 space-y-6">
              
              <h2 className="text-3xl sm:text-4px md:text-[38px] font-black font-serif text-slate-950 tracking-tight leading-none mb-4">
                What Happens After the Call?
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
                If we’re a great fit, you’ll have the opportunity to join my 12-Week Transformation Program, a structured, results-driven system designed to help you:
              </p>

              {/* Ticks checklist */}
              <ul className="space-y-3.5 text-sm sm:text-base text-slate-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-extrabold shrink-0 mt-0.5">✔</span>
                  <span><strong>Lose Fat & Build Muscle Without Starving</strong> – A sustainable approach backed by science</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-extrabold shrink-0 mt-0.5">✔</span>
                  <span className="font-sans"><strong>Eat Foods You Love While Still Seeing Results</strong> – No restrictive dieting</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-extrabold shrink-0 mt-0.5">✔</span>
                  <span><strong>Follow a Customized Workout Plan</strong> – Home & gym-friendly training designed for YOU</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-extrabold shrink-0 mt-0.5">✔</span>
                  <span><strong>Stay Motivated & Accountable</strong> – Weekly check-ins & expert support</span>
                </li>
              </ul>

              {/* Alert bulb tip icon box matches layout */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/50 flex gap-2.5 items-start">
                <span className="text-lg shrink-0">💡</span>
                <p className="text-xs sm:text-sm font-bold text-amber-900 leading-normal">
                  But first, let’s talk & see if this is right for you. Book your strategy call today!
                </p>
              </div>

              {/* Button triggering Booking Modal */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    try {
                      if (typeof window !== 'undefined' && (window as any).fbq) {
                        (window as any).fbq('track', 'Lead');
                      }
                    } catch (e) {}
                    handleCtaClick();
                  }}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider px-7 py-4 rounded-full flex items-center justify-center gap-2 transition duration-200 border border-red-500 font-sans shadow-lg shadow-red-600/25"
                >
                  <Video className="w-5 h-5" />
                  <span>Talk with expert</span>
                </button>
                <span className="text-red-550 font-bold tracking-widest text-[10px] uppercase">
                  Limited Spots | Filling Fast
                </span>
              </div>

            </div>

            {/* Right: Smiling trainer photographic asset */}
            <div className="md:col-span-5 relative group justify-self-center w-full max-w-[320px]">
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-35 transition" />
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-xl bg-orange-50 aspect-[3/4]">
                <img
                  src={coachPortrait}
                  alt="Coach HealthyNation"
                  className="w-full h-full object-cover object-top filter contrast-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ'S SECTION (Common objections & answers) */}
      <FaqSection />

      {/* SECTION 7: FINAL CALL TO ACTION (Gym dark overlay footer) */}
      <section id="final-cta" className="relative py-24 px-4 md:px-10 overflow-hidden border-t border-neutral-900">
        
        {/* Background images element overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={gymHeroBg}
            alt="Moody gym background"
            className="w-full h-full object-cover opacity-20 filter brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_100%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          
          <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
            ⌛ Limited Spots Available – Don’t Miss Out!
          </h2>

          {/* Supporting urgency phrases */}
          <div className="text-neutral-400 text-sm sm:text-base max-w-2xl space-y-3 font-medium">
            <p className="leading-relaxed">
              The Truth Is, If You Don’t Make Time For Creating A Real Impact In Your Life, You’ll Keep Struggling, Month After Month, Year After Year. There Is No Time Like The Present To Take Action.
            </p>
            <p className="text-white font-extrabold text-[15px] tracking-wide pt-1">
              🚀 Take The First Step Toward Your Dream Body.
            </p>
            <p className="text-red-500 font-extrabold text-[15px] tracking-wide">
              🎯 Book Your Strategy Call Today & Discover If This 12-Week Transformation Program Is Right For You.
            </p>
          </div>

          {/* Salmon themed highlight tag */}
          <div className="bg-red-500/10 border-2 border-red-500/30 text-red-500 rounded-xl px-6 py-2.5 font-black text-lg uppercase tracking-widest mt-3">
            Act Now—Secure Your Spot
          </div>

          {/* Central Trigger Action Booking CTA */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead');
                  }
                } catch (e) {}
                handleCtaClick();
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-black text-sm sm:text-base uppercase tracking-wider px-9 py-5 rounded-full flex items-center justify-center gap-2.5 transition transform hover:scale-[1.02] shadow-2xl border border-red-500 font-sans"
            >
              <Video className="w-5 h-5" />
              <span>Talk with expert</span>
            </button>
            <span className="text-red-500 font-bold tracking-widest text-[10px] uppercase">
              Limited Spots | Filling Fast
            </span>
          </div>



        </div>
      </section>

      {/* FLOAT STICKY ACTION NAV BAR (Floating sticky at bottom, seen in all screenshots) */}
      <StickyBottomBar onBookClick={handleCtaClick} />

      {/* MODAL SCHEDULER POPUP */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    </div>
  );
}
