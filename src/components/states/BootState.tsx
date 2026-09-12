import React, { useState, useEffect, useCallback } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { Terminal, Check, Sparkles, ArrowRight, Disc3, Flower2, HeartHandshake } from 'lucide-react';

interface CheckItem {
  id: string;
  label: string;
  detail: string;
}

const BOOT_CHECKLIST: CheckItem[] = [
  { id: 'kerala', label: 'Kerala Marriage Protocol', detail: 'Traditional customs and auntie verification matrix' },
  { id: 'family', label: 'Family Expectations', detail: 'Paternal uncle scrutiny index calibrated to maximum' },
  { id: 'jathakam', label: 'Jathakam പൊരുത്തം', detail: 'Astrological planetary alignments & 10 poruthams verified' },
  { id: 'ai', label: 'Artificial Intelligence', detail: 'Deep neural network trained on 500,000 matrimony biodatas' },
  { id: 'pressure', label: 'Social Pressure', detail: '"What will people say?" algorithm operating at 100% load' },
  { id: 'tea', label: 'Tea Analysis', detail: 'Sulaimani temperature, tray balance & snack crunch sensors armed' },
];

export const BootState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isSystemReady, setIsSystemReady] = useState<boolean>(false);

  // Progressive reveal sequence with auto-advance guarantee
  useEffect(() => {
    if (revealedCount < BOOT_CHECKLIST.length) {
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, 220);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsSystemReady(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [revealedCount]);

  // Guaranteed auto-advance after system ready so BOOT always progresses
  useEffect(() => {
    if (isSystemReady) {
      const autoAdvanceTimer = setTimeout(() => {
        machine.next();
      }, 3500);
      return () => clearTimeout(autoAdvanceTimer);
    }
  }, [isSystemReady, machine]);

  const handleAdvance = useCallback(() => {
    if (!isSystemReady) {
      setRevealedCount(BOOT_CHECKLIST.length);
      setIsSystemReady(true);
    } else {
      machine.next();
    }
  }, [isSystemReady, machine]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleAdvance();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdvance]);

  return (
    <div
      id="state-boot-view"
      onClick={handleAdvance}
      className="relative select-none cursor-pointer rounded-2xl overflow-hidden border border-[#e8dfd1] bg-[#fdfbf7] p-6 sm:p-10 space-y-6 shadow-xs transition-all hover:border-[#d6be8b]"
      title="Click anywhere, press Space, Enter, or Right Arrow to advance"
    >
      {/* Subtle traditional corner flourish */}
      <div className="absolute top-3 left-4 text-[#d6be8b] text-sm select-none pointer-events-none">❧</div>
      <div className="absolute top-3 right-4 text-[#d6be8b] text-sm select-none pointer-events-none">☙</div>

      {/* Terminal Header with Subtle Kerala Nilavilakku Startup Lighting */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8dc] pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 rounded-full bg-[#f6efe2] border border-[#d6be8b] flex items-center justify-center shrink-0">
            <div className="w-1.5 h-2.5 bg-gradient-to-t from-[#e07a5f] to-[#f4a261] rounded-full animate-vilakku-gentle" />
          </div>
          <div className="flex items-center gap-2 text-[#78182a]">
            <Terminal className="w-4 h-4 text-[#a8822e]" />
            <span className="font-semibold tracking-wide">VADHUVIDHI_OS // WEDDING PROTOCOL</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-[#e8dfd1] text-[#736357] text-[11px]">
          <Disc3 className="w-3.5 h-3.5 text-[#a8822e] animate-spin" />
          <span>FIRMWARE: KERALA_V4.20 // READY</span>
        </div>
      </div>

      {/* INITIALIZING... Header */}
      <div className="relative z-10 space-y-1 font-mono">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c4ce] text-[#78182a] text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#78182a] animate-ping" />
          <span>INITIALIZING CEREMONY PARAMETERS...</span>
        </div>
        <p className="text-xs text-[#736357] pt-1 font-mono">
          Calibrating Kerala algorithmic subroutines, astrological poruthams, and social expectations...
        </p>
      </div>

      {/* Checklist Grid with Clean Editorial Card aesthetic */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
        {BOOT_CHECKLIST.map((item, index) => {
          const isRevealed = index < revealedCount;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start justify-between gap-3 ${
                isRevealed
                  ? 'bg-white border-[#e8dfd1] shadow-xs'
                  : 'bg-[#faf7f2]/60 border-[#f0e8dc] opacity-40'
              }`}
            >
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-[#2c221e] flex items-center gap-2 font-regal">
                  <Flower2 className={`w-3.5 h-3.5 ${isRevealed ? 'text-[#a8822e]' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                <p className="text-[11px] text-[#736357] font-sans">
                  {item.detail}
                </p>
              </div>

              <div className="shrink-0 pt-0.5">
                {isRevealed ? (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#edf4f1] border border-[#c3ded4] text-[#4a7062] font-bold text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="inline-block w-5 h-5 rounded-full border border-[#e8dfd1] bg-[#faf7f2]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SYSTEM READY & HERO BRANDING */}
      {isSystemReady ? (
        <div className="relative z-10 space-y-4 pt-2 border-t border-[#f0e8dc] animate-fadeIn">
          {/* SYSTEM READY Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-[#edf4f1] text-[#4a7062] border border-[#c3ded4] rounded-full font-mono text-xs font-semibold tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4a7062]" />
              SYSTEM READY. ALL CEREMONY ENGINES ARMED.
            </span>
          </div>

          {/* Absurd AI Title & Slogan - Styled like a Modern Minimal Indian Wedding Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#d6be8b] space-y-2.5 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-[#78182a] shrink-0" />
              <h1 className="text-2xl sm:text-4xl font-regal font-bold tracking-wide text-[#78182a]">
                VadhuVidhi.EXE
              </h1>
            </div>

            <div className="space-y-0.5 font-regal pl-1">
              <p className="text-base sm:text-xl text-[#2c221e] font-medium italic">
                Traditional Kerala Pennu Kaanal.
              </p>
              <p className="text-xs sm:text-sm text-[#736357] font-mono">
                Autonomous Matrimonial Paradox Engine &bull; Unnecessarily Optimized.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center py-2 text-xs font-mono text-[#a8822e]">
          Mounting ceremonial parameters... Click or press Space to skip sequence.
        </div>
      )}

      {/* Control Prompts */}
      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f0e8dc] text-xs font-mono">
        <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
          <span className="text-[#78182a] font-semibold">NAVIGATION:</span>
          <span>Press</span>
          <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">Space</kbd>
          <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">Enter</kbd>
          <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">→</kbd>
          <span>or tap anywhere</span>
        </div>

        <button
          id="btn-boot-proceed"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            machine.next();
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#78182a] hover:bg-[#601321] text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#e2d2a4]" />
          <span>OPEN CURTAIN REVEAL</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
