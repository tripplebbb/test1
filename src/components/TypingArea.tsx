import { useEffect, useRef } from 'react';
import type { CharState } from '../hooks/useTypingEngine';
import './TypingArea.css';

interface Props {
  text: string;
  charStates: CharState[];
  cursor: number;
  typed: string;
  onInput: (value: string) => void;
}

export function TypingArea({ text, charStates, cursor, typed, onInput }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="typing-area" onClick={() => inputRef.current?.focus()}>
      <div className="typing-text">
        {text.split('').map((char, i) => {
          const state: CharState = charStates[i] ?? 'pending';
          const isCursor = i === cursor;
          return (
            <span key={i} className={`char ${state} ${isCursor ? 'cursor' : ''}`}>
              {char}
            </span>
          );
        })}
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
