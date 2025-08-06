'use client';

import { useState, useEffect } from 'react';
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
    X as CloseIcon,
    MoreVertical,
    Trash2,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

export default function WebsiteBuilderClient() {
    const [sections, setSections] = useState<Section[]>([]);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarPinned, setSidebarPinned] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedSections = localStorage.getItem('websiteBuilder_sections');
        const savedSidebarPinned = localStorage.getItem('websiteBuilder_sidebarPinned');
        const savedEditingSection = localStorage.getItem('websiteBuilder_editingSection');
        const savedSidebarOpen = localStorage.getItem('websiteBuilder_sidebarOpen');
        const savedPreviewMode = localStorage.getItem('websiteBuilder_previewMode');

        if (savedSections) {
            try {
                setSections(JSON.parse(savedSections));
            } catch (error) {
                console.error('Error loading sections from localStorage:', error);
            }
        }

        if (savedSidebarPinned) {
            setSidebarPinned(JSON.parse(savedSidebarPinned));
        }

        if (savedEditingSection) {
            try {
                setEditingSection(JSON.parse(savedEditingSection));
            } catch (error) {
                console.error('Error loading editing section from localStorage:', error);
            }
        }

        if (savedSidebarOpen) {
            setSidebarOpen(JSON.parse(savedSidebarOpen));
        }

        if (savedPreviewMode) {
            setIsPreviewMode(JSON.parse(savedPreviewMode));
        }
    }, []);

    // Save sections to localStorage whenever sections change
    useEffect(() => {
        localStorage.setItem('websiteBuilder_sections', JSON.stringify(sections));
        showSaveNotification();
    }, [sections]);

    // Save sidebar pinned state to localStorage
    useEffect(() => {
        localStorage.setItem('websiteBuilder_sidebarPinned', JSON.stringify(sidebarPinned));
    }, [sidebarPinned]);

    // Save editing section to localStorage
    useEffect(() => {
        if (editingSection) {
            localStorage.setItem('websiteBuilder_editingSection', JSON.stringify(editingSection));
        } else {
            localStorage.removeItem('websiteBuilder_editingSection');
        }
    }, [editingSection]);

    // Save sidebar open state to localStorage
    useEffect(() => {
        localStorage.setItem('websiteBuilder_sidebarOpen', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    // Save preview mode state to localStorage
    useEffect(() => {
        localStorage.setItem('websiteBuilder_previewMode', JSON.stringify(isPreviewMode));
    }, [isPreviewMode]);



    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddSection = (newSection: Section) => {
        setSections(prev => {
            const sectionWithOrder = {
                ...newSection,
                order: prev.length
            };
            return [...prev, sectionWithOrder];
        });
        if (!sidebarPinned) setSidebarOpen(false);
    };

    const handleDragEnd = (event: DragEndEvent) => {
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
    };

    const handleEditSection = (section: Section) => {
        setEditingSection(section);
    };

    const handleSaveSection = (updatedSection: Section) => {
        setSections(prev =>
            prev.map(section =>
                section.id === updatedSection.id ? updatedSection : section
            )
        );
        setEditingSection(null);
    };

    const handleDeleteSection = (sectionId: string) => {
        setSections(prev =>
            prev.filter(section => section.id !== sectionId)
                .map((section, index) => ({ ...section, order: index }))
        );
    };

    const handleExport = () => {
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
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    };


    const handleClearAllData = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will remove all sections and settings. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, clear all',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            setSections([]);
            setEditingSection(null);
            setSidebarOpen(false);
            setSidebarPinned(true);
            setIsPreviewMode(false);

            localStorage.removeItem('websiteBuilder_sections');
            localStorage.removeItem('websiteBuilder_editingSection');
            localStorage.removeItem('websiteBuilder_sidebarOpen');
            localStorage.removeItem('websiteBuilder_sidebarPinned');
            localStorage.removeItem('websiteBuilder_previewMode');

            await Swal.fire({
                title: 'Cleared!',
                text: 'All data has been removed.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    // Temporary notification function to fix build error
    function showSaveNotification() {
        // You can replace this with a real notification system
        // For now, just log to the console
        // console.log('Changes saved!');
    }


    const sortedSections = sections.sort((a, b) => a.order - b.order);

    // Overlay for sidebar (when not pinned)
    const overlay = (
        <AnimatePresence>
            {sidebarOpen && !sidebarPinned && (
                <motion.div
                    key="sidebar-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </AnimatePresence>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="mx-auto px-4">
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

                        {/* Desktop buttons */}
                        <div className="hidden md:flex items-center space-x-4">
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
                            <div className="flex gap-2">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    Import
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleImport}
                                        className="hidden"
                                    />
                                </label>
                                <button
                                    onClick={handleClearAllData}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All Data
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Open menu"
                            >
                                <MoreVertical className="w-6 h-6 text-gray-700" />
                            </button>

                            {/* Mobile dropdown menu */}
                            {menuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                setIsPreviewMode(!isPreviewMode);
                                                setMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 ${isPreviewMode
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Eye className="w-4 h-4 mr-3" />
                                            {isPreviewMode ? 'Edit Mode' : 'Preview'}
                                        </button>
                                        <label className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                                            <Upload className="w-4 h-4 mr-3" />
                                            Import
                                            <input
                                                type="file"
                                                accept=".json"
                                                onChange={(e) => {
                                                    handleImport(e);
                                                    setMenuOpen(false);
                                                }}
                                                className="hidden"
                                            />
                                        </label>
                                        <button
                                            onClick={() => {
                                                handleExport();
                                                setMenuOpen(false);
                                            }}
                                            disabled={sections.length === 0}
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Download className="w-4 h-4 mr-3" />
                                            Export
                                        </button>
                                        <button
                                            onClick={handleClearAllData}
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <Trash2 className="w-4 h-4 mr-3" />
                                            Clear All Data
                                        </button>
                                    </div>
                                </div>
                            )}
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
                        <AnimatePresence>
                            {sidebarOpen && (
                                <motion.div
                                    key="sidebar-motion"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'tween', duration: 0.3 }}
                                    className={`fixed top-0 left-0 bottom-0 w-80 z-40 bg-white border-r border-gray-200 shadow-lg`}
                                >
                                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                        <h2 className="text-lg font-semibold text-gray-900">Section Library</h2>
                                        <div className='flex items-center gap-3'>
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
                                    </div>
                                    <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
                                        <SectionLibrary onAddSection={handleAddSection} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
            <AnimatePresence>
                {editingSection && (
                    <motion.div
                        key="section-editor-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <SectionEditor
                            section={editingSection}
                            onSave={handleSaveSection}
                            onCancel={() => setEditingSection(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 