'use client';

import { Section } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SectionRenderer from './SectionRenderer';
import { Edit3, Trash2, GripVertical } from 'lucide-react';

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
        <div
            ref={setNodeRef}
            style={style}
            className={`relative ${isDragging ? 'opacity-50' : ''}`}
        >
            {/* Section Controls */}
            {!isPreviewMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                    <button
                        {...attributes}
                        {...listeners}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-grab active:cursor-grabbing"
                    >
                        <GripVertical className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(section)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(section.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Section Content */}
            <SectionRenderer
                section={section}
                isEditing={!isPreviewMode}
                onEdit={onEdit}
            />
        </div>
    );
} 