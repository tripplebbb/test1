export interface TextLine {
  start: number;
  end: number;
}

export function splitIntoLines(text: string, maxChars: number): TextLine[] {
  const lines: TextLine[] = [];
  let lineStart = 0;
  let lineLen = 0;
  let pos = 0;

  const words = text.split(' ');
  words.forEach((word, i) => {
    const chunk = word + (i < words.length - 1 ? ' ' : '');
    if (lineLen > 0 && lineLen + chunk.length > maxChars) {
      lines.push({ start: lineStart, end: pos });
      lineStart = pos;
      lineLen = 0;
    }
    lineLen += chunk.length;
    pos += chunk.length;
  });
  lines.push({ start: lineStart, end: text.length });

  return lines;
}

export function findLineIndex(lines: TextLine[], cursor: number): number {
  for (let i = 0; i < lines.length; i++) {
    if (cursor < lines[i].end || i === lines.length - 1) return i;
  }
  return lines.length - 1;
}
