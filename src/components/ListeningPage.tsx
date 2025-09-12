import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Volume2, Play, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { chineseWords, shuffleArray, type ChineseWord } from "@/data/chineseWords";
import { toast } from "sonner";

interface ListeningPageProps {
  onBack: () => void;
}

const ListeningPage = ({ onBack }: ListeningPageProps) => {
  const { t } = useLanguage();
  const [currentWord, setCurrentWord] = useState<ChineseWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  
  const totalQuestions = 10;

  // Initialize first question
  useEffect(() => {
    generateNewQuestion();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer]);

  const generateNewQuestion = useCallback(() => {
    const randomWord = chineseWords[Math.floor(Math.random() * chineseWords.length)];
    const otherWords = chineseWords.filter(w => w.id !== randomWord.id);
    const shuffledOthers = shuffleArray(otherWords).slice(0, 3);
    const allOptions = shuffleArray([randomWord, ...shuffledOthers]);

    setCurrentWord(randomWord);
    setOptions(allOptions.map(w => w.character));
    setSelectedAnswer("");
    setShowAnswer(false);
    setIsCorrect(null);
    setTimeLeft(30);
    setHasPlayedAudio(false);
  }, []);

  const playAudio = useCallback(async () => {
    if (!currentWord || isPlaying) return;

    try {
      setIsPlaying(true);
      setHasPlayedAudio(true);
      
      // Note: This requires ElevenLabs API key to be configured
      // For now, we'll use the Web Speech API as a fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentWord.character);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          toast.error(t('audioError'));
        };

        // Cancel any ongoing speech
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      } else {
        toast.error(t('audioNotSupported'));
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      toast.error(t('audioError'));
      setIsPlaying(false);
    }
  }, [currentWord, isPlaying, t]);

  const handleSubmit = (answer: string) => {
    if (showAnswer) return;

    const correct = answer === currentWord?.character;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      setScore(prev => prev + 1);
      toast.success(t('correctFeedback'));
    } else {
      toast.error(t('incorrectFeedback', { answer: currentWord?.character || '' }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= totalQuestions) {
      // Quiz completed
      toast.success(t('exerciseComplete'));
      const finalScore = Math.round((score / totalQuestions) * 100);
      toast(`${t('finalScore')}: ${finalScore}%`);
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    generateNewQuestion();
  };

  const handleRestart = () => {
    setCurrentQuestion(1);
    setScore(0);
    generateNewQuestion();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentWord) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              {t('questionProgress', { current: currentQuestion, total: totalQuestions })}
            </Badge>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-mono ${timeLeft <= 10 ? 'text-error' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </header>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Audio Section */}
          <Card className="shadow-quiz bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl chinese-text text-center">
                {t('listenAndChoose')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Controls */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-40 h-40 border-4 border-primary rounded-full flex items-center justify-center bg-gradient-hero">
                    <Volume2 className="w-16 h-16 text-primary-foreground" />
                  </div>
                  
                  {/* Play Button Overlay */}
                  <Button
                    size="lg"
                    onClick={playAudio}
                    disabled={isPlaying}
                    className="absolute inset-0 w-full h-full rounded-full bg-black/20 hover:bg-black/30 border-0"
                  >
                    <Play 
                      className={`w-8 h-8 text-white ${isPlaying ? 'animate-pulse' : ''}`} 
                      fill="white"
                    />
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">
                  {t('clickToPlay')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {hasPlayedAudio ? t('selectCorrectCharacter') : t('playAudioFirst')}
                </p>
              </div>

              {/* Audio Status */}
              {isPlaying && (
                <div className="text-center">
                  <Badge className="bg-primary text-primary-foreground">
                    {t('playing')}...
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Options Section */}
          <Card className="shadow-quiz bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl chinese-text">
                {t('chooseCorrectCharacter')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === currentWord.character;
                  
                  let buttonClass = "h-20 text-3xl chinese-text font-normal transition-all";
                  
                  if (showAnswer) {
                    if (isCorrectOption) {
                      buttonClass += " bg-success text-success-foreground";
                    } else if (isSelected && !isCorrectOption) {
                      buttonClass += " bg-error text-error-foreground";
                    } else {
                      buttonClass += " opacity-50";
                    }
                  } else if (isSelected) {
                    buttonClass += " bg-primary text-primary-foreground";
                  } else {
                    buttonClass += " hover:bg-primary/10";
                  }

                  return (
                    <Button
                      key={index}
                      variant={showAnswer ? "default" : "outline"}
                      className={buttonClass}
                      onClick={() => handleSubmit(option)}
                      disabled={showAnswer || !hasPlayedAudio}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {showAnswer && isCorrectOption && <CheckCircle size={20} />}
                        {showAnswer && isSelected && !isCorrectOption && <XCircle size={20} />}
                        <span>{option}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>

              {/* Answer feedback */}
              {showAnswer && (
                <div className="text-center space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <p className="text-lg">
                      <span className="chinese-text font-bold text-2xl">{currentWord.character}</span>
                      <span className="mx-2">({currentWord.pinyin})</span>
                    </p>
                    <p className="text-muted-foreground">{currentWord.correctAnswer}</p>
                  </div>
                  
                  {currentQuestion < totalQuestions ? (
                    <Button 
                      onClick={handleNextQuestion}
                      className="bg-gradient-hero hover:opacity-90"
                    >
                      {t('nextQuestion')}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-bold">
                        {t('finalScore')}: {Math.round((score / totalQuestions) * 100)}%
                      </p>
                      <Button 
                        onClick={handleRestart}
                        className="bg-gradient-hero hover:opacity-90 flex items-center gap-2"
                      >
                        <RotateCcw size={16} />
                        {t('tryAgain')}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Score Display */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {t('score')}: {score}/{totalQuestions}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;