import { Section } from '@/types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

interface MenuItem {
    text: string;
    url: string;
}

export default function HeaderSection({ section, isEditing, onEdit }: HeaderSectionProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const content = section.content || {};
    const menuItems = (content.menuItems as MenuItem[]) || [
        { text: 'Home', url: '#home' },
        { text: 'About', url: '#about' },
        { text: 'Services', url: '#services' },
        { text: 'Contact', url: '#contact' }
    ];
    const logo = (content.logo as string) || 'My Brand';
    const logoImage = (content.logoImage as string) || section.imageUrl;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#ffffff';
    const textColor = (content.textColor as string) || section.textColor || '#000000';

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            className="w-full py-4 px-4 shadow-sm relative"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {logoImage ? (
                        <img
                            src={logoImage}
                            alt={logo}
                            className="w-[3vw] h-[3vw] object-cover rounded-full"
                        />
                    ) : (
                        <h1 className="font-bold">{logo}</h1>
                    )}
                    <nav className="hidden md:flex space-x-4">
                        {menuItems.map((item: MenuItem, index: number) => (
                            <a
                                key={index}
                                href={item.url}
                                className="font-medium hover:opacity-75 transition-opacity duration-200"
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
                    <nav className="px-4 py-2">
                        {menuItems.map((item: MenuItem, index: number) => (
                            <a
                                key={index}
                                href={item.url}
                                className="block text-base sm:text-lg md:text-xl lg:text-2xl py-3 px-4 font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
} 