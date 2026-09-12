import React, { useState, useEffect } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { AlertOctagon, Terminal, ArrowRight, Minimize2, Maximize2 } from 'lucide-react';

/**
 * ERROR STATE
 * Specifications:
 * - ERROR screen:
 *     SYSTEM ERROR
 *     ERROR CODE: 0xMARRIAGE
 *     MAJOR INPUT MISSING
 * - Make this feel dramatically different from the colourful wedding interface.
 * - Do not implement the diagnostic content yet.
 * - Do not modify the earlier chat.
 */
export const ErrorState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const [isFullscreen, setIsFullscreen] = useState(true);

  // Keyboard navigation for proceeding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        machine.next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [machine]);

  const content = (
    <div
      id="state-error-view"
      className="w-full max-w-4xl mx-auto space-y-8 font-mono text-neutral-100 selection:bg-red-600 selection:text-black"
    >
      {/* Top Telemetry / Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/80 pb-4">
        <div className="flex items-center gap-3 text-red-500">
          <AlertOctagon className="w-6 h-6 animate-pulse text-red-500 shrink-0" />
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
            *** FATAL KERNEL PANIC // EXECUTION SUSPENDED ***
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-red-400/80 uppercase px-2 py-0.5 bg-red-950/60 border border-red-900/60">
            HALT_ADDR: 0x00004092
          </span>
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="text-[11px] text-neutral-400 hover:text-neutral-200 px-2 py-1 bg-neutral-900 border border-neutral-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title={isFullscreen ? 'Dock view into container' : 'Expand to full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span>{isFullscreen ? 'DOCK VIEW' : 'FULLSCREEN'}</span>
          </button>
        </div>
      </div>

      {/* Primary Mandatory Error Display */}
      <div className="border-2 border-red-600 bg-neutral-950 p-6 sm:p-10 space-y-8 shadow-[0_0_60px_rgba(220,38,38,0.2)]">
        {/* 1. SYSTEM ERROR */}
        <div>
          <div className="text-[11px] tracking-widest text-red-500/70 font-semibold uppercase mb-1">
            CRITICAL EXCEPTION CLASSIFICATION
          </div>
          <h1
            id="error-title-system-error"
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-red-600 uppercase leading-none drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
          >
            SYSTEM ERROR
          </h1>
        </div>

        {/* 2. ERROR CODE: 0xMARRIAGE */}
        <div className="pt-2">
          <div className="text-[11px] tracking-widest text-red-400/70 font-semibold uppercase mb-1.5">
            FAULT IDENTIFIER
          </div>
          <div
            id="error-code-marriage"
            className="inline-block border-2 border-red-700 bg-red-950/80 px-4 py-2.5 sm:px-6 sm:py-3 text-lg sm:text-2xl md:text-3xl font-bold tracking-wider text-red-200 shadow-inner"
          >
            ERROR CODE: 0xMARRIAGE
          </div>
        </div>

        {/* 3. MAJOR INPUT MISSING */}
        <div className="pt-2">
          <div className="text-[11px] tracking-widest text-neutral-400 font-semibold uppercase mb-1.5">
            ROOT CAUSE EXCEPTION
          </div>
          <div
            id="error-major-input-missing"
            className="border-l-4 border-red-500 bg-neutral-900/90 p-4 sm:p-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-white uppercase">
              MAJOR INPUT MISSING
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
              Automated ceremony pipeline terminated at finalization stage. System satisfied all
              ancestral, financial, astrological, and maternal protocols, but encountered an
              unresolvable null condition.
            </p>
          </div>
        </div>

        {/* Cold Raw Terminal Diagnostics Notice */}
        <div className="border border-neutral-800 bg-black/80 p-4 space-y-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
            <Terminal className="w-4 h-4 text-red-500" />
            <span>VADHUVIDHI.EXE KERNEL PANIC DUMP</span>
          </div>
          <div className="text-[11px] text-neutral-500 space-y-1 font-mono">
            <p>&gt; Process ID: 10492 [VADHUVIDHI_CORE_DAEMON]</p>
            <p>&gt; Matrimonial Feasibility Quotient: 98.4% (Calculated)</p>
            <p>&gt; Horoscope Porutham Match: 10/10 (Verified)</p>
            <p className="text-red-400">
              &gt; FATAL: Essential primary variable returned NULL.
            </p>
            <p>&gt; Execution halted. Human-in-the-loop diagnostic required.</p>
          </div>
        </div>
      </div>

      {/* Action to proceed to Diagnostic */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-neutral-500 flex items-center gap-2">
          <span>Press</span>
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
            Enter
          </kbd>
          <span>or</span>
          <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
            Space
          </kbd>
          <span>to proceed</span>
        </div>

        <button
          id="btn-error-proceed"
          type="button"
          onClick={() => machine.next()}
          className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-black font-mono text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] cursor-pointer"
        >
          <span>[ PROCEED TO SYSTEM DIAGNOSTIC ]</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        id="error-fullscreen-takeover"
        className="fixed inset-0 bg-black z-[9990] overflow-y-auto p-6 sm:p-12 md:p-16 flex items-center justify-center"
      >
        {content}
      </div>
    );
  }

  return (
    <div className="bg-black border-2 border-red-700/80 p-6 sm:p-10 my-2 shadow-2xl">
      {content}
    </div>
  );
};
