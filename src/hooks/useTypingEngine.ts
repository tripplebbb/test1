import { useCallback, useMemo, useRef, useState } from 'react';

export type CharState = 'pending' | 'correct' | 'incorrect';

export interface EngineState {
  typed: string;
  errors: number;
  totalKeystrokes: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export function useTypingEngine(target: string) {
  const [state, setState] = useState<EngineState>({
    typed: '',
    errors: 0,
    totalKeystrokes: 0,
    startedAt: null,
    finishedAt: null,
  });
  const errorAtPos = useRef<Set<number>>(new Set());

  const reset = useCallback(() => {
    errorAtPos.current = new Set();
    setState({ typed: '', errors: 0, totalKeystrokes: 0, startedAt: null, finishedAt: null });
  }, []);

  const handleInput = useCallback(
    (value: string) => {
      setState((prev) => {
        if (prev.finishedAt) return prev;

        const startedAt = prev.startedAt ?? Date.now();
        const clamped = value.slice(0, target.length);
        let totalKeystrokes = prev.totalKeystrokes;

        if (clamped.length > prev.typed.length) {
          totalKeystrokes += clamped.length - prev.typed.length;
          const pos = clamped.length - 1;
          if (clamped[pos] !== target[pos]) {
            errorAtPos.current.add(pos);
          }
        }

        const finishedAt = clamped.length === target.length ? Date.now() : null;

        return {
          typed: clamped,
          errors: errorAtPos.current.size,
          totalKeystrokes,
          startedAt,
          finishedAt,
        };
      });
    },
    [target]
  );

  const charStates: CharState[] = useMemo(() => {
    return target.split('').map((_, i) => {
      if (i >= state.typed.length) return 'pending';
      return state.typed[i] === target[i] ? 'correct' : 'incorrect';
    });
  }, [state.typed, target]);

  const stats = useMemo(() => {
    const durationMs = (state.finishedAt ?? Date.now()) - (state.startedAt ?? Date.now());
    const minutes = Math.max(durationMs / 60000, 1 / 60000);
    const cpm = state.startedAt ? Math.round(target.length / minutes) : 0;
    const wpm = Math.round(cpm / 5);
    const accuracy =
      state.totalKeystrokes > 0
        ? Math.round(((state.totalKeystrokes - state.errors) / state.totalKeystrokes) * 100)
        : 100;
    return { cpm, wpm, accuracy, errors: state.errors };
  }, [state, target.length]);

  return {
    typed: state.typed,
    cursor: state.typed.length,
    isFinished: state.finishedAt !== null,
    charStates,
    stats,
    handleInput,
    reset,
  };
}
