import { Star } from 'lucide-react';

export default function ReviewPill() {
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80',
  ];

  return (
    <div id="review-capsule" className="inline-flex items-center gap-1.5 sm:gap-3 bg-white border border-gray-100 rounded-full px-2.5 py-1 sm:px-4 sm:py-2 shadow-lg max-w-full overflow-hidden select-none">
      {/* Avatar Stacks */}
      <div className="flex -space-x-2 sm:-space-x-2.5 items-center">
        {avatars.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Satisfied client ${i + 1}`}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      {/* Star and Rating */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Star className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
        <span className="text-gray-900 font-bold text-xs sm:text-base">4.9 Review</span>
      </div>

      {/* Separator Line */}
      <div className="h-4 sm:h-5 w-px bg-gray-300"></div>

      {/* Client Count */}
      <div className="text-gray-700 font-semibold text-[10px] sm:text-sm tracking-tight whitespace-nowrap">
        2,000+ Satisfied Clients
      </div>
    </div>
  );
}
