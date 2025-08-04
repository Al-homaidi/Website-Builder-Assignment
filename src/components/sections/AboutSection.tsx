import { Section } from '@/types';
import { Target, Users } from 'lucide-react';

interface AboutSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

export default function AboutSection({ section, isEditing, onEdit }: AboutSectionProps) {
    const content = section.content || {};
    const mission = (content.mission as string) || 'To provide the best solutions for our customers';
    const values = (content.values as string[]) || ['Innovation', 'Quality', 'Customer Focus'];

    return (
        <section
            className="w-full py-16 px-6"
            style={{
                backgroundColor: section.backgroundColor || '#f1f5f9',
                color: section.textColor || '#1e293b'
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {section.title || 'About Us'}
                        </h2>
                        {section.description && (
                            <p className="text-xl text-gray-600 mb-8">
                                {section.description}
                            </p>
                        )}

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
                                    <p className="text-gray-600">{mission}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Our Values</h3>
                                    <ul className="space-y-2">
                                        {values.map((value: string, index: number) => (
                                            <li key={index} className="text-gray-600 flex items-center">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                                {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {section.imageUrl && (
                        <div className="relative">
                            <img
                                src={section.imageUrl}
                                alt="About us"
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
} 