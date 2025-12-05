"use client";

import { motion } from "framer-motion";
import {
    FileText,
    Star,
    Clock,
    TrendingUp,
    Users,
    Zap,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { cn } from "@/utils/helpers";
import { useAppStore } from "@/app/store";
import { formatRelativeTime } from "@/utils/helpers";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend?: string;
    color: string;
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass rounded-2xl p-6 border border-[var(--surface-border)] hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer"
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}20` }}
            >
                <div style={{ color }}>{icon}</div>
            </div>
            <p className="text-3xl font-bold text-[var(--foreground)] mb-1">{value}</p>
            <p className="text-sm text-[var(--foreground-muted)]">{label}</p>
            {trend && (
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                </p>
            )}
        </motion.div>
    );
}

interface PageCardProps {
    emoji: string;
    title: string;
    spaceName: string;
    updatedAt: Date;
    isFavorite?: boolean;
    onClick: () => void;
}

function PageCard({
    emoji,
    title,
    spaceName,
    updatedAt,
    isFavorite,
    onClick,
}: PageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, x: 4 }}
            onClick={onClick}
            className="glass rounded-xl p-4 border border-[var(--surface-border)] hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer group"
        >
            <div className="flex items-start gap-3">
                <span className="text-2xl">{emoji}</span>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--foreground)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">{spaceName}</p>
                </div>
                <div className="flex items-center gap-2">
                    {isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    <ArrowRight className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <p className="text-xs text-[var(--foreground-muted)] mt-3 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatRelativeTime(updatedAt)}
            </p>
        </motion.div>
    );
}

export function Dashboard() {
    const { spaces, pages, selectPage, getSpace, toggleCommandPalette, createPage } = useAppStore();

    // Stats
    const totalPages = pages.length;
    const totalSpaces = spaces.length;
    const recentPages = [...pages]
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 6);
    const favoritePages = pages.filter((p) => p.isFavorite);

    const handleCreatePage = () => {
        const targetSpaceId = spaces[0]?.id;
        if (targetSpaceId) {
            const newPage = createPage(targetSpaceId, "Untitled");
            selectPage(newPage.id);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 max-w-7xl mx-auto"
        >
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--accent-primary)]/30 mb-6">
                    <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span className="text-sm text-[var(--foreground-muted)]">
                        Welcome back! Here&apos;s what&apos;s happening
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Your Knowledge Hub</span>
                </h1>
                <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
                    Create, collaborate, and organize your team&apos;s knowledge in one beautiful place.
                </p>

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleCommandPalette}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium shadow-lg shadow-[var(--accent-primary)]/25 flex items-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        Quick Search
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCreatePage}
                        className="px-6 py-3 rounded-xl glass border border-[var(--surface-border)] text-[var(--foreground)] font-medium flex items-center gap-2 hover:border-[var(--accent-primary)]/30 transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        New Page
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <StatCard
                    icon={<FileText className="w-6 h-6" />}
                    label="Total Pages"
                    value={totalPages}
                    trend="+12% this month"
                    color="#6366f1"
                />
                <StatCard
                    icon={<Star className="w-6 h-6" />}
                    label="Favorites"
                    value={favoritePages.length}
                    color="#f59e0b"
                />
                <StatCard
                    icon={<Users className="w-6 h-6" />}
                    label="Spaces"
                    value={totalSpaces}
                    color="#8b5cf6"
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    label="Views Today"
                    value="1,234"
                    trend="+8% vs yesterday"
                    color="#22c55e"
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Pages */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[var(--accent-primary)]" />
                            Recently Updated
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {recentPages.map((page, index) => {
                            const space = getSpace(page.spaceId);
                            return (
                                <motion.div
                                    key={page.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <PageCard
                                        emoji={page.emoji}
                                        title={page.title}
                                        spaceName={`${space?.icon} ${space?.name}`}
                                        updatedAt={page.updatedAt}
                                        isFavorite={page.isFavorite}
                                        onClick={() => selectPage(page.id)}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Spaces Overview */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[var(--accent-secondary)]" />
                            Your Spaces
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {spaces.map((space, index) => {
                            const pageCount = pages.filter((p) => p.spaceId === space.id).length;
                            return (
                                <motion.div
                                    key={space.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="glass rounded-xl p-5 border border-[var(--surface-border)] hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                                            style={{ background: `${space.color}20` }}
                                        >
                                            {space.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-[var(--foreground)]">{space.name}</h3>
                                            <p className="text-xs text-[var(--foreground-muted)]">
                                                {pageCount} pages
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[var(--foreground-muted)] line-clamp-2">
                                        {space.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
