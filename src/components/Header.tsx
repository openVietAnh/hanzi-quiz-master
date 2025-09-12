import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, type Language } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const languageOptions: { value: Language; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  return (
    <header className="w-full bg-gradient-card border-b border-border p-4 shadow-card">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
            <span className="text-lg chinese-text text-primary-foreground font-bold">学</span>
          </div>
          <h1 className="text-2xl font-bold chinese-text bg-gradient-hero bg-clip-text text-transparent">
            {t('appTitle')}
          </h1>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="text-muted-foreground" size={18} />
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="w-36 bg-background border border-border hover:bg-accent transition-smooth">
              <SelectValue placeholder="Language">
                <div className="flex items-center gap-2">
                  <span>{languageOptions.find(opt => opt.value === language)?.flag}</span>
                  <span>{languageOptions.find(opt => opt.value === language)?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-lg z-50" position="popper">
              {languageOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="hover:bg-accent focus:bg-accent cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{option.flag}</span>
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Header;