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
import WritingPage from "./components/WritingPage";
import ListeningPage from "./components/ListeningPage";
import SupportBubble from "./components/SupportBubble";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

type AppState = "login" | "selection" | "quiz" | "writing" | "listening";
type ExerciseType = "word-meaning" | "reverse-word-meaning" | "writing" | "listening";

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
    if (type === "writing") {
      setCurrentState("writing");
    } else if (type === "listening") {
      setCurrentState("listening");
    } else {
      setCurrentState("quiz");
    }
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
        return <QuizPage onBack={handleBackToSelection} exerciseType={exerciseType as "word-meaning" | "reverse-word-meaning"} />;
      case "writing":
        return <WritingPage onBack={handleBackToSelection} />;
      case "listening":
        return <ListeningPage onBack={handleBackToSelection} />;
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
          {currentState === "login" ? (
            // Login page without sidebar
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1">
                <LoginPage onLogin={handleLogin} />
              </div>
              <SupportBubble />
            </div>
          ) : (
            // Main app with sidebar
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar username={currentUser} />
                <SidebarInset>
                  <Header />
                  <div className="flex-1 p-4">
                    <div className="mb-4">
                      <SidebarTrigger className="mb-4" />
                    </div>
                    {renderCurrentPage()}
                  </div>
                </SidebarInset>
                <SupportBubble />
              </div>
            </SidebarProvider>
          )}
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
