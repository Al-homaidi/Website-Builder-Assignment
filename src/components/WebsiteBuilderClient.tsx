'use client';

import { useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Section, WebsiteConfig } from '@/types';
import SectionLibrary from './SectionLibrary';
import SectionEditor from './SectionEditor';
import SortableSection from './SortableSection';
import {
    Download,
    Upload,
    Eye,
    Settings,
    Menu as MenuIcon,
    Pin,
    X as CloseIcon
} from 'lucide-react';

export default function WebsiteBuilderClient() {
    const [sections, setSections] = useState<Section[]>([]);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarPinned, setSidebarPinned] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddSection = useCallback((newSection: Section) => {
        setSections(prev => {
            const sectionWithOrder = {
                ...newSection,
                order: prev.length
            };
            return [...prev, sectionWithOrder];
        });
        if (!sidebarPinned) setSidebarOpen(false);
    }, [sidebarPinned]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSections(prev => {
                const oldIndex = prev.findIndex(section => section.id === active.id);
                const newIndex = prev.findIndex(section => section.id === over.id);
                return arrayMove(prev, oldIndex, newIndex).map((section, index) => ({
                    ...section,
                    order: index
                }));
            });
        }
    }, []);

    const handleEditSection = useCallback((section: Section) => {
        setEditingSection(section);
    }, []);

    const handleSaveSection = useCallback((updatedSection: Section) => {
        setSections(prev =>
            prev.map(section =>
                section.id === updatedSection.id ? updatedSection : section
            )
        );
        setEditingSection(null);
    }, []);

    const handleDeleteSection = useCallback((sectionId: string) => {
        setSections(prev =>
            prev.filter(section => section.id !== sectionId)
                .map((section, index) => ({ ...section, order: index }))
        );
    }, []);

    const handleExport = useCallback(() => {
        const config: WebsiteConfig = {
            id: `website-${Date.now()}`,
            name: 'My Website',
            sections: sections.sort((a, b) => a.order - b.order),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website-config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [sections]);

    const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config: WebsiteConfig = JSON.parse(e.target?.result as string);
                setSections(config.sections);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid file format');
            }
        };
        reader.readAsText(file);
    }, []);

    const sortedSections = sections.sort((a, b) => a.order - b.order);

    // Overlay for sidebar (when not pinned)
    const overlay = sidebarOpen && !sidebarPinned ? (
        <div
            className="fixed inset-0 bg-opacity-30 z-30"
            onClick={() => setSidebarOpen(false)}
        />
    ) : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            {/* Sidebar toggle button (only if not pinned) */}
                            {!sidebarPinned && (
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Open section library"
                                >
                                    <MenuIcon className="w-6 h-6 text-gray-700" />
                                </button>
                            )}
                            <h1 className="text-xl font-semibold text-gray-900">Website Builder</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isPreviewMode
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                {isPreviewMode ? 'Edit Mode' : 'Preview'}
                            </button>
                            <label className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors duration-200 cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={handleExport}
                                disabled={sections.length === 0}
                                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`grid grid-cols-1 p-4 gap-4 min-h-screen ${sidebarPinned ? 'lg:grid-cols-[320px_1fr]' : ''}`}>
                {/* Sidebar */}
                {sidebarPinned ? (
                    <div className="relative">
                        <button
                            onClick={() => setSidebarPinned((p) => !p)}
                            className={`flex absolute right-4 top-4 items-center px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${sidebarPinned ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            title={sidebarPinned ? 'Unpin Section Library' : 'Pin Section Library'}
                        >
                            <Pin className="w-4 h-4" />
                        </button>
                        <SectionLibrary onAddSection={handleAddSection} />
                    </div>
                ) : (
                    <>
                        {overlay}
                        <div
                            className={`fixed top-0 left-0 bottom-0 w-80 z-40 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Section Library</h2>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded hover:bg-gray-100"
                                    aria-label="Close section library"
                                >
                                    <CloseIcon className="w-5 h-5 text-gray-500" />
                                </button>
                                <button
                                    onClick={() => setSidebarPinned((p) => !p)}
                                    className={`flex items-center px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${sidebarPinned ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    title={sidebarPinned ? 'Unpin Section Library' : 'Pin Section Library'}
                                >
                                    <Pin className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
                                <SectionLibrary onAddSection={handleAddSection} />
                            </div>
                        </div>
                    </>
                )}

                {/* Main Content */}
                <div className={`transition-all duration-300`}>
                    <div>
                        <div className="grid grid-cols-1 ${isPreviewMode ? '' : 'lg:grid-cols-2'} gap-8">
                            {/* Preview Area */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {isPreviewMode ? 'Preview' : 'Website Preview'}
                                    </h2>
                                </div>
                                <div className="min-h-[600px]">
                                    {sections.length === 0 ? (
                                        <div className="flex items-center justify-center h-96 text-gray-500">
                                            <div className="text-center">
                                                <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                <p className="text-lg font-medium">No sections added yet</p>
                                                <p className="text-sm">Add sections from the library to get started</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <SortableContext
                                                items={sortedSections.map(section => section.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {sortedSections.map((section) => (
                                                    <SortableSection
                                                        key={section.id}
                                                        section={section}
                                                        isPreviewMode={isPreviewMode}
                                                        onEdit={handleEditSection}
                                                        onDelete={handleDeleteSection}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


            {/* Section Editor Modal */}
            {editingSection && (
                <SectionEditor
                    section={editingSection}
                    onSave={handleSaveSection}
                    onCancel={() => setEditingSection(null)}
                />
            )}
        </div>
    );
} 