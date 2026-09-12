import React, { useEffect, useCallback } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { Award, ArrowRight, Sparkles, CheckCircle2, Heart, Users, Flame, Smartphone } from 'lucide-react';

export const GroomResultState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, next } = machine;
  const metrics = context.groomMetrics || {
    compatibility: 91.4,
    familyCompatibility: 96.2,
    brainRotIndex: 78.5,
    socialCompatibility: 84.0,
    marriageReadiness: 88.9,
    reelConsumption: '4.8 hrs/day',
    notes: [
      'High propensity for sending sigma grindset Malayalam reels at 2:00 AM',
      'Paternal Uncle approval rating: 100% due to Infopark air-conditioned job',
      'Reaction time to uncle joke: 180ms (optimal polite laughter detected)',
    ],
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
    <div className="space-y-6 select-none" id="state-groom-result-view">
      {/* Dossier Header Card */}
      <div className="border border-[#e8dfd1] bg-[#fdfbf7] rounded-2xl p-5 sm:p-7 space-y-5 shadow-xs relative overflow-hidden">
        {/* Subtle Top Zari Accent */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#bfa054] to-transparent opacity-60" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8dc] pb-3.5">
          <div className="flex items-center gap-2.5 text-[#2c221e] font-regal text-base sm:text-lg font-bold">
            <Award className="w-5 h-5 text-[#a8822e]" />
            <span>GROOM BIOMETRIC &amp; PARODY DOSSIER EVALUATION</span>
          </div>
          <span className="text-xs bg-[#eef7f2] text-[#2d6a4f] px-3.5 py-1 rounded-full border border-[#c2e2d2] font-mono font-semibold flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f]" />
            VERIFIED SUITABLE CANDIDATE
          </span>
        </div>

        {/* Candidate Profile Summary */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#e8dfd1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs shadow-xs">
          <div>
            <span className="text-[#a8822e] text-[10px] block uppercase font-bold tracking-wider">Evaluated Subject</span>
            <span className="text-xl font-regal font-bold text-[#2c221e]">{context.groomName || 'Sanjay Krishnan'}</span>
            <span className="text-[#736357] block text-xs mt-0.5">{context.groomJob || 'Senior Systems Architect'}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-[#a8822e] text-[10px] block uppercase font-bold tracking-wider">Native Jurisdiction</span>
            <span className="text-[#2c221e] font-semibold">{context.groomLocation || 'Ernakulam, Kerala'}</span>
            <span className="text-[#2d6a4f] block text-[11px] mt-0.5">Gulf Uncle Ratio: 2 Uncles in Dubai</span>
          </div>
        </div>

        {/* Humorous Parody Metrics Grid */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-semibold text-[#78182a] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#a8822e]" />
            <span>OFFICIAL HUMOROUS PARODY METRICS:</span>
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 font-mono text-xs">
            {/* Natural Aura farmer */}
            <div className="bg-white p-3.5 rounded-xl border border-[#e8dfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Users className="w-3.5 h-3.5 text-[#a8822e]" />
                <span>Natural Aura farmer</span>
              </div>
              <div className="text-xl font-bold text-[#a8822e]">{metrics.familyCompatibility}%</div>
              <div className="text-[10px] text-[#8c7e73]">Paternal Uncles: 100% satisfied</div>
            </div>

            {/* Brain Rot Index */}
            <div className="bg-white p-3.5 rounded-xl border border-[#e8dfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Flame className="w-3.5 h-3.5 text-[#b85b73]" />
                <span>Brain Rot Index</span>
              </div>
              <div className="text-xl font-bold text-[#b85b73]">{metrics.brainRotIndex}%</div>
              <div className="text-[10px] text-[#8c7e73]">Late night meme scrolling detected</div>
            </div>

            {/* Confidence of pulling a baddie */}
            <div className="bg-white p-3.5 rounded-xl border border-[#e8dfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#a8822e]" />
                <span>Confidence of pulling a baddie</span>
              </div>
              <div className="text-xl font-bold text-[#2c221e]">{metrics.socialCompatibility}%</div>
              <div className="text-[10px] text-[#8c7e73]">Smiles politely through relatives</div>
            </div>

            {/* Reel Consumption */}
            <div className="bg-white p-3.5 rounded-xl border border-[#e8dfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Smartphone className="w-3.5 h-3.5 text-[#a8822e]" />
                <span>Reel Consumption</span>
              </div>
              <div className="text-xl font-bold text-[#78182a]">{metrics.reelConsumption}</div>
              <div className="text-[10px] text-[#8c7e73]">Sigma grindset &amp; food reviews</div>
            </div>
          </div>
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
          <span>to proceed</span>
        </div>

        <button
          id="btn-groom-result-proceed"
          type="button"
          onClick={handleProceed}
          className="w-full sm:w-auto px-7 py-3 bg-[#78182a] hover:bg-[#601321] text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <span>PROCEED TO BRIDE INGESTION (BRIDE_NAME)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
