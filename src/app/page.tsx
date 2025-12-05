"use client";

import { Sidebar, SidebarToggle } from "@/app/components/Sidebar";
import { TopBar } from "@/app/components/TopBar";
import { CommandPalette } from "@/app/components/CommandPalette";
import { PageEditor } from "@/app/components/PageEditor";
import { Dashboard } from "@/app/components/Dashboard";
import { useAppStore } from "@/app/store";

export default function Home() {
  const { selectedPageId } = useAppStore();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <SidebarToggle />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          {selectedPageId ? (
            <PageEditor pageId={selectedPageId} />
          ) : (
            <Dashboard />
          )}
        </div>
      </main>

      {/* Command Palette Modal */}
      <CommandPalette />
    </div>
  );
}
