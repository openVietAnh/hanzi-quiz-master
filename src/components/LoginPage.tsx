import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useLanguage();

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
        title: t('loginSuccessful'),
        description: t('welcome', { username }),
      });
      onLogin(username);
    } else {
      toast({
        title: t('loginFailed'),
        description: t('invalidCredentials'),
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-background to-accent/20 p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
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
              {t('loginTitle')}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              {t('loginSubtitle')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">{t('username')}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('enterUsername')}
                  required
                  className="h-12 text-lg transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  required
                  className="h-12 text-lg transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-hero hover:opacity-90 transition-smooth shadow-button animate-slide-up"
                disabled={isLoading}
              >
                {isLoading ? t('loggingIn') : t('login')}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-accent/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">{t('testAccounts')}</p>
              <div className="space-y-1 text-sm">
                <div>{t('username')}: student1, {t('password')}: password1</div>
                <div>{t('username')}: student2, {t('password')}: password2</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;