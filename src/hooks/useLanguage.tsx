import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'vi' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // App
    appTitle: "Chinese Learning",
    
    // Login Page
    loginTitle: "Chinese Learning",
    loginSubtitle: "Welcome to the Chinese Learning Platform",
    username: "Username",
    enterUsername: "Enter username",
    password: "Password",
    enterPassword: "Enter password",
    login: "Login",
    loggingIn: "Logging in...",
    testAccounts: "Test Accounts:",
    loginSuccessful: "Login Successful!",
    welcome: "Welcome, {{username}}!",
    loginFailed: "Login Failed",
    invalidCredentials: "Invalid username or password",
    
    // Exercise Selection
    exerciseSelection: "Exercise Selection",
    welcomeBack: "Welcome back, {{username}}",
    logout: "Logout",
    wordMeaning: "Word Meaning",
    wordMeaningDesc: "Choose the correct meaning of Chinese words",
    reverseWordMeaning: "Reverse Word Meaning", 
    reverseWordMeaningDesc: "Choose the correct Chinese translation of English words",
    selectEnglishMeaning: "Choose the correct English meaning:",
    selectChineseTranslation: "Choose the correct Chinese translation:",
    available: "Available",
    timedExercise: "Timed Exercise",
    realtimeStats: "Real-time Statistics",
    startExercise: "Start Exercise",
    comingSoon: "Coming Soon",
    listeningExercise: "Listening Exercise",
    listeningDesc: "Listen to audio and choose the correct answer",
    writingExercise: "Writing Exercise",
    writingDesc: "Practice Chinese character stroke order",
    learningProgress: "Learning Progress",
    exercisesCompleted: "Exercises Completed",
    accuracyRate: "Accuracy Rate",
    learningDays: "Learning Days",
    wordsMastered: "Words Mastered",
    
    // Quiz Page
    back: "Back",
    questionProgress: "Question {{current}} / {{total}}",
    percentComplete: "{{percent}}% Complete",
    chooseCorrectMeaning: "Choose the correct meaning",
    incorrect: "Incorrect",
    correctAnswerIs: "Correct answer is: {{answer}}",
    nextQuestionIn: "Next question in {{seconds}} seconds",
    statistics: "Statistics",
    completed: "Completed",
    correct: "Correct",
    accuracy: "Accuracy",
    timeLeft: "Time Left",
    exerciseComplete: "Exercise Complete!",
    questionsCompleted: "Questions Completed:",
    correctAnswers: "Correct Answers:",
    tryAgain: "Try Again",
    backToSelection: "Back to Selection",
    timeUp: "Time's up!",
    quizSummary: "You completed {{total}} questions, {{correct}} correct",
    correctFeedback: "Correct!",
    greatJob: "Great job!",
    incorrectFeedback: "The correct answer is: {{answer}}",
    
    // Sidebar
    learner: "Learner",
    navigation: "Navigation",
    dashboard: "Dashboard",
    leaderboard: "Leaderboard", 
    profile: "Profile",
    settings: "Settings",
    
    // Writing Exercise
    characterToWrite: "Character to Write",
    pinyin: "Pinyin",
    meaning: "Meaning",
    strokes: "Strokes",
    writingArea: "Writing Area",
    clear: "Clear",
    submit: "Submit",
    nextCharacter: "Next Character",
    timeRemaining: "Time Remaining",
    yourScore: "Your Score",
    goodWork: "Good work!",
    keepPracticing: "Keep practicing!",
    
    // Listening Exercise
    listenAndChoose: "Listen and Choose",
    clickToPlay: "Click the speaker to play audio",
    selectCorrectCharacter: "Select the correct character you heard",
    playAudioFirst: "Play the audio first before selecting",
    chooseCorrectCharacter: "Choose the Correct Character",
    playing: "Playing",
    audioError: "Audio playback error",
    audioNotSupported: "Audio not supported",
    nextQuestion: "Next Question",
    finalScore: "Final Score",
    score: "Score",
  },
  
  vi: {
    // App
    appTitle: "Học Tiếng Trung",
    
    // Login Page
    loginTitle: "Học Tiếng Trung",
    loginSubtitle: "Chào mừng đến với nền tảng học tiếng Trung",
    username: "Tên đăng nhập",
    enterUsername: "Nhập tên đăng nhập",
    password: "Mật khẩu",
    enterPassword: "Nhập mật khẩu",
    login: "Đăng nhập",
    loggingIn: "Đang đăng nhập...",
    testAccounts: "Tài khoản thử nghiệm:",
    loginSuccessful: "Đăng nhập thành công!",
    welcome: "Chào mừng, {{username}}!",
    loginFailed: "Đăng nhập thất bại",
    invalidCredentials: "Tên đăng nhập hoặc mật khẩu không hợp lệ",
    
    // Exercise Selection
    exerciseSelection: "Chọn bài tập",
    welcomeBack: "Chào mừng trở lại, {{username}}",
    logout: "Đăng xuất",
    wordMeaning: "Nghĩa từ",
    wordMeaningDesc: "Chọn nghĩa đúng của từ tiếng Trung",
    reverseWordMeaning: "Nghĩa từ ngược",
    reverseWordMeaningDesc: "Chọn bản dịch tiếng Trung đúng của từ tiếng Anh",
    selectEnglishMeaning: "Chọn nghĩa tiếng Anh đúng:",
    selectChineseTranslation: "Chọn bản dịch tiếng Trung đúng:",
    available: "Có sẵn",
    timedExercise: "Bài tập có thời gian",
    realtimeStats: "Thống kê thời gian thực",
    startExercise: "Bắt đầu bài tập",
    comingSoon: "Sắp có",
    listeningExercise: "Bài tập nghe",
    listeningDesc: "Nghe âm thanh và chọn câu trả lời đúng",
    writingExercise: "Bài tập viết",
    writingDesc: "Luyện tập thứ tự nét chữ Hán",
    learningProgress: "Tiến độ học tập",
    exercisesCompleted: "Bài tập đã hoàn thành",
    accuracyRate: "Tỷ lệ chính xác",
    learningDays: "Ngày học tập",
    wordsMastered: "Từ đã thành thạo",
    
    // Quiz Page
    back: "Quay lại",
    questionProgress: "Câu hỏi {{current}} / {{total}}",
    percentComplete: "{{percent}}% hoàn thành",
    chooseCorrectMeaning: "Chọn nghĩa đúng",
    incorrect: "Sai",
    correctAnswerIs: "Câu trả lời đúng là: {{answer}}",
    nextQuestionIn: "Câu hỏi tiếp theo sau {{seconds}} giây",
    statistics: "Thống kê",
    completed: "Đã hoàn thành",
    correct: "Đúng",
    accuracy: "Độ chính xác",
    timeLeft: "Thời gian còn lại",
    exerciseComplete: "Hoàn thành bài tập!",
    questionsCompleted: "Câu hỏi đã hoàn thành:",
    correctAnswers: "Câu trả lời đúng:",
    tryAgain: "Thử lại",
    backToSelection: "Quay lại chọn bài tập",
    timeUp: "Hết giờ!",
    quizSummary: "Bạn đã hoàn thành {{total}} câu hỏi, {{correct}} câu đúng",
    correctFeedback: "Đúng!",
    greatJob: "Làm tốt lắm!",
    incorrectFeedback: "Câu trả lời đúng là: {{answer}}",
    
    // Sidebar
    learner: "Người học",
    navigation: "Điều hướng",
    dashboard: "Bảng điều khiển",
    leaderboard: "Bảng xếp hạng",
    profile: "Hồ sơ",
    settings: "Cài đặt",
    
    // Writing Exercise
    characterToWrite: "Chữ cần viết",
    pinyin: "Pinyin",
    meaning: "Nghĩa",
    strokes: "Nét",
    writingArea: "Khu vực viết",
    clear: "Xóa",
    submit: "Nộp bài",
    nextCharacter: "Chữ tiếp theo",
    timeRemaining: "Thời gian còn lại",
    yourScore: "Điểm của bạn",
    goodWork: "Làm tốt!",
    keepPracticing: "Tiếp tục luyện tập!",
    
    // Listening Exercise
    listenAndChoose: "Nghe và Chọn",
    clickToPlay: "Nhấp vào loa để phát âm thanh",
    selectCorrectCharacter: "Chọn ký tự đúng mà bạn đã nghe",
    playAudioFirst: "Phát âm thanh trước khi chọn",
    chooseCorrectCharacter: "Chọn Ký Tự Đúng",
    playing: "Đang phát",
    audioError: "Lỗi phát âm thanh",
    audioNotSupported: "Âm thanh không được hỗ trợ",
    nextQuestion: "Câu hỏi tiếp theo",
    finalScore: "Điểm cuối cùng",
    score: "Điểm",
  },
  
  zh: {
    // App
    appTitle: "中文学习",
    
    // Login Page
    loginTitle: "中文学习",
    loginSubtitle: "欢迎来到中文学习平台",
    username: "用户名",
    enterUsername: "输入用户名",
    password: "密码",
    enterPassword: "输入密码",
    login: "登录",
    loggingIn: "登录中...",
    testAccounts: "测试账号：",
    loginSuccessful: "登录成功！",
    welcome: "欢迎，{{username}}！",
    loginFailed: "登录失败",
    invalidCredentials: "用户名或密码无效",
    
    // Exercise Selection
    exerciseSelection: "练习选择",
    welcomeBack: "欢迎回来，{{username}}",
    logout: "登出",
    wordMeaning: "词汇含义",
    wordMeaningDesc: "选择中文词汇的正确含义",
    reverseWordMeaning: "反向词汇含义",
    reverseWordMeaningDesc: "选择英文单词的正确中文翻译",
    selectEnglishMeaning: "选择正确的英文含义：",
    selectChineseTranslation: "选择正确的中文翻译：",
    available: "可用",
    timedExercise: "限时练习",
    realtimeStats: "实时统计",
    startExercise: "开始练习",
    comingSoon: "即将推出",
    listeningExercise: "听力练习",
    listeningDesc: "听音频并选择正确答案",
    writingExercise: "写字练习",
    writingDesc: "练习汉字笔顺",
    learningProgress: "学习进度",
    exercisesCompleted: "已完成练习",
    accuracyRate: "准确率",
    learningDays: "学习天数",
    wordsMastered: "掌握词汇",
    
    // Quiz Page
    back: "返回",
    questionProgress: "题目 {{current}} / {{total}}",
    percentComplete: "{{percent}}% 完成",
    chooseCorrectMeaning: "选择正确含义",
    incorrect: "错误",
    correctAnswerIs: "正确答案是：{{answer}}",
    nextQuestionIn: "{{seconds}} 秒后下一题",
    statistics: "统计",
    completed: "已完成",
    correct: "正确",
    accuracy: "准确率",
    timeLeft: "剩余时间",
    exerciseComplete: "练习完成！",
    questionsCompleted: "完成题目：",
    correctAnswers: "正确答案：",
    tryAgain: "再试一次",
    backToSelection: "返回选择",
    timeUp: "时间到！",
    quizSummary: "您完成了 {{total}} 道题目，{{correct}} 道正确",
    correctFeedback: "正确！",
    greatJob: "做得很好！",
    incorrectFeedback: "正确答案是：{{answer}}",
    
    // Sidebar
    learner: "学习者",
    navigation: "导航",
    dashboard: "仪表板",
    leaderboard: "排行榜",
    profile: "个人资料",
    settings: "设置",
    
    // Writing Exercise
    characterToWrite: "要写的字符",
    pinyin: "拼音",
    meaning: "含义",
    strokes: "笔画",
    writingArea: "书写区域",
    clear: "清除",
    submit: "提交",
    nextCharacter: "下一个字符",
    timeRemaining: "剩余时间",
    yourScore: "你的分数",
    goodWork: "做得好！",
    keepPracticing: "继续练习！",
    
    // Listening Exercise
    listenAndChoose: "听并选择",
    clickToPlay: "点击扬声器播放音频",
    selectCorrectCharacter: "选择你听到的正确字符",
    playAudioFirst: "先播放音频再选择",
    chooseCorrectCharacter: "选择正确的字符",
    playing: "播放中",
    audioError: "音频播放错误",
    audioNotSupported: "不支持音频",
    nextQuestion: "下一题",
    finalScore: "最终得分",
    score: "得分",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'vi', 'zh'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};