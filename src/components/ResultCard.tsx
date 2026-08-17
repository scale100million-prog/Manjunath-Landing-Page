import React from 'react';
import { ResultCardData } from '../types';

interface ResultCardProps {
  card: ResultCardData;
}

export const ResultCard: React.FC<ResultCardProps> = ({ card }) => {
  // Helper to render AFTER text with KG numbers bolded
  const renderAfterText = (text: string) => {
    const parts = text.split(/(\d+\s*KG)/g);
    return parts.map((part, idx) => {
      if (/\d+\s*KG/.test(part)) {
        return (
          <strong key={idx} className="font-extrabold text-[#1A1A2E]">
            {part}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div
      id={`result-card-${card.id}`}
      className="bg-white border border-[#E24A17]/30 rounded-[24px] pt-[16px] px-[16px] pb-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full text-left"
    >
      <div>
        {/* Transformation Photo Container: height 260px desktop / 300px mobile, object-contain, bg #F4F4F7 */}
        <div className="w-full h-[300px] sm:h-[260px] flex items-center justify-center bg-[#F4F4F7] rounded-[16px] overflow-hidden">
          <img
            src={card.image}
            alt={card.imageAlt || `${card.name} before and after transformation`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* Result Line: 20px gap under image, centered, 18px extrabold, colour #E24A17 */}
        <p className="mt-[20px] text-center text-[18px] font-extrabold text-[#E24A17] leading-tight">
          {card.resultLine}
        </p>

        {/* Name: bold 18px #1A1A2E, 16px below result line */}
        <h3 className="text-[#1A1A2E] font-bold text-[18px] mt-[16px] leading-tight">
          {card.name}
        </h3>

        {/* Role: 11px uppercase primary color, tracking 0.1em, 8px below name */}
        <p className="text-[#E24A17] text-[11px] font-bold uppercase tracking-[0.1em] mt-[8px]">
          {card.role}
        </p>

        {/* Divider: 1px #E8E8F0, 24px margin top and bottom */}
        <div className="h-[1px] bg-[#E8E8F0] my-[24px] w-full" />

        {/* BEFORE block */}
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9090AA]">
            BEFORE
          </span>
          <p className="text-[15px] text-[#4A4B65] leading-[1.7] mt-[8px]">
            {card.before}
          </p>
        </div>

        {/* 20px gap between BEFORE and AFTER */}
        <div className="h-[20px]" />

        {/* AFTER block */}
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#E24A17]">
            AFTER
          </span>
          <p className="text-[15px] text-[#1A1A2E] font-medium leading-[1.7] mt-[8px]">
            {renderAfterText(card.after)}
          </p>
        </div>
      </div>
    </div>
  );
};
