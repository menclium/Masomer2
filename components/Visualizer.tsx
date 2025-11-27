import React from 'react';
import { DonenessLevel } from '../types';
import { Thermometer } from 'lucide-react';

interface VisualizerProps {
  level: DonenessLevel;
}

export const Visualizer: React.FC<VisualizerProps> = ({ level }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-stone-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        
        {/* Meat Cross-section Visualization */}
        <div className="relative shrink-0">
          <div 
            className="w-48 h-48 rounded-full shadow-inner border-4 border-stone-800 dark:border-slate-600 relative overflow-hidden transition-all duration-500"
            style={{
              background: `radial-gradient(circle, ${level.color} 0%, ${level.color} 30%, #5d4037 85%, #3e2723 100%)`
            }}
          >
             {/* Grill marks effect */}
             <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
             {/* Gloss effect */}
             <div className="absolute top-4 left-8 w-16 h-8 bg-white opacity-10 rounded-full blur-xl transform -rotate-45"></div>
          </div>
          
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-stone-800 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            Řez masem
          </div>
        </div>

        {/* Info & Temperature */}
        <div className="flex-1 text-center md:text-left w-full">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-white mb-2">{level.label}</h2>
          
          <div className="flex items-center justify-center md:justify-start gap-3 my-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
              <Thermometer className="text-primary w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-stone-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Cílová teplota</p>
              <p className="text-4xl font-mono font-bold text-primary">{level.temp}°C</p>
            </div>
          </div>

          <p className="text-stone-600 dark:text-slate-300 leading-relaxed text-lg border-t border-stone-100 dark:border-slate-700 pt-4 mt-2">
            {level.description}
          </p>
        </div>
      </div>
    </div>
  );
};
