import { ROWS, HOME_ROW_CODES, charToCode } from '../data/keyboardLayout';
import './VirtualKeyboard.css';

interface Props {
  nextChar: string | undefined;
}

export function VirtualKeyboard({ nextChar }: Props) {
  const activeCode = nextChar ? charToCode(nextChar) : undefined;
  const isUpper = nextChar ? nextChar !== nextChar.toLowerCase() : false;

  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div className="kb-row" key={i}>
          {row.map((key) => (
            <div
              key={key.code}
              className={[
                'kb-key',
                HOME_ROW_CODES.has(key.code) ? 'home' : '',
                key.code === activeCode ? 'active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {isUpper && key.code === activeCode ? key.upper : key.lower}
            </div>
          ))}
        </div>
      ))}
      <div className="kb-row">
        <div className={`kb-key kb-space ${activeCode === 'Space' ? 'active' : ''}`} />
      </div>
    </div>
  );
}
