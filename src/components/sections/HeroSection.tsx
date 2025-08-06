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
    const title = (content.title as string) || section.title || 'Welcome to Our Website';
    const description = (content.description as string) || section.description;
    const imageUrl = (content.imageUrl as string) || section.imageUrl;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#f8fafc';
    const textColor = (content.textColor as string) || section.textColor || '#1e293b';
    const titleColor = (content.titleColor as string) || '#ffffff';
    const descriptionColor = (content.descriptionColor as string) || '#ffffff';
    const buttonbackgroundColor = (content.buttonbackgroundColor as string) || "#145dfb";
    const buttonTextColor = (content.buttonTextColor as string) || "#fff";

    return (
        <section
            className="relative w-full h-100 flex items-center justify-center overflow-hidden"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            {/* Background Image - z-0 */}
            {imageUrl ? (
                <div className="absolute inset-0 z-0">
                    <img
                        src={imageUrl}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                ""
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
            <div className="relative z-20 max-w-4xl mx-auto px-[1.5vw] text-center">
                <h1
                    className="sm:text-4xl font-bold mb-[1.5vw] leading-tight"
                    style={{ color: titleColor }}
                >
                    {title}
                </h1>
                {description && (
                    <p
                        className="mb-[2vw] max-w-2xl mx-auto"
                        style={{ color: descriptionColor }}
                    >
                        {description}
                    </p>
                )}
                <button style={{ backgroundColor: buttonbackgroundColor, color: buttonTextColor }} className="inline-flex items-center p-2 font-semibold rounded hover:backdrop-opacity-5 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    {ctaText}
                    <ArrowRight className="ml-[0.5vw] w-[20px] h-[20px]" />
                </button>
            </div>
        </section>
    );
} 