import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Check, Timer, Award } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getRandomCharacter, WritingCharacter } from "@/data/writingCharacters";
import { toast } from "sonner";

interface WritingPageProps {
  onBack: () => void;
}

const WritingPage = ({ onBack }: WritingPageProps) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<WritingCharacter | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per character
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(true);

  // Initialize character and canvas
  useEffect(() => {
    const character = getRandomCharacter();
    setCurrentCharacter(character);
    setupCanvas();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeLeft <= 0 || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft, isCompleted]);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Clear and setup grid
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw dotted grid (2x2 = 4 cells)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    // Outer border
    ctx.setLineDash([]);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isCompleted) return;
    
    setIsDrawing(true);
    const { x, y } = getCanvasCoordinates(e);
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1f2937';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isCompleted) return;

    const { x, y } = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setupCanvas();
  };

  const calculateScore = (): number => {
    // Simplified scoring system based on drawing complexity
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Count non-white pixels (drawn strokes)
    let drawnPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If pixel is not white
      if (r < 250 || g < 250 || b < 250) {
        drawnPixels++;
      }
    }

    // Base score calculation
    const minPixels = 100; // Minimum expected pixels for a character
    const maxPixels = 3000; // Maximum reasonable pixels
    
    if (drawnPixels < minPixels) {
      return Math.max(20, (drawnPixels / minPixels) * 60);
    }
    
    // Score based on reasonable stroke density
    const normalizedPixels = Math.min(drawnPixels, maxPixels);
    const baseScore = 60 + ((normalizedPixels - minPixels) / (maxPixels - minPixels)) * 30;
    
    // Add bonus for character difficulty
    const difficultyBonus = currentCharacter?.difficulty === 'hard' ? 10 : 
                           currentCharacter?.difficulty === 'medium' ? 5 : 0;
    
    return Math.min(100, Math.round(baseScore + difficultyBonus));
  };

  const handleSubmit = () => {
    if (isCompleted) return;
    
    setTimerActive(false);
    setIsCompleted(true);
    
    const finalScore = calculateScore();
    setScore(finalScore);
    
    if (finalScore >= 80) {
      toast.success(t('greatJob'));
    } else if (finalScore >= 60) {
      toast(t('goodWork'));
    } else {
      toast(t('keepPracticing'));
    }
  };

  const handleNextCharacter = () => {
    const character = getRandomCharacter();
    setCurrentCharacter(character);
    setTimeLeft(60);
    setIsCompleted(false);
    setScore(null);
    setTimerActive(true);
    setupCanvas();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  if (!currentCharacter) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4">
      <div className="max-w-6xl mx-auto">
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
          
          {/* Timer */}
          <div className="flex items-center gap-2">
            <Timer size={20} className={timeLeft <= 10 ? 'text-error' : 'text-muted-foreground'} />
            <span className={`text-lg font-mono ${timeLeft <= 10 ? 'text-error' : 'text-foreground'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Character Display Section */}
          <Card className="shadow-quiz bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="chinese-text">{t('characterToWrite')}</span>
                <Badge variant="outline" className="ml-2">
                  {currentCharacter.difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Large Character Display */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-white rounded-lg">
                    <span className="chinese-text text-8xl font-normal text-foreground">
                      {currentCharacter.character}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Character Info */}
              <div className="grid grid-cols-1 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">{t('pinyin')}</p>
                  <p className="text-lg font-medium">{currentCharacter.pinyin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('meaning')}</p>
                  <p className="text-lg font-medium">{currentCharacter.meaning}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('strokes')}</p>
                  <p className="text-lg font-medium">{currentCharacter.strokes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drawing Section */}
          <Card className="shadow-quiz bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl chinese-text">{t('writingArea')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Canvas */}
              <div className="flex justify-center">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-white shadow-inner"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{ width: '300px', height: '300px' }}
                  />
                  {isCompleted && score !== null && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Award className="w-12 h-12 mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score}/100
                        </div>
                        <p className="text-sm">{t('yourScore')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={clearCanvas}
                  disabled={isCompleted}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  {t('clear')}
                </Button>
                
                {!isCompleted ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-gradient-hero hover:opacity-90"
                  >
                    <Check size={16} />
                    {t('submit')}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextCharacter}
                    className="flex items-center gap-2 bg-gradient-hero hover:opacity-90"
                  >
                    {t('nextCharacter')}
                  </Button>
                )}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('timeRemaining')}</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <Progress value={(60 - timeLeft) / 60 * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;