"use client";

import { motion } from "framer-motion";
import { Search, Plus, Command, Bell, MoreHorizontal } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useAppStore } from "@/app/store";
import { formatRelativeTime } from "@/utils/helpers";

export function TopBar() {
    const { toggleCommandPalette, selectedPageId, getPage, spaces, selectedSpaceId, createPage, selectPage } = useAppStore();
    const page = selectedPageId ? getPage(selectedPageId) : null;
    const space = selectedSpaceId ? spaces.find(s => s.id === selectedSpaceId) : null;

    const handleCreatePage = () => {
        // Create page in the currently selected space, or first space if none selected
        const targetSpaceId = selectedSpaceId || spaces[0]?.id;
        if (targetSpaceId) {
            const newPage = createPage(targetSpaceId, "Untitled");
            selectPage(newPage.id);
        }
    };

    return (
        <header className="h-14 glass border-b border-[var(--surface-border)] flex items-center justify-between px-4 sticky top-0 z-40">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                {space && (
                    <>
                        <span className="text-lg">{space.icon}</span>
                        <span className="text-[var(--foreground-muted)]">{space.name}</span>
                    </>
                )}
                {page && (
                    <>
                        <span className="text-[var(--foreground-muted)]">/</span>
                        <span className="text-[var(--foreground)]">{page.title}</span>
                    </>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Search Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleCommandPalette}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl glass glass-hover text-[var(--foreground-muted)] transition-all"
                >
                    <Search className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Search...</span>
                    <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 text-xs">
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </kbd>
                </motion.button>

                {/* Create Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreatePage}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary)]/25"
                >
                    <Plus className="w-4 h-4" />
                </motion.button>

                {/* Notifications */}
                <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                </button>

                {/* Profile */}
                <button className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                    M
                </button>
            </div>
        </header>
    );
}
