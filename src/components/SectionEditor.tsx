'use client';

import { Section } from '@/types';
import { X, Plus, Minus, } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for array items
interface MenuItem {
    text: string;
    url: string;
}
interface FeatureItem {
    title: string;
    description: string;
    icon: string;
}
interface AboutSectionItem {
    type: 'mission' | 'values';
    title: string;
    description?: string;
    values?: string[];
    icon: string;
    titleColor?: string;
    descriptionColor?: string;
    valuesColor?: string;
    iconColor?: string;
    iconBackgroundColor?: string;
}
interface ContactItem {
    title: string;
    subtitle: string;
    icon: string;
    iconColor?: string;
    iconBackgroundColor?: string;
    titleColor?: string;
    subtitleColor?: string;
}
interface FooterSectionItem {
    type: 'description' | 'links' | 'contact' | 'social';
    title: string;
    subtitle?: string;
    values?: { text: string; url: string; isLink: boolean }[];
    socialLinks?: SocialLink[];
    titleColor?: string;
    subtitleColor?: string;
    valuesColor?: string;
}
interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    iconColor?: string;
    iconBackgroundColor?: string;
}

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

    const updateContent = (key: string, value: unknown) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const updateArrayContent = (
        key: string,
        index: number,
        value: MenuItem | FeatureItem | AboutSectionItem | ContactItem | FooterSectionItem | SocialLink | string
    ) => {
        setContent(prev => {
            const array = Array.isArray(prev[key]) ? [...(prev[key] as unknown[])] : [];
            array[index] = value;
            return { ...prev, [key]: array };
        });
    };

    const addArrayItem = (
        key: string,
        defaultValue: MenuItem | FeatureItem | AboutSectionItem | ContactItem | FooterSectionItem | SocialLink | string
    ) => {
        setContent(prev => {
            const array = Array.isArray(prev[key]) ? [...(prev[key] as unknown[]), defaultValue] : [defaultValue];
            return { ...prev, [key]: array };
        });
    };

    const removeArrayItem = (key: string, index: number) => {
        setContent(prev => {
            const array = Array.isArray(prev[key]) ? [...(prev[key] as unknown[])] : [];
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

            {/* Color Settings */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Color Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Logo Text Color</label>
                        <input
                            type="color"
                            value={(content.LogotextColor as string) || '#000000'}
                            onChange={(e) => updateContent('LogotextColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Menu Items Color</label>
                        <input
                            type="color"
                            value={(content.MenuItemsColor as string) || '#000000'}
                            onChange={(e) => updateContent('MenuItemsColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">background Color</label>
                        <input
                            type="color"
                            value={(content.backgroundColor as string) || '#000000'}
                            onChange={(e) => updateContent('backgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Image Settings */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image Settings</h4>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Image Border Radius</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={(content.RoundedImage as string) || '100'}
                        onChange={(e) => updateContent('RoundedImage', e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>{(content.RoundedImage as string) || '100'}%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Menu Items</label>
                {(content.menuItems as MenuItem[])?.map((item: MenuItem, index: number) => (
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
                <p className="text-xs text-gray-500 mt-1">Leave empty to use Background</p>
            </div>

            {/* Color Settings */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Color Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                        <input
                            type="color"
                            value={(content.titleColor as string) || '#ffffff'}
                            onChange={(e) => updateContent('titleColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Description Color</label>
                        <input
                            type="color"
                            value={(content.descriptionColor as string) || '#1e293b'}
                            onChange={(e) => updateContent('descriptionColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">background Color</label>
                        <input
                            type="color"
                            value={(content.backgroundColor as string) || '#000000'}
                            onChange={(e) => updateContent('backgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                </div>
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
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Button Text Color</label>
                    <input
                        type="color"
                        value={(content.buttonTextColor as string) || '#ffffff'}
                        onChange={(e) => updateContent('buttonTextColor', e.target.value)}
                        className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Button Background Color</label>
                    <input
                        type="color"
                        value={(content.buttonbackgroundColor as string) || '#1e293b'}
                        onChange={(e) => updateContent('buttonbackgroundColor', e.target.value)}
                        className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                    />
                </div>
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

            {/* Color Settings */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Color Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                        <input
                            type="color"
                            value={(content.backgroundColor as string) || '#fff'}
                            onChange={(e) => updateContent('backgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                        <input
                            type="color"
                            value={(content.titleColor as string) || '#000000'}
                            onChange={(e) => updateContent('titleColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Description Color</label>
                        <input
                            type="color"
                            value={(content.descriptionColor as string) || '#1e293b'}
                            onChange={(e) => updateContent('descriptionColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                {(content.features as FeatureItem[])?.map((feature: FeatureItem, index: number) => (
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
                <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Color Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Card Background</label>
                            <input
                                type="color"
                                value={(content.cardColor as string) || '#ffffff'}
                                onChange={(e) => updateContent('cardColor', e.target.value)}
                                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Card Title Color</label>
                            <input
                                type="color"
                                value={(content.cardTitleColor as string) || '#000000'}
                                onChange={(e) => updateContent('cardTitleColor', e.target.value)}
                                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Card Description Color</label>
                            <input
                                type="color"
                                value={(content.cardDescriptionColor as string) || '#666666'}
                                onChange={(e) => updateContent('cardDescriptionColor', e.target.value)}
                                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                            <input
                                type="color"
                                value={(content.cardIconColor as string) || '#3b82f6'}
                                onChange={(e) => updateContent('cardIconColor', e.target.value)}
                                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Icon Background</label>
                            <input
                                type="color"
                                value={(content.cardIconBackgroundColor as string) || '#dbeafe'}
                                onChange={(e) => updateContent('cardIconBackgroundColor', e.target.value)}
                                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                    type="url"
                    value={(content.imageUrl as string) || ''}
                    onChange={(e) => updateContent('imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="https://example.com/hero-image.jpg"
                />
            </div>

            {/* Color Settings */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Color Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                        <input
                            type="color"
                            value={(content.titleColor as string) || '#000000'}
                            onChange={(e) => updateContent('titleColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Description Color</label>
                        <input
                            type="color"
                            value={(content.descriptionColor as string) || '#666666'}
                            onChange={(e) => updateContent('descriptionColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">background Color</label>
                        <input
                            type="color"
                            value={(content.backgroundColor as string) || '#000000'}
                            onChange={(e) => updateContent('backgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* About Sections */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">About Sections</h4>
                {(content.sections as AboutSectionItem[])?.map((section: AboutSectionItem, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                            <h5 className="font-medium">{section.type === 'mission' ? 'Mission Section' : 'Values Section'}</h5>
                            <button
                                type="button"
                                onClick={() => removeArrayItem('sections', index)}
                                className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Section Type</label>
                            <select
                                value={section.type || 'mission'}
                                onChange={(e) => updateArrayContent('sections', index, { ...section, type: e.target.value as 'mission' | 'values' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            >
                                <option value="mission">Mission</option>
                                <option value="values">Values</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Icon</label>
                            <select
                                value={section.icon || 'Target'}
                                onChange={(e) => updateArrayContent('sections', index, { ...section, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            >
                                <option value="Target">Target</option>
                                <option value="Users">Users</option>
                                <option value="Eye">Eye</option>
                                <option value="Flag">Flag</option>
                                <option value="Heart">Heart</option>
                                <option value="Star">Star</option>
                                <option value="Zap">Zap</option>
                                <option value="Shield">Shield</option>
                                <option value="Check">Check</option>
                                <option value="Award">Award</option>
                                <option value="Globe">Globe</option>
                                <option value="Lightbulb">Lightbulb</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Title</label>
                            <input
                                type="text"
                                value={section.title || ''}
                                onChange={(e) => updateArrayContent('sections', index, { ...section, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                placeholder="Section title"
                            />
                        </div>

                        {section.type === 'mission' ? (
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Description</label>
                                <textarea
                                    value={section.description || ''}
                                    onChange={(e) => updateArrayContent('sections', index, { ...section, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    placeholder="Mission description"
                                    rows={3}
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Values</label>
                                {(section.values ?? []).map((value: string, valueIndex: number) => (
                                    <div key={valueIndex} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => {
                                                const newValues = [...(section.values ?? [])];
                                                newValues[valueIndex] = e.target.value;
                                                updateArrayContent('sections', index, { ...section, values: newValues });
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                            placeholder="Value"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newValues = [...(section.values ?? [])];
                                                newValues.splice(valueIndex, 1);
                                                updateArrayContent('sections', index, { ...section, values: newValues });
                                            }}
                                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newValues = [...(section.values ?? []), 'New Value'];
                                        updateArrayContent('sections', index, { ...section, values: newValues });
                                    }}
                                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Value
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                                <input
                                    type="color"
                                    value={section.titleColor || '#000000'}
                                    onChange={(e) => updateArrayContent('sections', index, { ...section, titleColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                    {section.type === 'mission' ? 'Description Color' : 'Values Color'}
                                </label>
                                <input
                                    type="color"
                                    value={section.type === 'mission' ? (section.descriptionColor || '#666666') : (section.valuesColor || '#666666')}
                                    onChange={(e) => updateArrayContent('sections', index, {
                                        ...section,
                                        [section.type === 'mission' ? 'descriptionColor' : 'valuesColor']: e.target.value
                                    })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                                <input
                                    type="color"
                                    value={section.iconColor || '#3b82f6'}
                                    onChange={(e) => updateArrayContent('sections', index, { ...section, iconColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Icon Background</label>
                                <input
                                    type="color"
                                    value={section.iconBackgroundColor || '#dbeafe'}
                                    onChange={(e) => updateArrayContent('sections', index, { ...section, iconBackgroundColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => addArrayItem('sections', {
                            type: 'mission',
                            title: 'Our Mission',
                            description: 'To provide the best solutions for our customers',
                            icon: 'Target',
                            titleColor: '#000000',
                            descriptionColor: '#666666',
                            iconColor: '#3b82f6',
                            iconBackgroundColor: '#dbeafe'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Mission Section
                    </button>
                    <button
                        type="button"
                        onClick={() => addArrayItem('sections', {
                            type: 'values',
                            title: 'Our Values',
                            values: ['Innovation', 'Quality', 'Customer Focus'],
                            icon: 'Users',
                            titleColor: '#000000',
                            valuesColor: '#666666',
                            iconColor: '#3b82f6',
                            iconBackgroundColor: '#dbeafe'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Values Section
                    </button>
                </div>
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

            {/* Color Settings */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Color Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                        <input
                            type="color"
                            value={(content.titleColor as string) || '#000000'}
                            onChange={(e) => updateContent('titleColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Description Color</label>
                        <input
                            type="color"
                            value={(content.descriptionColor as string) || '#666666'}
                            onChange={(e) => updateContent('descriptionColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                        <input
                            type="color"
                            value={(content.textColor as string) || '#1e293b'}
                            onChange={(e) => updateContent('textColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">background Color</label>
                        <input
                            type="color"
                            value={(content.backgroundColor as string) || '#000000'}
                            onChange={(e) => updateContent('backgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Button Text Color</label>
                        <input
                            type="color"
                            value={(content.ctaTextColor as string) || '#ffffff'}
                            onChange={(e) => updateContent('ctaTextColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Button Background Color</label>
                        <input
                            type="color"
                            value={(content.ctabackgroundColor as string) || '#1e293b'}
                            onChange={(e) => updateContent('ctabackgroundColor', e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Items */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Items</h4>
                {(content.contactItems as ContactItem[])?.map((item: ContactItem, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                            <h5 className="font-medium">Contact Item {index + 1}</h5>
                            <button
                                type="button"
                                onClick={() => removeArrayItem('contactItems', index)}
                                className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Icon</label>
                            <select
                                value={item.icon || 'Mail'}
                                onChange={(e) => updateArrayContent('contactItems', index, { ...item, icon: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            >
                                <option value="Mail">Mail</option>
                                <option value="Phone">Phone</option>
                                <option value="MapPin">MapPin</option>
                                <option value="Clock">Clock</option>
                                <option value="Globe">Globe</option>
                                <option value="MessageCircle">MessageCircle</option>
                                <option value="Building">Building</option>
                                <option value="User">User</option>
                                <option value="Calendar">Calendar</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Title</label>
                            <input
                                type="text"
                                value={item.title || ''}
                                onChange={(e) => updateArrayContent('contactItems', index, { ...item, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                placeholder="Contact title"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={item.subtitle || ''}
                                onChange={(e) => updateArrayContent('contactItems', index, { ...item, subtitle: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                placeholder="Contact subtitle"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                                <input
                                    type="color"
                                    value={item.iconColor || '#3b82f6'}
                                    onChange={(e) => updateArrayContent('contactItems', index, { ...item, iconColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Icon Background</label>
                                <input
                                    type="color"
                                    value={item.iconBackgroundColor || '#dbeafe'}
                                    onChange={(e) => updateArrayContent('contactItems', index, { ...item, iconBackgroundColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                                <input
                                    type="color"
                                    value={item.titleColor || '#000000'}
                                    onChange={(e) => updateArrayContent('contactItems', index, { ...item, titleColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Subtitle Color</label>
                                <input
                                    type="color"
                                    value={item.subtitleColor || '#666666'}
                                    onChange={(e) => updateArrayContent('contactItems', index, { ...item, subtitleColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => addArrayItem('contactItems', {
                            title: 'Email',
                            subtitle: 'contact@example.com',
                            icon: 'Mail',
                            iconColor: '#3b82f6',
                            iconBackgroundColor: '#dbeafe',
                            titleColor: '#000000',
                            subtitleColor: '#666666'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );

    const renderFooterEditor = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright</label>
                <input
                    type="text"
                    value={(content.copyright as string) || ''}
                    onChange={(e) => updateContent('copyright', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Footer"
                />
            </div>

            {/* Color Settings */}
            <div>
                <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                <input
                    type="color"
                    value={(content.backgroundColor as string) || '#cbd5e1'}
                    onChange={(e) => updateContent('backgroundColor', e.target.value)}
                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
            </div>

            {/* Footer Sections */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Footer Sections</h4>
                {(content.sections as FooterSectionItem[])?.map((section: FooterSectionItem, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                            <h5 className="font-medium">Section {index + 1}</h5>
                            <button
                                type="button"
                                onClick={() => removeArrayItem('sections', index)}
                                className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Type</label>
                            <select
                                value={section.type || 'description'}
                                onChange={(e) => updateArrayContent('sections', index, { ...section, type: e.target.value as 'description' | 'links' | 'contact' | 'social' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            >
                                <option value="description">Text Section</option>
                                <option value="links">Links Section</option>
                                <option value="contact">Contact Section</option>
                                <option value="social">Social Media Section</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Title</label>
                            <input
                                type="text"
                                value={section.title || ''}
                                onChange={(e) => updateArrayContent('sections', index, { ...section, title: e.target.value })}
                                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                placeholder="Section title"
                            />
                        </div>

                        {section.type === 'description' && (
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Subtitle</label>
                                <textarea
                                    value={section.subtitle || ''}
                                    onChange={(e) => updateArrayContent('sections', index, { ...section, subtitle: e.target.value })}
                                    className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    placeholder="Section subtitle"
                                    rows={3}
                                />
                            </div>
                        )}

                        {(section.type === 'links' || section.type === 'contact') && (
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Values</label>
                                {(section.values ?? []).map((item: { text: string; url: string; isLink: boolean }, itemIndex: number) => (
                                    <div key={itemIndex} className="border border-gray-200 rounded p-2 mb-2">
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={item.text || ''}
                                                onChange={(e) => {
                                                    const newValues = [...(section.values ?? [])];
                                                    newValues[itemIndex] = { ...item, text: e.target.value };
                                                    updateArrayContent('sections', index, { ...section, values: newValues });
                                                }}
                                                className="flex-1 px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm"
                                                placeholder="Text"
                                            />
                                            <input
                                                type="text"
                                                value={item.url || ''}
                                                onChange={(e) => {
                                                    const newValues = [...(section.values ?? [])];
                                                    newValues[itemIndex] = { ...item, url: e.target.value };
                                                    updateArrayContent('sections', index, { ...section, values: newValues });
                                                }}
                                                className="flex-1 px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm"
                                                placeholder="URL"
                                            />
                                            <label className="flex items-center gap-1 text-xs">
                                                <input
                                                    type="checkbox"
                                                    checked={item.isLink || false}
                                                    onChange={(e) => {
                                                        const newValues = [...(section.values ?? [])];
                                                        newValues[itemIndex] = { ...item, isLink: e.target.checked };
                                                        updateArrayContent('sections', index, { ...section, values: newValues });
                                                    }}
                                                />
                                                Link
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newValues = (section.values ?? []).filter((_: { text: string; url: string; isLink: boolean }, i: number) => i !== itemIndex);
                                                    updateArrayContent('sections', index, { ...section, values: newValues });
                                                }}
                                                className="text-red-600 hover:bg-red-50 p-1 rounded text-xs"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newValues = [...(section.values ?? []), { text: '', url: '', isLink: false }];
                                        updateArrayContent('sections', index, { ...section, values: newValues });
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs"
                                >
                                    <Plus className="w-3 h-3 inline mr-1" />
                                    Add Value
                                </button>
                            </div>
                        )}

                        {section.type === 'social' && (
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Social Links</label>
                                {(section.socialLinks ?? []).map((social: SocialLink, socialIndex: number) => (
                                    <div key={socialIndex} className="border border-gray-200 rounded p-2 mb-2">
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <select
                                                value={social.platform || 'Twitter'}
                                                onChange={(e) => {
                                                    const newSocialLinks = [...(section.socialLinks ?? [])];
                                                    newSocialLinks[socialIndex] = { ...social, platform: e.target.value, icon: e.target.value };
                                                    updateArrayContent('sections', index, { ...section, socialLinks: newSocialLinks });
                                                }}
                                                className="px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm"
                                            >
                                                <option value="Twitter">Twitter</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="YouTube">YouTube</option>
                                                <option value="GitHub">GitHub</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={social.url || ''}
                                                onChange={(e) => {
                                                    const newSocialLinks = [...(section.socialLinks ?? [])];
                                                    newSocialLinks[socialIndex] = { ...social, url: e.target.value };
                                                    updateArrayContent('sections', index, { ...section, socialLinks: newSocialLinks });
                                                }}
                                                className="px-2 py-1 border text-gray-700 border-gray-300 rounded text-sm"
                                                placeholder="URL"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                                                <input
                                                    type="color"
                                                    value={social.iconColor || '#1da1f2'}
                                                    onChange={(e) => {
                                                        const newSocialLinks = [...(section.socialLinks ?? [])];
                                                        newSocialLinks[socialIndex] = { ...social, iconColor: e.target.value };
                                                        updateArrayContent('sections', index, { ...section, socialLinks: newSocialLinks });
                                                    }}
                                                    className="w-full h-6 border text-gray-700 border-gray-300 rounded cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                                                <input
                                                    type="color"
                                                    value={social.iconBackgroundColor || '#1da1f2'}
                                                    onChange={(e) => {
                                                        const newSocialLinks = [...(section.socialLinks ?? [])];
                                                        newSocialLinks[socialIndex] = { ...social, iconBackgroundColor: e.target.value };
                                                        updateArrayContent('sections', index, { ...section, socialLinks: newSocialLinks });
                                                    }}
                                                    className="w-full h-6 border text-gray-700 border-gray-300 rounded cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSocialLinks = (section.socialLinks ?? []).filter((_: SocialLink, i: number) => i !== socialIndex);
                                                updateArrayContent('sections', index, { ...section, socialLinks: newSocialLinks });
                                            }}
                                            className="text-red-600 hover:bg-red-50 p-1 rounded text-xs mt-2"
                                        >
                                            <Minus className="w-3 h-3" />
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newSocialLinks = [...(section.socialLinks ?? []), {
                                            platform: 'Twitter',
                                            url: 'https://twitter.com',
                                            icon: 'Twitter',
                                            iconColor: '#1da1f2',
                                            iconBackgroundColor: '#1da1f2'
                                        }];
                                        updateArrayContent('sections', index, { ...section, socialLinks: newSocialLinks });
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs"
                                >
                                    <Plus className="w-3 h-3 inline mr-1" />
                                    Add Social Link
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                                <input
                                    type="color"
                                    value={section.titleColor || '#ffffff'}
                                    onChange={(e) => updateArrayContent('sections', index, { ...section, titleColor: e.target.value })}
                                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            {(section.type === 'description') && (
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Subtitle Color</label>
                                    <input
                                        type="color"
                                        value={section.subtitleColor || '#cbd5e1'}
                                        onChange={(e) => updateArrayContent('sections', index, { ...section, subtitleColor: e.target.value })}
                                        className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                    />
                                </div>
                            )}
                            {(section.type === 'links' || section.type === 'contact') && (
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Values Color</label>
                                    <input
                                        type="color"
                                        value={section.valuesColor || '#cbd5e1'}
                                        onChange={(e) => updateArrayContent('sections', index, { ...section, valuesColor: e.target.value })}
                                        className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => addArrayItem('sections', {
                            type: 'description',
                            title: 'Footer',
                            subtitle: 'Creating amazing digital experiences with modern web technologies.',
                            titleColor: '#ffffff',
                            subtitleColor: '#cbd5e1'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Text Section
                    </button>
                    <button
                        type="button"
                        onClick={() => addArrayItem('sections', {
                            type: 'links',
                            title: 'Quick Links',
                            values: [
                                { text: 'Home', url: '#home', isLink: true },
                                { text: 'About', url: '#about', isLink: true },
                                { text: 'Services', url: '#services', isLink: true },
                                { text: 'Contact', url: '#contact', isLink: true }
                            ],
                            titleColor: '#ffffff',
                            valuesColor: '#cbd5e1'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Links Section
                    </button>
                    <button
                        type="button"
                        onClick={() => addArrayItem('sections', {
                            type: 'contact',
                            title: 'Contact',
                            values: [
                                { text: 'contact@example.com', url: 'mailto:contact@example.com', isLink: true },
                                { text: '+1 (555) 123-4567', url: 'tel:+15551234567', isLink: true },
                                { text: '123 Main St, City, State', url: '', isLink: false }
                            ],
                            titleColor: '#ffffff',
                            valuesColor: '#cbd5e1'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Contact Section
                    </button>
                    <button
                        type="button"
                        onClick={() => addArrayItem('sections', {
                            type: 'social',
                            title: 'Follow Us',
                            socialLinks: [
                                { platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', iconColor: '#1da1f2', iconBackgroundColor: '#1da1f2' },
                                { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', iconColor: '#1877f2', iconBackgroundColor: '#1877f2' },
                                { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', iconColor: '#0077b5', iconBackgroundColor: '#0077b5' },
                                { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', iconColor: '#e4405f', iconBackgroundColor: '#e4405f' }
                            ],
                            titleColor: '#ffffff'
                        })}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add Social Section
                    </button>
                </div>
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
        <AnimatePresence>
            <motion.div
                key="section-editor-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 shadow-2xs bg-[#ffffff40] bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
                <div className="bg-white border border-gray-300 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
            </motion.div>
        </AnimatePresence>
    );
} 