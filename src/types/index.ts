export interface Section {
    id: string;
    type: 'header' | 'hero' | 'features' | 'about' | 'contact' | 'footer';
    title: string;
    description?: string;
    imageUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    order: number;
    content?: Record<string, unknown>;
}

export interface WebsiteConfig {
    id: string;
    name: string;
    sections: Section[];
    createdAt: string;
    updatedAt: string;
}

export interface SectionTemplate {
    type: Section['type'];
    title: string;
    description: string;
    icon: string;
    defaultContent: Partial<Section>;
} 