import { Section } from '@/types';
import { Check, Zap, Shield, Star } from 'lucide-react';

interface FeaturesSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

const iconMap = {
    Check,
    Zap,
    Shield,
    Star
};

export default function FeaturesSection({ section, isEditing, onEdit }: FeaturesSectionProps) {
    const content = section.content || {};
    const features = (content.features as Array<{ title: string; description: string; icon: string }>) || [
        { title: 'Feature 1', description: 'Amazing feature description', icon: 'Check' },
        { title: 'Feature 2', description: 'Another great feature', icon: 'Zap' },
        { title: 'Feature 3', description: 'The best feature ever', icon: 'Star' }
    ];
    const title = (content.title as string) || section.title || 'Our Features';
    const description = (content.description as string) || section.description;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#ffffff';
    const textColor = (content.textColor as string) || section.textColor || '#1e293b';
    const titleColor = (content.titleColor as string) || '#000000';
    const descriptionColor = (content.descriptionColor as string) || '#1e293b';
    const cardColor = (content.cardColor as string) || '#ffffff';
    const cardTitleColor = (content.cardTitleColor as string) || '#000000';
    const cardDescriptionColor = (content.cardDescriptionColor as string) || '#666666';
    const cardIconColor = (content.cardIconColor as string) || '#3b82f6';
    const cardIconBackgroundColor = (content.cardIconBackgroundColor as string) || '#dbeafe';

    return (
        <section
            className="w-full py-[4vw] px-[1.5vw]"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-[3vw]">
                    <h2
                        className="sm:text-4xl font-bold mb-[1vw]"
                        style={{ color: titleColor }}
                    >
                        {title}
                    </h2>
                    {description && (
                        <p
                            className="max-w-2xl mx-auto"
                            style={{ color: descriptionColor }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2vw]">
                    {features.map((feature: { title: string; description: string; icon: string }, index: number) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Check;
                        return (
                            <div
                                key={index}
                                className="p-[10px] rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                style={{ backgroundColor: cardColor }}
                            >
                                <div
                                    className="w-[40px] h-[40px] rounded flex items-center justify-center mb-[10px]"
                                    style={{ backgroundColor: cardIconBackgroundColor }}
                                >
                                    <IconComponent
                                        className="w-[50%] h-[50%]"
                                        style={{ color: cardIconColor }}
                                    />
                                </div>
                                <h3
                                    className="font-semibold"
                                    style={{ color: cardTitleColor }}
                                >
                                    {feature.title}
                                </h3>
                                <p style={{ color: cardDescriptionColor }}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 