'use client';

import { Section } from '@/types';
import SectionRenderer from './SectionRenderer';
import { Edit3, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface SortableSectionProps {
    section: Section;
    isPreviewMode: boolean;
    onEdit: (section: Section) => void;
    onDelete: (sectionId: string) => void;
}

export default function SortableSection({
    section,
    isPreviewMode,
    onEdit,
    onDelete
}: SortableSectionProps) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
        >
            {/* Section Controls */}
            {!isPreviewMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
                    <motion.button
                        className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-grab active:cursor-grabbing"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <GripVertical className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                        onClick={() => onEdit(section)}
                        className="p-3 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => onDelete(section.id)}
                        className="p-3 text-gray-400 hover:text-red-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </div>
            )}
            {/* Section Content */}
            <div>
                <SectionRenderer
                    section={section}
                    isEditing={!isPreviewMode}
                    onEdit={onEdit}
                />
            </div>
        </motion.div>
    );
} 