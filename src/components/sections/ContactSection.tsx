import { Section } from '@/types';
import { Mail, Phone, MapPin, Send, Clock, Globe, MessageCircle, Building, User, Calendar } from 'lucide-react';

interface ContactItem {
    title: string;
    subtitle: string;
    icon: string;
    iconColor?: string;
    iconBackgroundColor?: string;
    titleColor?: string;
    subtitleColor?: string;
}

interface ContactSectionProps {
    section: Section;
    isEditing?: boolean;
    onEdit?: (section: Section) => void;
}

const iconMap = {
    Mail,
    Phone,
    MapPin,
    Clock,
    Globe,
    MessageCircle,
    Building,
    User,
    Calendar
};

export default function ContactSection({ section, isEditing, onEdit }: ContactSectionProps) {
    const content = section.content || {};
    const email = (content.email as string) || 'contact@example.com';
    const phone = (content.phone as string) || '+1 (555) 123-4567';
    const address = (content.address as string) || '123 Main St, City, State 12345';
    const title = (content.title as string) || section.title || 'Get In Touch';
    const description = (content.description as string) || section.description;
    const backgroundColor = (content.backgroundColor as string) || section.backgroundColor || '#ffffff';
    const textColor = (content.textColor as string) || section.textColor || '#1e293b';
    const titleColor = (content.titleColor as string) || '#000000';
    const descriptionColor = (content.descriptionColor as string) || '#666666';
    const buttonbackgroundColor = (content.buttonbackgroundColor as string) || "#145dfb";
    const buttonTextColor = (content.buttonTextColor as string) || "#fff";
    const contactItems = (content.contactItems as ContactItem[]) || [
        {
            title: 'Email',
            subtitle: 'contact@example.com',
            icon: 'Mail',
            iconColor: '#3b82f6',
            iconBackgroundColor: '#dbeafe',
            titleColor: '#000000',
            subtitleColor: '#666666'
        },
        {
            title: 'Phone',
            subtitle: '+1 (555) 123-4567',
            icon: 'Phone',
            iconColor: '#3b82f6',
            iconBackgroundColor: '#dbeafe',
            titleColor: '#000000',
            subtitleColor: '#666666'
        },
        {
            title: 'Address',
            subtitle: '123 Main St, City, State 12345',
            icon: 'MapPin',
            iconColor: '#3b82f6',
            iconBackgroundColor: '#dbeafe',
            titleColor: '#000000',
            subtitleColor: '#666666'
        }
    ];

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
                    <h2
                        className="sm:text-4xl md:text-[3vw] font-bold mb-[1vw]"
                        style={{ color: titleColor }}
                    >
                        {title}
                    </h2>
                    {description && (
                        <p
                            className="max-w-2xl mx-auto"
                            style={{ color: descriptionColor }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3vw]">
                    <div className="space-y-[2vw]">
                        {contactItems.map((item: ContactItem, index: number) => {
                            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Mail;
                            return (
                                <div key={index} className="flex items-start space-x-[1vw]">
                                    <div
                                        className="w-[40px] h-[40px] rounded-[0.5vw] flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: item.iconBackgroundColor || '#dbeafe' }}
                                    >
                                        <IconComponent
                                            className="w-[100%] h-[50%]"
                                            style={{ color: item.iconColor || '#3b82f6' }}
                                        />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-semibold mb-[0.5vw]"
                                            style={{ color: item.titleColor || '#000000' }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            style={{ color: item.subtitleColor || '#666666' }}
                                        >
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-gray-50 p-[2vw] rounded-[0.5vw]">
                        <form className="space-y-[1.5vw]">
                            <div>
                                <label style={{ color: textColor }} htmlFor="name" className="block font-medium mb-[0.5vw]">
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
                                <label style={{ color: textColor }} htmlFor="email" className="block font-medium mb-[0.5vw]">
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
                                <label style={{ color: textColor }} htmlFor="message" className="block font-medium mb-[0.5vw]">
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
                                style={{ backgroundColor: buttonbackgroundColor, color: buttonTextColor }}
                                type="submit"
                                className="w-full py-[0.8vw] px-[1.5vw] gap-2 rounded-[0.5vw] font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Send className="w-[20px] h-[20px]" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
} 