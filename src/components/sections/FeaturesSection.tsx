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
                    <h2 className="text-[2.5vw] md:text-[3vw] font-bold mb-[1vw]">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-[1.2vw] text-gray-600 max-w-2xl mx-auto">
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
                                className="p-[1.5vw] bg-white rounded-[0.5vw] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="w-[3vw] h-[3vw] bg-blue-100 rounded-[0.5vw] flex items-center justify-center mb-[1vw]">
                                    <IconComponent className="w-[1.5vw] h-[1.5vw] text-blue-600" />
                                </div>
                                <h3 className="text-[1.2vw] font-semibold mb-[0.5vw]">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 