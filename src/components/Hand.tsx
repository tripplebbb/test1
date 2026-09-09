import './Hand.css';

interface Props {
  hand: 'left' | 'right';
  finger: string;
}

const FINGERS = ['pinky', 'ring', 'middle', 'index', 'thumb'];

// Horizontal offset (px) of each fingertip from the hand-shape's own center (65px),
// accounting for the finger's base position, width and rotation.
const TIP_OFFSET: Record<string, number> = {
  pinky: -49.2,
  ring: -22.0,
  middle: 8.9,
  index: 40.6,
  thumb: 45,
};

export function Hand({ hand, finger }: Props) {
  const mirrored = hand === 'right';
  const baseOffset = TIP_OFFSET[finger] ?? 0;
  const renderedOffset = mirrored ? -baseOffset : baseOffset;
  const tx = -(65 + renderedOffset);

  return (
    <div className="hand-shape" style={{ transform: `translate(${tx}px, 4px)` }}>
      <div className={`hand-inner ${mirrored ? 'mirrored' : ''}`}>
        {FINGERS.map((f) => (
          <div key={f} className={`finger finger-${f} ${f === finger ? 'active' : ''}`} />
        ))}
        <div className="palm" />
      </div>
    </div>
  );
}
