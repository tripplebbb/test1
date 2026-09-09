import { useEffect, useMemo, useRef } from 'react';
import type { CharState } from '../hooks/useTypingEngine';
import { splitIntoLines, findLineIndex } from '../utils/textLines';
import './TypingArea.css';

interface Props {
  text: string;
  charStates: CharState[];
  cursor: number;
  typed: string;
  onInput: (value: string) => void;
}

const MAX_LINE_CHARS = 70;

export function TypingArea({ text, charStates, cursor, typed, onInput }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const lines = useMemo(() => splitIntoLines(text, MAX_LINE_CHARS), [text]);
  const lineIndex = findLineIndex(lines, cursor);
  const current = lines[lineIndex];
  const next = lines[lineIndex + 1];

  useEffect(() => {
    inputRef.current?.focus();
  }, [text]);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.setSelectionRange(typed.length, typed.length);
    }
  }, [typed]);

  return (
    <div className="typing-area">
      <div className="typing-rule" />
      <div className="typing-viewport" onClick={() => inputRef.current?.focus()}>
        <div className="typing-line typing-line-current">
          {text
            .slice(current.start, current.end)
            .split('')
            .map((char, i) => {
              const globalIndex = current.start + i;
              const state: CharState = charStates[globalIndex] ?? 'pending';
              const isCursor = globalIndex === cursor;
              return (
                <span key={globalIndex} className={`char ${state} ${isCursor ? 'cursor' : ''}`}>
                  {char}
                </span>
              );
            })}
        </div>
        <div className="typing-line typing-line-next">
          {next ? text.slice(next.start, next.end) : ' '}
        </div>
      </div>
      <input
        ref={inputRef}
        className="typing-input"
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={typed}
        onChange={(e) => onInput(e.target.value)}
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
}
