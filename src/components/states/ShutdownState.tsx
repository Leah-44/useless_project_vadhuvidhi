import React, { useState } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { RotateCcw, Power, Minimize2, Maximize2 } from 'lucide-react';

/**
 * SHUTDOWN STATE
 * Exact specifications:
 *
 * VadhuVidhi.EXE
 *
 * SYSTEM SHUTDOWN
 */
export const ShutdownState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { reset } = machine;
  const [isFullscreen, setIsFullscreen] = useState(true);

  // Keyboard navigation: Space, Enter, ArrowRight or R reboots
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reset]);

  const content = (
    <div
      id="state-shutdown-view"
      className="w-full max-w-xl mx-auto space-y-12 font-mono text-center select-none py-12"
    >
      {/* Discreet Dock Toggle */}
      <div className="flex justify-end text-xs">
        <button
          type="button"
          onClick={() => setIsFullscreen((prev) => !prev)}
          className="text-[11px] text-neutral-600 hover:text-neutral-400 px-2 py-0.5 bg-neutral-950 border border-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          <span>{isFullscreen ? 'DOCK' : 'EXPAND'}</span>
        </button>
      </div>

      {/* Main Minimalist Content */}
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-500 mb-2">
          <Power className="w-5 h-5 text-neutral-500" />
        </div>

        <h1
          id="shutdown-title-vadhuvidhi"
          className="text-sm sm:text-base font-semibold tracking-[0.3em] text-neutral-400 uppercase"
        >
          VadhuVidhi.EXE
        </h1>

        <h2
          id="shutdown-title-system-shutdown"
          className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-100 uppercase"
        >
          SYSTEM SHUTDOWN
        </h2>

        <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed pt-2">
          Ceremony simulation ended. Memory cleared. Process exited.
        </p>
      </div>

      {/* Reboot Action */}
      <div className="pt-6 flex justify-center">
        <button
          id="btn-shutdown-reboot"
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 text-xs tracking-widest uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>REBOOT VADHUVIDHI.EXE</span>
        </button>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        id="shutdown-fullscreen-takeover"
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
