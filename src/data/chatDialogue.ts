export type ChatSenderRole =
  | 'AMMA'
  | 'JYOTSYAN'
  | 'ACHAN'
  | 'AMMAMMA'
  | 'COUSIN_1'
  | 'COUSIN_2'
  | 'SUDHI_MAMAN';

export type SpecialChatEvent =
  | 'open_jathakam'
  | 'burst'
  | 'long_typing'
  | 'freeze'
  | 'JATHAKAM'
  | 'CELEBRATION'
  | 'FREEZE';

export interface ChatReaction {
  emoji: string;
  count: number;
}

export interface DialogueItem {
  id: string;
  senderRole: ChatSenderRole;
  senderName: string;
  roleLabel: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  delayMs: number;
  reactions?: ChatReaction[];
  specialEvent?: SpecialChatEvent;
  isReactionAction?: boolean;
  targetMessageId?: string;
  reactionEmoji?: string;
  isTypingNotice?: boolean;
  typingDurationMs?: number;
}

/**
 * LOCKED CORE DIALOGUE
 * As instructed: Never rewrite, correct, translate, clean up, or improve the dialogue.
 * Exactly preserves the core Kerala family Pennu Kaanal dialogue.
 */
export const CORE_DIALOGUE_TEMPLATE: Array<Omit<DialogueItem, 'id'> & { id: string }> = [
  {
    id: 'C01',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: 'Jyolsyaree…Jathakam nokit engne und',
    timestamp: '11:02 AM',
    delayMs: 3500,
  },
  {
    id: 'C09',
    senderRole: 'JYOTSYAN',
    senderName: 'ജ്യോതിഷ്യൻ',
    roleLabel: 'Family Astrologer',
    avatarColor: 'bg-amber-600',
    text: 'ഒരു നിമിഷം... ഗ്രഹങ്ങൾ align ആകുന്നു 🔭',
    timestamp: '11:03 AM',
    delayMs: 4000,
  },
  {
    id: 'C10',
    senderRole: 'JYOTSYAN',
    senderName: 'ജ്യോതിഷ്യൻ',
    roleLabel: 'Family Astrologer',
    avatarColor: 'bg-amber-600',
    text: 'അയക്കുന്നു.',
    timestamp: '11:03 AM',
    delayMs: 3200,
    specialEvent: 'open_jathakam',
  },
  {
    id: 'C11',
    senderRole: 'JYOTSYAN',
    senderName: 'ജ്യോതിഷ്യൻ',
    roleLabel: 'Family Astrologer',
    avatarColor: 'bg-amber-600',
    text: 'പൊരുത്തം: 10/10 🔱',
    timestamp: '11:04 AM',
    delayMs: 4500,
    reactions: [{ emoji: '🔱', count: 3 }],
  },
  {
    id: 'C13',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: 'AYYOOO ENTHA PINNE NOKKAN😭❤️',
    timestamp: '11:04 AM',
    delayMs: 4500,
    specialEvent: 'burst',
    reactions: [
      { emoji: '😭', count: 4 },
      { emoji: '❤️', count: 5 },
    ],
  },
  {
    id: 'C14',
    senderRole: 'ACHAN',
    senderName: 'Achan',
    roleLabel: 'Father',
    avatarColor: 'bg-blue-600',
    text: 'Reacted with 👍 to ജ്യോതിഷ്യൻ’s message',
    timestamp: '11:04 AM',
    delayMs: 3000,
    isReactionAction: true,
    targetMessageId: 'C11',
    reactionEmoji: '👍',
  },
  {
    id: 'C15',
    senderRole: 'AMMAMMA',
    senderName: 'Ammamma',
    roleLabel: 'Grandmother',
    avatarColor: 'bg-emerald-700',
    text: 'Ini enik kann adachal mathi, ente kutty oru vadhu aagan pogunu 😭',
    timestamp: '11:05 AM',
    delayMs: 5800,
    reactions: [{ emoji: '😭', count: 3 }],
  },
  {
    id: 'C16',
    senderRole: 'COUSIN_1',
    senderName: 'Cousin 1',
    roleLabel: 'Dance Coordinator',
    avatarColor: 'bg-indigo-600',
    text: 'Elaaa cousinsinte shredekkkuu , wedding dance playlist grpil iduunnath ayirkum, haldi, mehendi, bride to be , save the date ellathinum Namal ayirkum dance kalikane.',
    timestamp: '11:06 AM',
    delayMs: 9500,
    reactions: [
      { emoji: '💃', count: 4 },
      { emoji: '🎵', count: 3 },
    ],
  },
  {
    id: 'C18',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: 'Date polum ariyilla, ippo thanne ellarum excited 😭',
    timestamp: '11:06 AM',
    delayMs: 4800,
    reactions: [{ emoji: '😂', count: 2 }],
  },
  {
    id: 'C19',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: 'typing... for approximately 9 seconds',
    timestamp: '11:07 AM',
    delayMs: 2000,
    isTypingNotice: true,
    typingDurationMs: 9000,
    specialEvent: 'long_typing',
  },
  {
    id: 'C20',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: 'Oru karyam njan parayattee.',
    timestamp: '11:07 AM',
    delayMs: 4500,
  },
  {
    id: 'C21',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: 'Ee kalyanam nadakkan paadilla.',
    timestamp: '11:07 AM',
    delayMs: 6500,
    reactions: [{ emoji: '😨', count: 4 }],
  },
  {
    id: 'C22',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: '😳Ath entha sudhi angne oru talk',
    timestamp: '11:08 AM',
    delayMs: 4200,
  },
  {
    id: 'C24',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: 'Njan ippo {{groom}}-inte 2015 Facebook post kandu.',
    timestamp: '11:08 AM',
    delayMs: 4800,
  },
  {
    id: 'C25',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: " 'Ronaldo is better than Messi' ennu ezhuthiyittundu. Public aayittu.Thalamura thalamura ayi namal kathusookshicha Messi snehathinn oru anthyam veruthan njn samathikilaa!!",
    timestamp: '11:08 AM',
    delayMs: 10000,
    reactions: [
      { emoji: '⚽', count: 5 },
      { emoji: '🐐', count: 6 },
    ],
  },
  {
    id: 'C27',
    senderRole: 'COUSIN_1',
    senderName: 'Cousin 1',
    roleLabel: 'Dance Coordinator',
    avatarColor: 'bg-indigo-600',
    text: '❓❓❓',
    timestamp: '11:09 AM',
    delayMs: 3000,
  },
  {
    id: 'C29',
    senderRole: 'ACHAN',
    senderName: 'Achan',
    roleLabel: 'Father',
    avatarColor: 'bg-blue-600',
    text: 'Aliyan paranjathil njn 100 shadamanam yoojikunu',
    timestamp: '11:09 AM',
    delayMs: 4500,
    reactions: [{ emoji: '🤝', count: 3 }],
  },
  {
    id: 'C30',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: 'Dhee Sudhi nee velya velachil edukal keto ,vere arum kandit ilaa kazhinja Fifakk Neymar posteril nee Umma vechath, njan pakshe kand .',
    timestamp: '11:10 AM',
    delayMs: 9500,
    reactions: [
      { emoji: '💀', count: 7 },
      { emoji: '🤣', count: 5 },
    ],
  },
  {
    id: 'C34',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: 'Sheri sheri, adutha topic 🙅',
    timestamp: '11:10 AM',
    delayMs: 4200,
    reactions: [{ emoji: '🤐', count: 4 }],
  },
  {
    id: 'C35',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: 'Anyway, catering aaru nokkum?',
    timestamp: '11:11 AM',
    delayMs: 4200,
    reactions: [{ emoji: '🍛', count: 3 }],
  },
  {
    id: 'E13',
    senderRole: 'AMMAMMA',
    senderName: 'Ammamma',
    roleLabel: 'Grandmother',
    avatarColor: 'bg-emerald-700',
    text: 'Enikku oru pattu paadanam vediyil.',
    timestamp: '11:11 AM',
    delayMs: 5000,
    reactions: [{ emoji: '🎤', count: 4 }],
  },
  {
    id: 'E14',
    senderRole: 'COUSIN_2',
    senderName: 'Cousin 2',
    roleLabel: 'Cousin',
    avatarColor: 'bg-purple-600',
    text: 'Ammamma noo 😭🙏',
    timestamp: '11:11 AM',
    delayMs: 3800,
    reactions: [{ emoji: '🙏', count: 5 }],
  },
  {
    id: 'E15',
    senderRole: 'SUDHI_MAMAN',
    senderName: 'Sudhi Maman',
    roleLabel: 'Maternal Uncle',
    avatarColor: 'bg-amber-700',
    text: 'Njan ippozhum vishwasikkunnilla ee family il aarkkum football matters illa ennu.',
    timestamp: '11:12 AM',
    delayMs: 6500,
    reactions: [{ emoji: '🤦‍♂️', count: 3 }],
  },
  {
    id: 'C46',
    senderRole: 'AMMA',
    senderName: 'Amma',
    roleLabel: 'Mother',
    avatarColor: 'bg-rose-600',
    text: 'Kalyanam urapp ayi! 🎉🎉',
    timestamp: '11:12 AM',
    delayMs: 5000,
    specialEvent: 'freeze',
    reactions: [
      { emoji: '🎉', count: 8 },
      { emoji: '💍', count: 6 },
    ],
  },
];

/**
 * Generates the locked chat script with dynamic {{groom}} replacement.
 */
export function getChatScript(groomName?: string): DialogueItem[] {
  const finalGroom = (groomName || 'Sanjay').trim();
  return CORE_DIALOGUE_TEMPLATE.map((item) => {
    return {
      ...item,
      text: item.text.replace(/\{\{groom\}\}/g, finalGroom),
    };
  });
}

export const DEFAULT_CHAT_SCRIPT = getChatScript('Sanjay Krishnan');
