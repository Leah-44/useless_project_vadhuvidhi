import React from 'react';
import { VadhuVidhiMachineAPI } from '../machine/useVadhuVidhiMachine';
import { BootState } from './states/BootState';
import { CurtainState } from './states/CurtainState';
import { GroomNameState } from './states/GroomNameState';
import { GroomScanState } from './states/GroomScanState';
import { GroomResultState } from './states/GroomResultState';
import { BrideNameState } from './states/BrideNameState';
import { BrideScanState } from './states/BrideScanState';
import { BrideResultState } from './states/BrideResultState';
import { CvCompleteState } from './states/CvCompleteState';
import { ChatState } from './states/ChatState';
import { FreezeState } from './states/FreezeState';
import { ErrorState } from './states/ErrorState';
import { DiagnosticState } from './states/DiagnosticState';
import { FinalState } from './states/FinalState';
import { ShutdownState } from './states/ShutdownState';

export const StateRenderer: React.FC<{ machine: VadhuVidhiMachineAPI }> = ({ machine }) => {
  switch (machine.currentState) {
    case 'BOOT':
      return <BootState machine={machine} />;
    case 'CURTAIN':
      return <CurtainState machine={machine} />;
    case 'GROOM_NAME':
      return <GroomNameState machine={machine} />;
    case 'GROOM_SCAN':
      return <GroomScanState machine={machine} />;
    case 'GROOM_RESULT':
      return <GroomResultState machine={machine} />;
    case 'BRIDE_NAME':
      return <BrideNameState machine={machine} />;
    case 'BRIDE_SCAN':
      return <BrideScanState machine={machine} />;
    case 'BRIDE_RESULT':
      return <BrideResultState machine={machine} />;
    case 'CV_COMPLETE':
      return <CvCompleteState machine={machine} />;
    case 'CHAT':
      return <ChatState machine={machine} />;
    case 'FREEZE':
      return <FreezeState machine={machine} />;
    case 'ERROR':
      return <ErrorState machine={machine} />;
    case 'DIAGNOSTIC':
      return <DiagnosticState machine={machine} />;
    case 'FINAL':
      return <FinalState machine={machine} />;
    case 'SHUTDOWN':
      return <ShutdownState machine={machine} />;
    default:
      return (
        <div className="p-4 bg-red-950 text-red-200 rounded font-mono text-sm">
          Unknown State: {String(machine.currentState)}
        </div>
      );
  }
};
