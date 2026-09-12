import React, { useEffect, useCallback } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { Award, ArrowRight, Sparkles, CheckCircle2, Heart, Users, Flame, Smartphone } from 'lucide-react';

export const BrideResultState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, next } = machine;
  const metrics = context.brideMetrics || {
    compatibility: 94.8,
    familyCompatibility: 98.7,
    brainRotIndex: 42.1,
    socialCompatibility: 95.3,
    marriageReadiness: 92.0,
    reelConsumption: '3.2 hrs/day',
    notes: [
      'Mastery of micro-facial expressions when aunties inquire about cooking',
      'Curated Pinterest board of destination temple weddings detected',
      'Tea glass balance stability: 99.98% zero-slosh calibration',
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
    <div className="space-y-6 select-none" id="state-bride-result-view">
      {/* Dossier Header Card */}
      <div className="border border-[#eedfd1] bg-[#fdfbf7] rounded-2xl p-5 sm:p-7 space-y-5 shadow-xs relative overflow-hidden">
        {/* Subtle Top Zari Line */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#b85b73] via-[#bfa054] to-transparent opacity-60" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8dc] pb-3.5">
          <div className="flex items-center gap-2.5 text-[#2c221e] font-regal text-base sm:text-lg font-bold">
            <Award className="w-5 h-5 text-[#b85b73]" />
            <span>BRIDE BIOMETRIC &amp; PARODY DOSSIER EVALUATION</span>
          </div>
          <span className="text-xs bg-[#fdf2f4] text-[#78182a] px-3.5 py-1 rounded-full border border-[#f0c4ce] font-mono font-semibold flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#78182a]" />
            VERIFIED EXEMPLAR CANDIDATE
          </span>
        </div>

        {/* Candidate Profile Summary */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#eedfd1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs shadow-xs">
          <div>
            <span className="text-[#b85b73] text-[10px] block uppercase font-bold tracking-wider">Evaluated Subject</span>
            <span className="text-xl font-regal font-bold text-[#2c221e]">{context.brideName || 'Devika Menon'}</span>
            <span className="text-[#736357] block text-xs mt-0.5">{context.brideDegree || 'M.Tech Computer Science'}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-[#b85b73] text-[10px] block uppercase font-bold tracking-wider">Native Jurisdiction</span>
            <span className="text-[#2c221e] font-semibold">{context.brideLocation || 'Thrissur, Kerala'}</span>
            <span className="text-[#2d6a4f] block text-[11px] mt-0.5">Tea Tray Gyroscope: 99.98% Flawless</span>
          </div>
        </div>

        {/* Humorous Parody Metrics Grid */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-semibold text-[#78182a] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#a8822e]" />
            <span>OFFICIAL HUMOROUS PARODY METRICS:</span>
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 font-mono text-xs">
            {/* Baaddie meter */}
            <div className="bg-white p-3.5 rounded-xl border border-[#eedfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Users className="w-3.5 h-3.5 text-[#b85b73]" />
                <span>Baaddie meter 💅💅💅💅</span>
              </div>
              <div className="text-xl font-bold text-[#2d6a4f]">{metrics.familyCompatibility}%</div>
              <div className="text-[10px] text-[#8c7e73]">Aunties &amp; Uncles: 98.7% consensus</div>
            </div>

            {/* Brain Rot Index */}
            <div className="bg-white p-3.5 rounded-xl border border-[#eedfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Flame className="w-3.5 h-3.5 text-[#a8822e]" />
                <span>Brain Rot Index</span>
              </div>
              <div className="text-xl font-bold text-[#a8822e]">{metrics.brainRotIndex}%</div>
              <div className="text-[10px] text-[#8c7e73]">Moderate Pinterest &amp; aesthetic reels</div>
            </div>

            {/* Confidence of pulling a Sugardaddy */}
            <div className="bg-white p-3.5 rounded-xl border border-[#eedfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#b85b73]" />
                <span>Confidence of pulling a Sugardaddy</span>
              </div>
              <div className="text-xl font-bold text-[#78182a]">{metrics.socialCompatibility}%</div>
              <div className="text-[10px] text-[#8c7e73]">Master of polite nodding</div>
            </div>

            {/* Reel Consumption */}
            <div className="bg-white p-3.5 rounded-xl border border-[#eedfd1] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
                <Smartphone className="w-3.5 h-3.5 text-[#a8822e]" />
                <span>Reel Consumption</span>
              </div>
              <div className="text-xl font-bold text-[#78182a]">{metrics.reelConsumption}</div>
              <div className="text-[10px] text-[#8c7e73]">Saree styling, standup &amp; cats</div>
            </div>
          </div>
        </div>

        {/* Comedic AI Assessment Notes */}
        <div className="p-4 bg-white rounded-xl border border-dashed border-[#e8dfd1] font-mono text-xs space-y-1.5">
          <span className="text-[#78182a] font-bold block text-[11px]">
            [SYSTEM_OBSERVATIONS // BRIDE SPECIFICATION]:
          </span>
          <ul className="space-y-1 text-[#736357] list-disc list-inside text-[11px]">
            <li>Tea tray equilibrium calibrated at 0.02° deviation: Sulaimani delivered with zero turbulence.</li>
            <li>Kasavu saree pleats mathematically aligned to Kerala Handloom golden ratio standards.</li>
            <li>Subject expertly navigated interrogation regarding whether she can prepare fish curry.</li>
          </ul>
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
          id="btn-bride-result-proceed"
          type="button"
          onClick={handleProceed}
          className="w-full sm:w-auto px-7 py-3 bg-[#78182a] hover:bg-[#601321] text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <span>SYNTHESIZE MATRIMONIAL DOSSIERS (CV_COMPLETE)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
