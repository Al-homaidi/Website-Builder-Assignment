'use client';

import { sectionTemplates } from '@/data/sectionTemplates';
import { Section } from '@/types';
import {
    Menu,
    Star,
    Zap,
    Users,
    Mail,
    Heart,
    Plus
} from 'lucide-react';

interface SectionLibraryProps {
    onAddSection: (section: Section) => void;
}

const iconMap = {
    Menu,
    Star,
    Zap,
    Users,
    Mail,
    Heart
};

export default function SectionLibrary({ onAddSection }: SectionLibraryProps) {
    const handleAddSection = (template: typeof sectionTemplates[0]) => {
        const newSection: Section = {
            id: `${template.type}-${Date.now()}`,
            type: template.type,
            title: template.defaultContent.title || template.title,
            description: template.defaultContent.description,
            imageUrl: template.defaultContent.imageUrl,
            backgroundColor: template.defaultContent.backgroundColor,
            textColor: template.defaultContent.textColor,
            order: 0,
            content: template.defaultContent.content
        };
        onAddSection(newSection);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Section Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {sectionTemplates.map((template) => {
                    const IconComponent = iconMap[template.icon as keyof typeof iconMap];
                    return (
                        <button
                            key={template.type}
                            onClick={() => handleAddSection(template)}
                            className="group relative p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white hover:bg-blue-50"
                        >
                            <div className="flex items-center gap-4 space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                                        <IconComponent className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="flex-1/2 min-w-0 flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                                        {template.title}
                                    </h3>

                                    <div className="flex-shrink-0">
                                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {template.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
} 