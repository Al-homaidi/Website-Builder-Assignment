export interface Section {
    id: string;
    type: 'header' | 'hero' | 'features' | 'about' | 'contact' | 'footer';
    title: string;
    description?: string;
    imageUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    titleColor?: string;
    descriptionColor?: string;
    cardColor?: string;
    cardTitleColor?: string;
    cardDescriptionColor?: string;
    cardIconColor?: string;
    cardIconBackgroundColor?: string;
    MenuItemsColor?: string;
    LogotextColor?: string;
    RoundedImage?: string;
    buttonTextColor?: string;
    buttonbackgroundColor?: string;
    iconColor?: string;
    iconBackgroundColor?: string;
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