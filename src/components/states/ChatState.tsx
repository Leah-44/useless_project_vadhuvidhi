import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { VadhuVidhiMachineAPI } from '../../machine/useVadhuVidhiMachine';
import { getChatScript, DialogueItem, SpecialChatEvent } from '../../data/chatDialogue';
import { chatSound } from '../../utils/chatSound';
import { JathakamOverlay } from '../jathakam/JathakamOverlay';
import {
  Play,
  Pause,
  FastForward,
  ArrowRight,
  ShieldAlert,
  PartyPopper,
  Snowflake,
  Volume2,
  VolumeX,
  Scroll,
  Phone,
  Video,
  Search,
  MoreVertical,
  Smile,
  Paperclip,
  Camera,
  Mic,
  CheckCheck,
  Flame,
  ChevronLeft,
  Users,
} from 'lucide-react';

export const ChatState: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  const { context, next } = machine;

  // Dynamically inject groom name into locked core script
  const chatScript = useMemo(() => getChatScript(context.groomName), [context.groomName]);

  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingName, setTypingName] = useState<string>('');
  const [typingCountdown, setTypingCountdown] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 1x or 1.5x
  const [activeEvent, setActiveEvent] = useState<SpecialChatEvent | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reactionsMap, setReactionsMap] = useState<Record<string, Record<string, number>>>({});
  const [isJathakamOpen, setIsJathakamOpen] = useState<boolean>(false);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Auto-scroll chat on new message or typing state change
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [revealedCount, isTyping, typingCountdown]);

  // Execute special event actions
  const triggerEvent = useCallback(
    (event: SpecialChatEvent) => {
      setActiveEvent(event);
      if (soundEnabled) {
        if (event === 'burst' || event === 'CELEBRATION') chatSound.playCelebration();
        if (event === 'freeze' || event === 'FREEZE') chatSound.playFreeze();
      }
    },
    [soundEnabled]
  );

  // Advance message sequence with natural pacing
  const advanceMessage = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    if (revealedCount < chatScript.length) {
      const nextMsg = chatScript[revealedCount];
      const isLongTyping = nextMsg.isTypingNotice || nextMsg.specialEvent === 'long_typing';
      const typingDuration = isLongTyping
        ? (nextMsg.typingDurationMs || 9000) / playbackSpeed
        : Math.max(1400, Math.min(nextMsg.text.length * 35, 2600)) / playbackSpeed;

      setIsTyping(true);
      setTypingName(nextMsg.senderName);

      if (isLongTyping) {
        triggerEvent('long_typing');
        let remainingSec = Math.ceil(typingDuration / 1000);
        setTypingCountdown(remainingSec);

        countdownIntervalRef.current = setInterval(() => {
          remainingSec -= 1;
          if (remainingSec <= 0) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            setTypingCountdown(null);
          } else {
            setTypingCountdown(remainingSec);
          }
        }, 1000 / playbackSpeed);
      } else {
        setTypingCountdown(null);
      }

      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingCountdown(null);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

        setRevealedCount((prev) => prev + 1);

        if (soundEnabled) {
          chatSound.playPop();
        }

        // C14 Achan reacting with 👍 to C11
        if (nextMsg.isReactionAction && nextMsg.targetMessageId && nextMsg.reactionEmoji) {
          setReactionsMap((prev) => {
            const current = prev[nextMsg.targetMessageId!] || {};
            return {
              ...prev,
              [nextMsg.targetMessageId!]: {
                ...current,
                [nextMsg.reactionEmoji!]: (current[nextMsg.reactionEmoji!] || 0) + 1,
              },
            };
          });
        }

        // Special events
        if (nextMsg.specialEvent) {
          triggerEvent(nextMsg.specialEvent);
        }

        // When C46 "Kalyanam urapp ayi!" appears, wait for reaction and transition to FREEZE
        if (nextMsg.id === 'C46' || nextMsg.text.includes('Kalyanam urapp ayi')) {
          setTimeout(() => {
            if (!isTransitioningRef.current) {
              isTransitioningRef.current = true;
              next();
            }
          }, 3500 / playbackSpeed);
        }
      }, typingDuration);
    } else {
      setIsPlaying(false);
    }
  }, [chatScript, next, playbackSpeed, revealedCount, soundEnabled, triggerEvent]);

  // Autoplay loop: MESSAGE -> READ PAUSE -> TYPING -> NEXT MESSAGE (pauses while Jathakam is open)
  useEffect(() => {
    if (!isPlaying || isJathakamOpen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      setIsTyping(false);
      setTypingCountdown(null);
      return;
    }

    if (revealedCount >= chatScript.length) {
      setIsPlaying(false);
      return;
    }

    // Message currently visible
    const currentMsg = chatScript[revealedCount - 1];
    const readPause = (currentMsg?.delayMs || 3500) / playbackSpeed;

    // After audience finishes reading current message, start typing next message
    const readTimer = setTimeout(() => {
      advanceMessage();
    }, readPause);

    return () => {
      clearTimeout(readTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isPlaying, isJathakamOpen, revealedCount, playbackSpeed, advanceMessage, chatScript]);

  // Fast forward all messages up to C46 and proceed
  const handleFastForwardAll = () => {
    setIsPlaying(false);
    setIsTyping(false);
    setTypingCountdown(null);
    setRevealedCount(chatScript.length);
    if (!isTransitioningRef.current) {
      isTransitioningRef.current = true;
      next();
    }
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    if (soundEnabled) chatSound.playPop();
    setReactionsMap((prev) => {
      const current = prev[msgId] || {};
      return {
        ...prev,
        [msgId]: {
          ...current,
          [emoji]: (current[emoji] || 0) + 1,
        },
      };
    });
  };

  const handleCloseJathakam = () => {
    setIsJathakamOpen(false);
  };

  const displayedMessages = chatScript.slice(0, revealedCount);
  const isScriptFinished = revealedCount >= chatScript.length;

  // Sync sound status with global chatSound engine
  useEffect(() => {
    setSoundEnabled(!chatSound.isMuted());
    const unsubscribe = chatSound.subscribe((muted) => {
      setSoundEnabled(!muted);
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    const nextMuted = chatSound.toggleMute();
    setSoundEnabled(!nextMuted);
  };

  // Keyboard navigation for chat progression
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If Jathakam overlay is open, let JathakamOverlay handle its own keys (like Escape)
      if (isJathakamOpen) return;

      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (isScriptFinished) {
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true;
            next();
          }
        } else {
          advanceMessage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceMessage, isJathakamOpen, isScriptFinished, next]);

  // Helper for WhatsApp sender colors
  const getSenderColor = (role: string) => {
    switch (role) {
      case 'AMMA':
        return 'text-[#c2185b]'; // Deep Pink
      case 'JYOTSYAN':
        return 'text-[#b45309]'; // Saffron Gold
      case 'SUDHI_MAMAN':
        return 'text-[#c2410c]'; // Cinnamon Orange
      case 'ACHAN':
        return 'text-[#1e40af]'; // Royal Blue
      case 'AMMAMMA':
        return 'text-[#065f46]'; // Emerald Green
      case 'COUSIN_1':
        return 'text-[#7c3aed]'; // Violet Purple
      case 'COUSIN_2':
        return 'text-[#0e7490]'; // Teal Cyan
      default:
        return 'text-[#075e54]';
    }
  };

  return (
    <div className="space-y-3 select-none max-w-3xl mx-auto" id="state-family-chat-view">
      {/* WHATSAPP APP CONTAINER */}
      <div className="rounded-2xl border border-[#d1d7db] overflow-hidden bg-[#efeae2] shadow-xl flex flex-col h-[640px] sm:h-[680px] relative">
        {/* 1. WHATSAPP AUTHENTIC GROUP HEADER BAR */}
        <div className="bg-[#008069] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-md relative z-20">
          {/* Left: Back Arrow + Group Avatar + Group Title/Members */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <ChevronLeft className="w-5 h-5 text-white/80 cursor-pointer hover:text-white" />

            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004d40] to-[#26a69a] border-2 border-white/40 flex items-center justify-center text-white shadow-xs">
                <Flame className="w-5 h-5 text-[#facc15]" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25d366] border-2 border-[#008069]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide truncate">
                  Kalyanam 2026 // Family Group 🥥💍
                </h2>
              </div>
              <p className="text-[11px] text-white/85 truncate font-sans">
                {isTyping ? (
                  <span className="text-emerald-200 font-medium flex items-center gap-1 animate-pulse">
                    <span>✍️</span> {typingName} is typing...
                  </span>
                ) : (
                  <span>Amma, Sudhi Maman, ജ്യോതിഷ്യൻ, Achan, Ammamma, Cousins</span>
                )}
              </p>
            </div>
          </div>

          {/* Right: WhatsApp Actions (Video, Call, Menu) & Playback Controls */}
          <div className="flex items-center gap-1 sm:gap-2 text-white/90 shrink-0">
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-60" />}
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white flex items-center gap-1"
              title={isPlaying ? 'Pause conversation' : 'Play conversation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-300" />}
            </button>

            <button
              type="button"
              onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : 1))}
              className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-[10px] font-mono font-bold text-white transition-colors"
              title="Toggle playback speed"
            >
              {playbackSpeed}x
            </button>

            <div className="hidden sm:flex items-center gap-1 text-white/80 pl-1 border-l border-white/20">
              <Video className="w-4 h-4 hover:text-white cursor-pointer p-0.5" />
              <Phone className="w-4 h-4 hover:text-white cursor-pointer p-0.5" />
              <Search className="w-4 h-4 hover:text-white cursor-pointer p-0.5" />
              <MoreVertical className="w-4 h-4 hover:text-white cursor-pointer p-0.5" />
            </div>
          </div>
        </div>

        {/* 2. CHAT WALLPAPER & MESSAGE STREAM */}
        <div
          ref={chatScrollRef}
          className="flex-1 p-3 sm:p-5 space-y-3.5 overflow-y-auto relative z-10 scroll-smooth font-sans text-xs"
          style={{
            backgroundColor: '#efeae2',
            backgroundImage: `radial-gradient(#d1c7b7 0.75px, transparent 0.75px), radial-gradient(#e2d9cc 0.75px, #efeae2 0.75px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        >
          {/* WhatsApp Encryption Security Banner */}
          <div className="flex justify-center my-1">
            <div className="max-w-md px-3.5 py-1.5 rounded-lg bg-[#ffeecd] border border-[#f5dfa8] text-[#54656f] text-[10px] text-center font-sans shadow-xs flex items-center justify-center gap-1.5 leading-tight">
              <span>🔒</span>
              <span>Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
            </div>
          </div>

          {/* WhatsApp Date Separator Pill */}
          <div className="flex justify-center my-2">
            <span className="px-3 py-0.5 rounded-md bg-[#ffffff]/90 border border-[#e1ded7] text-[#54656f] font-mono text-[10px] font-semibold uppercase shadow-xs">
              TODAY
            </span>
          </div>

          {/* Render All Revealed Dialogue Messages */}
          {displayedMessages.map((msg) => {
            // C14 Achan: Reacted with 👍 to ജ്യോതിഷ്യൻ’s message
            if (msg.isReactionAction) {
              return (
                <div key={msg.id} className="flex justify-center w-full py-1 animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-[#d1d7db] text-[#111b21] text-[11px] shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <strong>{msg.senderName}</strong>
                    <span>reacted with</span>
                    <span className="text-sm">👍</span>
                    <span className="text-[#667781]">to ജ്യോതിഷ്യൻ</span>
                  </div>
                </div>
              );
            }

            if (msg.isTypingNotice) {
              return null;
            }

            const currentReactions = reactionsMap[msg.id] || {};
            const senderColor = getSenderColor(msg.senderRole);

            return (
              <div key={msg.id} className="flex justify-start w-full animate-fadeIn group">
                <div className="relative max-w-[88%] sm:max-w-[76%] rounded-2xl rounded-tl-xs p-3 sm:p-3.5 bg-white text-[#111b21] shadow-xs border border-[#e1e4e6] space-y-1.5">
                  {/* WhatsApp Tiny Speech Bubble Tail */}
                  <div
                    className="absolute -top-[1px] -left-2 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent pointer-events-none"
                    style={{ filter: 'drop-shadow(-1px 0px 0px #e1e4e6)' }}
                  />

                  {/* Sender Header */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <strong className={`font-bold font-sans ${senderColor}`}>
                        {msg.senderName}
                      </strong>
                      <span className="text-[#667781] text-[10px] font-mono">
                        ({msg.roleLabel})
                      </span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#111b21] font-sans whitespace-pre-line select-text">
                    {msg.text}
                  </p>

                  {/* Interactive Palm-leaf Jathakam Document Card on C10 */}
                  {msg.specialEvent === 'open_jathakam' && (
                    <div className="pt-1.5 pb-0.5">
                      <div
                        onClick={() => setIsJathakamOpen(true)}
                        className="p-2.5 rounded-xl bg-[#f7f5ef] hover:bg-[#eee8dc] border border-[#dcd2be] text-[#4a3b2c] flex items-center justify-between gap-2.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-[#b45309] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Scroll className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <strong className="block text-xs font-bold text-[#111b21] truncate">
                              📜 താളിയോല ജാതകം (Porutham 10/10)
                            </strong>
                            <span className="text-[10px] text-[#667781] font-mono">
                              2.4 MB • Palm-leaf PDF
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-md bg-[#008069] text-white text-[11px] font-semibold shrink-0 shadow-xs">
                          Open
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Timestamp & Read Receipt Double Checkmark */}
                  <div className="flex items-center justify-end gap-1 text-[10px] text-[#667781] pt-0.5 font-sans">
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                  </div>

                  {/* WhatsApp Floating Reaction Pill attached to bottom of bubble */}
                  {(msg.reactions || Object.keys(currentReactions).length > 0) && (
                    <div className="absolute -bottom-3 right-3 flex items-center gap-1 bg-white border border-[#d1d7db] px-2 py-0.5 rounded-full shadow-sm text-[11px] z-10">
                      {/* Pre-scripted reactions */}
                      {msg.reactions?.map((r) => {
                        const userExtra = currentReactions[r.emoji] || 0;
                        return (
                          <span
                            key={r.emoji}
                            onClick={() => handleAddReaction(msg.id, r.emoji)}
                            className="inline-flex items-center gap-0.5 cursor-pointer hover:scale-110 transition-transform"
                          >
                            <span>{r.emoji}</span>
                            <span className="text-[10px] font-bold text-[#111b21]">
                              {r.count + userExtra}
                            </span>
                          </span>
                        );
                      })}

                      {/* User-added reactions */}
                      {Object.entries(currentReactions)
                        .filter(([emoji]) => !msg.reactions?.some((r) => r.emoji === emoji))
                        .map(([emoji, count]) => (
                          <span
                            key={emoji}
                            onClick={() => handleAddReaction(msg.id, emoji)}
                            className="inline-flex items-center gap-0.5 cursor-pointer hover:scale-110 transition-transform"
                          >
                            <span>{emoji}</span>
                            <span className="text-[10px] font-bold text-[#008069]">{count}</span>
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Quick Reaction Hover Toolbar */}
                  <div className="absolute top-1 right-2 hidden group-hover:flex items-center gap-1 bg-white/95 border border-[#d1d7db] rounded-full px-1.5 py-0.5 shadow-md">
                    {['👍', '❤️', '😂', '😮', '😢', '🙏'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleAddReaction(msg.id, emoji)}
                        className="hover:scale-125 transition-transform text-xs cursor-pointer p-0.5"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* REALISTIC WHATSAPP TYPING BUBBLE */}
          {isTyping && (
            <div className="flex justify-start w-full animate-fadeIn">
              <div className="relative rounded-2xl rounded-tl-xs px-4 py-2.5 bg-white text-[#111b21] shadow-xs border border-[#e1e4e6] flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#008069] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#008069] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#008069] rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
                <span className="text-[11px] text-[#667781] font-sans">
                  <strong className="text-[#111b21]">{typingName}</strong> is typing...
                </span>

                {/* C19 Sudhi Maman 9s tension indicator */}
                {typingCountdown !== null && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] font-mono text-[10px] font-bold shadow-xs animate-pulse">
                    [Tension building: {typingCountdown}s]
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. SPECIAL EVENT OVERLAY BANNERS */}
        {/* Celebration Burst */}
        {activeEvent === 'burst' && (
          <div className="px-4 py-2 bg-[#fdf2f8] border-t border-[#fbcfe8] flex items-center justify-between text-xs text-[#9d174d] relative z-20 animate-fadeIn">
            <div className="flex items-center gap-2">
              <PartyPopper className="w-4 h-4 text-[#db2777] animate-bounce" />
              <span className="font-bold">🎉 CELEBRATION BURST: AYYOOO ENTHA PINNE NOKKAN!</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveEvent(null)}
              className="text-[#9d174d] hover:underline text-[11px] font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Freeze Event */}
        {(activeEvent === 'freeze' || activeEvent === 'FREEZE') && (
          <div className="px-4 py-2.5 bg-[#e0f2fe] border-t border-[#7dd3fc] flex items-center justify-between text-xs text-[#0369a1] relative z-20 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-[#0284c7] animate-spin" />
              <div>
                <strong className="block font-bold">❄️ CONVERSATION DEADLOCK DETECTED!</strong>
                <span className="text-[10px] text-[#0369a1]">VadhuVidhi.EXE thread halted. Total silence.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!isTransitioningRef.current) {
                  isTransitioningRef.current = true;
                  next();
                }
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#0284c7] text-white text-xs font-semibold shadow-xs hover:bg-[#0369a1] cursor-pointer"
            >
              Enter Freeze ↗
            </button>
          </div>
        )}

        {/* 4. WHATSAPP BOTTOM INPUT BAR */}
        <div className="bg-[#f0f2f5] p-2.5 sm:p-3 border-t border-[#d1d7db] flex items-center gap-2 relative z-20">
          <Smile className="w-6 h-6 text-[#54656f] hover:text-[#111b21] cursor-pointer shrink-0" />
          <Paperclip className="w-5 h-5 text-[#54656f] hover:text-[#111b21] cursor-pointer shrink-0" />

          <div className="flex-1 bg-white rounded-lg border border-[#e1e4e6] px-3.5 py-2 text-xs text-[#54656f] flex items-center justify-between shadow-xs">
            <span className="truncate">
              {isScriptFinished ? 'Conversation completed. Ready for deadlock.' : 'Type a message...'}
            </span>
            <Camera className="w-4 h-4 text-[#54656f] shrink-0" />
          </div>

          <div className="w-9 h-9 rounded-full bg-[#008069] text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer hover:bg-[#00705c]">
            <Mic className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Facilitator Quick Controls Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 px-2 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#736357] text-[11px]">
          <span className="font-semibold text-[#008069]">SHORTCUTS:</span>
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#d1d7db] rounded text-[#111b21] shadow-xs">Space</kbd>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#d1d7db] rounded text-[#111b21] shadow-xs">Enter</kbd>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#d1d7db] rounded text-[#111b21] shadow-xs">→</kbd>
          <span>to step</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={advanceMessage}
            disabled={isScriptFinished}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#f6efe2] disabled:opacity-40 text-[#111b21] border border-[#d1d7db] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
          >
            <span>Next Msg</span>
          </button>

          <button
            type="button"
            onClick={handleFastForwardAll}
            className="px-3.5 py-1.5 rounded-lg bg-[#008069] hover:bg-[#006a57] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Fast-Forward to Deadlock</span>
          </button>
        </div>
      </div>

      {/* Traditional Kerala Palm-Leaf Jathakam Overlay */}
      <JathakamOverlay isOpen={isJathakamOpen} onClose={handleCloseJathakam} />
    </div>
  );
};
