import { useState } from "react";
import { Home, Search, TrendingUp, Bookmark, Settings, Plus, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Search Options",
    url: "/search",
    icon: Search,
  },
  {
    title: "Top Discounts",
    url: "/discounts",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const [watchlist, setWatchlist] = useState(["AAPL", "TSLA", "MSFT", "GOOGL"]);
  const [newSymbol, setNewSymbol] = useState("");
  const [showAddSymbol, setShowAddSymbol] = useState(false);

  const addToWatchlist = () => {
    if (newSymbol.trim() && !watchlist.includes(newSymbol.toUpperCase())) {
      setWatchlist([...watchlist, newSymbol.toUpperCase()]);
      setNewSymbol("");
      setShowAddSymbol(false);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s !== symbol));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Watchlist</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowAddSymbol(true)}
              data-testid="button-add-watchlist"
              className="h-4 w-4"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {showAddSymbol && (
              <div className="px-2 py-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Symbol"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    className="h-8 text-xs"
                    data-testid="input-add-symbol"
                    onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
                  />
                  <Button
                    size="sm"
                    onClick={addToWatchlist}
                    data-testid="button-confirm-add"
                    className="h-8 px-2"
                  >
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddSymbol(false)}
                    data-testid="button-cancel-add"
                    className="h-8 px-2"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            
            <SidebarMenu>
              {watchlist.map((symbol) => (
                <SidebarMenuItem key={symbol}>
                  <SidebarMenuButton className="group hover-elevate">
                    <Bookmark className="w-4 h-4" />
                    <span className="font-mono font-medium">{symbol}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {/* Mock price change */}
                      +1.2%
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWatchlist(symbol);
                      }}
                      className="opacity-0 group-hover:opacity-100 h-4 w-4 ml-1"
                      data-testid={`button-remove-${symbol}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}