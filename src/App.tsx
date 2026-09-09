import { useEffect, useState } from 'react';
import { LESSONS, type Level } from './data/texts';
import { useTypingEngine } from './hooks/useTypingEngine';
import { TypingArea } from './components/TypingArea';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { Header } from './components/Header';
import './App.css';

function App() {
  const [level, setLevel] = useState<Level>('basic');
  const [lessonId, setLessonId] = useState(LESSONS[0].id);
  const [theme] = useState<'light' | 'dark'>('light');
  const [focusMode, setFocusMode] = useState(false);

  const lesson = LESSONS.find((l) => l.id === lessonId) ?? LESSONS[0];
  const { typed, cursor, charStates, stats, isFinished, handleInput, reset } = useTypingEngine(
    lesson.text
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSelectLevel = (lv: Level) => {
    setLevel(lv);
    const first = LESSONS.find((l) => l.level === lv);
    if (first) {
      setLessonId(first.id);
      reset();
    }
  };

  const handleSelectLesson = (id: string) => {
    setLessonId(id);
    reset();
  };

  return (
    <div className={`app ${focusMode ? 'focus-mode' : ''}`}>
      <Header
        level={level}
        lessonId={lessonId}
        focusMode={focusMode}
        started={cursor > 0}
        stats={stats}
        onSelectLevel={handleSelectLevel}
        onSelectLesson={handleSelectLesson}
        onRefresh={reset}
        onToggleFocus={() => setFocusMode((v) => !v)}
      />

      <TypingArea
        text={lesson.text}
        charStates={charStates}
        cursor={cursor}
        typed={typed}
        onInput={handleInput}
      />

      {isFinished && (
        <div className="finish-banner">
          <span>
            Готово! {stats.wpm} слов/мин, точность {stats.accuracy}%
          </span>
          <button onClick={reset}>Повторить</button>
        </div>
      )}

      <VirtualKeyboard nextChar={lesson.text[cursor]} />
    </div>
  );
}

export default App;
