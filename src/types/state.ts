export type VadhuVidhiState =
  | 'BOOT'
  | 'CURTAIN'
  | 'GROOM_NAME'
  | 'GROOM_SCAN'
  | 'GROOM_RESULT'
  | 'BRIDE_NAME'
  | 'BRIDE_SCAN'
  | 'BRIDE_RESULT'
  | 'CV_COMPLETE'
  | 'CHAT'
  | 'FREEZE'
  | 'ERROR'
  | 'DIAGNOSTIC'
  | 'FINAL'
  | 'SHUTDOWN';

export interface ChatMessage {
  id: string;
  sender: 'SYSTEM' | 'GROOM' | 'BRIDE' | 'ELDER';
  text: string;
  timestamp: string;
}

export interface ParodyMetrics {
  compatibility: number;
  familyCompatibility: number;
  brainRotIndex: number;
  socialCompatibility: number;
  marriageReadiness: number;
  reelConsumption: string;
  notes: string[];
}

export interface StateMachineContext {
  groomName: string;
  groomJob: string;
  groomLocation: string;
  groomScanProgress: number;
  groomScore: number;
  groomMetrics?: ParodyMetrics;

  brideName: string;
  brideDegree: string;
  brideLocation: string;
  brideScanProgress: number;
  brideScore: number;
  brideMetrics?: ParodyMetrics;

  cvMatchScore: number;
  chatMessages: ChatMessage[];
  freezeReason: string;
  errorCode: string;
  diagnosticOutput: string[];

  groomConsent: boolean | null;
  brideConsent: boolean | null;
  finalDecision: 'ACCEPTED' | 'REJECTED' | 'POSTPONED' | 'UNDECIDED';
  
  systemLogs: string[];
  executionStartTime: string;

  isMuted?: boolean;
  isSimulationMode?: boolean;
}

export interface StateMetadata {
  state: VadhuVidhiState;
  index: number;
  title: string;
  subTitle: string;
  description: string;
  category: 'INITIALIZATION' | 'EVALUATION' | 'INTERACTION' | 'ANOMALY' | 'RESOLUTION';
}

export type MachineAction =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'JUMP'; target: VadhuVidhiState }
  | { type: 'RESET' }
  | { type: 'UPDATE_CONTEXT'; payload: Partial<StateMachineContext> }
  | { type: 'LOG_SYSTEM'; message: string };
