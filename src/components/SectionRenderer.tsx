import { Section } from '@/types';
import HeaderSection from './sections/HeaderSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

interface SectionRendererProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

const sectionComponents = {
    header: HeaderSection,
    hero: HeroSection,
    features: FeaturesSection,
    about: AboutSection,
    contact: ContactSection,
    footer: FooterSection
};

export default function SectionRenderer({ section, isEditing, onEdit }: SectionRendererProps) {
    const SectionComponent = sectionComponents[section.type];

    if (!SectionComponent) {
        return (
            <div className="w-full p-8 text-center text-gray-500">
                Unknown section type: {section.type}
            </div>
        );
    }

    return (
        <SectionComponent
            section={section}
            isEditing={isEditing}
            onEdit={onEdit}
        />
    );
} 