import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/hooks/useLanguage";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import ExerciseSelection from "./components/ExerciseSelection";
import QuizPage from "./components/QuizPage";
import SupportBubble from "./components/SupportBubble";

type AppState = "login" | "selection" | "quiz";
type ExerciseType = "word-meaning" | "reverse-word-meaning";

const queryClient = new QueryClient();

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>("login");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [exerciseType, setExerciseType] = useState<ExerciseType>("word-meaning");

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setCurrentState("selection");
  };

  const handleLogout = () => {
    setCurrentUser("");
    setCurrentState("login");
  };

  const handleStartQuiz = (type: ExerciseType) => {
    setExerciseType(type);
    setCurrentState("quiz");
  };

  const handleBackToSelection = () => {
    setCurrentState("selection");
  };

  const renderCurrentPage = () => {
    switch (currentState) {
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "selection":
        return (
          <ExerciseSelection
            username={currentUser}
            onStartQuiz={handleStartQuiz}
            onLogout={handleLogout}
          />
        );
      case "quiz":
        return <QuizPage onBack={handleBackToSelection} exerciseType={exerciseType} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
              {renderCurrentPage()}
            </div>
            <SupportBubble />
          </div>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
