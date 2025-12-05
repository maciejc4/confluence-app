"use client";

import { create } from "zustand";
import type { Space, Page } from "@/app/mock-data";
import { mockSpaces, mockPages } from "@/app/mock-data";
import { generateId } from "@/utils/helpers";

interface AppState {
    // Data
    spaces: Space[];
    pages: Page[];

    // UI State
    selectedSpaceId: string | null;
    selectedPageId: string | null;
    isSidebarCollapsed: boolean;
    isCommandPaletteOpen: boolean;
    expandedNodes: Set<string>;

    // Actions - Spaces
    getSpace: (id: string) => Space | undefined;

    // Actions - Pages
    getPage: (id: string) => Page | undefined;
    getPagesForSpace: (spaceId: string) => Page[];
    getChildPages: (parentId: string) => Page[];
    createPage: (spaceId: string, title: string, parentId?: string | null) => Page;
    updatePage: (id: string, updates: Partial<Page>) => void;
    deletePage: (id: string) => void;
    toggleFavorite: (id: string) => void;

    // Actions - UI
    selectSpace: (id: string | null) => void;
    selectPage: (id: string | null) => void;
    toggleSidebar: () => void;
    toggleCommandPalette: () => void;
    toggleNode: (id: string) => void;

    // Search
    searchPages: (query: string) => Page[];
}

export const useAppStore = create<AppState>((set, get) => ({
    // Initial Data
    spaces: mockSpaces,
    pages: mockPages,

    // Initial UI State
    selectedSpaceId: mockSpaces[0]?.id ?? null,
    selectedPageId: null,
    isSidebarCollapsed: false,
    isCommandPaletteOpen: false,
    expandedNodes: new Set<string>(),

    // Actions - Spaces
    getSpace: (id) => get().spaces.find((s) => s.id === id),

    // Actions - Pages
    getPage: (id) => get().pages.find((p) => p.id === id),

    getPagesForSpace: (spaceId) =>
        get().pages.filter((p) => p.spaceId === spaceId),

    getChildPages: (parentId) =>
        get().pages.filter((p) => p.parentId === parentId),

    createPage: (spaceId, title, parentId = null) => {
        const newPage: Page = {
            id: `page-${generateId()}`,
            spaceId,
            parentId,
            title,
            content: "",
            emoji: "📄",
            createdAt: new Date(),
            updatedAt: new Date(),
            isFavorite: false,
        };
        set((state) => ({ pages: [...state.pages, newPage] }));
        return newPage;
    },

    updatePage: (id, updates) => {
        set((state) => ({
            pages: state.pages.map((p) =>
                p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
            ),
        }));
    },

    deletePage: (id) => {
        // Also delete child pages
        const toDelete = new Set<string>([id]);
        const findChildren = (parentId: string) => {
            get().pages
                .filter((p) => p.parentId === parentId)
                .forEach((p) => {
                    toDelete.add(p.id);
                    findChildren(p.id);
                });
        };
        findChildren(id);

        set((state) => ({
            pages: state.pages.filter((p) => !toDelete.has(p.id)),
            selectedPageId: state.selectedPageId && toDelete.has(state.selectedPageId)
                ? null
                : state.selectedPageId,
        }));
    },

    toggleFavorite: (id) => {
        set((state) => ({
            pages: state.pages.map((p) =>
                p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
            ),
        }));
    },

    // Actions - UI
    selectSpace: (id) => set({ selectedSpaceId: id, selectedPageId: null }),

    selectPage: (id) => {
        const page = get().pages.find((p) => p.id === id);
        if (page) {
            set({ selectedPageId: id, selectedSpaceId: page.spaceId });
        }
    },

    toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

    toggleCommandPalette: () =>
        set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

    toggleNode: (id) => {
        set((state) => {
            const newExpanded = new Set(state.expandedNodes);
            if (newExpanded.has(id)) {
                newExpanded.delete(id);
            } else {
                newExpanded.add(id);
            }
            return { expandedNodes: newExpanded };
        });
    },

    // Search
    searchPages: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().pages.filter(
            (p) =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.content.toLowerCase().includes(lowerQuery)
        );
    },
}));
