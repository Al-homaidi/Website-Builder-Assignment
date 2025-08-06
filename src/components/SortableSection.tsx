'use client';

import { Section } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            className={`relative ${isDragging ? 'opacity-50' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
        >
            {/* Section Controls */}
            {!isPreviewMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                    <motion.button
                        {...attributes}
                        {...listeners}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-grab active:cursor-grabbing"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <GripVertical className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => onEdit(section)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => onDelete(section.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </div>
            )}
            {/* Section Content */}
            <SectionRenderer
                section={section}
                isEditing={!isPreviewMode}
                onEdit={onEdit}
            />
        </motion.div>
    );
} 