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
    const title = (content.title as string) || section.title || 'About Us';
    const description = (content.description as string) || section.description;
    const imageUrl = (content.imageUrl as string) || section.imageUrl;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#f1f5f9';
    const textColor = (content.textColor as string) || section.textColor || '#1e293b';

    return (
        <section
            className="w-full py-[4vw] px-[1.5vw]"
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vw] items-center">
                    <div>
                        <h2 className="text-[2.5vw] md:text-[3vw] font-bold mb-[1.5vw]">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-[1.2vw] text-gray-600 mb-[2vw]">
                                {description}
                            </p>
                        )}

                        <div className="space-y-[1.5vw]">
                            <div className="flex items-start space-x-[1vw]">
                                <div className="w-[3vw] h-[3vw] bg-blue-100 rounded-[0.5vw] flex items-center justify-center flex-shrink-0">
                                    <Target className="w-[1.5vw] h-[1.5vw] text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-[1.2vw] font-semibold mb-[0.5vw]">Our Mission</h3>
                                    <p className="text-gray-600">{mission}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-[1vw]">
                                <div className="w-[3vw] h-[3vw] bg-blue-100 rounded-[0.5vw] flex items-center justify-center flex-shrink-0">
                                    <Users className="w-[1.5vw] h-[1.5vw] text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-[1.2vw] font-semibold mb-[0.5vw]">Our Values</h3>
                                    <ul className="space-y-[0.5vw]">
                                        {values.map((value: string, index: number) => (
                                            <li key={index} className="text-gray-600 flex items-center">
                                                <span className="w-[0.5vw] h-[0.5vw] bg-blue-600 rounded-full mr-[0.8vw]"></span>
                                                {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt="About us"
                                className="w-full h-[24vw] object-cover rounded-[0.5vw] shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
} 