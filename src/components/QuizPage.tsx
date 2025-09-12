import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Timer, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { chineseWords, shuffleArray, type ChineseWord } from "@/data/chineseWords";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

interface QuizPageProps {
  onBack: () => void;
}

const QuizPage = ({ onBack }: QuizPageProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<ChineseWord[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Initialize quiz
  const initializeQuiz = useCallback(() => {
    const shuffledQuestions = shuffleArray(chineseWords).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setTimeLeft(60);
    setIsQuizFinished(false);
    setIsAnswered(false);
    setSelectedAnswer("");
    setIsCorrect(null);
    setCountdown(null);
  }, []);

  // Start quiz on mount
  useEffect(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isQuizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isQuizFinished) {
      setIsQuizFinished(true);
      toast({
        title: t('timeUp'),
        description: t('quizSummary', { total: totalQuestions, correct: correctAnswers }),
      });
    }
  }, [timeLeft, isQuizFinished, totalQuestions, correctAnswers, toast]);

  // Countdown after answer
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      nextQuestion();
    }
  }, [countdown]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    setTotalQuestions(prev => prev + 1);

    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: t('correctFeedback'),
        description: t('greatJob'),
      });
    } else {
      toast({
        title: t('incorrect'),
        description: t('incorrectFeedback', { answer: currentQuestion.correctAnswer }),
        variant: "destructive",
      });
    }

    // Start countdown for next question
    setCountdown(3);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer("");
      setIsCorrect(null);
    } else {
      // Quiz finished
      setIsQuizFinished(true);
      toast({
        title: t('exerciseComplete'),
        description: t('quizSummary', { total: totalQuestions, correct: correctAnswers }),
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isQuizFinished) {
    return (
      <div className="bg-gradient-to-br from-background to-accent/20 p-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Card className="shadow-quiz bg-gradient-card border-0 max-w-lg w-full animate-bounce-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-success-foreground" size={32} />
            </div>
            <CardTitle className="text-3xl chinese-text">{t('exerciseComplete')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-accent/50 rounded-lg">
                <span>{t('questionsCompleted')}</span>
                <span className="font-bold text-primary">{totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/50 rounded-lg">
                <span>{t('correctAnswers')}</span>
                <span className="font-bold text-success">{correctAnswers}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/50 rounded-lg">
                <span>{t('accuracyRate')}</span>
                <span className="font-bold text-primary">{accuracy}%</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={initializeQuiz} className="flex-1 bg-gradient-hero hover:opacity-90">
                <RotateCcw className="mr-2" size={18} />
                {t('tryAgain')}
              </Button>
              <Button onClick={onBack} variant="outline" className="flex-1">
                {t('backToSelection')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-background to-accent/20 p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 animate-fade-in">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <ArrowLeft size={18} />
            {t('back')}
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Timer className="mr-2" size={16} />
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Quiz Area */}
          <div className="lg:col-span-3">
            {/* Progress */}
            <div className="mb-6 animate-slide-up">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {t('questionProgress', { current: currentQuestionIndex + 1, total: questions.length })}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t('percentComplete', { percent: Math.round(progress) })}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="shadow-quiz bg-gradient-card border-0 animate-bounce-in">
              <CardHeader className="text-center">
                <CardTitle className="text-sm text-muted-foreground mb-4">
                  {t('chooseCorrectMeaning')}
                </CardTitle>
                <div className="space-y-2">
                  <div className="text-6xl chinese-text font-bold text-primary mb-2">
                    {currentQuestion.character}
                  </div>
                  <div className="text-xl text-muted-foreground">
                    {currentQuestion.pinyin}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        isAnswered
                          ? option === currentQuestion.correctAnswer
                            ? "default"
                            : option === selectedAnswer
                            ? "destructive"
                            : "secondary"
                          : "outline"
                      }
                      className={`h-16 text-lg transition-smooth ${
                        !isAnswered ? "hover:bg-primary hover:text-primary-foreground" : ""
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={isAnswered}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Feedback */}
                {isAnswered && (
                  <div className="mt-6 p-4 rounded-lg animate-bounce-in">
                    {isCorrect ? (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle size={24} />
                        <span className="text-lg font-medium">正确！</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-error">
                          <XCircle size={24} />
                          <span className="text-lg font-medium">{t('incorrect')}</span>
                        </div>
                        <p className="text-muted-foreground">
                          {t('correctAnswerIs', { answer: currentQuestion.correctAnswer })}
                        </p>
                      </div>
                    )}
                    
                    {countdown && (
                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        {t('nextQuestionIn', { seconds: countdown })}
                      </p>
                    </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card bg-gradient-card border-0 sticky top-6 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-xl chinese-text">{t('statistics')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">{t('completed')}</div>
                </div>
                
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">{t('correct')}</div>
                </div>
                
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{accuracy}%</div>
                  <div className="text-sm text-muted-foreground">{t('accuracy')}</div>
                </div>

                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-muted-foreground">{t('timeLeft')}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;