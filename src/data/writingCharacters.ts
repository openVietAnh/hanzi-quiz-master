export interface WritingCharacter {
  id: number;
  character: string;
  pinyin: string;
  meaning: string;
  strokes: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const writingCharacters: WritingCharacter[] = [
  // Easy characters (1-3 strokes)
  {
    id: 1,
    character: '一',
    pinyin: 'yī',
    meaning: 'one',
    strokes: 1,
    difficulty: 'easy'
  },
  {
    id: 2,
    character: '二',
    pinyin: 'èr',
    meaning: 'two',
    strokes: 2,
    difficulty: 'easy'
  },
  {
    id: 3,
    character: '三',
    pinyin: 'sān',
    meaning: 'three',
    strokes: 3,
    difficulty: 'easy'
  },
  {
    id: 4,
    character: '人',
    pinyin: 'rén',
    meaning: 'person',
    strokes: 2,
    difficulty: 'easy'
  },
  {
    id: 5,
    character: '大',
    pinyin: 'dà',
    meaning: 'big',
    strokes: 3,
    difficulty: 'easy'
  },
  {
    id: 6,
    character: '小',
    pinyin: 'xiǎo',
    meaning: 'small',
    strokes: 3,
    difficulty: 'easy'
  },
  {
    id: 7,
    character: '上',
    pinyin: 'shàng',
    meaning: 'up',
    strokes: 3,
    difficulty: 'easy'
  },
  {
    id: 8,
    character: '下',
    pinyin: 'xià',
    meaning: 'down',
    strokes: 3,
    difficulty: 'easy'
  },

  // Medium characters (4-8 strokes)
  {
    id: 9,
    character: '中',
    pinyin: 'zhōng',
    meaning: 'middle',
    strokes: 4,
    difficulty: 'medium'
  },
  {
    id: 10,
    character: '国',
    pinyin: 'guó',
    meaning: 'country',
    strokes: 8,
    difficulty: 'medium'
  },
  {
    id: 11,
    character: '学',
    pinyin: 'xué',
    meaning: 'study',
    strokes: 8,
    difficulty: 'medium'
  },
  {
    id: 12,
    character: '生',
    pinyin: 'shēng',
    meaning: 'life',
    strokes: 5,
    difficulty: 'medium'
  },
  {
    id: 13,
    character: '好',
    pinyin: 'hǎo',
    meaning: 'good',
    strokes: 6,
    difficulty: 'medium'
  },
  {
    id: 14,
    character: '水',
    pinyin: 'shuǐ',
    meaning: 'water',
    strokes: 4,
    difficulty: 'medium'
  },
  {
    id: 15,
    character: '火',
    pinyin: 'huǒ',
    meaning: 'fire',
    strokes: 4,
    difficulty: 'medium'
  },
  {
    id: 16,
    character: '木',
    pinyin: 'mù',
    meaning: 'wood',
    strokes: 4,
    difficulty: 'medium'
  },

  // Hard characters (9+ strokes)
  {
    id: 17,
    character: '爱',
    pinyin: 'ài',
    meaning: 'love',
    strokes: 10,
    difficulty: 'hard'
  },
  {
    id: 18,
    character: '朋',
    pinyin: 'péng',
    meaning: 'friend',
    strokes: 8,
    difficulty: 'hard'
  },
  {
    id: 19,
    character: '书',
    pinyin: 'shū',
    meaning: 'book',
    strokes: 4,
    difficulty: 'medium'
  },
  {
    id: 20,
    character: '家',
    pinyin: 'jiā',
    meaning: 'home',
    strokes: 10,
    difficulty: 'hard'
  }
];

export const getRandomCharacter = (): WritingCharacter => {
  const randomIndex = Math.floor(Math.random() * writingCharacters.length);
  return writingCharacters[randomIndex];
};

export const getCharactersByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): WritingCharacter[] => {
  return writingCharacters.filter(char => char.difficulty === difficulty);
};