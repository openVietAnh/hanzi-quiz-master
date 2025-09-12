import { User, BarChart3, Trophy, Quote, Settings } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  username: string;
}

const chineseQuotes = [
  {
    zh: "学而时习之，不亦说乎？",
    en: "Is it not pleasant to learn with a constant perseverance?",
    vi: "Học mà thường xuyên ôn tập, chẳng phải vui sao?",
    author: "Confucius"
  },
  {
    zh: "千里之行，始于足下。",
    en: "A journey of a thousand miles begins with a single step.",
    vi: "Hành trình ngàn dặm bắt đầu từ bước chân đầu tiên.",
    author: "Lao Tzu"
  },
  {
    zh: "三人行，必有我师焉。",
    en: "When three people walk together, there must be one who can be my teacher.",
    vi: "Ba người cùng đi, chắc chắn có người có thể làm thầy tôi.",
    author: "Confucius"
  },
  {
    zh: "知之者不如好之者，好之者不如乐之者。",
    en: "He who knows it is not as good as he who loves it; he who loves it is not as good as he who delights in it.",
    vi: "Người biết không bằng người yêu thích, người yêu thích không bằng người vui thích.",
    author: "Confucius"
  }
];

export function AppSidebar({ username }: AppSidebarProps) {
  const { language, t } = useLanguage();
  
  // Get a random quote
  const randomQuote = chineseQuotes[Math.floor(Math.random() * chineseQuotes.length)];
  const quoteText = randomQuote[language as keyof typeof randomQuote] || randomQuote.en;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sidebar-foreground">{username}</span>
            <span className="text-xs text-sidebar-foreground/70">{t('learner')}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BarChart3 className="h-4 w-4" />
                  <span>{t('dashboard')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Trophy className="h-4 w-4" />
                  <span>{t('leaderboard')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="h-4 w-4" />
                  <span>{t('profile')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>{t('settings')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <SidebarSeparator />
          <div className="text-center">
            <Quote className="h-5 w-5 mx-auto mb-2 text-primary" />
            <blockquote className="text-xs text-sidebar-foreground/80 italic leading-relaxed">
              "{quoteText}"
            </blockquote>
            <cite className="text-xs text-sidebar-foreground/60 mt-1 block">
              — {randomQuote.author}
            </cite>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}