import React, { useState, useEffect, useRef } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { RotateCcw, Power, Minimize2, Maximize2 } from 'lucide-react';

/**
 * FINAL STATE
 * Specifications:
 *
 * DECISION RETURNED TO HUMANS.
 *
 * A LIFETIME CANNOT BE DECIDED BY A SCORE.
 *
 * VadhuVidhi...Varan Mathi?
 *
 * Directives:
 * - Make the reveal dramatic and minimalist.
 * - Do not add extra dialogue.
 * - Do not change the wording.
 */
export const FinalState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { reset, next } = machine;
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [stage, setStage] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Staged dramatic reveal
    // stage 0: initial void
    // stage 1: DECISION RETURNED TO HUMANS.
    // stage 2: A LIFETIME CANNOT BE DECIDED BY A SCORE.
    // stage 3: VadhuVidhi...Varan Mathi?
    // stage 4: controls reveal
    if (stage < 4) {
      const delays = [600, 1200, 1400, 1200];
      timerRef.current = setTimeout(() => {
        setStage((prev) => prev + 1);
      }, delays[stage] || 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stage]);

  // Click or keydown to fast-reveal or advance to SHUTDOWN
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (stage < 4) {
          setStage(4);
        } else {
          next();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, stage]);

  const handleRevealAll = () => {
    if (stage < 4) {
      setStage(4);
    }
  };

  const content = (
    <div
      id="state-final-view"
      onClick={handleRevealAll}
      className="w-full max-w-2xl mx-auto space-y-12 font-mono text-center select-none py-12"
    >
      {/* Discreet Dock Toggle */}
      <div className="flex justify-end text-xs">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen((prev) => !prev);
          }}
          className="text-[11px] text-neutral-600 hover:text-neutral-400 px-2 py-0.5 bg-neutral-950 border border-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          <span>{isFullscreen ? 'DOCK' : 'EXPAND'}</span>
        </button>
      </div>

      {/* Main Dramatic Minimalist Reveal */}
      <div className="space-y-10 px-4 sm:px-8">
        {/* Line 1: DECISION RETURNED TO HUMANS. */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p
            id="final-line-decision-returned"
            className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-neutral-400 uppercase"
          >
            DECISION RETURNED TO HUMANS.
          </p>
        </div>

        {/* Line 2: A LIFETIME CANNOT BE DECIDED BY A SCORE. */}
        <div
          className={`transition-all duration-1000 delay-150 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2
            id="final-line-lifetime-score"
            className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white uppercase leading-relaxed max-w-xl mx-auto"
          >
            A LIFETIME CANNOT BE DECIDED BY A SCORE.
          </h2>
        </div>

        {/* Line 3: VadhuVidhi...Varan Mathi? */}
        <div
          className={`pt-6 transition-all duration-1000 delay-300 transform ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1
            id="final-line-vadhuvidhi-varan-mathi"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-neutral-100 italic"
          >
            VadhuVidhi...Varan Mathi?
          </h1>
        </div>
      </div>

      {/* Minimalist Controls (Revealed last) */}
      <div
        className={`pt-12 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 ${
          stage >= 4 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-final-restart"
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESTART SIMULATION</span>
        </button>

        <button
          id="btn-final-shutdown"
          type="button"
          onClick={() => next()}
          className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 border border-neutral-800 text-xs tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
        >
          <Power className="w-3.5 h-3.5" />
          <span>SYSTEM SHUTDOWN</span>
        </button>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        id="final-fullscreen-takeover"
        className="fixed inset-0 bg-black z-[9990] overflow-y-auto p-6 sm:p-12 flex items-center justify-center"
      >
        {content}
      </div>
    );
  }

  return (
    <div className="bg-black border border-neutral-900 p-8 sm:p-14 my-2 shadow-2xl">
      {content}
    </div>
  );
};
