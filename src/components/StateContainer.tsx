import React from 'react';
import { VadhuVidhiMachineAPI } from '../machine/useVadhuVidhiMachine';
import { StateRenderer } from './StateRenderer';
import { CurtainState } from './states/CurtainState';

export const StateContainer: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { currentState, stateIndex, totalStates, metadata } = machine;

  const isDarkTerminalState = ['FREEZE', 'ERROR', 'DIAGNOSTIC', 'FINAL', 'SHUTDOWN'].includes(currentState);

  if (isDarkTerminalState) {
    return (
      <div
        className="bg-[#fcfaf7] border border-[#e8dfd1] rounded-2xl overflow-hidden shadow-sm relative"
        id="state-active-container"
      >
        {/* Minimal Diagnostic Status Strip */}
        <div className="px-5 py-3 border-b border-[#e8dfd1] bg-[#f7f3eb] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#78182a]" />
            <span className="text-[#2c221e] font-semibold uppercase tracking-wider">{metadata.title}</span>
            <span className="text-[#8a7a6f]">[{currentState}]</span>
          </div>
          <div className="text-[#736357] text-[11px]">
            NODE {stateIndex + 1}/{totalStates} &bull; PARADOX_HALT
          </div>
        </div>

        {/* Main Canvas */}
        <div className="p-4 sm:p-7 relative bg-[#fdfbf7]">
          <StateRenderer machine={machine} />
        </div>
      </div>
    );
  }

  // CURTAIN is an entrance cinematic reveal seamlessly unveiling VadhuVidhi and transitioning to GROOM_NAME
  if (currentState === 'CURTAIN') {
    return <CurtainState machine={machine} />;
  }

  return (
    <div
      className="bg-white border border-[#e8dfd1] rounded-2xl overflow-hidden shadow-sm relative"
      id="state-active-container"
    >
      {/* Subtle Top Kasavu Fine Zari Accent */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#bfa054] via-[#e2d2a4] via-[#78182a] via-[#e2d2a4] to-[#bfa054]" />

      {/* State View Header */}
      <div className="px-6 py-4 border-b border-[#e8dfd1] bg-[#fdfbf7] flex flex-wrap items-center justify-between gap-3 relative">
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl font-regal font-bold tracking-wide text-[#78182a]">
            {metadata.title}
          </h2>
        </div>
      </div>

      {/* Main State Canvas */}
      <div className="p-4 sm:p-7 relative bg-white">
        <StateRenderer machine={machine} />
      </div>
    </div>
  );
};
