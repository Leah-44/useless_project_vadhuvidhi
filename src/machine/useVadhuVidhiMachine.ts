import { useState, useCallback } from 'react';
import { VadhuVidhiState, StateMachineContext, MachineAction } from '../types/state';
import {
  ORDERED_STATES,
  INITIAL_CONTEXT,
  getNextState,
  getPrevState,
  STATE_METADATA_MAP,
} from './transitions';

export interface VadhuVidhiMachineAPI {
  currentState: VadhuVidhiState;
  stateIndex: number;
  totalStates: number;
  metadata: (typeof STATE_METADATA_MAP)[VadhuVidhiState];
  context: StateMachineContext;
  history: VadhuVidhiState[];
  canGoNext: boolean;
  canGoPrev: boolean;
  nextStateName: VadhuVidhiState | null;
  prevStateName: VadhuVidhiState | null;
  dispatch: (action: MachineAction) => void;
  next: () => void;
  prev: () => void;
  jump: (target: VadhuVidhiState) => void;
  reset: () => void;
  updateContext: (payload: Partial<StateMachineContext>) => void;
  log: (msg: string) => void;
}

export function useVadhuVidhiMachine(
  initialState: VadhuVidhiState = 'BOOT'
): VadhuVidhiMachineAPI {
  const [currentState, setCurrentState] = useState<VadhuVidhiState>(initialState);
  const [context, setContext] = useState<StateMachineContext>(INITIAL_CONTEXT);
  const [history, setHistory] = useState<VadhuVidhiState[]>([initialState]);

  const log = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setContext((prev) => ({
      ...prev,
      systemLogs: [`[${timestamp}] ${msg}`, ...prev.systemLogs].slice(0, 50),
    }));
  }, []);

  const updateContext = useCallback((payload: Partial<StateMachineContext>) => {
    setContext((prev) => ({
      ...prev,
      ...payload,
    }));
  }, []);

  const jump = useCallback(
    (target: VadhuVidhiState) => {
      if (!ORDERED_STATES.includes(target)) return;
      setCurrentState(target);
      setHistory((prev) => [...prev, target]);
      log(`State Transition (JUMP): -> ${target}`);
    },
    [log]
  );

  const next = useCallback(() => {
    const nextState = getNextState(currentState);
    if (nextState) {
      setCurrentState(nextState);
      setHistory((prev) => [...prev, nextState]);
      log(`State Transition (NEXT): ${currentState} -> ${nextState}`);
    }
  }, [currentState, log]);

  const prev = useCallback(() => {
    const prevState = getPrevState(currentState);
    if (prevState) {
      setCurrentState(prevState);
      setHistory((prev) => [...prev, prevState]);
      log(`State Transition (PREV): ${currentState} -> ${prevState}`);
    }
  }, [currentState, log]);

  const reset = useCallback(() => {
    setCurrentState('BOOT');
    setContext(INITIAL_CONTEXT);
    setHistory(['BOOT']);
    log('System Reset: Returned to BOOT state with default parameters.');
  }, [log]);

  const dispatch = useCallback(
    (action: MachineAction) => {
      switch (action.type) {
        case 'NEXT':
          next();
          break;
        case 'PREV':
          prev();
          break;
        case 'JUMP':
          jump(action.target);
          break;
        case 'RESET':
          reset();
          break;
        case 'UPDATE_CONTEXT':
          updateContext(action.payload);
          break;
        case 'LOG_SYSTEM':
          log(action.message);
          break;
      }
    },
    [next, prev, jump, reset, updateContext, log]
  );

  const currentIndex = ORDERED_STATES.indexOf(currentState);
  const nextStateName = getNextState(currentState);
  const prevStateName = getPrevState(currentState);

  return {
    currentState,
    stateIndex: currentIndex,
    totalStates: ORDERED_STATES.length,
    metadata: STATE_METADATA_MAP[currentState],
    context,
    history,
    canGoNext: nextStateName !== null,
    canGoPrev: prevStateName !== null,
    nextStateName,
    prevStateName,
    dispatch,
    next,
    prev,
    jump,
    reset,
    updateContext,
    log,
  };
}
