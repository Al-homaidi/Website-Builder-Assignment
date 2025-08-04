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

    return (
        <section
            className="w-full py-16 px-6"
            style={{
                backgroundColor: section.backgroundColor || '#ffffff',
                color: section.textColor || '#1e293b'
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {section.title || 'Our Features'}
                    </h2>
                    {section.description && (
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {section.description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature: { title: string; description: string; icon: string }, index: number) => {
                        const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Check;
                        return (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <IconComponent className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 