import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-chinese-learning.jpg";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

// Pre-configured users
const validUsers = [
  { username: "student1", password: "password1" },
  { username: "student2", password: "password2" }
];

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = validUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      toast({
        title: "Login Successful!",
        description: `Welcome, ${username}!`,
      });
      onLogin(username);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/20 p-4">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <Card className="shadow-quiz bg-gradient-card border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center animate-bounce-in">
              <span className="text-2xl chinese-text text-primary-foreground">学</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Chinese Learning
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Welcome to the Chinese Learning Platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="h-12 text-lg transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="h-12 text-lg transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-hero hover:opacity-90 transition-smooth shadow-button animate-slide-up"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-accent/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Test Accounts:</p>
              <div className="space-y-1 text-sm">
                <div>Username: student1, Password: password1</div>
                <div>Username: student2, Password: password2</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;