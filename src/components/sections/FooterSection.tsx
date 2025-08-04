import { Section } from '@/types';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

interface FooterSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

const socialIcons = {
    Twitter,
    Facebook,
    Linkedin,
    Instagram
};

export default function FooterSection({ section, isEditing, onEdit }: FooterSectionProps) {
    const content = section.content || {};
    const copyright = (content.copyright as string) || '© 2024 My Website. All rights reserved.';
    const socialLinks = (content.socialLinks as string[]) || ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'];

    return (
        <footer
            className="w-full py-12 px-6"
            style={{
                backgroundColor: section.backgroundColor || '#1e293b',
                color: section.textColor || '#ffffff'
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">My Website</h3>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Creating amazing digital experiences with modern web technologies.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social: string, index: number) => {
                                const IconComponent = socialIcons[social as keyof typeof socialIcons];
                                if (!IconComponent) return null;

                                return (
                                    <a
                                        key={index}
                                        href="#"
                                        className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>contact@example.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Main St, City, State</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-300">{copyright}</p>
                </div>
            </div>
        </footer>
    );
} 