import React from 'react';
import { DonenessLevel } from '../types';
import { Star } from 'lucide-react';

interface TemperatureGraphProps {
  levels: DonenessLevel[];
  currentIndex: number;
}

export const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ levels, currentIndex }) => {
  // Constants for graph scaling
  const MAX_TEMP_DISPLAY = 90; // Max temperature on Y-axis for scaling
  
  if (levels.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-stone-200 dark:border-slate-700">
      <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 relative px-2 pt-8">
        
        {levels.map((level, idx) => {
          const isActive = idx === currentIndex;
          const isRecommended = level.isRecommended;
          const heightPercentage = Math.min((level.temp / MAX_TEMP_DISPLAY) * 100, 100);
          
          return (
            <div 
              key={level.id}
              className={`relative flex flex-col items-center justify-end flex-1 group transition-all duration-500 ease-out`}
              style={{ height: '100%' }}
            >
              {/* Recommended Indicator */}
              {isRecommended && (
                <div className="absolute -top-6 z-10 text-yellow-500 animate-pulse drop-shadow-sm">
                    <Star size={20} fill="currentColor" />
                </div>
              )}

              {/* Temperature Bubble (Only visible on active or hover) */}
              <div 
                className={`absolute -top-12 transition-all duration-300 transform z-30
                  ${isActive 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                  }
                `}
              >
                <span className="bg-stone-800 dark:bg-white text-white dark:text-stone-900 text-xs font-bold px-2 py-1 rounded shadow-lg">
                  {level.temp}°
                </span>
              </div>

              {/* The Bar */}
              <div 
                className={`w-full max-w-[3rem] rounded-t-lg transition-all duration-500 relative overflow-hidden shadow-sm
                  ${isActive 
                    ? 'opacity-100 ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800 shadow-md' 
                    : isRecommended
                        ? 'opacity-90 ring-2 ring-yellow-400 ring-offset-2 dark:ring-offset-slate-800'
                        : 'opacity-40 hover:opacity-70 grayscale hover:grayscale-0'
                  }
                `}
                style={{ 
                  height: `${heightPercentage}%`,
                  backgroundColor: level.color 
                }}
              >
                 {/* Shine effect */}
                 <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/30 to-transparent pointer-events-none"></div>
              </div>

              {/* X-Axis Label */}
              <div className="mt-3 text-center h-10 w-full flex items-start justify-center">
                <span className={`text-[10px] sm:text-xs leading-tight transition-colors duration-300
                  ${isActive ? 'font-bold text-stone-800 dark:text-white' : 'text-stone-400 dark:text-slate-500'}
                  ${isRecommended && !isActive ? 'text-yellow-600 dark:text-yellow-400 font-medium' : ''}
                `}>
                  {levels.length <= 3 || window.innerWidth > 640 ? level.label.split(' (')[0] : (idx + 1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};