import { Section } from '@/types';
import { Menu } from 'lucide-react';

interface HeaderSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

export default function HeaderSection({ section, isEditing, onEdit }: HeaderSectionProps) {
    const content = section.content || {};
    const menuItems = (content.menuItems as string[]) || ['Home', 'About', 'Services', 'Contact'];
    const logo = (content.logo as string) || 'My Brand';

    return (
        <header
            className="w-full py-4 px-6 shadow-sm"
            style={{
                backgroundColor: section.backgroundColor || '#ffffff',
                color: section.textColor || '#000000'
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <h1 className="text-xl font-bold">{logo}</h1>
                    <nav className="hidden md:flex space-x-6">
                        {menuItems.map((item: string, index: number) => (
                            <a
                                key={index}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium hover:opacity-75 transition-opacity duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="md:hidden">
                    <Menu className="w-6 h-6" />
                </div>
            </div>
        </header>
    );
} 