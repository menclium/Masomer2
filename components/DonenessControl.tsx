import React from 'react';
import { DonenessLevel } from '../types';
import { Flame, Star } from 'lucide-react';

interface DonenessControlProps {
  levels: DonenessLevel[];
  currentIndex: number;
  onChange: (index: number) => void;
}

export const DonenessControl: React.FC<DonenessControlProps> = ({ levels, currentIndex, onChange }) => {
  const max = levels.length - 1;
  const currentLevel = levels[currentIndex];

  if (levels.length === 1) {
    return (
      <div className="bg-stone-100 dark:bg-slate-800 p-6 rounded-2xl border border-stone-200 dark:border-slate-700 text-center">
         <div className="flex justify-center items-center gap-2 mb-2 text-primary">
            <Flame size={32} fill="currentColor" />
         </div>
         <p className="text-lg font-medium">Pro tento druh masa existuje pouze jeden bezpečný stupeň úpravy.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-slate-700 mb-8">
      <div className="flex justify-between items-end mb-4">
        <label className="text-lg font-semibold flex items-center gap-2">
          <Flame className="text-orange-500" />
          Stupeň propečení
        </label>
        <span className="text-sm text-stone-500 dark:text-slate-400 font-mono bg-stone-100 dark:bg-slate-900 px-2 py-1 rounded">
          {currentIndex + 1} / {levels.length}
        </span>
      </div>

      <div className="relative h-12 flex items-center mb-6">
        {/* Track background */}
        <div className="absolute w-full h-3 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
           <div 
             className="h-full bg-gradient-to-r from-red-600 via-pink-500 to-stone-500 transition-all duration-300"
             style={{ width: `${(currentIndex / max) * 100}%` }}
           ></div>
        </div>

        {/* Input slider */}
        <input
          type="range"
          min="0"
          max={max}
          step="1"
          value={currentIndex}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          aria-label="Vyberte stupeň propečení"
        />

        {/* Visual Dots */}
        <div className="absolute w-full flex justify-between px-1 pointer-events-none z-10">
          {levels.map((level, idx) => (
            <div 
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 
                ${idx <= currentIndex 
                  ? 'bg-white border-primary scale-125' 
                  : 'bg-stone-300 dark:bg-slate-600 border-transparent'
                }
              `}
            ></div>
          ))}
        </div>
      </div>

      {/* Recommended Marker */}
      <div className="flex flex-wrap justify-between gap-2 text-xs text-stone-400 dark:text-slate-500">
         <span>{levels[0].label}</span>
         <span>{levels[max].label}</span>
      </div>

      {currentLevel.isRecommended && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-secondary font-medium bg-yellow-50 dark:bg-yellow-900/20 py-2 rounded-lg">
          <Star size={16} fill="currentColor" />
          Doporučená úprava šéfkuchaře
        </div>
      )}
    </div>
  );
};
