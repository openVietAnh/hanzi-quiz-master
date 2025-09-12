export interface ChineseWord {
  id: number;
  character: string;
  pinyin: string;
  correctAnswer: string;
  options: string[];
  level: "beginner" | "intermediate" | "advanced";
}

export const chineseWords: ChineseWord[] = [
  {
    id: 1,
    character: "你好",
    pinyin: "nǐ hǎo",
    correctAnswer: "Hello",
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    level: "beginner"
  },
  {
    id: 2,
    character: "谢谢",
    pinyin: "xiè xie",
    correctAnswer: "Thank you",
    options: ["Hello", "Sorry", "Thank you", "Excuse me"],
    level: "beginner"
  },
  {
    id: 3,
    character: "再见",
    pinyin: "zài jiàn",
    correctAnswer: "Goodbye",
    options: ["Hello", "Goodbye", "See you later", "Good morning"],
    level: "beginner"
  },
  {
    id: 4,
    character: "水",
    pinyin: "shuǐ",
    correctAnswer: "Water",
    options: ["Fire", "Water", "Earth", "Air"],
    level: "beginner"
  },
  {
    id: 5,
    character: "吃",
    pinyin: "chī",
    correctAnswer: "To eat",
    options: ["To drink", "To eat", "To sleep", "To walk"],
    level: "beginner"
  },
  {
    id: 6,
    character: "学习",
    pinyin: "xué xí",
    correctAnswer: "To study",
    options: ["To teach", "To study", "To work", "To play"],
    level: "beginner"
  },
  {
    id: 7,
    character: "朋友",
    pinyin: "péng yǒu",
    correctAnswer: "Friend",
    options: ["Family", "Friend", "Teacher", "Student"],
    level: "beginner"
  },
  {
    id: 8,
    character: "家",
    pinyin: "jiā",
    correctAnswer: "Home",
    options: ["School", "Home", "Office", "Store"],
    level: "beginner"
  },
  {
    id: 9,
    character: "工作",
    pinyin: "gōng zuò",
    correctAnswer: "Work",
    options: ["Work", "Rest", "Play", "Sleep"],
    level: "intermediate"
  },
  {
    id: 10,
    character: "时间",
    pinyin: "shí jiān",
    correctAnswer: "Time",
    options: ["Space", "Time", "Place", "Person"],
    level: "intermediate"
  },
  {
    id: 11,
    character: "美丽",
    pinyin: "měi lì",
    correctAnswer: "Beautiful",
    options: ["Ugly", "Beautiful", "Big", "Small"],
    level: "intermediate"
  },
  {
    id: 12,
    character: "困难",
    pinyin: "kùn nán",
    correctAnswer: "Difficult",
    options: ["Easy", "Difficult", "Simple", "Complex"],
    level: "intermediate"
  },
  {
    id: 13,
    character: "重要",
    pinyin: "zhòng yào",
    correctAnswer: "Important",
    options: ["Unimportant", "Important", "Necessary", "Optional"],
    level: "intermediate"
  },
  {
    id: 14,
    character: "机会",
    pinyin: "jī huì",
    correctAnswer: "Opportunity",
    options: ["Problem", "Opportunity", "Challenge", "Solution"],
    level: "advanced"
  },
  {
    id: 15,
    character: "经验",
    pinyin: "jīng yàn",
    correctAnswer: "Experience",
    options: ["Knowledge", "Experience", "Skill", "Talent"],
    level: "advanced"
  }
];

// Shuffle array utility
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};