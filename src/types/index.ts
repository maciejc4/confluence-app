// Type definitions for the app

export interface Space {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Page {
    id: string;
    spaceId: string;
    parentId: string | null;
    title: string;
    content: string;
    emoji: string;
    createdAt: Date;
    updatedAt: Date;
    isFavorite: boolean;
}

export interface TreeNode {
    page: Page;
    children: TreeNode[];
    isExpanded: boolean;
}
