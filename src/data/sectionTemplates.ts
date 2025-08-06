import { SectionTemplate } from '@/types';

export const sectionTemplates: SectionTemplate[] = [
    {
        type: 'header',
        title: 'Header',
        description: 'Navigation header with logo and menu',
        icon: 'Menu',
        defaultContent: {
            title: 'My Website',
            backgroundColor: '#ffffff',
            MenuItemsColor: '#000000',
            LogotextColor: '#000000',
            RoundedImage: "100%",
            content: {
                logo: 'My Brand',
                logoImage: '',
                menuItems: [
                    { text: 'Home', url: '#home' },
                    { text: 'About', url: '#about' },
                    { text: 'Services', url: '#services' },
                    { text: 'Contact', url: '#contact' }
                ]
            }
        }
    },
    {
        type: 'hero',
        title: 'Hero Section',
        description: 'Main banner with call-to-action',
        icon: 'Star',
        defaultContent: {
            title: 'Welcome to Our Website',
            description: 'Create something amazing with our powerful tools',
            backgroundColor: '#f8fafc',
            titleColor: '#fff',
            descriptionColor: '#fff',
            buttonTextColor: "#fff",
            buttonbackgroundColor: "#145dfb",
            imageUrl: '',
            content: {
                ctaText: 'Get Started',
                ctaLink: '#',
                overlayColor: '#000000',
                overlayOpacity: 40
            }
        }
    },
    {
        type: 'features',
        title: 'Features',
        description: 'Showcase your key features or services',
        icon: 'Zap',
        defaultContent: {
            title: 'Our Features',
            description: 'Discover what makes us special',
            backgroundColor: '#ffffff',
            textColor: '#1e293b',
            titleColor: '#000',
            descriptionColor: '#1e293b',
            cardColor: '#ffffff',
            cardTitleColor: '#000',
            cardDescriptionColor: '#666',
            cardIconColor: '#3b82f6',
            cardIconBackgroundColor: '#dbeafe',
            content: {
                features: [
                    { title: 'Feature 1', description: 'Amazing feature description', icon: 'Check' },
                    { title: 'Feature 2', description: 'Another great feature', icon: 'Zap' },
                    { title: 'Feature 3', description: 'The best feature ever', icon: 'Star' }
                ]
            }
        }
    },
    {
        type: 'about',
        title: 'About',
        description: 'Tell your story and mission',
        icon: 'Users',
        defaultContent: {
            title: 'About Us',
            description: 'We are passionate about creating amazing experiences',
            backgroundColor: '#f1f5f9',
            textColor: '#1e293b',
            titleColor: '#000',
            descriptionColor: '#1e293b',
            iconColor: '#3b82f6',
            iconBackgroundColor: '#dbeafe',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
            content: {
                sections: [
                    {
                        type: 'mission',
                        title: 'Our Mission',
                        description: 'To provide the best solutions for our customers',
                        icon: 'Target',
                        titleColor: '#000',
                        descriptionColor: '#666',
                        iconColor: '#3b82f6',
                        iconBackgroundColor: '#dbeafe'
                    },
                    {
                        type: 'values',
                        title: 'Our Values',
                        values: ['Innovation', 'Quality', 'Customer Focus'],
                        icon: 'Users',
                        titleColor: '#000',
                        valuesColor: '#666',
                        iconColor: '#3b82f6',
                        iconBackgroundColor: '#dbeafe'
                    }
                ]
            }
        }
    },
    {
        type: 'contact',
        title: 'Contact',
        description: 'Contact form and information',
        icon: 'Mail',
        defaultContent: {
            title: 'Get In Touch',
            description: 'We\'d love to hear from you',
            backgroundColor: '#ffffff',
            textColor: '#1e293b',
            titleColor: '#000',
            descriptionColor: '#666',
            buttonTextColor: "#fff",
            buttonbackgroundColor: "#145dfb",
            content: {
                contactItems: [
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
                ]
            }
        }
    },
    {
        type: 'footer',
        title: 'Footer',
        description: 'Footer with links and social media',
        icon: 'Heart',
        defaultContent: {
            title: 'Footer',
            backgroundColor: '#1e293b',
            textColor: '#ffffff',
            titleColor: '#fff',
            descriptionColor: '#cbd5e1',
            content: {
                copyright: '© 2024 My Website. All rights reserved.',
                sections: [
                    {
                        type: 'description',
                        title: 'Footer',
                        subtitle: 'Creating amazing digital experiences with modern web technologies.',
                        titleColor: '#ffffff',
                        subtitleColor: '#cbd5e1'
                    },
                    {
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
                    },
                    {
                        type: 'contact',
                        title: 'Contact',
                        values: [
                            { text: 'contact@example.com', url: 'mailto:contact@example.com', isLink: true },
                            { text: '+1 (555) 123-4567', url: 'tel:+15551234567', isLink: true },
                            { text: '123 Main St, City, State', url: '', isLink: false }
                        ],
                        titleColor: '#ffffff',
                        valuesColor: '#cbd5e1'
                    },
                    {
                        type: 'social',
                        title: 'Follow Us',
                        socialLinks: [
                            { platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', iconColor: '#ffffff', iconBackgroundColor: '#1DA1F2' },
                            { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', iconColor: '#ffffff', iconBackgroundColor: '#1877F2' },
                            { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', iconColor: '#ffffff', iconBackgroundColor: '#0077B5' },
                            { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', iconColor: '#ffffff', iconBackgroundColor: '#C13584' },
                            { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', iconColor: '#ffffff', iconBackgroundColor: '#FF0000' },
                            { platform: 'GitHub', url: 'https://github.com', icon: 'Github', iconColor: '#ffffff', iconBackgroundColor: '#24292E' }
                        ],
                        titleColor: '#ffffff'
                    }
                ]
            }
        }
    }
]; 