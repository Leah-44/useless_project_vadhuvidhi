import React, { useState } from 'react';
import { VadhuVidhiMachineAPI } from '../machine/useVadhuVidhiMachine';
import { Terminal, Database, Code, ChevronDown, ChevronUp } from 'lucide-react';

export const StateMachineInspector: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'CONTEXT' | 'LOGS' | 'MACHINE'>('CONTEXT');
  const { currentState, stateIndex, totalStates, metadata, context } = machine;

  return (
    <div className="bg-[#fdfbf7] border border-[#e8dfd1] rounded-2xl overflow-hidden font-mono text-xs shadow-xs" id="state-inspector">
      <button
        id="btn-toggle-inspector"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white hover:bg-[#faf7f2] flex items-center justify-between text-[#736357] border-b border-[#e8dfd1] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#a8822e]" />
          <span className="font-semibold text-[#2c221e]">STATE MACHINE DIAGNOSTIC INSPECTOR</span>
          <span className="text-[#d6be8b] hidden sm:inline">|</span>
          <span className="text-[#78182a] font-semibold">{currentState}</span>
          <span className="text-[#a8822e] hidden md:inline">({stateIndex + 1}/{totalStates})</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#736357]">
          <span className="text-[11px] font-medium">{isOpen ? 'COLLAPSE' : 'EXPAND'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-[#a8822e]" /> : <ChevronDown className="w-4 h-4 text-[#a8822e]" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-3 bg-[#faf7f2]">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-[#e8dfd1] pb-2">
            <button
              onClick={() => setActiveTab('CONTEXT')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'CONTEXT'
                  ? 'bg-[#78182a] text-white'
                  : 'bg-white text-[#736357] hover:text-[#2c221e] border border-[#e8dfd1]'
              }`}
            >
              <Database className="w-3 h-3" />
              <span>Context Payload</span>
            </button>
            <button
              onClick={() => setActiveTab('MACHINE')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'MACHINE'
                  ? 'bg-[#78182a] text-white'
                  : 'bg-white text-[#736357] hover:text-[#2c221e] border border-[#e8dfd1]'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>State Node Info</span>
            </button>
            <button
              onClick={() => setActiveTab('LOGS')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'LOGS'
                  ? 'bg-[#78182a] text-white'
                  : 'bg-white text-[#736357] hover:text-[#2c221e] border border-[#e8dfd1]'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>System Log ({context.systemLogs.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'CONTEXT' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] space-y-1 text-[#4a3b32]">
                <span className="text-[#78182a] font-bold block mb-1">Groom Context:</span>
                <p>Name: {context.groomName || '<unset>'}</p>
                <p className="text-[#736357]">Job: {context.groomJob}</p>
                <p className="text-[#736357]">Location: {context.groomLocation}</p>
                <p className="text-[#4a7062] font-semibold">Score: {context.groomScore}/100</p>
                <p className="text-[#a8822e]">
                  Consent: {context.groomConsent === null ? 'NULL' : context.groomConsent ? 'TRUE' : 'FALSE'}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] space-y-1 text-[#4a3b32]">
                <span className="text-[#b85b73] font-bold block mb-1">Bride Context:</span>
                <p>Name: {context.brideName || '<unset>'}</p>
                <p className="text-[#736357]">Degree: {context.brideDegree}</p>
                <p className="text-[#736357]">Location: {context.brideLocation}</p>
                <p className="text-[#4a7062] font-semibold">Score: {context.brideScore}/100</p>
                <p className="text-[#a8822e]">
                  Consent: {context.brideConsent === null ? 'NULL' : context.brideConsent ? 'TRUE' : 'FALSE'}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] space-y-1 md:col-span-2 text-[#4a3b32]">
                <span className="text-[#78182a] font-bold block mb-1">Global Decision Vector:</span>
                <p>Match Coefficient: {context.cvMatchScore}%</p>
                <p>Final Outcome: {context.finalDecision}</p>
                <p className="text-[#736357]">Error Code: {context.errorCode}</p>
              </div>
            </div>
          )}

          {activeTab === 'MACHINE' && (
            <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] space-y-2 text-[#4a3b32]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[#8a7a6f] block">CURRENT_STATE:</span>
                  <span className="text-[#78182a] font-bold">{currentState}</span>
                </div>
                <div>
                  <span className="text-[#8a7a6f] block">INDEX:</span>
                  <span className="text-[#2c221e] font-semibold">{stateIndex}</span>
                </div>
                <div>
                  <span className="text-[#8a7a6f] block">CATEGORY:</span>
                  <span className="text-[#2c221e]">{metadata.category}</span>
                </div>
                <div>
                  <span className="text-[#8a7a6f] block">TOTAL_STATES:</span>
                  <span className="text-[#2c221e]">{totalStates}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#f0e8dc] text-xs">
                <span className="text-[#8a7a6f] block mb-0.5">SUBTITLE / PROTOCOL:</span>
                <span className="text-[#2c221e]">{metadata.subTitle}</span>
              </div>
              <div className="text-xs">
                <span className="text-[#8a7a6f] block mb-0.5">PURPOSE:</span>
                <span className="text-[#736357]">{metadata.description}</span>
              </div>
            </div>
          )}

          {activeTab === 'LOGS' && (
            <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd1] max-h-48 overflow-y-auto space-y-1 text-[#736357] text-[11px]">
              {context.systemLogs.map((logItem, idx) => (
                <div key={idx} className="font-mono hover:text-[#2c221e]">
                  {logItem}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
