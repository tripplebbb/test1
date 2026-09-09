import './StatsBar.css';

interface Props {
  cpm: number;
  wpm: number;
  accuracy: number;
  errors: number;
}

export function StatsBar({ cpm, wpm, accuracy, errors }: Props) {
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-value">{wpm}</span>
        <span className="stat-label">слов/мин</span>
      </div>
      <div className="stat">
        <span className="stat-value">{cpm}</span>
        <span className="stat-label">зн/мин</span>
      </div>
      <div className="stat">
        <span className="stat-value">{accuracy}%</span>
        <span className="stat-label">точность</span>
      </div>
      <div className="stat">
        <span className="stat-value error">{errors}</span>
        <span className="stat-label">ошибок</span>
      </div>
    </div>
  );
}
