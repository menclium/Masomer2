import React, { useState, useEffect } from 'react';
import { MEAT_DATA } from './constants';
import { MeatData, Theme } from './types';
import { ThemeToggle } from './components/ThemeToggle';
import { MeatSelector } from './components/MeatSelector';
import { DonenessControl } from './components/DonenessControl';
import { Visualizer } from './components/Visualizer';
import { ChefHat, Utensils } from 'lucide-react';

const App: React.FC = () => {
  // State initialization
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  
  // Default to Beef
  const defaultMeat = MEAT_DATA.find(m => m.id === 'beef') || null;
  const defaultIndex = defaultMeat 
    ? defaultMeat.donenessLevels.findIndex(l => l.isRecommended) 
    : 0;

  const [selectedMeat, setSelectedMeat] = useState<MeatData | null>(defaultMeat);
  const [selectedSubCutId, setSelectedSubCutId] = useState<string | null>(null);
  const [donenessIndex, setDonenessIndex] = useState<number>(defaultIndex >= 0 ? defaultIndex : 0);

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleMeatSelect = (meat: MeatData) => {
    setSelectedMeat(meat);
    
    let levels = meat.donenessLevels;
    
    // Check for sub-cuts
    if (meat.subCuts && meat.subCuts.length > 0) {
      const defaultSubCut = meat.subCuts[0];
      setSelectedSubCutId(defaultSubCut.id);
      levels = defaultSubCut.donenessLevels;
    } else {
      setSelectedSubCutId(null);
    }

    // Reset index to recommended
    const recommendedIndex = levels.findIndex(l => l.isRecommended);
    setDonenessIndex(recommendedIndex >= 0 ? recommendedIndex : 0);
    
    // Smooth scroll to controls if needed
    setTimeout(() => {
      document.getElementById('controls-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubCutSelect = (subCutId: string) => {
    if (!selectedMeat || !selectedMeat.subCuts) return;
    
    const subCut = selectedMeat.subCuts.find(sc => sc.id === subCutId);
    if (subCut) {
      setSelectedSubCutId(subCut.id);
      // Reset index for the new cut
      const recommendedIndex = subCut.donenessLevels.findIndex(l => l.isRecommended);
      setDonenessIndex(recommendedIndex >= 0 ? recommendedIndex : 0);
    }
  };

  // Determine current active levels
  const activeLevels = React.useMemo(() => {
    if (selectedMeat?.subCuts && selectedSubCutId) {
      return selectedMeat.subCuts.find(sc => sc.id === selectedSubCutId)?.donenessLevels || [];
    }
    return selectedMeat?.donenessLevels || [];
  }, [selectedMeat, selectedSubCutId]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 pb-4 border-b border-stone-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white">
            <ChefHat size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-800 dark:text-slate-100">
            Masoměr
          </h1>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main className="flex-grow">
        <div className="text-center mb-8">
          <h2 className="text-xl text-stone-600 dark:text-slate-400">
            Vyberte druh masa
          </h2>
        </div>

        <MeatSelector 
          meats={MEAT_DATA} 
          selectedMeatId={selectedMeat?.id || null} 
          onSelect={handleMeatSelect} 
        />

        {selectedMeat && activeLevels.length > 0 && (
          <div id="controls-section" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Sub Cut Selector (if applicable) */}
            {selectedMeat.subCuts && (
              <div className="flex flex-col items-center mb-6">
                <span className="text-sm font-medium text-stone-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                  <Utensils size={16} />
                  Zvolte část masa
                </span>
                <div className="bg-stone-100 dark:bg-slate-700 p-1 rounded-xl inline-flex shadow-inner">
                  {selectedMeat.subCuts.map((cut) => {
                    const isActive = selectedSubCutId === cut.id;
                    return (
                      <button
                        key={cut.id}
                        onClick={() => handleSubCutSelect(cut.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          isActive 
                            ? 'bg-white dark:bg-slate-600 text-primary shadow-sm scale-100' 
                            : 'text-stone-500 dark:text-slate-400 hover:text-stone-700 dark:hover:text-slate-200'
                        }`}
                      >
                        {cut.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <DonenessControl
              levels={activeLevels}
              currentIndex={donenessIndex}
              onChange={setDonenessIndex}
            />
            
            <Visualizer 
              level={activeLevels[donenessIndex]} 
            />
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-stone-400 dark:text-slate-600 text-sm py-6 border-t border-stone-100 dark:border-slate-800">
        <p>© {new Date().getFullYear()} Masoměr - Váš průvodce dokonalým steakem</p>
      </footer>
    </div>
  );
};

export default App;