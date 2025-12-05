"use client";

import { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { motion } from "framer-motion";
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo,
    Redo,
} from "lucide-react";
import { cn } from "@/utils/helpers";
import { useAppStore } from "@/app/store";
import { debounce } from "@/utils/helpers";

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    tooltip?: string;
}

function ToolbarButton({
    onClick,
    isActive,
    disabled,
    children,
    tooltip,
}: ToolbarButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={tooltip}
            className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg transition-all",
                isActive
                    ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
                    : "text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
                disabled && "opacity-40 cursor-not-allowed"
            )}
        >
            {children}
        </button>
    );
}

function ToolbarDivider() {
    return <div className="w-px h-6 bg-[var(--surface-border)] mx-1" />;
}

interface PageEditorProps {
    pageId: string;
}

export function PageEditor({ pageId }: PageEditorProps) {
    const { getPage, updatePage } = useAppStore();
    const page = getPage(pageId);

    // Debounced save
    const debouncedSave = useCallback(
        debounce((content: string) => {
            updatePage(pageId, { content });
        }, 500),
        [pageId, updatePage]
    );

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: "Start writing amazing content...",
            }),
            Typography,
        ],
        content: page?.content || "",
        immediatelyRender: false, // Fix SSR hydration mismatch
        editorProps: {
            attributes: {
                class: "tiptap focus:outline-none min-h-[calc(100vh-200px)]",
            },
        },
        onUpdate: ({ editor }) => {
            debouncedSave(editor.getHTML());
        },
    });

    // Update editor content when page changes
    useEffect(() => {
        if (editor && page?.content !== editor.getHTML()) {
            editor.commands.setContent(page?.content || "");
        }
    }, [pageId]); // Only re-run when pageId changes

    if (!editor || !page) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col"
        >
            {/* Toolbar */}
            <div className="sticky top-0 z-10 glass border-b border-[var(--surface-border)] px-4 py-2">
                <div className="flex items-center gap-1 flex-wrap">
                    {/* History */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        tooltip="Undo"
                    >
                        <Undo className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        tooltip="Redo"
                    >
                        <Redo className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarDivider />

                    {/* Text Formatting */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive("bold")}
                        tooltip="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive("italic")}
                        tooltip="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive("strike")}
                        tooltip="Strikethrough"
                    >
                        <Strikethrough className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive("code")}
                        tooltip="Inline Code"
                    >
                        <Code className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarDivider />

                    {/* Headings */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive("heading", { level: 1 })}
                        tooltip="Heading 1"
                    >
                        <Heading1 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive("heading", { level: 2 })}
                        tooltip="Heading 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive("heading", { level: 3 })}
                        tooltip="Heading 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarDivider />

                    {/* Lists & Blocks */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive("bulletList")}
                        tooltip="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive("orderedList")}
                        tooltip="Numbered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive("blockquote")}
                        tooltip="Quote"
                    >
                        <Quote className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        tooltip="Horizontal Rule"
                    >
                        <Minus className="w-4 h-4" />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6 md:px-16 lg:px-24">
                <div className="max-w-3xl mx-auto">
                    {/* Page Title */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">{page.emoji}</span>
                        <h1 className="text-3xl font-bold text-[var(--foreground)]">
                            {page.title}
                        </h1>
                    </div>

                    {/* Editor */}
                    <EditorContent editor={editor} />
                </div>
            </div>
        </motion.div>
    );
}
