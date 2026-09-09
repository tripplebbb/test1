export interface KeyDef {
  code: string;
  lower: string;
  upper: string;
  width?: number;
}

export const ROWS: KeyDef[][] = [
  [
    { code: 'Backquote', lower: 'ё', upper: 'Ё' },
    { code: 'Digit1', lower: '1', upper: '!' },
    { code: 'Digit2', lower: '2', upper: '"' },
    { code: 'Digit3', lower: '3', upper: '№' },
    { code: 'Digit4', lower: '4', upper: ';' },
    { code: 'Digit5', lower: '5', upper: '%' },
    { code: 'Digit6', lower: '6', upper: ':' },
    { code: 'Digit7', lower: '7', upper: '?' },
    { code: 'Digit8', lower: '8', upper: '*' },
    { code: 'Digit9', lower: '9', upper: '(' },
    { code: 'Digit0', lower: '0', upper: ')' },
    { code: 'Minus', lower: '-', upper: '_' },
    { code: 'Equal', lower: '=', upper: '+' },
  ],
  [
    { code: 'KeyQ', lower: 'й', upper: 'Й' },
    { code: 'KeyW', lower: 'ц', upper: 'Ц' },
    { code: 'KeyE', lower: 'у', upper: 'У' },
    { code: 'KeyR', lower: 'к', upper: 'К' },
    { code: 'KeyT', lower: 'е', upper: 'Е' },
    { code: 'KeyY', lower: 'н', upper: 'Н' },
    { code: 'KeyU', lower: 'г', upper: 'Г' },
    { code: 'KeyI', lower: 'ш', upper: 'Ш' },
    { code: 'KeyO', lower: 'щ', upper: 'Щ' },
    { code: 'KeyP', lower: 'з', upper: 'З' },
    { code: 'BracketLeft', lower: 'х', upper: 'Х' },
    { code: 'BracketRight', lower: 'ъ', upper: 'Ъ' },
  ],
  [
    { code: 'KeyA', lower: 'ф', upper: 'Ф' },
    { code: 'KeyS', lower: 'ы', upper: 'Ы' },
    { code: 'KeyD', lower: 'в', upper: 'В' },
    { code: 'KeyF', lower: 'а', upper: 'А' },
    { code: 'KeyG', lower: 'п', upper: 'П' },
    { code: 'KeyH', lower: 'р', upper: 'Р' },
    { code: 'KeyJ', lower: 'о', upper: 'О' },
    { code: 'KeyK', lower: 'л', upper: 'Л' },
    { code: 'KeyL', lower: 'д', upper: 'Д' },
    { code: 'Semicolon', lower: 'ж', upper: 'Ж' },
    { code: 'Quote', lower: 'э', upper: 'Э' },
  ],
  [
    { code: 'KeyZ', lower: 'я', upper: 'Я' },
    { code: 'KeyX', lower: 'ч', upper: 'Ч' },
    { code: 'KeyC', lower: 'с', upper: 'С' },
    { code: 'KeyV', lower: 'м', upper: 'М' },
    { code: 'KeyB', lower: 'и', upper: 'И' },
    { code: 'KeyN', lower: 'т', upper: 'Т' },
    { code: 'KeyM', lower: 'ь', upper: 'Ь' },
    { code: 'Comma', lower: 'б', upper: 'Б' },
    { code: 'Period', lower: 'ю', upper: 'Ю' },
    { code: 'Slash', lower: '.', upper: ',' },
  ],
];

export const HOME_ROW_CODES = new Set([
  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
]);

// left hand finger -> key codes
export const FINGER_MAP: Record<string, string[]> = {
  'left-pinky': ['Backquote', 'Digit1', 'KeyQ', 'KeyA', 'KeyZ'],
  'left-ring': ['Digit2', 'KeyW', 'KeyS', 'KeyX'],
  'left-middle': ['Digit3', 'KeyE', 'KeyD', 'KeyC'],
  'left-index': ['Digit4', 'Digit5', 'KeyR', 'KeyT', 'KeyF', 'KeyG', 'KeyV', 'KeyB'],
  'right-index': ['Digit6', 'Digit7', 'KeyY', 'KeyU', 'KeyH', 'KeyJ', 'KeyN', 'KeyM'],
  'right-middle': ['Digit8', 'KeyI', 'KeyK', 'Comma'],
  'right-ring': ['Digit9', 'KeyO', 'KeyL', 'Period'],
  'right-pinky': ['Digit0', 'Minus', 'Equal', 'KeyP', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Slash'],
};

export const FINGER_LOOKUP: Record<string, { hand: 'left' | 'right'; finger: string }> = (() => {
  const map: Record<string, { hand: 'left' | 'right'; finger: string }> = {};
  for (const [key, codes] of Object.entries(FINGER_MAP)) {
    const [hand, finger] = key.split('-') as ['left' | 'right', string];
    for (const code of codes) map[code] = { hand, finger };
  }
  map['Space'] = { hand: 'right', finger: 'thumb' };
  return map;
})();

export function charToCode(char: string): string | undefined {
  const lower = char.toLowerCase();
  for (const row of ROWS) {
    for (const key of row) {
      if (key.lower === lower) return key.code;
    }
  }
  if (char === ' ') return 'Space';
  return undefined;
}
