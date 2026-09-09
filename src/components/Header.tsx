import { useState } from 'react';
import { LESSONS, LEVEL_LABELS, type Level } from '../data/texts';
import './Header.css';

interface Stats {
  errors: number;
  totalKeystrokes: number;
  wpm: number;
  cpm: number;
}

interface Props {
  level: Level;
  lessonId: string;
  focusMode: boolean;
  started: boolean;
  stats: Stats;
  onSelectLevel: (level: Level) => void;
  onSelectLesson: (id: string) => void;
  onRefresh: () => void;
  onToggleFocus: () => void;
}

const LEVELS: Level[] = ['basic', 'begin', 'speed', 'adv'];

export function Header({
  level,
  lessonId,
  focusMode,
  started,
  stats,
  onSelectLevel,
  onSelectLesson,
  onRefresh,
  onToggleFocus,
}: Props) {
  const [open, setOpen] = useState(false);
  const lessons = LESSONS.filter((l) => l.level === level);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="lang-select" onClick={() => setOpen((v) => !v)}>
          <span>Русский</span>
          <span className="lang-level">{LEVEL_LABELS[level]}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <button className="icon-btn refresh-btn" title="Начать заново" onClick={onRefresh}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.06 13.49c1.27 0 2.49-.44 3.47-1.24a5.86 5.86 0 0 0 1.9-3.15.79.79 0 0 1 1.55.32A7.4 7.4 0 0 1 5.58 14.76 7.3 7.3 0 0 1 .74 4.55 7.3 7.3 0 0 1 12.4 2.26l1.72-1.1s.42-.29.42.18v6.2s.03.4-.3.2L8.4 4.5l1.34-.87A6.05 6.05 0 0 0 2.77 6.56a6.05 6.05 0 0 0 5.29 6.93z"
              fill="currentColor"
            />
          </svg>
        </button>

        {open && (
          <div className="lang-popup">
            <div className="lang-popup-levels">
              {LEVELS.map((lv) => (
                <button
                  key={lv}
                  className={`lang-popup-level ${lv === level ? 'active' : ''}`}
                  onClick={() => onSelectLevel(lv)}
                >
                  {LEVEL_LABELS[lv]}
                </button>
              ))}
            </div>
            <div className="lang-popup-lessons">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`lang-popup-lesson ${lesson.id === lessonId ? 'active' : ''}`}
                  onClick={() => {
                    onSelectLesson(lesson.id);
                    setOpen(false);
                  }}
                >
                  {lesson.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <label className="focus-toggle">
        <input type="checkbox" checked={focusMode} onChange={onToggleFocus} />
        <span className="focus-slider">ФОКУС</span>
      </label>

      <div className="topbar-right">
        <div className="stat-pill" title="Ошибки">
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 1.76c-.05 0-.1.01-.13.03L3.86 4.87a.5.5 0 0 0-.3.4c0 4.74.29 7.47 1.37 9.55 1.09 2.07 2.94 3.4 5.87 5.35a.5.5 0 0 0 .5 0c2.94-1.95 4.78-3.28 5.87-5.35 1.08-2.08 1.37-4.81 1.37-9.55a.5.5 0 0 0-.3-.4L11.13 1.8a.5.5 0 0 0-.13-.04z"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="none"
            />
            <circle cx="11" cy="7.5" r="1.1" fill="currentColor" />
            <rect x="10.2" y="9.8" width="1.6" height="4" rx="0.8" fill="currentColor" />
          </svg>
          <span>{started ? `${stats.errors}/${stats.totalKeystrokes}` : '--/--'}</span>
        </div>
        <div className="stat-pill" title="Скорость">
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <path
              d="M2 15.6a9 9 0 0 1 18 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M11 15.6 15.5 8.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>{started ? `${stats.wpm}/${stats.cpm}` : '--/--'}</span>
        </div>
      </div>
    </div>
  );
}
