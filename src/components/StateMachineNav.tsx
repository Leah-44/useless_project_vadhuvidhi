import React from 'react';
import { VadhuVidhiMachineAPI } from '../machine/useVadhuVidhiMachine';
import { ORDERED_STATES, STATE_METADATA_MAP } from '../machine/transitions';
import { VadhuVidhiState } from '../types/state';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

export const StateMachineNav: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const {
    currentState,
    stateIndex,
    totalStates,
    canGoNext,
    canGoPrev,
    nextStateName,
    prevStateName,
    next,
    prev,
    jump,
    reset,
  } = machine;

  return (
    <div
      className="bg-[#fdfbf7] border border-[#e8dfd1] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs relative"
      id="state-machine-nav"
    >
      {/* Top Kasavu Fine Zari Accent */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#bfa054] to-transparent opacity-60" />

      {/* Top row: controls and state jump */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
        {/* Left: Progression buttons */}
        <div className="flex items-center gap-2">
          <button
            id="nav-btn-prev"
            onClick={prev}
            disabled={!canGoPrev}
            title={prevStateName ? `Previous: ${prevStateName}` : 'At Start'}
            className="px-3.5 py-1.5 bg-white hover:bg-[#f6f1e8] disabled:opacity-35 disabled:cursor-not-allowed text-[#736357] rounded-lg border border-[#e8dfd1] font-mono text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#a8822e]" />
            <span>PREV</span>
          </button>

          <button
            id="nav-btn-next"
            onClick={next}
            disabled={!canGoNext}
            title={nextStateName ? `Next: ${nextStateName}` : 'At End'}
            className="px-4 py-1.5 bg-[#78182a] hover:bg-[#631322] disabled:opacity-35 disabled:cursor-not-allowed text-white rounded-lg font-mono text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          >
            <span>NEXT</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="nav-btn-reset"
            onClick={reset}
            title="Reboot state machine to BOOT"
            className="px-2.5 py-1.5 bg-white hover:bg-[#f6f1e8] text-[#736357] hover:text-[#78182a] rounded-lg border border-[#e8dfd1] font-mono text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#a8822e]" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>

        {/* Right: Direct jump selector */}
        <div className="flex items-center gap-2">
          <select
            id="select-jump-state"
            value={currentState}
            onChange={(e) => jump(e.target.value as VadhuVidhiState)}
            className="bg-white text-[#2c221e] border border-[#d6be8b] rounded-lg px-2.5 py-1 font-mono text-xs focus:outline-none focus:border-[#78182a] cursor-pointer shadow-xs"
          >
            {ORDERED_STATES.map((st, idx) => (
              <option key={st} value={st} className="bg-white text-[#2c221e]">
                {idx + 1}. {st} ({STATE_METADATA_MAP[st].category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State timeline progress bar */}
      <div className="pt-2.5 border-t border-[#f0e8dc]">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#736357] mb-1.5">
          <span>SAMBANDHAM AUTOMATION TIMELINE</span>
          <span className="text-[#78182a] font-semibold">
            {Math.round(((stateIndex + 1) / totalStates) * 100)}%
          </span>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1">
          {ORDERED_STATES.map((st, idx) => {
            const isCurrent = st === currentState;
            const isPassed = idx < stateIndex;

            return (
              <button
                key={st}
                id={`timeline-pill-${st.toLowerCase()}`}
                onClick={() => jump(st)}
                title={`${idx + 1}. ${st} - ${STATE_METADATA_MAP[st].title}`}
                className={`h-2 rounded-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#78182a] ring-2 ring-[#d6be8b] ring-offset-1 scale-y-125 shadow-xs'
                    : isPassed
                    ? 'bg-[#4a7062] hover:bg-[#3d5e52]'
                    : 'bg-[#e8dfd1] hover:bg-[#d6c7b2]'
                }`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#a8822e] mt-1.5">
          <span>1. BOOT</span>
          <span className="hidden sm:inline">10. CHAT</span>
          <span>{totalStates}. SHUTDOWN</span>
        </div>
      </div>
    </div>
  );
};
