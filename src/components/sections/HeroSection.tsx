import { Section } from '@/types';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

export default function HeroSection({ section, isEditing, onEdit }: HeroSectionProps) {
    const content = section.content || {};
    const ctaText = (content.ctaText as string) || 'Get Started';
    const ctaLink = (content.ctaLink as string) || '#';
    const overlayColor = (content.overlayColor as string) || '#000000';
    const overlayOpacity = (content.overlayOpacity as number) || 40;

    return (
        <section
            className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden"
            style={{
                backgroundColor: section.backgroundColor || '#f8fafc',
                color: section.textColor || '#1e293b'
            }}
        >
            {/* Background Image - z-0 */}
            {section.imageUrl && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={section.imageUrl}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Overlay - z-10 */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    backgroundColor: overlayColor,
                    opacity: overlayOpacity / 100
                }}
            ></div>

            {/* Content - z-20 */}
            <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {section.title || 'Welcome to Our Website'}
                </h1>
                {section.description && (
                    <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">
                        {section.description}
                    </p>
                )}
                <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    {ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                </button>
            </div>
        </section>
    );
} 