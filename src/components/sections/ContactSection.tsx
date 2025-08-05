import { Section } from '@/types';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

export default function ContactSection({ section, isEditing, onEdit }: ContactSectionProps) {
    const content = section.content || {};
    const email = (content.email as string) || 'contact@example.com';
    const phone = (content.phone as string) || '+1 (555) 123-4567';
    const address = (content.address as string) || '123 Main St, City, State 12345';
    const title = (content.title as string) || section.title || 'Get In Touch';
    const description = (content.description as string) || section.description;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#ffffff';
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
                <div className="text-center mb-[3vw]">
                    <h2 className="text-[2.5vw] md:text-[3vw] font-bold mb-[1vw]">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-[1.2vw] text-gray-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vw]">
                    <div className="space-y-[2vw]">
                        <div className="flex items-start space-x-[1vw]">
                            <div className="w-[3vw] h-[3vw] bg-blue-100 rounded-[0.5vw] flex items-center justify-center flex-shrink-0">
                                <Mail className="w-[1.5vw] h-[1.5vw] text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-[1.2vw] font-semibold mb-[0.5vw]">Email</h3>
                                <p className="text-gray-600">{email}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-[1vw]">
                            <div className="w-[3vw] h-[3vw] bg-blue-100 rounded-[0.5vw] flex items-center justify-center flex-shrink-0">
                                <Phone className="w-[1.5vw] h-[1.5vw] text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-[1.2vw] font-semibold mb-[0.5vw]">Phone</h3>
                                <p className="text-gray-600">{phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-[1vw]">
                            <div className="w-[3vw] h-[3vw] bg-blue-100 rounded-[0.5vw] flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-[1.5vw] h-[1.5vw] text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-[1.2vw] font-semibold mb-[0.5vw]">Address</h3>
                                <p className="text-gray-600">{address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-[2vw] rounded-[0.5vw]">
                        <form className="space-y-[1.5vw]">
                            <div>
                                <label htmlFor="name" className="block text-[0.9vw] font-medium text-gray-700 mb-[0.5vw]">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-[1vw] py-[0.8vw] border border-gray-300 rounded-[0.5vw] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[0.9vw] font-medium text-gray-700 mb-[0.5vw]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-[1vw] py-[0.8vw] border border-gray-300 rounded-[0.5vw] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-[0.9vw] font-medium text-gray-700 mb-[0.5vw]">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-[1vw] py-[0.8vw] border border-gray-300 rounded-[0.5vw] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-[0.8vw] px-[1.5vw] rounded-[0.5vw] font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Send className="w-[1.2vw] h-[1.2vw] mr-[0.5vw]" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
} 