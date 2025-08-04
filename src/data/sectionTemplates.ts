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
            textColor: '#000000',
            content: {
                logo: 'My Brand',
                menuItems: ['Home', 'About', 'Services', 'Contact']
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
            textColor: '#1e293b',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
            content: {
                ctaText: 'Get Started',
                ctaLink: '#'
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
            content: {
                features: [
                    { title: 'Feature 1', description: 'Amazing feature description', icon: 'Check' },
                    { title: 'Feature 2', description: 'Another great feature', icon: 'Check' },
                    { title: 'Feature 3', description: 'The best feature ever', icon: 'Check' }
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
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
            content: {
                mission: 'To provide the best solutions for our customers',
                values: ['Innovation', 'Quality', 'Customer Focus']
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
            content: {
                email: 'contact@example.com',
                phone: '+1 (555) 123-4567',
                address: '123 Main St, City, State 12345'
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
            content: {
                copyright: '© 2024 My Website. All rights reserved.',
                socialLinks: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram']
            }
        }
    }
]; 