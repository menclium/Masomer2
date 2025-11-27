import React from 'react';
import { MeatData } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface MeatSelectorProps {
  meats: MeatData[];
  selectedMeatId: string | null;
  onSelect: (meat: MeatData) => void;
}

export const MeatSelector: React.FC<MeatSelectorProps> = ({ meats, selectedMeatId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {meats.map((meat) => {
        const isSelected = selectedMeatId === meat.id;
        return (
          <button
            key={meat.id}
            onClick={() => onSelect(meat)}
            className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 border-2 text-left focus:outline-none
              active:scale-95
              ${isSelected 
                ? 'border-primary scale-[1.02] shadow-xl ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 bg-white dark:bg-slate-800' 
                : 'border-transparent hover:border-stone-300 dark:hover:border-slate-600 hover:scale-[1.01] bg-white dark:bg-slate-800'
              }
            `}
            aria-pressed={isSelected}
          >
            <div className={`aspect-[4/3] w-full flex items-center justify-center transition-colors duration-300
                ${isSelected ? 'bg-primary/5' : 'bg-stone-50 dark:bg-slate-700/50 group-hover:bg-stone-100 dark:group-hover:bg-slate-700'}
            `}>
              <meat.Icon 
                className={`transition-all duration-500 ease-out select-none leading-none
                    text-[7rem] lg:text-[6rem] xl:text-[7rem]
                    ${isSelected 
                        ? 'scale-110 rotate-[-6deg] drop-shadow-md grayscale-0 filter' 
                        : 'scale-90 grayscale opacity-60 group-hover:scale-100 group-hover:rotate-3 group-hover:grayscale-0 group-hover:opacity-100 filter'
                    }
                `}
              />
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-stone-100 dark:border-slate-700">
              <span className={`text-xl font-bold transition-colors ${isSelected ? 'text-primary' : 'text-stone-700 dark:text-slate-200'}`}>
                {meat.name}
              </span>
              <div className={`transition-all duration-300 transform ${isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                 {isSelected && <CheckCircle2 className="text-primary" size={24} />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};