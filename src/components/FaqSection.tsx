import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('will-get-plan'); // default open second one to match screenshot

  const faqs: FaqItem[] = [
    {
      id: 'what-exactly',
      question: 'What exactly is a 1-on-1 personalized fitness session?',
      answer: 'This session is a private 1-on-1 call with me (your expert coach). We’ll dive deep into your current lifestyle, dietary habits, and fitness challenges. By the end of this call, we’ll pinpoint exactly what has been holding you back and establish a clear, realistic roadmap to get you to your goal shape.'
    },
    {
      id: 'will-get-plan',
      question: 'Will I get a personalized workout or diet plan during the session?',
      answer: "No, this session is focused on providing expert advice and discussing your personal goals. While you won't receive a complete workout or diet plan, you will get customized tips and a roadmap for the next steps in your fitness journey."
    },
    {
      id: 'how-long',
      question: 'How long is the 1-on-1 fitness session?',
      answer: 'The session typically lasts around 40 – 60 minutes. During this time, we’ll dive into your goals, challenges, and outline a strategy to help you achieve your desired results'
    },
    {
      id: 'do-i-need',
      question: 'Do I need to prepare anything for the session?',
      answer: 'All you need to do is come with an open mind and be ready to discuss your fitness goals, current challenges, and any obstacles you’re facing. This will help us provide the best guidance tailored to your needs.'
    },
    {
      id: 'is-there',
      question: 'Is there any obligation after the session?',
      answer: 'No, there’s absolutely no obligation after the session. Our goal is to provide value and help you with the next steps on your fitness journey. If you decide to take it further with us, that’s entirely up to you.'
    },
    {
      id: 'busy-schedule',
      question: 'What if I have a busy schedule? Can this session work for me?',
      answer: 'Yes! This session is specifically designed for busy professionals. We understand your time is valuable, so the advice and roadmap we provide will be easy to integrate into your hectic lifestyle.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-slate-50 pt-6 pb-12 sm:py-16 px-4 md:px-10 border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Title matches Playfair Serif purple style shown on image */}
        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black font-serif text-[#1e1b4b] text-center tracking-tight leading-tight">
          Your Questions, Answered!
        </h2>

        {/* Subtitle white capsule with thin dark border */}
        <div className="mt-4 mb-10 border border-slate-900 rounded-full px-6 py-2.5 bg-white shadow-sm inline-flex items-center justify-center">
          <span className="text-[#100e34] text-xs sm:text-sm font-extrabold tracking-wide font-sans">
            Still have a question? Book A Call right now!
          </span>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Trigger Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Chevron on left if closed to match image style */}
                  {!isOpen && (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e1b4b] shrink-0 stroke-[3px]" />
                  )}
                  {isOpen && (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e1b4b] shrink-0 stroke-[3px] md:hidden" />
                  )}
                  
                  <span className="text-sm sm:text-base md:text-[17px] font-extrabold text-[#1e1b4b] font-sans leading-snug">
                    {faq.question}
                  </span>
                </button>

                {/* Answer Box */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-0 animate-fade-in">
                    <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-semibold">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
