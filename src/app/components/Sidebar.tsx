"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ChevronDown,
    FileText,
    Plus,
    Star,
    MoreHorizontal,
    Trash2,
    Settings,
    PanelLeftClose,
    PanelLeft,
} from "lucide-react";
import { cn } from "@/utils/helpers";
import { useAppStore } from "@/app/store";
import type { Page, Space } from "@/app/mock-data";

interface PageTreeItemProps {
    page: Page;
    depth: number;
}

function PageTreeItem({ page, depth }: PageTreeItemProps) {
    const {
        selectedPageId,
        selectPage,
        expandedNodes,
        toggleNode,
        getChildPages,
        toggleFavorite,
        deletePage,
    } = useAppStore();

    const children = getChildPages(page.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodes.has(page.id);
    const isSelected = selectedPageId === page.id;

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                    "group flex items-center gap-1 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200",
                    "hover:bg-[var(--surface-hover)]",
                    isSelected && "bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30"
                )}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={() => selectPage(page.id)}
            >
                {/* Expand/Collapse */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasChildren) toggleNode(page.id);
                    }}
                    className={cn(
                        "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors",
                        !hasChildren && "invisible"
                    )}
                >
                    {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                    ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
                    )}
                </button>

                {/* Emoji */}
                <span className="text-sm">{page.emoji}</span>

                {/* Title */}
                <span className="flex-1 text-sm truncate text-[var(--foreground)]">
                    {page.title}
                </span>

                {/* Actions */}
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(page.id);
                        }}
                        className={cn(
                            "w-6 h-6 flex items-center justify-center rounded hover:bg-white/10",
                            page.isFavorite && "text-yellow-400"
                        )}
                    >
                        <Star className={cn("w-3.5 h-3.5", page.isFavorite && "fill-current")} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePage(page.id);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/20 text-[var(--foreground-muted)] hover:text-red-400"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </motion.div>

            {/* Children */}
            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children.map((child) => (
                            <PageTreeItem key={child.id} page={child} depth={depth + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface SpaceSectionProps {
    space: Space;
}

function SpaceSection({ space }: SpaceSectionProps) {
    const { getPagesForSpace, createPage, selectedSpaceId, selectSpace } = useAppStore();
    const pages = getPagesForSpace(space.id).filter((p) => p.parentId === null);
    const isSelected = selectedSpaceId === space.id;

    return (
        <div className="mb-4">
            {/* Space Header */}
            <div
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                    "hover:bg-[var(--surface-hover)]",
                    isSelected && "bg-[var(--surface)]"
                )}
                onClick={() => selectSpace(space.id)}
            >
                <span className="text-lg">{space.icon}</span>
                <span className="font-medium text-sm flex-1">{space.name}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        createPage(space.id, "Untitled");
                    }}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-[var(--foreground-muted)]"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Pages Tree */}
            {isSelected && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-1"
                >
                    {pages.map((page) => (
                        <PageTreeItem key={page.id} page={page} depth={0} />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export function Sidebar() {
    const { spaces, isSidebarCollapsed, toggleSidebar, pages } = useAppStore();
    const favorites = pages.filter((p) => p.isFavorite);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isSidebarCollapsed ? 0 : 280 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-screen overflow-hidden flex-shrink-0"
        >
            <div className="h-full w-[280px] glass border-r border-[var(--surface-border)] flex flex-col">
                {/* Header */}
                <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--surface-border)]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold gradient-text">Confluence</span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
                    >
                        <PanelLeftClose className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3">
                    {/* Favorites */}
                    {favorites.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 px-2 mb-2">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                    Favorites
                                </span>
                            </div>
                            {favorites.map((page) => (
                                <PageTreeItem key={page.id} page={page} depth={0} />
                            ))}
                        </div>
                    )}

                    {/* Spaces */}
                    <div>
                        <div className="flex items-center gap-2 px-2 mb-2">
                            <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                Spaces
                            </span>
                        </div>
                        {spaces.map((space) => (
                            <SpaceSection key={space.id} space={space} />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-[var(--surface-border)]">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                    </button>
                </div>
            </div>
        </motion.aside>
    );
}

export function SidebarToggle() {
    const { isSidebarCollapsed, toggleSidebar } = useAppStore();

    if (!isSidebarCollapsed) return null;

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
        >
            <PanelLeft className="w-5 h-5" />
        </motion.button>
    );
}
