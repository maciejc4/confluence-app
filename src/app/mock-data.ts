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

// Mock Spaces
export const mockSpaces: Space[] = [
    {
        id: "space-1",
        name: "Engineering",
        description: "Technical documentation and architecture decisions",
        icon: "💻",
        color: "#6366f1",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-12-01"),
    },
    {
        id: "space-2",
        name: "Product",
        description: "Product roadmaps, specs, and feature documentation",
        icon: "🚀",
        color: "#8b5cf6",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-11-28"),
    },
    {
        id: "space-3",
        name: "Design",
        description: "Design system, guidelines, and assets",
        icon: "🎨",
        color: "#ec4899",
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-11-30"),
    },
    {
        id: "space-4",
        name: "Company",
        description: "Company policies, culture, and announcements",
        icon: "🏢",
        color: "#22c55e",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-02"),
    },
];

// Mock Pages
export const mockPages: Page[] = [
    // Engineering Space
    {
        id: "page-1",
        spaceId: "space-1",
        parentId: null,
        title: "Getting Started",
        content: `<h1>Getting Started with Development</h1>
<p>Welcome to the engineering documentation! This guide will help you set up your development environment.</p>
<h2>Prerequisites</h2>
<ul>
<li>Node.js 18+ installed</li>
<li>Git configured with SSH keys</li>
<li>Docker Desktop running</li>
</ul>
<h2>Quick Start</h2>
<p>Clone the repository and run the setup script:</p>
<pre><code>git clone git@github.com:company/app.git
cd app
npm install
npm run dev</code></pre>
<p>You should now have the app running at <code>http://localhost:3000</code>.</p>`,
        emoji: "🚀",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-11-20"),
        isFavorite: true,
    },
    {
        id: "page-2",
        spaceId: "space-1",
        parentId: null,
        title: "Architecture Overview",
        content: `<h1>System Architecture</h1>
<p>Our application follows a modern microservices architecture with the following key components:</p>
<h2>Frontend</h2>
<p>Built with Next.js 14 using the App Router for optimal performance and SEO.</p>
<h2>Backend Services</h2>
<ul>
<li><strong>API Gateway</strong> - Handles authentication and routing</li>
<li><strong>User Service</strong> - Manages user accounts and profiles</li>
<li><strong>Content Service</strong> - Handles all content operations</li>
<li><strong>Search Service</strong> - Elasticsearch-powered search</li>
</ul>
<blockquote><p>All services communicate via gRPC for internal calls and REST for external APIs.</p></blockquote>`,
        emoji: "🏗️",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-11-15"),
        isFavorite: false,
    },
    {
        id: "page-3",
        spaceId: "space-1",
        parentId: "page-2",
        title: "Database Schema",
        content: `<h1>Database Schema</h1>
<p>We use PostgreSQL as our primary database with the following key tables:</p>
<h2>Users Table</h2>
<p>Stores all user information including authentication data.</p>
<h2>Spaces Table</h2>
<p>Contains workspace/space configurations and metadata.</p>
<h2>Pages Table</h2>
<p>Hierarchical content storage with full-text search indexes.</p>`,
        emoji: "🗄️",
        createdAt: new Date("2024-02-10"),
        updatedAt: new Date("2024-10-05"),
        isFavorite: false,
    },
    {
        id: "page-4",
        spaceId: "space-1",
        parentId: "page-2",
        title: "API Documentation",
        content: `<h1>API Documentation</h1>
<p>Our REST API follows OpenAPI 3.0 specification.</p>
<h2>Authentication</h2>
<p>All requests require a Bearer token in the Authorization header.</p>
<h2>Rate Limiting</h2>
<p>API calls are limited to 1000 requests per minute per user.</p>`,
        emoji: "📡",
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-11-01"),
        isFavorite: true,
    },
    {
        id: "page-5",
        spaceId: "space-1",
        parentId: null,
        title: "Deployment Guide",
        content: `<h1>Deployment Guide</h1>
<p>This document covers our CI/CD pipeline and deployment procedures.</p>
<h2>Environments</h2>
<ul>
<li><strong>Development</strong> - Auto-deployed on PR merge</li>
<li><strong>Staging</strong> - Manual promotion from development</li>
<li><strong>Production</strong> - Requires approval from 2+ engineers</li>
</ul>`,
        emoji: "🚢",
        createdAt: new Date("2024-04-01"),
        updatedAt: new Date("2024-12-01"),
        isFavorite: false,
    },
    // Product Space
    {
        id: "page-6",
        spaceId: "space-2",
        parentId: null,
        title: "2025 Roadmap",
        content: `<h1>Product Roadmap 2025</h1>
<p>Our strategic priorities for the upcoming year.</p>
<h2>Q1 Goals</h2>
<ul>
<li>Launch real-time collaboration</li>
<li>Mobile app beta release</li>
<li>Enterprise SSO integration</li>
</ul>
<h2>Q2 Goals</h2>
<ul>
<li>AI-powered search</li>
<li>Advanced analytics dashboard</li>
<li>API v2 release</li>
</ul>`,
        emoji: "🗺️",
        createdAt: new Date("2024-11-01"),
        updatedAt: new Date("2024-12-02"),
        isFavorite: true,
    },
    {
        id: "page-7",
        spaceId: "space-2",
        parentId: null,
        title: "Feature Specifications",
        content: `<h1>Feature Specifications</h1>
<p>Detailed specifications for upcoming features.</p>`,
        emoji: "📋",
        createdAt: new Date("2024-10-01"),
        updatedAt: new Date("2024-11-15"),
        isFavorite: false,
    },
    {
        id: "page-8",
        spaceId: "space-2",
        parentId: "page-7",
        title: "Real-time Collaboration",
        content: `<h1>Real-time Collaboration Spec</h1>
<p>Enable multiple users to edit the same document simultaneously.</p>
<h2>Requirements</h2>
<ul>
<li>Cursor presence indicators</li>
<li>Conflict resolution via CRDTs</li>
<li>Sub-100ms sync latency</li>
</ul>`,
        emoji: "👥",
        createdAt: new Date("2024-10-15"),
        updatedAt: new Date("2024-11-20"),
        isFavorite: false,
    },
    // Design Space
    {
        id: "page-9",
        spaceId: "space-3",
        parentId: null,
        title: "Design System",
        content: `<h1>Design System</h1>
<p>Our comprehensive design system for consistent UI/UX across all products.</p>
<h2>Principles</h2>
<ul>
<li><strong>Clarity</strong> - Clear visual hierarchy</li>
<li><strong>Efficiency</strong> - Minimize cognitive load</li>
<li><strong>Delight</strong> - Thoughtful micro-interactions</li>
</ul>`,
        emoji: "🎨",
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-11-28"),
        isFavorite: true,
    },
    {
        id: "page-10",
        spaceId: "space-3",
        parentId: "page-9",
        title: "Color Palette",
        content: `<h1>Color Palette</h1>
<p>Our color system is designed for accessibility and visual harmony.</p>
<h2>Primary Colors</h2>
<p>Indigo and Violet gradients for brand identity.</p>
<h2>Semantic Colors</h2>
<p>Success (green), Warning (amber), Error (red).</p>`,
        emoji: "🌈",
        createdAt: new Date("2024-03-20"),
        updatedAt: new Date("2024-10-01"),
        isFavorite: false,
    },
    {
        id: "page-11",
        spaceId: "space-3",
        parentId: "page-9",
        title: "Typography",
        content: `<h1>Typography Guidelines</h1>
<p>We use Inter as our primary font family.</p>
<h2>Scale</h2>
<ul>
<li>Display: 48px / 700</li>
<li>H1: 36px / 700</li>
<li>H2: 28px / 600</li>
<li>Body: 16px / 400</li>
<li>Small: 14px / 400</li>
</ul>`,
        emoji: "🔤",
        createdAt: new Date("2024-03-25"),
        updatedAt: new Date("2024-09-15"),
        isFavorite: false,
    },
    // Company Space
    {
        id: "page-12",
        spaceId: "space-4",
        parentId: null,
        title: "Company Handbook",
        content: `<h1>Company Handbook</h1>
<p>Welcome to our company! This handbook contains everything you need to know.</p>
<h2>Our Mission</h2>
<p>To make knowledge sharing effortless and delightful for teams everywhere.</p>
<h2>Our Values</h2>
<ul>
<li><strong>Transparency</strong> - Open communication always</li>
<li><strong>Ownership</strong> - Take initiative and responsibility</li>
<li><strong>Craft</strong> - Pride in quality work</li>
<li><strong>Empathy</strong> - Understand before being understood</li>
</ul>`,
        emoji: "📖",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-12-01"),
        isFavorite: false,
    },
    {
        id: "page-13",
        spaceId: "space-4",
        parentId: "page-12",
        title: "Benefits & Perks",
        content: `<h1>Benefits & Perks</h1>
<p>We offer competitive benefits to support our team.</p>
<h2>Health</h2>
<ul>
<li>Full medical, dental, and vision coverage</li>
<li>Mental health support</li>
<li>Wellness stipend</li>
</ul>
<h2>Time Off</h2>
<ul>
<li>Unlimited PTO</li>
<li>Paid parental leave</li>
<li>Company holidays</li>
</ul>`,
        emoji: "🎁",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-06-01"),
        isFavorite: false,
    },
    {
        id: "page-14",
        spaceId: "space-4",
        parentId: null,
        title: "Team Directory",
        content: `<h1>Team Directory</h1>
<p>Find and connect with your colleagues.</p>
<h2>Leadership</h2>
<p>CEO, CTO, VP Engineering, VP Product, VP Design</p>
<h2>Engineering</h2>
<p>Frontend, Backend, Platform, DevOps teams</p>
<h2>Product & Design</h2>
<p>Product Managers, Designers, User Researchers</p>`,
        emoji: "👋",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-11-01"),
        isFavorite: false,
    },
];
