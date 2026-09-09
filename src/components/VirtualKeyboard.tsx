import { useLayoutEffect, useRef, useState } from 'react';
import { ROWS, charToCode, FINGER_LOOKUP, type KeyDef } from '../data/keyboardLayout';
import { Hand } from './Hand';
import './VirtualKeyboard.css';

interface Props {
  nextChar: string | undefined;
}

function Key({
  keyDef,
  active,
  registerRef,
}: {
  keyDef: KeyDef;
  active: boolean;
  registerRef: (code: string, el: HTMLDivElement | null) => void;
}) {
  const hasSup = keyDef.upper !== keyDef.lower.toUpperCase();
  return (
    <div
      ref={(el) => registerRef(keyDef.code, el)}
      className={`kb-key ${active ? 'active' : ''}`}
    >
      <span className="kb-main">{keyDef.lower}</span>
      {hasSup && <span className="kb-sup">{keyDef.upper}</span>}
    </div>
  );
}

function SysKey({ label, wide }: { label: string; wide?: boolean }) {
  return <div className={`kb-key kb-sys ${wide ? 'kb-wide' : ''}`}>{label}</div>;
}

export function VirtualKeyboard({ nextChar }: Props) {
  const [showHand, setShowHand] = useState(true);
  const [showHighlight, setShowHighlight] = useState(true);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const keyRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [handPos, setHandPos] = useState<{ left: number; bottom: number } | null>(null);

  const activeCode = nextChar ? charToCode(nextChar) : undefined;
  const isUpper = nextChar ? nextChar !== nextChar.toLowerCase() : false;
  const fingerInfo = activeCode ? FINGER_LOOKUP[activeCode] : undefined;

  const registerRef = (code: string, el: HTMLDivElement | null) => {
    if (el) keyRefs.current.set(code, el);
    else keyRefs.current.delete(code);
  };

  useLayoutEffect(() => {
    const container = keyboardRef.current;
    const keyEl = activeCode ? keyRefs.current.get(activeCode) : undefined;
    if (!container || !keyEl || activeCode === 'Space') {
      setHandPos(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const keyRect = keyEl.getBoundingClientRect();
    setHandPos({
      left: keyRect.left - containerRect.left + keyRect.width / 2,
      bottom: containerRect.bottom - keyRect.top - keyRect.height / 2,
    });
  }, [activeCode]);

  return (
    <div className="kb-panel">
      <div className="kb-toolbar">
        <span className="kb-layout">
          йцукен
          <svg width="9" height="5" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <div className="kb-toolbar-icons">
          <button
            className={`icon-btn ${showHighlight ? 'on' : ''}`}
            title="Подсветка"
            onClick={() => setShowHighlight((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <path
                d="M9 2c-1 1.2-2 3.6-2 6l6 6c2.4 0 4.8-1 6-2L9 2Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
              />
              <path d="M6 12 3 19l5-2" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
          </button>
          <button
            className={`icon-btn ${showHand ? 'on' : ''}`}
            title="Показать руки"
            onClick={() => setShowHand((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <path
                d="M6 11V4.5a1.5 1.5 0 0 1 3 0V10M9 10V3a1.5 1.5 0 0 1 3 0v7M12 10V4.5a1.5 1.5 0 0 1 3 0V11M15 11V7a1.5 1.5 0 0 1 3 0v6c0 4-2.5 6.5-6 6.5S6 20.5 6 16.5V13"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="kb-keyboard" ref={keyboardRef}>
        <div className="kb-row">
          {ROWS[0].map((k) => (
            <Key key={k.code} keyDef={k} active={k.code === activeCode} registerRef={registerRef} />
          ))}
          <SysKey label="Backspace" wide />
        </div>
        <div className="kb-row">
          <SysKey label="Tab" wide />
          {ROWS[1].map((k) => (
            <Key key={k.code} keyDef={k} active={k.code === activeCode} registerRef={registerRef} />
          ))}
        </div>
        <div className="kb-row">
          <SysKey label="Caps Lock" wide />
          {ROWS[2].map((k) => (
            <Key key={k.code} keyDef={k} active={k.code === activeCode} registerRef={registerRef} />
          ))}
          <SysKey label="Enter" wide />
        </div>
        <div className="kb-row">
          <SysKey label="Shift" wide />
          {ROWS[3].map((k) => (
            <Key key={k.code} keyDef={k} active={k.code === activeCode} registerRef={registerRef} />
          ))}
          <SysKey label="Shift" wide />
        </div>
        <div className="kb-row">
          <div
            ref={(el) => registerRef('Space', el)}
            className={`kb-key kb-space ${activeCode === 'Space' ? 'active' : ''}`}
          />
          <SysKey label="AltGr" />
        </div>

        {showHand && handPos && fingerInfo && (
          <div className="hand-anchor" style={{ left: handPos.left, bottom: handPos.bottom }}>
            <Hand hand={isUpper ? (fingerInfo.hand === 'left' ? 'right' : 'left') : fingerInfo.hand} finger={fingerInfo.finger} />
          </div>
        )}
      </div>
      {!showHighlight && <style>{'.kb-key.active{background:var(--key-bg)!important;color:var(--text-muted)!important;transform:none!important}'}</style>}
    </div>
  );
}
