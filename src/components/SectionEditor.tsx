'use client';

import { Section } from '@/types';
import { X, Palette, Type, Image, Plus, Minus, Eye } from 'lucide-react';
import { useState } from 'react';

interface SectionEditorProps {
    section: Section;
    onSave: (section: Section) => void;
    onCancel: () => void;
}

export default function SectionEditor({ section, onSave, onCancel }: SectionEditorProps) {
    const [content, setContent] = useState(section.content || {});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedSection: Section = {
            ...section,
            content: content
        };

        onSave(updatedSection);
    };

    const updateContent = (key: string, value: any) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const updateArrayContent = (key: string, index: number, value: any) => {
        setContent(prev => {
            const array = [...(prev[key] as any[] || [])];
            array[index] = value;
            return { ...prev, [key]: array };
        });
    };

    const addArrayItem = (key: string, defaultValue: any) => {
        setContent(prev => {
            const array = [...(prev[key] as any[] || []), defaultValue];
            return { ...prev, [key]: array };
        });
    };

    const removeArrayItem = (key: string, index: number) => {
        setContent(prev => {
            const array = [...(prev[key] as any[] || [])];
            array.splice(index, 1);
            return { ...prev, [key]: array };
        });
    };

    const renderHeaderEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Text</label>
                <input
                    type="text"
                    value={(content.logo as string) || ''}
                    onChange={(e) => updateContent('logo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="My Brand"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Image URL</label>
                <input
                    type="url"
                    value={(content.logoImage as string) || ''}
                    onChange={(e) => updateContent('logoImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to use text logo</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Menu Items</label>
                {(content.menuItems as any[])?.map((item: any, index: number) => (
                    <div key={index} className="space-y-2 mb-4 p-3 border border-gray-200 rounded-lg">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={item?.text || ''}
                                onChange={(e) => updateArrayContent('menuItems', index, { ...item, text: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                placeholder="Menu item text"
                            />
                            <input
                                type="text"
                                value={item?.url || ''}
                                onChange={(e) => updateArrayContent('menuItems', index, { ...item, url: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                placeholder="Menu item URL (e.g., #home, /about)"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('menuItems', index)}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('menuItems', { text: 'New Item', url: '#new-item' })}
                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    Add Menu Item
                </button>
            </div>
        </div>
    );

    const renderHeroEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={(content.title as string) || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Welcome to our website"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={(content.description as string) || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Your hero section description"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                <input
                    type="url"
                    value={(content.imageUrl as string) || ''}
                    onChange={(e) => updateContent('imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="https://example.com/hero-image.jpg"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                <input
                    type="text"
                    value={(content.ctaText as string) || ''}
                    onChange={(e) => updateContent('ctaText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Get Started"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                <input
                    type="text"
                    value={(content.ctaLink as string) || ''}
                    onChange={(e) => updateContent('ctaLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="#"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overlay Color</label>
                <input
                    type="color"
                    value={(content.overlayColor as string) || '#000000'}
                    onChange={(e) => updateContent('overlayColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overlay Opacity</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(content.overlayOpacity as number) || 40}
                    onChange={(e) => updateContent('overlayOpacity', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{(content.overlayOpacity as number) || 40}%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );

    const renderFeaturesEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={(content.title as string) || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Our Features"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={(content.description as string) || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Features section description"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                {(content.features as any[])?.map((feature: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Feature {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeArrayItem('features', index)}
                                className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={feature.title || ''}
                            onChange={(e) => updateArrayContent('features', index, { ...feature, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Feature title"
                        />
                        <textarea
                            value={feature.description || ''}
                            onChange={(e) => updateArrayContent('features', index, { ...feature, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Feature description"
                            rows={2}
                        />
                        <select
                            value={feature.icon || 'Check'}
                            onChange={(e) => updateArrayContent('features', index, { ...feature, icon: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        >
                            <option value="Check">Check</option>
                            <option value="Zap">Zap</option>
                            <option value="Star">Star</option>
                            <option value="Shield">Shield</option>
                        </select>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('features', { title: 'New Feature', description: 'Feature description', icon: 'Check' })}
                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    Add Feature
                </button>
            </div>
        </div>
    );

    const renderAboutEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={(content.title as string) || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="About Us"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={(content.description as string) || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="About section description"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                <textarea
                    value={(content.mission as string) || ''}
                    onChange={(e) => updateContent('mission', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Our mission statement"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Values</label>
                {(content.values as string[])?.map((value: string, index: number) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => updateArrayContent('values', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Company value"
                        />
                        <button
                            type="button"
                            onClick={() => removeArrayItem('values', index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('values', 'New Value')}
                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    Add Value
                </button>
            </div>
        </div>
    );

    const renderContactEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={(content.title as string) || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Contact Us"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={(content.description as string) || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Contact section description"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    value={(content.email as string) || ''}
                    onChange={(e) => updateContent('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="contact@example.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                    type="tel"
                    value={(content.phone as string) || ''}
                    onChange={(e) => updateContent('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="+1 (555) 123-4567"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                    value={(content.address as string) || ''}
                    onChange={(e) => updateContent('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="123 Main St, City, State 12345"
                    rows={3}
                />
            </div>
        </div>
    );

    const renderFooterEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={(content.title as string) || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Footer Title"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={(content.description as string) || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Footer description"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                <input
                    type="text"
                    value={(content.copyright as string) || ''}
                    onChange={(e) => updateContent('copyright', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="© 2024 My Website. All rights reserved."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
                {(content.socialLinks as string[])?.map((social: string, index: number) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <select
                            value={social}
                            onChange={(e) => updateArrayContent('socialLinks', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        >
                            <option value="Twitter">Twitter</option>
                            <option value="Facebook">Facebook</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="GitHub">GitHub</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => removeArrayItem('socialLinks', index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem('socialLinks', 'Twitter')}
                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    Add Social Link
                </button>
            </div>
        </div>
    );

    const renderSectionSpecificEditor = () => {
        switch (section.type) {
            case 'header':
                return renderHeaderEditor();
            case 'hero':
                return renderHeroEditor();
            case 'features':
                return renderFeaturesEditor();
            case 'about':
                return renderAboutEditor();
            case 'contact':
                return renderContactEditor();
            case 'footer':
                return renderFooterEditor();
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section</h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section Specific Content */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Section Content</h3>
                            {renderSectionSpecificEditor()}
                        </div>

                        <div className="flex space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 