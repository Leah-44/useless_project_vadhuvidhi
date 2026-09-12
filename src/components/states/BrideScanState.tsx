import React from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { WebcamScannerLab } from '../scanner/WebcamScannerLab';

const BRIDE_SCAN_LOGS = [
  'Tea Tray Gyroscope: 0.02° deviation... Zero Sulaimani tea spillage recorded',
  'Kasavu Saree Drape Symmetry: 100% aunty consensus achieved across all viewing angles',
  'Polite Smile Decibel Meter: 18.4 dB (Subtle, non-subversive, elder-approved)',
  'Brain Rot Quotient: Analyzing Pinterest moodboards and Kerala wedding reels',
  'Social Compatibility Matrix: Tolerance to repetitive horoscope questions at 95.3%',
  'Reel Consumption Telemetry: 3.2 hrs/day of sari draping tutorials and pet videos',
];

export const BrideScanState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, updateContext, next } = machine;

  const brideMetrics = context.brideMetrics || {
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

  const handleScanComplete = () => {
    updateContext({
      brideScanProgress: 100,
      brideMetrics,
    });
  };

  const handleProceed = () => {
    next();
  };

  return (
    <WebcamScannerLab
      candidateRole="BRIDE"
      candidateName={context.brideName || 'Devika Menon'}
      subTitle="Algorithmic Tea Tray Balance, Saree Drape & Social Deportment Scan"
      themeColor="rose"
      metrics={brideMetrics}
      scanTelemetryLogs={BRIDE_SCAN_LOGS}
      isSimulationMode={context.isSimulationMode}
      onToggleSimulation={(sim) => updateContext({ isSimulationMode: sim })}
      onScanComplete={handleScanComplete}
      onProceed={handleProceed}
    />
  );
};
