import React, { useState, useEffect, useRef } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { Terminal, ArrowRight, Minimize2, Maximize2 } from 'lucide-react';

/**
 * DIAGNOSTIC STATE
 * Exact specified text and sequence:
 *
 * SYSTEM DIAGNOSTIC INITIATED...
 *
 * Groom data — FOUND ✓
 * Bride data — FOUND ✓
 * Family approval — FOUND ✓
 * Jathakam — FOUND ✓
 * Sudhi maman neglected — FOUND ✓
 * Wedding planning — FOUND ✓
 *
 * Then:
 *
 * CRITICAL VARIABLE:
 * BRIDE & GROOM CONSENT
 * STATUS: NOT FOUND
 *
 * SYSTEM IN TROUBLE.
 * Marriage decision cannot be completed.
 *
 * AI has analysed everyone...
 * ...except the two people whose lives are being decided.
 */
export const DiagnosticState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [step, setStep] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const foundItems = [
    'Groom data — FOUND ✓',
    'Bride data — FOUND ✓',
    'Family approval — FOUND ✓',
    'Jathakam — FOUND ✓',
    'Sudhi maman neglected — FOUND ✓',
    'Wedding planning — FOUND ✓',
  ];

  useEffect(() => {
    // Reveal sequence
    // step 0: SYSTEM DIAGNOSTIC INITIATED...
    // steps 1-6: found items 0-5
    // step 7: CRITICAL VARIABLE & NOT FOUND
    // step 8: SYSTEM IN TROUBLE & concluding realization
    if (step < 8) {
      const delay = step === 0 ? 700 : step <= 6 ? 400 : 800;
      timerRef.current = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, delay);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step]);

  // Keyboard navigation & quick reveal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (step < 8) {
          // Skip animation to full reveal
          setStep(8);
        } else {
          machine.next();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, machine]);

  const handleSkipOrProceed = () => {
    if (step < 8) {
      setStep(8);
    } else {
      machine.next();
    }
  };

  const content = (
    <div
      id="state-diagnostic-view"
      className="w-full max-w-3xl mx-auto space-y-8 font-mono text-neutral-100 select-none"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2 text-neutral-400">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>VADHUVIDHI_CORE // DIAGNOSTIC_ROUTINE</span>
        </div>
        <button
          type="button"
          onClick={() => setIsFullscreen((prev) => !prev)}
          className="text-[11px] text-neutral-500 hover:text-neutral-300 px-2 py-0.5 bg-neutral-900 border border-neutral-800 flex items-center gap-1 transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          <span>{isFullscreen ? 'DOCK' : 'EXPAND'}</span>
        </button>
      </div>

      {/* Main Diagnostic Terminal Frame */}
      <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-10 space-y-8 shadow-2xl">
        {/* Header line: SYSTEM DIAGNOSTIC INITIATED... */}
        <div>
          <h2
            id="diagnostic-initiated"
            className="text-base sm:text-lg md:text-xl font-bold tracking-widest text-neutral-200 uppercase flex items-center gap-2"
          >
            <span>SYSTEM DIAGNOSTIC INITIATED...</span>
            {step < 8 && <span className="w-2 h-4 bg-emerald-500 animate-pulse" />}
          </h2>
        </div>

        {/* Found Items List */}
        <div className="space-y-2.5 text-xs sm:text-sm tracking-wide">
          {foundItems.map((item, index) => {
            const isVisible = step >= index + 1;
            if (!isVisible) return null;
            return (
              <div
                key={index}
                className="text-emerald-400 flex items-center gap-2 animate-fadeIn"
              >
                <span>{item}</span>
              </div>
            );
          })}
        </div>

        {/* Dramatic Transition: CRITICAL VARIABLE */}
        {step >= 7 && (
          <div className="pt-4 space-y-4 border-t border-neutral-800 animate-fadeIn">
            <div className="text-xs uppercase tracking-widest text-neutral-500">
              CRITICAL VARIABLE:
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              BRIDE &amp; GROOM CONSENT
            </div>

            <div className="inline-block border-2 border-red-600 bg-red-950/70 px-4 py-2 text-sm sm:text-base font-black tracking-widest text-red-400">
              STATUS: NOT FOUND
            </div>
          </div>
        )}

        {/* Concluding Realization */}
        {step >= 8 && (
          <div className="pt-4 space-y-3 border-t border-neutral-800 animate-fadeIn text-sm sm:text-base leading-relaxed">
            <div className="text-red-500 font-bold uppercase tracking-wider">
              SYSTEM IN TROUBLE.
            </div>

            <div className="text-neutral-300">
              Marriage decision cannot be completed.
            </div>

            <div className="pt-2 text-neutral-400">
              AI has analysed everyone...
            </div>

            <div className="text-white font-medium italic">
              ...except the two people whose lives are being decided.
            </div>
          </div>
        )}
      </div>

      {/* Action to proceed */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-neutral-500 flex items-center gap-2">
          <span>{step < 8 ? 'Click or press' : 'Press'}</span>
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
            Enter
          </kbd>
          <span>or</span>
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
            Space
          </kbd>
          <span>{step < 8 ? 'to skip' : 'to proceed'}</span>
        </div>

        <button
          id="btn-diagnostic-proceed"
          type="button"
          onClick={handleSkipOrProceed}
          className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-white text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{step < 8 ? '[ SHOW ALL ]' : '[ PROCEED TO FINAL ]'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        id="diagnostic-fullscreen-takeover"
        className="fixed inset-0 bg-black z-[9990] overflow-y-auto p-6 sm:p-12 md:p-16 flex items-center justify-center"
      >
        {content}
      </div>
    );
  }

  return (
    <div className="bg-black border border-neutral-800 p-6 sm:p-10 my-2 shadow-2xl">
      {content}
    </div>
  );
};
