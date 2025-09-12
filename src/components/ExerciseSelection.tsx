import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, BookOpen, LogOut } from "lucide-react";

interface ExerciseSelectionProps {
  username: string;
  onStartQuiz: () => void;
  onLogout: () => void;
}

const ExerciseSelection = ({ username, onStartQuiz, onLogout }: ExerciseSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold chinese-text bg-gradient-hero bg-clip-text text-transparent">
              Exercise Selection
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Welcome back, <span className="font-semibold text-primary">{username}</span>
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-smooth"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </header>

        {/* Exercise Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Main Exercise - Word Meaning */}
          <Card className="shadow-quiz bg-gradient-card border-0 hover:shadow-lg transition-smooth animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <BookOpen className="text-primary-foreground" size={24} />
                </div>
                <Badge className="bg-success text-success-foreground">Available</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text">Word Meaning</CardTitle>
              <CardDescription className="text-base">
                Choose the correct meaning of Chinese words
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} />
                  <span>Timed Exercise</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target size={16} />
                  <span>Real-time Statistics</span>
                </div>
                <Button 
                  onClick={onStartQuiz}
                  className="w-full bg-gradient-hero hover:opacity-90 transition-smooth shadow-button"
                >
                  Start Exercise
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon Exercises */}
          <Card className="shadow-card bg-gradient-card border-0 opacity-60 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <span className="chinese-text text-muted-foreground text-xl">听</span>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text text-muted-foreground">Listening Exercise</CardTitle>
              <CardDescription>
                Listen to audio and choose the correct answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card border-0 opacity-60 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <span className="chinese-text text-muted-foreground text-xl">写</span>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardTitle className="text-2xl chinese-text text-muted-foreground">Writing Exercise</CardTitle>
              <CardDescription>
                Practice Chinese character stroke order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-bold mb-6 chinese-text">Learning Progress</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-success text-success-foreground border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm opacity-90">Exercises Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">0%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Learning Days</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Words Mastered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelection;