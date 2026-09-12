import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, CameraOff, Sparkles, CheckCircle2, RefreshCw, Eye, FastForward } from 'lucide-react';
import { ParodyMetrics } from '../../types/state';

interface WebcamScannerLabProps {
  candidateRole: 'GROOM' | 'BRIDE';
  candidateName: string;
  subTitle: string;
  themeColor: 'sky' | 'rose';
  metrics: ParodyMetrics;
  scanTelemetryLogs: string[];
  isSimulationMode?: boolean;
  onToggleSimulation?: (isSim: boolean) => void;
  onScanComplete: () => void;
  onProceed: () => void;
}

export const WebcamScannerLab: React.FC<WebcamScannerLabProps> = ({
  candidateRole,
  candidateName,
  subTitle,
  themeColor,
  metrics,
  scanTelemetryLogs,
  isSimulationMode,
  onToggleSimulation,
  onScanComplete,
  onProceed,
}) => {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [isSimulation, setIsSimulation] = useState<boolean>(Boolean(isSimulationMode));
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync with incoming isSimulationMode prop if specified
  useEffect(() => {
    if (isSimulationMode !== undefined && isSimulationMode !== isSimulation) {
      if (isSimulationMode) {
        stopCameraStream();
        setIsSimulation(true);
      } else {
        startCamera();
      }
    }
  }, [isSimulationMode]);

  // Stop camera helper
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Initialize camera with automatic simulation fallback
  const startCamera = useCallback(async () => {
    stopCameraStream();
    setErrorMessage('');

    if (!navigator?.mediaDevices?.getUserMedia) {
      setIsSimulation(true);
      setHasCamera(false);
      setErrorMessage('Browser mediaDevices API not supported. Simulation mode engaged.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setHasCamera(true);
      setIsSimulation(false);
    } catch (err: unknown) {
      console.warn('Webcam initialization failed; engaging simulation mode:', err);
      const errorStr = err instanceof Error ? err.name : 'Unknown camera error';
      setErrorMessage(`Camera unavailable (${errorStr}). Auto-engaged Simulation Mode.`);
      setIsSimulation(true);
      setHasCamera(false);
    }
  }, [stopCameraStream]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCameraStream();
    };
  }, [startCamera, stopCameraStream]);

  // Progress scanner ticker
  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          onScanComplete();
          return 100;
        }
        const nextProgress = prev + 4;
        return nextProgress > 100 ? 100 : nextProgress;
      });
    }, 140);

    return () => clearInterval(interval);
  }, [isComplete, onScanComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      // Handle 'S' key to toggle simulation mode
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (isSimulation) {
          startCamera();
        } else {
          stopCameraStream();
          setIsSimulation(true);
        }
        return;
      }

      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (!isComplete) {
          setProgress(100);
          setIsComplete(true);
          onScanComplete();
        } else {
          onProceed();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, isSimulation, onProceed, onScanComplete, startCamera, stopCameraStream]);

  const handleFastForward = () => {
    setProgress(100);
    setIsComplete(true);
    onScanComplete();
  };

  const isGroom = candidateRole === 'GROOM';
  const roleAccentColor = isGroom ? 'text-[#78182a]' : 'text-[#9c3653]';
  const roleBorderColor = isGroom ? 'border-[#e8dfd1]' : 'border-[#eedfd1]';

  return (
    <div className="space-y-6 select-none" id={`state-${candidateRole.toLowerCase()}-scan-lab`}>
      {/* Lab Header Bar */}
      <div className={`p-4 rounded-2xl border ${roleBorderColor} bg-[#fdfbf7] flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-xs relative overflow-hidden`}>
        {/* Top Accent Ribbon */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#bfa054] to-transparent opacity-60" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-[#78182a] animate-ping absolute opacity-60" />
            <span className="w-2 h-2 rounded-full bg-[#78182a] relative z-10" />
          </div>
          <div>
            <div className={`font-regal font-bold ${roleAccentColor} tracking-wide uppercase flex items-center gap-2 text-sm sm:text-base`}>
              <span>VADHUVIDHI BIOMETRIC LAB // {candidateRole} SYNTHESIS</span>
            </div>
            <p className="text-[#736357] text-[11px] font-sans">
              {subTitle} &bull; Candidate: <strong className="text-[#2c221e] font-semibold">{candidateName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          {isSimulation ? (
            <span className="px-3 py-1 rounded-full bg-[#fbf4e6] border border-[#d6be8b] text-[#8c6b1f] font-mono text-[11px] flex items-center gap-1.5 font-semibold">
              <CameraOff className="w-3 h-3 text-[#a8822e]" />
              SIMULATION MODE ACTIVE
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-[#edf4f1] border border-[#c3ded4] text-[#4a7062] font-mono text-[11px] flex items-center gap-1.5 font-semibold">
              <Camera className="w-3 h-3 text-[#4a7062]" />
              LIVE WEBCAM STREAM
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              if (isSimulation) {
                startCamera();
              } else {
                stopCameraStream();
                setIsSimulation(true);
              }
            }}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#f6f1e8] text-[#736357] border border-[#e8dfd1] text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Toggle between real camera and simulated test hologram"
          >
            <RefreshCw className="w-3 h-3 text-[#a8822e]" />
            <span>{isSimulation ? 'Try Camera' : 'Use Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video / Hologram Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#d6be8b] bg-[#1a1412] shadow-sm flex items-center justify-center">
            {/* Live Camera View */}
            {!isSimulation && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            )}

            {/* Simulation Mode Holographic View */}
            {isSimulation && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#241a16] via-[#1a120f] to-[#241a16] p-6 text-center overflow-hidden">
                {/* Clean Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#d6be8b10_1px,transparent_1px),linear-gradient(to_bottom,#d6be8b10_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Animated Hologram Silhouette */}
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className={`relative w-28 h-28 rounded-full border border-[#d6be8b] bg-[#2c201a] flex items-center justify-center shadow-md animate-pulse`}>
                    <div className="w-20 h-20 rounded-full border border-dashed border-[#e2d2a4] flex items-center justify-center">
                      <Eye className="w-10 h-10 text-[#e2d2a4]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-[#38261e] border border-[#d6be8b]/50 text-[#f5ebd6] font-mono text-[11px] font-medium">
                      SYNTHETIC {candidateRole} AVATAR MATRIX
                    </span>
                    <p className="text-xs text-[#d6be8b] font-mono">
                      Simulated biometric node calibrated to {candidateName}
                    </p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="absolute bottom-3 left-4 right-4 z-20 text-[10px] font-mono text-[#f5ebd6] bg-[#2c1d18]/95 py-1.5 px-3 rounded-lg border border-[#d6be8b]/40">
                    {errorMessage}
                  </div>
                )}
              </div>
            )}

            {/* Futuristic HUD Overlay on top of Camera / Hologram */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-20 font-mono text-[10px]">
              {/* Top HUD Row */}
              <div className="flex items-center justify-between text-[#f5ebd6]">
                <div className="flex items-center gap-2 bg-[#2c1d18]/85 px-3 py-1 rounded-full border border-[#d6be8b]/40 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#e07a5f] animate-ping" />
                  <span className="font-semibold">SCAN // PARODY SENSOR</span>
                </div>
                <div className="bg-[#2c1d18]/85 px-3 py-1 rounded-full border border-[#d6be8b]/40 text-[#d6be8b] font-semibold shadow-xs">
                  ASTRO PORUTHAM: LOCKED
                </div>
              </div>

              {/* Center Face Reticle Frame */}
              <div className="relative self-center w-44 sm:w-52 h-44 sm:h-52 border border-dashed border-[#d6be8b]/70 rounded-2xl flex items-center justify-center">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#bfa054]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#bfa054]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#bfa054]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#bfa054]" />

                {/* Scan sweep */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#d6be8b] to-transparent animate-pulse" />

                <div className="text-center bg-[#2c1d18]/85 px-3 py-0.5 rounded-full border border-[#d6be8b]/40 text-[10px] text-[#f5ebd6] font-medium">
                  FACE &amp; POSTURE LOCKED
                </div>
              </div>

              {/* Bottom HUD Row */}
              <div className="flex items-center justify-between text-[#d6be8b]">
                <div className="bg-[#2c1d18]/85 px-2.5 py-1 rounded-full border border-[#d6be8b]/30">
                  CHANDRAN: OPTIMAL
                </div>
                <div className="bg-[#2c1d18]/85 px-2.5 py-1 rounded-full border border-[#d6be8b]/30">
                  AUNTIE SENSOR: 99.4%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Humorous Parody Metrics Radar (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-white border border-[#e8dfd1] rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#f0e8dc] pb-2.5">
              <span className="font-regal text-sm font-bold text-[#78182a] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#a8822e]" />
                <span>HUMOROUS PARODY METRICS</span>
              </span>
              <span className="text-[10px] font-mono text-[#8c6b1f] bg-[#fbf4e6] px-2.5 py-0.5 rounded-full border border-[#d6be8b]">
                PARODY ENGINE
              </span>
            </div>

            {/* Metrics List */}
            <div className="space-y-3.5 font-mono text-xs">
              {/* 1. Baaddie meter 💅💅💅💅 (Bride) / Natural Aura farmer (Groom) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#2c221e]">
                    {candidateRole === 'BRIDE' ? 'Baaddie meter 💅💅💅💅' : 'Natural Aura farmer'}
                  </span>
                  <span className="text-[#8c6b1f] font-semibold">{metrics.familyCompatibility}%</span>
                </div>
                <div className="w-full bg-[#f0e8dc] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#bfa054] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, metrics.familyCompatibility)}%` }}
                  />
                </div>
              </div>

              {/* 2. Brain Rot Index */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#2c221e]">Brain Rot Index</span>
                  <span className="text-[#9c3653] font-semibold">{metrics.brainRotIndex}%</span>
                </div>
                <div className="w-full bg-[#f0e8dc] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#b85b73] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, metrics.brainRotIndex)}%` }}
                  />
                </div>
              </div>

              {/* 3. Confidence of pulling a Sugardaddy (Bride) / Confidence of pulling a baddie (Groom) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#2c221e]">
                    {candidateRole === 'BRIDE' ? 'Confidence of pulling a Sugardaddy' : 'Confidence of pulling a baddie'}
                  </span>
                  <span className="text-[#78182a] font-semibold">{metrics.socialCompatibility}%</span>
                </div>
                <div className="w-full bg-[#f0e8dc] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#78182a] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, metrics.socialCompatibility)}%` }}
                  />
                </div>
              </div>

              {/* 4. Reel Consumption */}
              <div className="pt-2 border-t border-[#f0e8dc] flex justify-between items-center text-xs">
                <span className="text-[#736357]">Reel Consumption:</span>
                <span className="text-[#78182a] font-semibold bg-[#fdf2f4] px-2.5 py-0.5 rounded-full border border-[#f0c4ce]">
                  {metrics.reelConsumption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action and Navigation Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#f0e8dc] font-mono text-xs">
        <div className="flex items-center gap-1.5 text-[#736357] text-[11px]">
          <span className="text-[#78182a] font-semibold">NAVIGATION:</span>
          <span>Press</span>
          <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">Space</kbd>
          <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">Enter</kbd>
          <kbd className="px-2 py-0.5 bg-white border border-[#d6be8b] rounded text-[#78182a] font-medium">→</kbd>
          <span>to {isComplete ? 'proceed' : 'complete scan'}</span>
        </div>

        <button
          id={`btn-${candidateRole.toLowerCase()}-scan-proceed`}
          type="button"
          onClick={isComplete ? onProceed : handleFastForward}
          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
            isComplete
              ? 'bg-[#78182a] hover:bg-[#601321] text-white'
              : 'bg-white hover:bg-[#f6f1e8] text-[#78182a] border border-[#d6be8b]'
          }`}
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>VIEW {candidateRole} EVALUATION DOSSIER</span>
            </>
          ) : (
            <>
              <FastForward className="w-4 h-4 text-[#a8822e]" />
              <span>FAST-FORWARD SCAN SEQUENCE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
