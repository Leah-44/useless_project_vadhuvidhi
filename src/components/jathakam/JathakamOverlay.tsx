import React, { useEffect, useCallback } from 'react';
import { X, Sparkles, Cpu, Eye, CheckCircle2, Award } from 'lucide-react';

interface JathakamOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JathakamOverlay: React.FC<JathakamOverlayProps> = ({ isOpen, onClose }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      id="jathakam-overlay-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Outer Container with Traditional Palm Leaf aesthetic & Subtle AI Elements */}
      <div className="relative w-full max-w-2xl my-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-600/90 bg-[#21170d] text-[#2c1405]">
        {/* Subtle Cybernetic Scanning Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />

        {/* AI System Dossier Header Bar */}
        <div className="bg-neutral-950/90 px-4 py-2.5 border-b border-amber-700/60 flex items-center justify-between text-amber-300 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="font-bold tracking-wider">
              [VADHUVIDHI.EXE // NEURAL_THALIYOLA_ENGINE v4.2]
            </span>
          </div>
          <button
            id="btn-close-jathakam-x"
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Close Jathakam"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Palm Leaf Manuscript (താളിയോല) Body */}
        <div
          className="relative p-6 sm:p-8 bg-[#f5ebd2] border-8 border-[#3b1c08]/80 text-[#2a1204] space-y-6 shadow-inner"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(220,195,145,0.7) 100%),
              repeating-linear-gradient(0deg, rgba(70,35,10,0.03) 0px, rgba(70,35,10,0.03) 1px, transparent 1px, transparent 14px)
            `,
          }}
        >
          {/* Traditional Thaliyola Cord Holes with Brass Grommets */}
          <div className="flex justify-between items-center px-4 opacity-75 pointer-events-none">
            <div className="w-4 h-4 rounded-full border-2 border-[#5c2e0b] bg-[#ecd4a4] shadow-inner flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b1c08]" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#5c2e0b] uppercase font-bold">
              <span>॥ ശ്രീ രാശി ചക്രം - ഡിജിറ്റൽ ജാതക പൊരുത്തം ॥</span>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-[#5c2e0b] bg-[#ecd4a4] shadow-inner flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b1c08]" />
            </div>
          </div>

          {/* Traditional Kerala Rashi Chakra (രാശി ചക്രം) with subtle Cyber AI accents */}
          <div className="max-w-md mx-auto p-3 rounded-lg bg-[#eddcb9]/80 border-2 border-[#5c2e0b] shadow-sm">
            <div className="grid grid-cols-4 grid-rows-4 gap-1 text-[10px] font-mono text-center font-bold text-[#451f04]">
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">മീനം<br/><span className="text-[9px] text-[#7a3b08]">AI: OPTIMAL</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">മേടം<br/><span className="text-[9px] text-[#7a3b08]">ലഗ്നം</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">ഇടവം<br/><span className="text-[9px] text-[#7a3b08]">വ്യാഴം</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">മിഥുനം<br/><span className="text-[9px] text-[#7a3b08]">റീല്സ് 99%</span></div>

              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">കുംഭം<br/><span className="text-[9px] text-[#7a3b08]">ശനി: PEAK</span></div>
              <div className="col-span-2 row-span-2 p-2 border-2 border-[#5c2e0b] bg-[#fdfaf2] flex flex-col items-center justify-center text-center">
                <Sparkles className="w-5 h-5 text-amber-700 animate-pulse mb-0.5" />
                <span className="text-xs font-bold text-[#3b1c08]">ഗ്രഹ നില പൊരുത്തം</span>
                <span className="text-[10px] text-amber-900 font-mono">10/10 HARMONY</span>
                <span className="text-[8px] text-neutral-600 font-mono tracking-tighter">[NEURAL KUNDALI]</span>
              </div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">കർക്കടകം<br/><span className="text-[9px] text-[#7a3b08]">ചന്ദ്രൻ</span></div>

              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">മകരം<br/><span className="text-[9px] text-[#7a3b08]">ശുക്രൻ</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">ചിങ്ങം<br/><span className="text-[9px] text-[#7a3b08]">സൂര്യൻ</span></div>

              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">ധനു<br/><span className="text-[9px] text-[#7a3b08]">കുജൻ: MIN</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">വൃശ്ചികം<br/><span className="text-[9px] text-[#7a3b08]">കേതു</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">തുലാം<br/><span className="text-[9px] text-[#7a3b08]">രാഹു</span></div>
              <div className="p-1.5 border border-[#8c531b] bg-[#f9f3e3]">കന്നി<br/><span className="text-[9px] text-[#7a3b08]">ബുധൻ</span></div>
            </div>
          </div>

          {/* EXACT REQUIRED TEXT - NEVER REWRITTEN OR TRANSLATED */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#fdf9ef]/90 border border-[#8c531b]/60 shadow-sm space-y-4 text-xs sm:text-sm font-serif leading-relaxed text-[#2c1405]">
            <p className="font-bold text-sm sm:text-base text-[#4a1f05] border-b border-[#8c531b]/30 pb-2">
              ഇരുവരുടെയും ഗ്രഹനിലയിൽ അപൂർവമായ പൊരുത്തം കാണുന്നു.
            </p>

            <p className="whitespace-pre-line">
              {`ശനിയുടെ ദോഷം\nഓണും\nനോം\nകാണുനില കാരണം\nഇരുവരുടെയും Brain Rot ലെവൽ പീക്കാണ്.`}
            </p>

            <p className="whitespace-pre-line">
              {`ഇരുവരുടെയും റീല്സ്\nഫീഡിൽ\nഅസാധാരണം ആയ\nപൊരുത്തം കാണപ്പെടുന്നു , അത് തന്നെ\nശുക്രന് തെളിഞ്ഞു നികുണത്തിന്റെ ലക്ഷണം\nആണ്`}
            </p>

            <p className="whitespace-pre-line">
              {`പക്ഷേ\nകുട്ടി\nminimalistum, ഭർത്താവ് അതിന്റെ നേരെ\nവിപരീതം. അതുകൊണ്ട് ഗൃഹനിലയിൽ ചെറിയ\nകലഹയോഗം കാണുന്നു.`}
            </p>

            <p className="whitespace-pre-line">
              {`മൊതത്തിൽ നോക്കിയാൽ, നം കണ്ടത്തിൽ വെച്ചോം\n10/10 പൊരുത്തമാണ് ഇത്\n.`}
            </p>

            {/* Verdict Box with exact required text */}
            <div className="mt-4 pt-3 border-t-2 border-[#5c2e0b] space-y-2 bg-[#f4e8cb] p-3.5 rounded-lg text-center">
              <p className="text-xs sm:text-sm font-semibold text-[#4a1f05]">
                സകലവും പരിശോധനിച്ചു. അന്തിമ വിധി:
              </p>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#401b05] text-[#f7e096] font-bold text-base sm:text-lg tracking-wide shadow-md">
                <span>പൊരുത്തം: 10/10 🔱✨</span>
              </div>
            </div>
          </div>

          {/* Traditional Thaliyola Cord Holes Bottom */}
          <div className="flex justify-between items-center px-4 opacity-75 pointer-events-none">
            <div className="w-4 h-4 rounded-full border-2 border-[#5c2e0b] bg-[#ecd4a4] shadow-inner flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b1c08]" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#5c2e0b] uppercase font-bold">
              <span>[ VadhuVidhi Astrological Kernel Verified ]</span>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-[#5c2e0b] bg-[#ecd4a4] shadow-inner flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b1c08]" />
            </div>
          </div>
        </div>

        {/* Footer with return to chat button */}
        <div className="bg-neutral-950 p-4 border-t border-amber-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <span className="text-neutral-400 text-[11px]">
            Press <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-neutral-200">Esc</kbd> or click the button to return to chat
          </span>

          <button
            id="btn-close-jathakam"
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ചാറ്റിലേക്ക് മടങ്ങുക (Return to Family Chat)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
