import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';

export const CurtainState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  // Opening states:
  // 'idle' (curtains closed, gently breathing)
  // 'opening' (user clicked / auto-triggered: fabric smoothly pulls apart with flowing folds)
  // 'revealed' (title fully visible, panels gathered gracefully at edges)
  const [stage, setStage] = useState<'idle' | 'opening' | 'revealed'>('idle');
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);

  // Trigger the gentle fabric parting animation and advance to GROOM_NAME
  const triggerOpenAndAdvance = useCallback(() => {
    if (stage === 'idle') {
      setStage('opening');

      // Stage 2: Full title reveal as fabric reaches sides (~800ms)
      setTimeout(() => {
        setStage('revealed');
      }, 850);

      // Stage 3: Smoothly advance to GROOM_NAME after graceful settle (~1850ms)
      transitionTimerRef.current = setTimeout(() => {
        if (!isTransitioningRef.current) {
          isTransitioningRef.current = true;
          machine.next();
        }
      }, 1900);
    } else if (stage === 'opening' || stage === 'revealed') {
      // If clicked while already opening, advance cleanly without delay
      if (!isTransitioningRef.current) {
        isTransitioningRef.current = true;
        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
        machine.next();
      }
    }
  }, [stage, machine]);

  // Gentle auto-open hint if user doesn't click within 1.2s
  useEffect(() => {
    const autoOpenTimer = setTimeout(() => {
      if (stage === 'idle') {
        triggerOpenAndAdvance();
      }
    }, 1200);

    return () => {
      clearTimeout(autoOpenTimer);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [stage, triggerOpenAndAdvance]);

  // Global Keyboard shortcuts (Space / Enter / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        triggerOpenAndAdvance();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerOpenAndAdvance]);

  const isOpening = stage === 'opening' || stage === 'revealed';
  const isRevealed = stage === 'revealed';

  return (
    <div
      id="state-cinematic-curtain"
      onClick={triggerOpenAndAdvance}
      className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-[#faf7f2] select-none cursor-pointer flex items-center justify-center"
      title="Click to open"
    >
      {/* SVG Definitions for Festive Multi-Color Indian Textile Motifs, Zari Ribbon, and Silky Fabric Shaders */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Authentic Indian Festive Multi-Color Floral Jaal Print */}
          <pattern
            id="festive-silk-print"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Deep Rich Rose Ground */}
            <rect width="64" height="64" fill="#881337" />

            {/* Coral, Peach & Magenta Diagonal Diamonds */}
            <path
              d="M0 32 L32 0 L64 32 L32 64 Z"
              fill="#be123c"
              opacity="0.9"
            />
            <path
              d="M10 32 L32 10 L54 32 L32 54 Z"
              fill="#ea580c"
              opacity="0.8"
            />

            {/* Warm Gold Lattice Filigree */}
            <path
              d="M0 0 L64 64 M64 0 L0 64"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />

            {/* Vibrant Festive Flower Rosettes (Pink, Orange, Soft Yellow, Gold) */}
            <circle cx="32" cy="18" r="4.5" fill="#f43f5e" />
            <circle cx="32" cy="46" r="4.5" fill="#f43f5e" />
            <circle cx="18" cy="32" r="4.5" fill="#db2777" />
            <circle cx="46" cy="32" r="4.5" fill="#db2777" />

            {/* Peach & Saffron Inner Petals */}
            <circle cx="23" cy="23" r="3.5" fill="#fb923c" />
            <circle cx="41" cy="23" r="3.5" fill="#fb923c" />
            <circle cx="23" cy="41" r="3.5" fill="#fb923c" />
            <circle cx="41" cy="41" r="3.5" fill="#fb923c" />

            {/* Glowing Warm Gold Center Core */}
            <circle cx="32" cy="32" r="5" fill="#f59e0b" />
            <circle cx="32" cy="32" r="2.5" fill="#fef08a" />

            {/* Soft Ivory / Warm Cream Accent Stipples */}
            <circle cx="32" cy="6" r="1.2" fill="#fffbeb" opacity="0.9" />
            <circle cx="32" cy="58" r="1.2" fill="#fffbeb" opacity="0.9" />
            <circle cx="6" cy="32" r="1.2" fill="#fffbeb" opacity="0.9" />
            <circle cx="58" cy="32" r="1.2" fill="#fffbeb" opacity="0.9" />
          </pattern>

          {/* Festive Zari Border with Kangri Chevrons */}
          <pattern
            id="festive-zari-border"
            width="36"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="36" height="24" fill="#4c0519" />
            <path
              d="M0 5 L4.5 0 L9 5 L13.5 0 L18 5 L22.5 0 L27 5 L31.5 0 L36 5 L36 8 L0 8 Z"
              fill="#ea580c"
            />
            <rect y="8" width="36" height="2.5" fill="#fbbf24" />
            <path
              d="M0 16 Q9 11 18 16 T36 16"
              fill="none"
              stroke="#fb7185"
              strokeWidth="1.8"
            />
            <circle cx="9" cy="14" r="2" fill="#fde047" />
            <circle cx="27" cy="18" r="2" fill="#f43f5e" />
            <rect y="21.5" width="36" height="2.5" fill="#d97706" />
          </pattern>
        </defs>
      </svg>

      {/* STAGE BACKDROP: Clean, Light, Elegant Setting Unveiled Behind Curtains */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 overflow-hidden bg-[#faf7f2]">
        {/* Soft Warm Halo Behind Title */}
        <div
          className={`absolute w-[450px] sm:w-[750px] h-[450px] sm:h-[750px] rounded-full pointer-events-none transition-all duration-1000 ease-out ${
            isOpening ? 'scale-100 opacity-80' : 'scale-75 opacity-15'
          }`}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.45) 0%, rgba(254, 205, 211, 0.35) 35%, rgba(250, 247, 242, 0.8) 65%, rgba(250, 247, 242, 1) 100%)',
            filter: 'blur(32px)',
          }}
        />

        {/* Central Hero Typography Reveal: "VadhuVidhi" */}
        <div
          className={`relative z-20 text-center transition-all duration-1000 ease-out ${
            isRevealed
              ? 'opacity-100 translate-y-0 scale-100 blur-0'
              : isOpening
              ? 'opacity-85 translate-y-2 scale-98 blur-0'
              : 'opacity-0 translate-y-5 scale-95 blur-xs'
          }`}
        >
          <div className="relative inline-block px-4 py-2">
            {/* The Dual-Typography Title:
                "Vadhu" (Italiana elegant high-fashion serif) + "Vidhi" (Hullgaria graceful romantic script) */}
            <h1 className="flex items-baseline justify-center tracking-tight leading-none select-none">
              {/* "Vadhu" — Italiana Serif */}
              <span
                className="font-italiana font-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#78182a] tracking-wide"
                style={{
                  filter: 'drop-shadow(0 2px 14px rgba(120, 24, 42, 0.12))',
                }}
              >
                Vadhu
              </span>

              {/* "Vidhi" — Hullgaria Decorative Script */}
              <span
                className="font-hullgaria font-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#a84860] ml-2 sm:ml-4 -mt-2 inline-block transform -rotate-2"
                style={{
                  textShadow: '0 2px 20px rgba(168, 72, 96, 0.28)',
                }}
              >
                Vidhi
              </span>
            </h1>

            {/* Delicate Kasavu Gold Hairline */}
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 max-w-xs sm:max-w-sm mx-auto opacity-70">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#bfa054] to-transparent" />
              <span className="text-[#a8822e] text-[10px]">✦</span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#bfa054] to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* CURTAIN FOREGROUND LAYER: Real, Light, Flowing Festive Indian Fabric */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {/* Soft Ambient Depth Shadow */}
        <div
          className={`absolute inset-0 bg-black/15 transition-opacity duration-1000 ease-out ${
            isOpening ? 'opacity-0' : 'opacity-25'
          }`}
        />

        {/* LEFT CURTAIN PANEL (Flowing Soft Fabric with Natural Hand-Pulled Physics) */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[53%] h-full will-change-transform"
          style={{
            transformOrigin: 'top left',
            transform: isOpening
              ? 'translateX(-90%) scaleX(0.24) skewY(-3.2deg) rotate(-1.5deg)'
              : 'translateX(0%) scaleX(1) skewY(0deg) rotate(0deg)',
            transition: 'transform 1.85s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: 'drop-shadow(14px 0 30px rgba(120, 24, 42, 0.45))',
          }}
        >
          {/* Natural Fabric Sway & Undulation */}
          <div
            className={`w-full h-full relative overflow-hidden transition-transform duration-1000 ${
              !isOpening ? 'animate-[swayGentleLeft_5s_ease-in-out_infinite]' : ''
            }`}
          >
            {/* Base Festive Dye Gradient (Pink, Rose, Magenta, Coral, Orange, Peach, Soft Yellow, Gold) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#701a24] via-[#9d174d] via-[#be123c] via-[#e11d48] via-[#f43f5e] via-[#fb923c] via-[#ea580c] to-[#9f1239]" />

            {/* Festive Multi-Color Printed Textile Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-80 mix-blend-multiply"
              style={{
                backgroundImage: 'url(#festive-silk-print)',
                backgroundSize: '64px 64px',
              }}
            />

            {/* Secondary Color Waves: Saffron Gold, Coral & Soft Rose Sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4c0519]/50 via-[#f43f5e]/25 via-[#fde047]/20 to-[#fb923c]/35 mix-blend-overlay" />

            {/* 3D Silky Fabric Folds & Undulating Ribs */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-75"
              style={{
                background:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.15) 18px, rgba(255,255,255,0.3) 36px, rgba(255,255,255,0.45) 54px, rgba(0,0,0,0.2) 72px, rgba(0,0,0,0.45) 90px)',
              }}
            />

            {/* Delicate Sheer Silk Texture */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-soft-light"
              style={{
                backgroundImage:
                  'radial-gradient(#fffbeb 0.8px, transparent 0.8px), radial-gradient(#ea580c 0.8px, transparent 0.8px)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 4px 4px',
              }}
            />

            {/* Inner Edge Zari Ribbon & Kasavu Gold Seam */}
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-r from-transparent via-[#ea580c]/50 to-[#4c0519] border-r-2 border-[#facc15] shadow-xl flex flex-col justify-between">
              <div
                className="w-full h-full opacity-90"
                style={{
                  backgroundImage: 'url(#festive-zari-border)',
                  backgroundSize: '36px 24px',
                }}
              />
            </div>

            {/* Bottom Scalloped Border with Subtle Gold Droplets */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#4c0519] via-[#881337] to-transparent border-b-4 border-[#facc15]">
              <div
                className="w-full h-7 opacity-95"
                style={{
                  backgroundImage: 'url(#festive-zari-border)',
                  backgroundSize: '36px 24px',
                }}
              />
              <div className="flex justify-between px-3 text-[#fde047] text-[10px] opacity-90">
                {[...Array(10)].map((_, i) => (
                  <span key={i}>◆</span>
                ))}
              </div>
            </div>

            {/* Side Gather Tieback Accent */}
            <div
              className={`absolute top-1/2 left-5 -translate-y-1/2 transition-all duration-1000 ${
                isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <div className="w-8 h-12 bg-gradient-to-b from-[#fde047] via-[#fb923c] to-[#e11d48] rounded-full border border-amber-200 shadow-lg flex items-center justify-center">
                <span className="text-xs text-[#881337] font-bold">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CURTAIN PANEL (Flowing Soft Fabric with Natural Hand-Pulled Physics) */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[53%] h-full will-change-transform"
          style={{
            transformOrigin: 'top right',
            transform: isOpening
              ? 'translateX(90%) scaleX(0.24) skewY(3.2deg) rotate(1.5deg)'
              : 'translateX(0%) scaleX(1) skewY(0deg) rotate(0deg)',
            transition: 'transform 1.85s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: 'drop-shadow(-14px 0 30px rgba(120, 24, 42, 0.45))',
          }}
        >
          {/* Natural Fabric Sway & Undulation */}
          <div
            className={`w-full h-full relative overflow-hidden transition-transform duration-1000 ${
              !isOpening ? 'animate-[swayGentleRight_5s_ease-in-out_infinite]' : ''
            }`}
          >
            {/* Base Festive Dye Gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#701a24] via-[#9d174d] via-[#be123c] via-[#e11d48] via-[#f43f5e] via-[#fb923c] via-[#ea580c] to-[#9f1239]" />

            {/* Festive Multi-Color Printed Textile Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-80 mix-blend-multiply"
              style={{
                backgroundImage: 'url(#festive-silk-print)',
                backgroundSize: '64px 64px',
              }}
            />

            {/* Secondary Color Waves: Saffron Gold, Coral & Soft Rose Sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4c0519]/50 via-[#f43f5e]/25 via-[#fde047]/20 to-[#fb923c]/35 mix-blend-overlay" />

            {/* 3D Silky Fabric Folds & Undulating Ribs */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-75"
              style={{
                background:
                  'repeating-linear-gradient(270deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.15) 18px, rgba(255,255,255,0.3) 36px, rgba(255,255,255,0.45) 54px, rgba(0,0,0,0.2) 72px, rgba(0,0,0,0.45) 90px)',
              }}
            />

            {/* Delicate Sheer Silk Texture */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-soft-light"
              style={{
                backgroundImage:
                  'radial-gradient(#fffbeb 0.8px, transparent 0.8px), radial-gradient(#ea580c 0.8px, transparent 0.8px)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 4px 4px',
              }}
            />

            {/* Inner Edge Zari Ribbon & Kasavu Gold Seam */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-l from-transparent via-[#ea580c]/50 to-[#4c0519] border-l-2 border-[#facc15] shadow-xl flex flex-col justify-between">
              <div
                className="w-full h-full opacity-90"
                style={{
                  backgroundImage: 'url(#festive-zari-border)',
                  backgroundSize: '36px 24px',
                }}
              />
            </div>

            {/* Bottom Scalloped Border with Subtle Gold Droplets */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#4c0519] via-[#881337] to-transparent border-b-4 border-[#facc15]">
              <div
                className="w-full h-7 opacity-95"
                style={{
                  backgroundImage: 'url(#festive-zari-border)',
                  backgroundSize: '36px 24px',
                }}
              />
              <div className="flex justify-between px-3 text-[#fde047] text-[10px] opacity-90">
                {[...Array(10)].map((_, i) => (
                  <span key={i}>◆</span>
                ))}
              </div>
            </div>

            {/* Side Gather Tieback Accent */}
            <div
              className={`absolute top-1/2 right-5 -translate-y-1/2 transition-all duration-1000 ${
                isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <div className="w-8 h-12 bg-gradient-to-b from-[#fde047] via-[#fb923c] to-[#e11d48] rounded-full border border-amber-200 shadow-lg flex items-center justify-center">
                <span className="text-xs text-[#881337] font-bold">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP SCALLOPED FESTIVE PELMET VALANCE */}
        <div
          className="absolute top-0 left-0 right-0 z-40 h-12 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 6px 14px rgba(120, 24, 42, 0.35))',
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-[#701a24] via-[#be123c] via-[#fb923c] via-[#be123c] to-[#701a24] border-b-2 border-[#facc15] relative overflow-hidden flex items-center justify-between px-6">
            <div
              className="absolute inset-0 opacity-60 mix-blend-multiply"
              style={{
                backgroundImage: 'url(#festive-silk-print)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="relative z-10 w-full flex justify-between text-[#fffbeb] text-xs font-mono opacity-90">
              {[...Array(14)].map((_, i) => (
                <span key={i} className="text-[#fde047]">✦</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
