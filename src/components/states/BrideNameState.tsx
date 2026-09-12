import React, { useState } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { User, GraduationCap, MapPin, ArrowRight, Flower2 } from 'lucide-react';

export const BrideNameState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, updateContext, next } = machine;
  const [name, setName] = useState(context.brideName || 'Devika Menon');
  const [degree, setDegree] = useState(context.brideDegree || 'M.Tech Computer Science (CUSAT)');
  const [location, setLocation] = useState(context.brideLocation || 'Thrissur, Kerala');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Devika Menon';
    const finalDegree = degree.trim() || 'M.Tech Computer Science';
    const finalLocation = location.trim() || 'Thrissur, Kerala';

    updateContext({
      brideName: finalName,
      brideDegree: finalDegree,
      brideLocation: finalLocation,
    });
    next();
  };

  // Keyboard navigation when not focused on an input
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="state-bride-name-view">
      <div className="border border-[#eedfd1] bg-[#fdfbf7] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
        {/* Subtle Top Zari Ribbon */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#b85b73] via-[#bfa054] to-transparent opacity-60" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8dc] pb-4">
          <div className="flex items-center gap-3 text-[#2c221e] font-regal text-base sm:text-lg font-bold">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f4] border border-[#f0c4ce] flex items-center justify-center text-[#78182a] shadow-xs">
              <User className="w-4 h-4 text-[#78182a]" />
            </div>
            <div>
              <div className="text-[#78182a]">BRIDE CANDIDATE INTAKE</div>
              <div className="text-[11px] font-mono font-normal text-[#736357]">Traditional Pennu Kaanal Dossier Matrix</div>
            </div>
          </div>
          <span className="text-xs font-mono text-[#78182a] bg-white px-3.5 py-1 rounded-full border border-[#f0c4ce] font-medium shadow-xs flex items-center gap-1.5">
            <Flower2 className="w-3.5 h-3.5 text-[#b85b73]" />
            <span>PHASE 2: BRIDE PROFILING</span>
          </span>
        </div>

        <div className="space-y-5 pt-1">
          <div>
            <label htmlFor="input-bride-name" className="block text-xs font-mono text-[#2c221e] mb-1.5 font-semibold tracking-wide">
              BRIDE FULL LEGAL NAME *
            </label>
            <div className="relative">
              <input
                id="input-bride-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  updateContext({ brideName: e.target.value });
                }}
                required
                className="w-full bg-white border border-[#d6be8b] rounded-xl px-4 py-3 text-base text-[#2c221e] font-serif focus:outline-none focus:border-[#78182a] transition-colors shadow-xs placeholder:text-[#a89c91]"
                placeholder="e.g. Devika Menon"
              />
            </div>
            <p className="text-[11px] text-[#736357] font-mono mt-1">
              Enter bride name or select a typical Kerala profile above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="input-bride-degree" className="block text-xs font-mono text-[#2c221e] mb-1.5 flex items-center gap-1.5 font-semibold tracking-wide">
                <GraduationCap className="w-3.5 h-3.5 text-[#a8822e]" />
                QUALIFICATION / EDUCATION
              </label>
              <input
                id="input-bride-degree"
                type="text"
                value={degree}
                onChange={(e) => {
                  setDegree(e.target.value);
                  updateContext({ brideDegree: e.target.value });
                }}
                className="w-full bg-white border border-[#d6be8b] rounded-xl px-4 py-3 text-sm text-[#2c221e] font-mono focus:outline-none focus:border-[#78182a] transition-colors shadow-xs placeholder:text-[#a89c91]"
                placeholder="e.g. M.Tech Computer Science"
              />
            </div>

            <div>
              <label htmlFor="input-bride-location" className="block text-xs font-mono text-[#2c221e] mb-1.5 flex items-center gap-1.5 font-semibold tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#a8822e]" />
                NATIVE RESIDENCE
              </label>
              <input
                id="input-bride-location"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  updateContext({ brideLocation: e.target.value });
                }}
                className="w-full bg-white border border-[#d6be8b] rounded-xl px-4 py-3 text-sm text-[#2c221e] font-mono focus:outline-none focus:border-[#78182a] transition-colors shadow-xs placeholder:text-[#a89c91]"
                placeholder="e.g. Thrissur, Kerala"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <span className="text-[#736357] text-[11px]">
          Press <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">Enter</kbd> to proceed to biometric scan
        </span>

        <button
          id="btn-bride-name-proceed"
          type="submit"
          className="w-full sm:w-auto px-7 py-3 bg-[#78182a] hover:bg-[#601321] text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <span>CONFIRM BRIDE &amp; INITIATE SCAN</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
