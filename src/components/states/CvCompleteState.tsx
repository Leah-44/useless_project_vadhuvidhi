import React, { useEffect, useCallback } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { FileCheck, Sparkles, ArrowRight, Activity, Heart, Users, Flame, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CvCompleteState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, next } = machine;

  const groomMetrics = context.groomMetrics || {
    compatibility: 91.4,
    familyCompatibility: 96.2,
    brainRotIndex: 78.5,
    socialCompatibility: 84.0,
    marriageReadiness: 88.9,
    reelConsumption: '4.8 hrs/day',
    notes: [],
  };

  const brideMetrics = context.brideMetrics || {
    compatibility: 94.8,
    familyCompatibility: 98.7,
    brainRotIndex: 42.1,
    socialCompatibility: 95.3,
    marriageReadiness: 92.0,
    reelConsumption: '3.2 hrs/day',
    notes: [],
  };

  const handleProceed = useCallback(() => {
    next();
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleProceed();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleProceed]);

  return (
    <div className="space-y-6 select-none" id="state-cv-complete-view">
      {/* Header Banner */}
      <div className="border border-[#e8dfd1] bg-[#fdfbf7] rounded-2xl p-5 sm:p-7 space-y-6 shadow-xs relative overflow-hidden">
        {/* Subtle Top Zari Accent */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#bfa054] to-transparent opacity-60" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8dc] pb-3.5">
          <div className="flex items-center gap-2.5 text-[#2c221e] font-regal text-base sm:text-lg font-bold">
            <FileCheck className="w-5 h-5 text-[#a8822e]" />
            <span>CROSS-EVALUATION SYNTHESIS // DOSSIER SYNCHRONIZED</span>
          </div>
          <span className="text-xs bg-[#eef7f2] text-[#2d6a4f] px-3.5 py-1 rounded-full border border-[#c2e2d2] font-mono font-semibold flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#a8822e]" />
            COMPATIBILITY COEFFICIENT: {context.cvMatchScore || 98.4}%
          </span>
        </div>

        {/* Side-by-Side Candidate Dossier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Candidate A: Groom */}
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#e8dfd1] space-y-3.5 shadow-xs relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-[#f0e8dc] pb-2.5">
              <span className="text-[#78182a] font-bold uppercase flex items-center gap-1.5 font-regal tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#a8822e]" />
                CANDIDATE A: GROOM (VARAN)
              </span>
              <span className="text-[11px] text-[#78182a] bg-[#fdfbf7] px-2.5 py-0.5 rounded-full border border-[#d6be8b] font-semibold">
                SCORE: {context.groomScore || 94}/100
              </span>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-lg font-regal font-bold text-[#2c221e]">{context.groomName || 'Sanjay Krishnan'}</h3>
              <p className="text-[#736357] text-xs">{context.groomJob || 'Senior Systems Architect'}</p>
              <p className="text-[#8c7e73] text-[11px]">{context.groomLocation || 'Ernakulam, Kerala'}</p>
            </div>

            {/* Parody Metrics Mini Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f0e8dc] text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Compatibility</span>
                <span className="text-[#2d6a4f] font-bold">{groomMetrics.compatibility}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Family Harmony</span>
                <span className="text-[#2d6a4f] font-bold">{groomMetrics.familyCompatibility}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Brain Rot Index</span>
                <span className="text-[#b85b73] font-bold">{groomMetrics.brainRotIndex}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Reel Consumption</span>
                <span className="text-[#78182a] font-bold">{groomMetrics.reelConsumption}</span>
              </div>
            </div>
          </div>

          {/* Candidate B: Bride */}
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#e8dfd1] space-y-3.5 shadow-xs relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-[#f0e8dc] pb-2.5">
              <span className="text-[#78182a] font-bold uppercase flex items-center gap-1.5 font-regal tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#b85b73]" />
                CANDIDATE B: BRIDE (VADHU)
              </span>
              <span className="text-[11px] text-[#78182a] bg-[#fdfbf7] px-2.5 py-0.5 rounded-full border border-[#f0c4ce] font-semibold">
                SCORE: {context.brideScore || 96}/100
              </span>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-lg font-regal font-bold text-[#2c221e]">{context.brideName || 'Devika Menon'}</h3>
              <p className="text-[#736357] text-xs">{context.brideDegree || 'M.Tech Computer Science'}</p>
              <p className="text-[#8c7e73] text-[11px]">{context.brideLocation || 'Thrissur, Kerala'}</p>
            </div>

            {/* Parody Metrics Mini Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f0e8dc] text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Compatibility</span>
                <span className="text-[#2d6a4f] font-bold">{brideMetrics.compatibility}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Family Harmony</span>
                <span className="text-[#2d6a4f] font-bold">{brideMetrics.familyCompatibility}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Brain Rot Index</span>
                <span className="text-[#a8822e] font-bold">{brideMetrics.brainRotIndex}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#fdfbf7] border border-[#e8dfd1]">
                <span className="text-[#8c7e73] block text-[10px]">Reel Consumption</span>
                <span className="text-[#78182a] font-bold">{brideMetrics.reelConsumption}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional & Algorithmic Harmony Verdict */}
        <div className="p-4 sm:p-5 bg-[#eef7f2] border border-[#c2e2d2] rounded-xl text-xs space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-[#2d6a4f] font-mono font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
            <span>AI SYNTHESIS VERDICT: PERFECT MATCH ON PAPER</span>
          </div>
          <p className="text-[#2c221e] font-sans text-xs leading-relaxed">
            Astrological Poruthams: <strong>10/10 Matches</strong>. Paternal Uncle and Aunty consensus: <strong>100% Unanimous</strong>.
            Financial, biodata, and social standing metrics are completely harmonized.
            System preparing to trigger the supervised 10-minute drawing room family interaction protocol.
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
          <span className="text-[#78182a] font-semibold">ADVANCE:</span>
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a]">Space</kbd>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a]">Enter</kbd>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a]">→</kbd>
          <span>to launch chat</span>
        </div>

        <button
          id="btn-cv-complete-proceed"
          type="button"
          onClick={handleProceed}
          className="w-full sm:w-auto px-7 py-3 bg-[#78182a] hover:bg-[#601321] text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Activity className="w-4 h-4" />
          <span>INITIATE SUPERVISED FAMILY CHAT (CHAT)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
