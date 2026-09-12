import React from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { WebcamScannerLab } from '../scanner/WebcamScannerLab';

const GROOM_SCAN_LOGS = [
  'Detecting forehead sandalwood paste alignment... 99.1% calibrated',
  'Paternal Uncle Expectation Scanner: Analyzing IT salary slip and Gulf connections',
  'Brain Rot Quotient: Detecting 2:00 AM Malayalam meme scroll signatures',
  'Social Compatibility Matrix: Nodding reaction to uncle jokes measured at 180ms',
  'Marriage Readiness Probe: Gas cylinder changing confidence estimated at 88.9%',
  'Reel Consumption Telemetry: 4.8 hrs/day of gym motivation and Kerala food reviews',
];

export const GroomScanState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, updateContext, next } = machine;

  const groomMetrics = context.groomMetrics || {
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

  const handleScanComplete = () => {
    updateContext({
      groomScanProgress: 100,
      groomMetrics,
    });
  };

  const handleProceed = () => {
    next();
  };

  return (
    <WebcamScannerLab
      candidateRole="GROOM"
      candidateName={context.groomName || 'Sanjay Krishnan'}
      subTitle="Algorithmic Facial, Social & Reel Consumption Analysis"
      themeColor="sky"
      metrics={groomMetrics}
      scanTelemetryLogs={GROOM_SCAN_LOGS}
      isSimulationMode={context.isSimulationMode}
      onToggleSimulation={(sim) => updateContext({ isSimulationMode: sim })}
      onScanComplete={handleScanComplete}
      onProceed={handleProceed}
    />
  );
};
