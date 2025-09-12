import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, BookOpen, LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ExerciseSelectionProps {
  username: string;
  onStartQuiz: (type: "word-meaning" | "reverse-word-meaning" | "writing" | "listening") => void;
  onLogout: () => void;
}

const ExerciseSelection = ({ username, onStartQuiz, onLogout }: ExerciseSelectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-background to-accent/20 p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold chinese-text bg-gradient-hero bg-clip-text text-transparent">
              {t('exerciseSelection')}
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              {t('welcomeBack', { username })}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-smooth"
          >
            <LogOut size={18} />
            {t('logout')}
          </Button>
        </header>

        {/* Exercise Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2">
          {/* Main Exercise - Word Meaning */}
          <Card className="shadow-quiz bg-gradient-card border-0 hover:shadow-lg transition-smooth animate-slide-up h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <BookOpen className="text-primary-foreground" size={24} />
                </div>
                <Badge className="bg-success text-success-foreground">{t('available')}</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text">{t('wordMeaning')}</CardTitle>
              <CardDescription className="text-base">
                {t('wordMeaningDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span>{t('timedExercise')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target size={16} />
                  <span>{t('realtimeStats')}</span>
                </div>
              </div>
              <Button 
                onClick={() => onStartQuiz("word-meaning")}
                className="w-full bg-gradient-hero hover:opacity-90 transition-smooth shadow-button mt-4"
              >
                {t('startExercise')}
              </Button>
            </CardContent>
          </Card>

          {/* Reverse Word Meaning Exercise */}
          <Card className="shadow-quiz bg-gradient-card border-0 hover:shadow-lg transition-smooth animate-slide-up h-full flex flex-col" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <BookOpen className="text-primary-foreground" size={24} />
                </div>
                <Badge className="bg-success text-success-foreground">{t('available')}</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text">{t('reverseWordMeaning')}</CardTitle>
              <CardDescription className="text-base">
                {t('reverseWordMeaningDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span>{t('timedExercise')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target size={16} />
                  <span>{t('realtimeStats')}</span>
                </div>
              </div>
              <Button 
                onClick={() => onStartQuiz("reverse-word-meaning")}
                className="w-full bg-gradient-hero hover:opacity-90 transition-smooth shadow-button mt-4"
              >
                {t('startExercise')}
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Exercises */}
          <Card className="shadow-quiz bg-gradient-card border-0 hover:shadow-lg transition-smooth animate-slide-up h-full flex flex-col" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <span className="chinese-text text-primary-foreground text-xl">听</span>
                </div>
                <Badge className="bg-success text-success-foreground">{t('available')}</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text">{t('listeningExercise')}</CardTitle>
              <CardDescription>
                {t('listeningDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <Button 
                onClick={() => onStartQuiz("listening")}
                className="w-full bg-gradient-hero hover:opacity-90 transition-smooth shadow-button"
              >
                {t('startExercise')}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card border-0 hover:shadow-lg transition-smooth animate-slide-up h-full flex flex-col" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <span className="chinese-text text-primary-foreground text-xl">写</span>
                </div>
                <Badge className="bg-success text-success-foreground">{t('available')}</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text">{t('writingExercise')}</CardTitle>
              <CardDescription>
                {t('writingDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <Button 
                onClick={() => onStartQuiz("writing")}
                className="w-full bg-gradient-hero hover:opacity-90 transition-smooth shadow-button"
              >
                {t('startExercise')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-bold mb-6 chinese-text">{t('learningProgress')}</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-success text-success-foreground border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm opacity-90">{t('exercisesCompleted')}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">0%</div>
                <div className="text-sm text-muted-foreground">{t('accuracyRate')}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">{t('learningDays')}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">{t('wordsMastered')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelection;