import { Section } from '@/types';
import { Twitter, Facebook, Linkedin, Instagram, Youtube, Github, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

const iconMap = {
    Twitter,
    Facebook,
    Linkedin,
    Instagram,
    Youtube,
    Github,
    Mail,
    Phone,
    MapPin
};

type FooterSectionContent = {
    copyright?: string;
    title?: string;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
    titleColor?: string;
    descriptionColor?: string;
    sections?: FooterSectionBlock[];
};

type FooterSectionBlock =
    | {
        type: 'description';
        title: string;
        subtitle: string;
        titleColor?: string;
        subtitleColor?: string;
    }
    | {
        type: 'links' | 'contact';
        title: string;
        values: FooterSectionLink[];
        titleColor?: string;
        valuesColor?: string;
    }
    | {
        type: 'social';
        title: string;
        socialLinks: FooterSectionSocial[];
        titleColor?: string;
    };

type FooterSectionLink = {
    text: string;
    url: string;
    isLink: boolean;
};

type FooterSectionSocial = {
    platform: string;
    url: string;
    icon: keyof typeof iconMap;
    iconColor?: string;
    iconBackgroundColor?: string;
};

export default function FooterSection({ section, isEditing, onEdit }: FooterSectionProps) {
    const content = section.content as FooterSectionContent || {};
    const copyright = (content.copyright as string) || '© 2024 My Website. All rights reserved.';
    const title = (content.title as string) || section.title || 'Footer';
    const description = (content.description as string) || section.description;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#1e293b';
    const textColor = (content.textColor as string) || section.textColor || '#ffffff';
    const titleColor = (content.titleColor as string) || '#ffffff';
    const descriptionColor = (content.descriptionColor as string) || '#cbd5e1';
    const sections = content.sections || [
        {
            type: 'description',
            title: 'Footer',
            subtitle: 'Creating amazing digital experiences with modern web technologies.',
            titleColor: '#ffffff',
            subtitleColor: '#cbd5e1'
        },
        {
            type: 'links',
            title: 'Quick Links',
            values: [
                { text: 'Home', url: '#home', isLink: true },
                { text: 'About', url: '#about', isLink: true },
                { text: 'Services', url: '#services', isLink: true },
                { text: 'Contact', url: '#contact', isLink: true }
            ],
            titleColor: '#ffffff',
            valuesColor: '#cbd5e1'
        },
        {
            type: 'contact',
            title: 'Contact',
            values: [
                { text: 'contact@example.com', url: 'mailto:contact@example.com', isLink: true },
                { text: '+1 (555) 123-4567', url: 'tel:+15551234567', isLink: true },
                { text: '123 Main St, City, State', url: '', isLink: false }
            ],
            titleColor: '#ffffff',
            valuesColor: '#cbd5e1'
        },
        {
            type: 'social',
            title: 'Follow Us',
            socialLinks: [
                { platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', iconColor: '#1da1f2', iconBackgroundColor: '#1da1f2' },
                { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', iconColor: '#1877f2', iconBackgroundColor: '#1877f2' },
                { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', iconColor: '#0077b5', iconBackgroundColor: '#0077b5' },
                { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', iconColor: '#e4405f', iconBackgroundColor: '#e4405f' },
                { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', iconColor: '#ff0000', iconBackgroundColor: '#ff0000' },
                { platform: 'GitHub', url: 'https://github.com', icon: 'Github', iconColor: '#333333', iconBackgroundColor: '#333333' }
            ],
            titleColor: '#ffffff'
        }
    ];

    return (
        <footer
            className="w-full py-[4vw] px-[1.5vw]"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3vw] mb-[3vw]">
                    {sections.map((section: FooterSectionBlock, index: number) => (
                        <div key={index} className="space-y-[1vw]">
                            <h3
                                className="sm:text-2xl font-semibold mb-[1vw]"
                                style={{ color: section.titleColor || '#ffffff' }}
                            >
                                {section.title}
                            </h3>

                            {section.type === 'description' && (
                                <p
                                    className="leading-relaxed"
                                    style={{ color: section.subtitleColor || '#cbd5e1' }}
                                >
                                    {section.subtitle}
                                </p>
                            )}

                            {section.type === 'links' && (
                                <ul className="space-y-[0.5vw]">
                                    {section.values?.map((item: FooterSectionLink, itemIndex: number) => (
                                        <li key={itemIndex}>
                                            {item.isLink ? (
                                                <a
                                                    href={item.url}
                                                    className="hover:underline transition-colors duration-200"
                                                    style={{ color: section.valuesColor || '#cbd5e1' }}
                                                >
                                                    {item.text}
                                                </a>
                                            ) : (
                                                <span
                                                    className=""
                                                    style={{ color: section.valuesColor || '#cbd5e1' }}
                                                >
                                                    {item.text}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.type === 'contact' && (
                                <ul className="space-y-[0.5vw]">
                                    {section.values?.map((item: FooterSectionLink, itemIndex: number) => (
                                        <li key={itemIndex}>
                                            {item.isLink ? (
                                                <a
                                                    href={item.url}
                                                    className=" hover:underline transition-colors duration-200"
                                                    style={{ color: section.valuesColor || '#cbd5e1' }}
                                                >
                                                    {item.text}
                                                </a>
                                            ) : (
                                                <span
                                                    className=""
                                                    style={{ color: section.valuesColor || '#cbd5e1' }}
                                                >
                                                    {item.text}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.type === 'social' && (
                                <div className="flex flex-wrap gap-[0.8vw]">
                                    {section.socialLinks?.map((social: FooterSectionSocial, socialIndex: number) => {
                                        const IconComponent = iconMap[social.icon] || Twitter;
                                        return (
                                            <a
                                                key={socialIndex}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-[40px] h-[40px] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110"
                                                style={{ backgroundColor: social.iconBackgroundColor || '#1da1f2' }}
                                            >
                                                <IconComponent
                                                    className="w-[100%] h-[50%]"
                                                    style={{ color: social.iconColor || '#ffffff' }}
                                                />
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-600 pt-[2vw] text-center">
                    <p
                        className="flex items-center justify-center gap-[0.5vw]"
                        style={{ color: descriptionColor }}
                    >
                        {copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
} 