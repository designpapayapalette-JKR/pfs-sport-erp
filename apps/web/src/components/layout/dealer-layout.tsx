"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Breadcrumbs } from "./breadcrumbs";
import { SearchModal } from "./search-modal";
import { AIAssistModal } from "@/components/ai/ai-assist-modal";
import { cn } from "@pfs/ui";

export function DealerLayout({ children }: { children: React.ReactNode }) {
  // Auto-hide is the default mode (unpinned)
  const [isPinned, setIsPinned] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Expanded if pinned OR actively hovered in auto-hide mode
  const isExpanded = isPinned || isHovered;

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isPinned ? "270px" : "72px"
    );
  }, [isPinned]);

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-neutral-900 flex flex-col">
      <Sidebar
        isExpanded={isExpanded}
        isPinned={isPinned}
        onTogglePin={() => setIsPinned((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onNavigate={() => {
          setIsMobileMenuOpen(false);
          setIsHovered(false);
        }}
        isMobileOpen={isMobileMenuOpen}
      />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isPinned ? "lg:ml-[270px]" : "lg:ml-[72px]"
        )}
      >
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        <main className="min-h-[calc(100vh-64px)] flex-1">
          <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 py-3 sm:py-4">
            <Breadcrumbs />
            <div className="mt-2.5">{children}</div>
          </div>
        </main>
      </div>

      <SearchModal />
      <AIAssistModal />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export const AdminLayout = DealerLayout;