/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useVadhuVidhiMachine } from './machine/useVadhuVidhiMachine';
import { StateMachineNav } from './components/StateMachineNav';
import { StateContainer } from './components/StateContainer';
import { StateMachineInspector } from './components/StateMachineInspector';
import { Sparkles, Volume2, VolumeX, Camera, RotateCcw, MonitorPlay } from 'lucide-react';
import { chatSound } from './utils/chatSound';

export default function App() {
  const machine = useVadhuVidhiMachine('BOOT');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(chatSound.isMuted());

  // Show transient toast
  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  }, []);

  // Sync mute listener
  useEffect(() => {
    const unsub = chatSound.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsub;
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = chatSound.toggleMute();
    setIsMuted(nextMuted);
    machine.updateContext({ isMuted: nextMuted });
    showToast(nextMuted ? '🔇 AUDIO: MUTED [M]' : '🔊 AUDIO: UNMUTED [M]');
  }, [machine, showToast]);

  const handleToggleSimulation = useCallback(() => {
    const nextSim = !machine.context.isSimulationMode;
    machine.updateContext({ isSimulationMode: nextSim });
    showToast(
      nextSim
        ? '🧪 SCAN SENSOR: SIMULATION FORCED [S]'
        : '📹 SCAN SENSOR: LIVE CAMERA ENGAGED [S]'
    );
  }, [machine, showToast]);

  const handleRestart = useCallback(() => {
    chatSound.silence();
    machine.reset();
    showToast('🔄 SYSTEM RESTART: VADHUVIDHI.EXE RESET [R]');
  }, [machine, showToast]);

  // Global Competition-Demo Keyboard Controller
  // Space = advance, Enter = advance, Right Arrow = next, R = restart, M = mute, S = simulation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      // Allow standard typing in inputs and textareas
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      // R = restart
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestart();
        return;
      }

      // M = mute / unmute
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
        return;
      }

      // S = simulation / live camera toggle
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleToggleSimulation();
        return;
      }

      // Space / Enter / ArrowRight = advance
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        // If event was not already consumed by a child state's sub-step:
        if (!e.defaultPrevented) {
          e.preventDefault();
          machine.next();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRestart, handleToggleMute, handleToggleSimulation, machine]);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2c221e] flex flex-col justify-between selection:bg-[#f5e6c8] selection:text-[#78182a] relative overflow-x-hidden font-sans">
      {/* Subtle Top Auspicious Kasavu Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#bfa054] via-[#e2d2a4] via-[#78182a] via-[#e2d2a4] to-[#bfa054] z-50 relative" />

      {/* Top Application Header */}
      <header
        className="border-b border-[#e8dfd1] bg-[#fdfbf7]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-sm"
        id="app-header"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Subtle Kerala Nilavilakku Minimalist Icon */}
            <div className="relative w-9 h-9 rounded-full bg-[#f6efe2] border border-[#d6be8b] flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-2 h-3 bg-gradient-to-t from-[#e07a5f] to-[#f4a261] rounded-full animate-vilakku-gentle" />
              <div className="absolute bottom-1.5 w-3.5 h-1 border-b border-[#a8822e] rounded-b-sm" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-regal font-bold tracking-wide text-[#78182a]">
                  VADHUVIDHI.EXE
                </h1>
              </div>
              <p className="text-[11px] text-[#736357] font-mono">
                കല്യാണ നിർണ്ണയ യന്ത്രം &bull; Kerala Pennu Kaanal Protocol
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Simulation/Camera Mode Toggle Button */}
            <button
              id="btn-global-sim-toggle"
              type="button"
              onClick={handleToggleSimulation}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                machine.context.isSimulationMode
                  ? 'bg-[#fbf4e6] text-[#8c6b1f] border-[#d6be8b]'
                  : 'bg-white hover:bg-[#faf7f2] text-[#4a7062] border-[#c3ded4]'
              }`}
              title="Toggle Camera Simulation / Live Sensor (Shortcut: S)"
            >
              {machine.context.isSimulationMode ? (
                <MonitorPlay className="w-3.5 h-3.5 text-[#a8822e]" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-[#4a7062]" />
              )}
              <span className="hidden sm:inline">
                {machine.context.isSimulationMode ? 'SIM [S]' : 'CAM [S]'}
              </span>
            </button>

            {/* Audio Mute/Unmute Button */}
            <button
              id="btn-global-mute-toggle"
              type="button"
              onClick={handleToggleMute}
              className={`p-2 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                isMuted
                  ? 'bg-[#fdf2f4] text-[#b85b73] border-[#f0c4ce]'
                  : 'bg-[#edf4f1] text-[#4a7062] border-[#c3ded4]'
              }`}
              title={isMuted ? 'Unmute Audio (Shortcut: M)' : 'Mute Audio (Shortcut: M)'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Restart Button */}
            <button
              id="btn-global-restart"
              type="button"
              onClick={handleRestart}
              className="px-3 py-1.5 bg-white hover:bg-[#faf7f2] text-[#78182a] border border-[#e8dfd1] rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Restart Experience (Shortcut: R)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#78182a]" />
              <span className="hidden sm:inline">RESTART [R]</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Action Confirmation Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none animate-fadeIn">
          <div className="px-4 py-2 rounded-full bg-white/95 border border-[#d6be8b] text-[#78182a] font-mono text-xs font-semibold shadow-md backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#bfa054]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10" id="app-main">
        {/* State Machine Controller */}
        <StateMachineNav machine={machine} />

        {/* Current Active State Frame */}
        <StateContainer machine={machine} />

        {/* State Machine Inspector */}
        <StateMachineInspector machine={machine} />
      </main>

      {/* Footer */}
      <footer
        className="border-t border-[#e8dfd1] bg-[#fdfbf7] py-4 px-4 sm:px-8 text-[#736357] font-mono text-xs"
        id="app-footer"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-[#bfa054]">🪔</span>
            <span>VADHUVIDHI.EXE &bull; Traditional Matrimonial Automation Paradox Engine</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#78182a]">
            <Sparkles className="w-3.5 h-3.5 text-[#bfa054]" />
            <span>Kasavu Gold &bull; Ivory Cream &bull; Palm-Leaf Kundali &bull; Human Free Will</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
