import React, { useEffect } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { chatSound } from '../../utils/chatSound';

/**
 * FREEZE STATE
 * Specifications:
 * - hard cut to black
 * - no text
 * - no UI
 * - silence if possible
 * - hold approximately 2–3 seconds
 * Then ERROR.
 */
export const FreezeState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { next } = machine;

  useEffect(() => {
    // Silence any active audio or speech
    chatSound.silence();
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Ignore
    }

    // Hold for approximately 2.5 seconds (2–3 seconds specification), then transition to ERROR
    const timer = setTimeout(() => {
      next();
    }, 2500);

    // Optional early advance on user keypress or click
    const handleSkip = () => {
      clearTimeout(timer);
      next();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('pointerdown', handleSkip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('pointerdown', handleSkip);
    };
  }, [next]);

  // Pure black, hard cut, NO text, NO UI
  return (
    <div
      id="freeze-hard-cut-black"
      className="fixed inset-0 bg-black z-[99999] w-screen h-screen cursor-none select-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
