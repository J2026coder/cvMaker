import { useEffect, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Library,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tabs } from "@/store/ui";
import type { Profile } from "@shared/profile.interface";
import { IconLayoutBoard } from "@tabler/icons-react";

interface LeftMenuProps {
  selectedTab: Tabs;
  onSelectTab: (tab: Tabs) => void;
  profile?: Profile;
  onLogout?: () => void;
}

interface MenuItem {
  label: string;
  value: Tabs;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
}

const PROFILE_ITEMS: MenuItem[] = [
  { label: "个人信息", value: Tabs.PERSONAL, icon: UserRound },
  { label: "教育经历", value: Tabs.EDUCATION, icon: BookOpenCheck },
  { label: "工作经历", value: Tabs.EXPERIENCE, icon: BriefcaseBusiness },
  { label: "项目经历", value: Tabs.PROJECTS, icon: FolderKanban },
  { label: "技能标签", value: Tabs.SKILLS, icon: Sparkles },
];

const QUOTES = [
  {
    quote: "先把简历写清楚，再去想怎么写得漂亮。",
    writer: "求职舱",
  },
  {
    quote: "机会不会敲门，它只在你去砸门的时候出现。",
    writer: "凯尔·钱德勒",
  },
  {
    quote: "凡事看似不可能，直到你把它做完。",
    writer: "纳尔逊·曼德拉",
  },
  {
    quote: "细节成就完美，而完美本身并不是细节。",
    writer: "达·芬奇",
  },
  {
    quote: "成功不是终点，失败也不致命，重要的是继续下去的勇气。",
    writer: "温斯顿·丘吉尔",
  },
  {
    quote: "未来取决于你今天做了什么。",
    writer: "甘地",
  },
  {
    quote: "别盯着时钟看，像它一样，一直向前走。",
    writer: "山姆·莱文森",
  },
  {
    quote: "机会不会自己发生，是你把它创造出来的。",
    writer: "克里斯·格罗瑟",
  },
  {
    quote: "当天赋不肯努力时，勤奋会赢过天赋。",
    writer: "蒂姆·诺特克",
  },
];

function MenuEntry({ item, selectedTab, onSelectTab }: {
  item: MenuItem;
  selectedTab: Tabs;
  onSelectTab: (tab: Tabs) => void;
}) {
  const Icon = item.icon;
  const active = selectedTab === item.value;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        isActive={active}
        tooltip={item.label}
        onClick={() => onSelectTab(item.value)}
        className="relative h-11 rounded-md px-3 text-sidebar-foreground/70 transition-colors duration-200 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:p-2.5"
      >
        {active && (
          <motion.span
            layoutId="active-menu-item"
            className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-sidebar-primary-foreground group-data-[collapsible=icon]:hidden"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        )}
        <Icon className="size-4.5 group-data-[collapsible=icon]:mx-auto" />
        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
      </SidebarMenuButton>
      {item.badge && (
        <SidebarMenuBadge className="bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden">
          {item.badge}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}

export default function LeftMenu({ selectedTab, onSelectTab, profile, onLogout }: LeftMenuProps) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const setRandomQuote = () => setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setRandomQuote();
    const interval = window.setInterval(setRandomQuote, 600_000);
    return () => window.clearInterval(interval);
  }, []);

  const firstName = profile?.firstName || "Alex";
  const lastName = profile?.lastName || "Morgan";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border">
      <SidebarHeader className="gap-3 border-b border-sidebar-border p-3">
        <div className="flex h-11 items-center gap-3 overflow-hidden">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground"
          >
            {profile?.photo
              ? <img src={profile.photo} alt={`${firstName} ${lastName}`} className="size-full object-cover" />
              : initials}
          </motion.div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              {firstName} {lastName}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/55">简历工作区</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="size-8 shrink-0 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:hidden"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase text-sidebar-foreground/45">
            总览
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  isActive={selectedTab === Tabs.DASHBOARD}
                  tooltip="投递看板"
                  onClick={() => onSelectTab(Tabs.DASHBOARD)}
                  className="h-11 relative z-100 rounded-md px-3 text-sidebar-foreground/70 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:p-2.5"
                >
                  <IconLayoutBoard className="size-4.5 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">投递看板</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase text-sidebar-foreground/45">
            我的档案
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {PROFILE_ITEMS.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035, duration: 0.25 }}
                >
                  <MenuEntry item={item} selectedTab={selectedTab} onSelectTab={onSelectTab} />
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase text-sidebar-foreground/45">
            我的文档
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  isActive={selectedTab === Tabs.CVMAKER}
                  tooltip="定制简历"
                  onClick={() => onSelectTab(Tabs.CVMAKER)}
                  className="h-11 rounded-md px-3 text-sidebar-foreground/70 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:p-2.5"
                >
                  <FileText className="size-4.5 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">定制简历</span>
                  <WandSparkles className="ml-auto size-3.5 opacity-60 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  isActive={selectedTab === Tabs.RESUME_LIBRARY}
                  tooltip="简历库"
                  onClick={() => onSelectTab(Tabs.RESUME_LIBRARY)}
                  className="h-11 rounded-md px-3 text-sidebar-foreground/70 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-9 group-data-[collapsible=icon]:p-2.5"
                >
                  <Library className="size-4.5 group-data-[collapsible=icon]:mx-auto" />
                  <span className="group-data-[collapsible=icon]:hidden">简历库</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <motion.blockquote
          key={quote.quote}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 border-l-2 border-sidebar-primary/25 px-3 py-1 text-xs leading-relaxed text-sidebar-foreground/55 group-data-[collapsible=icon]:hidden"
        >
          “{quote.quote}” - <span className="font-semibold text-sidebar-foreground/75">{quote.writer}</span>
        </motion.blockquote>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="设置"
              isActive={selectedTab === Tabs.SETTINGS}
              onClick={() => onSelectTab(Tabs.SETTINGS)}
              className="h-9 text-sidebar-foreground/65 group-data-[collapsible=icon]:mx-auto"
            >
              <Settings />
              <span className="group-data-[collapsible=icon]:hidden">设置</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="切换档案"
              onClick={onLogout}
              className="h-9 text-sidebar-foreground/65 hover:text-destructive group-data-[collapsible=icon]:mx-auto"
            >
              <LogOut />
              <span className="group-data-[collapsible=icon]:hidden">切换档案</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            className="mx-auto mt-1 size-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <PanelLeftOpen className="size-4" />
          </Button>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}