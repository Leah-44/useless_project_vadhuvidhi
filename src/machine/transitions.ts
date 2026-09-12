import { VadhuVidhiState, StateMetadata, StateMachineContext } from '../types/state';

export const ORDERED_STATES: readonly VadhuVidhiState[] = [
  'BOOT',
  'CURTAIN',
  'GROOM_NAME',
  'GROOM_SCAN',
  'GROOM_RESULT',
  'BRIDE_NAME',
  'BRIDE_SCAN',
  'BRIDE_RESULT',
  'CV_COMPLETE',
  'CHAT',
  'FREEZE',
  'ERROR',
  'DIAGNOSTIC',
  'FINAL',
  'SHUTDOWN',
] as const;

export const STATE_METADATA_MAP: Record<VadhuVidhiState, StateMetadata> = {
  BOOT: {
    state: 'BOOT',
    index: 0,
    title: 'BOOT SEQUENCE',
    subTitle: 'BIOS Matrimonial Kernel v4.20 Initializing',
    description: 'Hardware check, peripheral sync, and traditional ritual firmware loading.',
    category: 'INITIALIZATION',
  },
  CURTAIN: {
    state: 'CURTAIN',
    index: 1,
    title: 'CURTAIN PROTOCOL',
    subTitle: 'Pennu Kaanal Hall Preparation',
    description: 'Unveiling the ceremonial stage, adjusting tea set sensors and elder seating.',
    category: 'INITIALIZATION',
  },
  GROOM_NAME: {
    state: 'GROOM_NAME',
    index: 2,
    title: 'GROOM IDENTITY INGESTION',
    subTitle: 'Input Candidate Male Parameters',
    description: 'Accepting prospective groom legal identity, engineering status, and ancestral lineage.',
    category: 'EVALUATION',
  },
  GROOM_SCAN: {
    state: 'GROOM_SCAN',
    index: 3,
    title: 'GROOM BIOMETRIC & FINANCIAL SCAN',
    subTitle: 'Algorithmic Asset and Horoscope Assessment',
    description: 'Cross-verifying IT salary slips, Gulf relatives, CIBIL score, and planetary charts.',
    category: 'EVALUATION',
  },
  GROOM_RESULT: {
    state: 'GROOM_RESULT',
    index: 4,
    title: 'GROOM EVALUATION OUTPUT',
    subTitle: 'Automated Feasibility Metric: High Value',
    description: 'System-generated patriarchy index, asset score, and horoscope compatibility baseline.',
    category: 'EVALUATION',
  },
  BRIDE_NAME: {
    state: 'BRIDE_NAME',
    index: 5,
    title: 'BRIDE IDENTITY INGESTION',
    subTitle: 'Input Candidate Female Parameters',
    description: 'Accepting prospective bride credentials, educational certificates, and family biodata.',
    category: 'EVALUATION',
  },
  BRIDE_SCAN: {
    state: 'BRIDE_SCAN',
    index: 6,
    title: 'BRIDE SCAN & TEA SERVING GAIT',
    subTitle: 'Tea Tray Stability & Traditional Deportment Scan',
    description: 'Verifying tea cup balance angle, saree pallu drape coefficient, and smile decibel ratio.',
    category: 'EVALUATION',
  },
  BRIDE_RESULT: {
    state: 'BRIDE_RESULT',
    index: 7,
    title: 'BRIDE EVALUATION OUTPUT',
    subTitle: 'Automated Homemaker & Career Co-Matrix',
    description: 'Calculated culinary stability, astrological harmony, and elder approval index.',
    category: 'EVALUATION',
  },
  CV_COMPLETE: {
    state: 'CV_COMPLETE',
    index: 8,
    title: 'CURRICULUM VITAE SYNTHESIS',
    subTitle: 'Algorithmic Matrimonial Cross-Matching Matrix',
    description: 'Full automated synthesis complete. Matrimonial coefficient exceeds 98.4%.',
    category: 'EVALUATION',
  },
  CHAT: {
    state: 'CHAT',
    index: 9,
    title: 'SUPERVISED INTERACTION PROTOCOL',
    subTitle: 'Ten-Minute Formal Drawing Room Discourse',
    description: 'Scripted dialogue between candidates under active surveillance of paternal uncles.',
    category: 'INTERACTION',
  },
  FREEZE: {
    state: 'FREEZE',
    index: 10,
    title: 'STATE DEADLOCK: CONVERSATIONAL FREEZE',
    subTitle: 'Silence Detected Exceeding Safety Threshold (180s)',
    description: 'System thread halted. Both candidates staring into ceramic tea cups without conversational packet transmission.',
    category: 'ANOMALY',
  },
  ERROR: {
    state: 'ERROR',
    index: 11,
    title: 'SYSTEM FAULT: UNRESOLVED EXCEPTION',
    subTitle: 'ERR_MISSING_PRIMARY_BOOLEAN_404',
    description: 'Automated pipeline cannot proceed to marriage finalization. Unhandled null pointer encountered in commitment logic.',
    category: 'ANOMALY',
  },
  DIAGNOSTIC: {
    state: 'DIAGNOSTIC',
    index: 12,
    title: 'DEEP CORE DIAGNOSTIC REPORT',
    subTitle: 'Root Cause Analysis of Algorithm Failure',
    description: 'Discovered critical oversight: system verified 12,000 familial criteria but failed to query whether bride and groom actually agree.',
    category: 'ANOMALY',
  },
  FINAL: {
    state: 'FINAL',
    index: 13,
    title: 'FINAL PROTOCOL RESOLUTION',
    subTitle: 'Consensus Outcome Computation',
    description: 'Outcome determined purely by participant mutual consent rather than automated matrix scoring.',
    category: 'RESOLUTION',
  },
  SHUTDOWN: {
    state: 'SHUTDOWN',
    index: 14,
    title: 'TERMINAL SHUTDOWN SEQUENCE',
    subTitle: 'Process VADHUVIDHI.EXE Terminated',
    description: 'Ceremonial process closed. Releasing peripheral locks, turning off tea kettle daemon, power down.',
    category: 'RESOLUTION',
  },
};

export const INITIAL_CONTEXT: StateMachineContext = {
  groomName: 'Sanjay Krishnan',
  groomJob: 'Senior Systems Architect (Infopark)',
  groomLocation: 'Ernakulam, Kerala',
  groomScanProgress: 100,
  groomScore: 94,
  groomMetrics: {
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
  },

  brideName: 'Devika Menon',
  brideDegree: 'M.Tech Computer Science (CUSAT)',
  brideLocation: 'Thrissur, Kerala',
  brideScanProgress: 100,
  brideScore: 96,
  brideMetrics: {
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
  },

  cvMatchScore: 98.4,
  chatMessages: [
    {
      id: 'msg-1',
      sender: 'SYSTEM',
      text: 'Mandatory 10-minute drawing room interaction initiated. Elders observing through adjacent window.',
      timestamp: '11:04 AM',
    },
    {
      id: 'msg-2',
      sender: 'GROOM',
      text: 'So... do you... like working from home or going to the office in Kakkanad?',
      timestamp: '11:05 AM',
    },
    {
      id: 'msg-3',
      sender: 'BRIDE',
      text: 'Both are okay. Did your uncle make you wear this silk shirt? It looks very stiff.',
      timestamp: '11:06 AM',
    },
    {
      id: 'msg-4',
      sender: 'GROOM',
      text: 'Yes. It itches. Also, my mom told me to ask if you know how to make unniyappam.',
      timestamp: '11:07 AM',
    },
    {
      id: 'msg-5',
      sender: 'BRIDE',
      text: 'I know how to order unniyappam on Swiggy in 20 minutes.',
      timestamp: '11:08 AM',
    },
  ],
  freezeReason: 'Prolonged conversational deadlock: both parties sipping cold tea in profound awkward silence.',
  errorCode: '0xMARRIAGE',
  diagnosticOutput: [
    'SYSTEM DIAGNOSTIC INITIATED...',
    'Groom data — FOUND ✓',
    'Bride data — FOUND ✓',
    'Family approval — FOUND ✓',
    'Jathakam — FOUND ✓',
    'Sudhi maman neglected — FOUND ✓',
    'Wedding planning — FOUND ✓',
    'CRITICAL VARIABLE:',
    'BRIDE & GROOM CONSENT',
    'STATUS: NOT FOUND',
    'SYSTEM IN TROUBLE.',
    'Marriage decision cannot be completed.',
    'AI has analysed everyone...',
    '...except the two people whose lives are being decided.',
  ],

  groomConsent: null,
  brideConsent: null,
  finalDecision: 'UNDECIDED',

  systemLogs: [
    '00:00:01 - Kernel initialization complete',
    '00:00:02 - Loaded Kerala_Matrimony_Traditions_v4.20.so',
    '00:00:03 - Ready for Pennu Kaanal execution',
  ],
  executionStartTime: new Date().toLocaleTimeString(),
  isMuted: false,
  isSimulationMode: false,
};

/**
 * Returns the next state in sequence, or null if at the end.
 */
export function getNextState(current: VadhuVidhiState): VadhuVidhiState | null {
  const currentIndex = ORDERED_STATES.indexOf(current);
  if (currentIndex === -1 || currentIndex >= ORDERED_STATES.length - 1) {
    return null;
  }
  return ORDERED_STATES[currentIndex + 1];
}

/**
 * Returns the previous state in sequence, or null if at the start.
 */
export function getPrevState(current: VadhuVidhiState): VadhuVidhiState | null {
  const currentIndex = ORDERED_STATES.indexOf(current);
  if (currentIndex <= 0) {
    return null;
  }
  return ORDERED_STATES[currentIndex - 1];
}

/**
 * Determines whether transition to target state is permissible.
 * In development / testing mode, all states are accessible.
 */
export function canTransition(from: VadhuVidhiState, to: VadhuVidhiState): boolean {
  return ORDERED_STATES.includes(to);
}
