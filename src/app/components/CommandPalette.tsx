"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    FileText,
    ArrowRight,
    Command,
    X,
    Hash,
    Star,
    Clock,
} from "lucide-react";
import { cn } from "@/utils/helpers";
import { useAppStore } from "@/app/store";
import type { Page } from "@/app/mock-data";

export function CommandPalette() {
    const {
        isCommandPaletteOpen,
        toggleCommandPalette,
        searchPages,
        selectPage,
        pages,
        spaces,
        getSpace,
    } = useAppStore();

    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Search results
    const results = useMemo(() => {
        if (!query.trim()) {
            // Show recent/favorites when no query
            return pages.filter((p) => p.isFavorite).slice(0, 6);
        }
        return searchPages(query).slice(0, 10);
    }, [query, searchPages, pages]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggleCommandPalette();
            }
            if (e.key === "Escape" && isCommandPaletteOpen) {
                toggleCommandPalette();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleCommandPalette, isCommandPaletteOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isCommandPaletteOpen) {
            inputRef.current?.focus();
            setQuery("");
            setSelectedIndex(0);
        }
    }, [isCommandPaletteOpen]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (results[selectedIndex]) {
                    selectPage(results[selectedIndex].id);
                    toggleCommandPalette();
                }
                break;
        }
    };

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [results]);

    return (
        <AnimatePresence>
            {isCommandPaletteOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCommandPalette}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl z-50"
                    >
                        <div className="glass rounded-2xl border border-[var(--surface-border)] shadow-2xl shadow-black/50 overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--surface-border)]">
                                <Search className="w-5 h-5 text-[var(--foreground-muted)]" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search pages, spaces, or commands..."
                                    className="flex-1 bg-transparent text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] outline-none text-lg"
                                />
                                <kbd className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-white/5 text-xs text-[var(--foreground-muted)]">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[400px] overflow-y-auto p-2">
                                {results.length === 0 && query && (
                                    <div className="py-12 text-center text-[var(--foreground-muted)]">
                                        <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                                        <p>No results found for &quot;{query}&quot;</p>
                                    </div>
                                )}

                                {results.length > 0 && (
                                    <div>
                                        <div className="px-2 py-1.5 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                            {query ? "Results" : "Favorites"}
                                        </div>
                                        {results.map((page, index) => {
                                            const space = getSpace(page.spaceId);
                                            return (
                                                <motion.button
                                                    key={page.id}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.03 }}
                                                    onClick={() => {
                                                        selectPage(page.id);
                                                        toggleCommandPalette();
                                                    }}
                                                    className={cn(
                                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all",
                                                        selectedIndex === index
                                                            ? "bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30"
                                                            : "hover:bg-[var(--surface-hover)]"
                                                    )}
                                                >
                                                    <span className="text-lg">{page.emoji}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-[var(--foreground)] truncate">
                                                            {page.title}
                                                        </div>
                                                        <div className="text-xs text-[var(--foreground-muted)] truncate">
                                                            {space?.icon} {space?.name}
                                                        </div>
                                                    </div>
                                                    {page.isFavorite && (
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    )}
                                                    <ArrowRight className="w-4 h-4 text-[var(--foreground-muted)]" />
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}

                                {!query && (
                                    <div className="mt-4">
                                        <div className="px-2 py-1.5 text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                            Spaces
                                        </div>
                                        {spaces.map((space, index) => (
                                            <button
                                                key={space.id}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-[var(--surface-hover)] transition-all"
                                            >
                                                <span className="text-lg">{space.icon}</span>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-[var(--foreground)]">
                                                        {space.name}
                                                    </div>
                                                    <div className="text-xs text-[var(--foreground-muted)]">
                                                        {space.description}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 border-t border-[var(--surface-border)] flex items-center justify-between text-xs text-[var(--foreground-muted)]">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white/5">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 rounded bg-white/5">↓</kbd>
                                        navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-white/5">↵</kbd>
                                        select
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <Command className="w-3 h-3" />K to toggle
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
