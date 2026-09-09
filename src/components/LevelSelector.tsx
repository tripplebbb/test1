import { LESSONS, LEVEL_LABELS, type Level } from '../data/texts';
import './LevelSelector.css';

interface Props {
  level: Level;
  lessonId: string;
  onSelectLevel: (level: Level) => void;
  onSelectLesson: (id: string) => void;
}

const LEVELS: Level[] = ['basic', 'begin', 'speed', 'adv'];

export function LevelSelector({ level, lessonId, onSelectLevel, onSelectLesson }: Props) {
  const lessons = LESSONS.filter((l) => l.level === level);

  return (
    <div className="level-selector">
      <div className="level-tabs">
        {LEVELS.map((lv) => (
          <button
            key={lv}
            className={`level-tab ${lv === level ? 'active' : ''}`}
            onClick={() => onSelectLevel(lv)}
          >
            {LEVEL_LABELS[lv]}
          </button>
        ))}
      </div>
      <div className="lesson-list">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className={`lesson-item ${lesson.id === lessonId ? 'active' : ''}`}
            onClick={() => onSelectLesson(lesson.id)}
          >
            {lesson.title}
          </button>
        ))}
      </div>
    </div>
  );
}
