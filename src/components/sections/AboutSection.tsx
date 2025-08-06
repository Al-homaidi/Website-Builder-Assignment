import { Section } from '@/types';
import { Target, Users, Eye, Flag, Heart, Star, Zap, Shield, Check, Award, Globe, Lightbulb } from 'lucide-react';

interface AboutSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

const iconMap = {
    Target,
    Users,
    Eye,
    Flag,
    Heart,
    Star,
    Zap,
    Shield,
    Check,
    Award,
    Globe,
    Lightbulb
};

export default function AboutSection({ section, isEditing, onEdit }: AboutSectionProps) {
    const content = section.content || {};
    const title = (content.title as string) || section.title || 'About Us';
    const description = (content.description as string) || section.description;
    const imageUrl = (content.imageUrl as string) || section.imageUrl;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#f1f5f9';
    const textColor = (content.textColor as string) || section.textColor || '#1e293b';
    const titleColor = (content.titleColor as string) || '#000000';
    const descriptionColor = (content.descriptionColor as string) || '#1e293b';

    const sections = (content.sections as any[]) || [
        {
            type: 'mission',
            title: 'Our Mission',
            description: 'To provide the best solutions for our customers',
            icon: 'Target',
            titleColor: '#000000',
            descriptionColor: '#666666'
        },
        {
            type: 'values',
            title: 'Our Values',
            values: ['Innovation', 'Quality', 'Customer Focus'],
            icon: 'Users',
            titleColor: '#000000',
            valuesColor: '#666666'
        }
    ];

    return (
        <section
            className="w-full py-[4vw] px-[1.5vw]"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div className='mb-4'>
                <h2
                    className="sm:text-4xl text-center font-bold mb-3"
                    style={{ color: titleColor }}
                >
                    {title}
                </h2>
                {description && (
                    <p
                        className="text-center"
                        style={{ color: descriptionColor }}
                    >
                        {description}
                    </p>
                )}
            </div>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vw] items-center">
                    <div>
                        <div className="space-y-[1.5vw]">
                            {sections.map((section: any, index: number) => {
                                const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Target;
                                return (
                                    <div key={index} className="flex items-start space-x-[1vw]">
                                        <div
                                            className="w-[40px] h-[40px] rounded-[0.5vw] flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: section.iconBackgroundColor || '#dbeafe' }}
                                        >
                                            <IconComponent
                                                className="w-[50%] h-[50%]"
                                                style={{ color: section.iconColor || '#3b82f6' }}
                                            />
                                        </div>
                                        <div>
                                            <h3
                                                className="font-semibold mb-[0.5vw]"
                                                style={{ color: section.titleColor || '#000000' }}
                                            >
                                                {section.title}
                                            </h3>
                                            {section.type === 'mission' ? (
                                                <p style={{ color: section.descriptionColor || '#666666' }}>
                                                    {section.description}
                                                </p>
                                            ) : (
                                                <ul className="space-y-[0.5vw]">
                                                    {(section.values as string[])?.map((value: string, valueIndex: number) => (
                                                        <li
                                                            key={valueIndex}
                                                            className="flex items-center"
                                                            style={{ color: section.valuesColor || '#666666' }}
                                                        >
                                                            <span className="w-[5px] h-[5px] rounded-full mr-[0.8vw]" style={{ backgroundColor: section.iconColor || '#3b82f6' }}></span>
                                                            {value}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt="About us"
                                className="w-full object-cover rounded shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
} 