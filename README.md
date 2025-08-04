# Website Builder - Rekaz Hiring Assignment

A modern, responsive website builder built with Next.js 15, TypeScript, and Tailwind CSS. This application allows users to create beautiful websites by dragging and dropping pre-built sections, editing their properties, and exporting/importing configurations.

## 🚀 Features

### Core Functionality
- **Section Library**: Click-to-add pre-built sections (Header, Hero, Features, About, Contact, Footer)
- **Live Preview**: Real-time preview of the website as you build
- **Drag & Drop**: Reorder sections by dragging and dropping
- **Section Editing**: Edit section properties (title, description, colors, images)
- **Import/Export**: Save and load website configurations as JSON files
- **Responsive Design**: Fully responsive across all screen sizes

### Technical Features
- **SSR Friendly**: Built with Next.js 15 and proper client component structure
- **Performance Optimized**: Minimal re-renders with React.useCallback and proper state management
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Beautiful, modern interface with smooth animations and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Drag & Drop**: @dnd-kit/core and @dnd-kit/sortable
- **Icons**: Lucide React
- **State Management**: React useState and useCallback hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

### Building a Website

1. **Add Sections**: Click on sections from the left sidebar to add them to your website
2. **Reorder Sections**: Drag and drop sections to reorder them
3. **Edit Sections**: Click the edit button (pencil icon) on any section to modify its properties
4. **Delete Sections**: Click the delete button (trash icon) to remove sections
5. **Preview Mode**: Toggle preview mode to see your website without editing controls

### Import/Export

- **Export**: Click the "Export" button to download your website configuration as a JSON file
- **Import**: Click the "Import" button to load a previously saved configuration

### Section Types

- **Header**: Navigation header with logo and menu items
- **Hero**: Main banner section with call-to-action
- **Features**: Grid layout showcasing key features or services
- **About**: Company information with mission and values
- **Contact**: Contact form and information
- **Footer**: Footer with links and social media

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Section components
│   │   ├── HeaderSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   ├── SectionLibrary.tsx     # Section library sidebar
│   ├── SectionRenderer.tsx    # Dynamic section renderer
│   ├── SectionEditor.tsx      # Section editing modal
│   ├── SortableSection.tsx    # Drag-and-drop wrapper
│   └── WebsiteBuilder.tsx     # Main builder component
├── data/                 # Static data
│   └── sectionTemplates.ts    # Pre-built section templates
└── types/                # TypeScript type definitions
    └── index.ts
```

## 🎨 Design Decisions

### Performance Optimizations
- Used `useCallback` for event handlers to prevent unnecessary re-renders
- Implemented proper drag-and-drop with @dnd-kit for smooth interactions
- Separated client and server components for optimal SSR performance

### User Experience
- Intuitive drag-and-drop interface
- Real-time preview with smooth transitions
- Responsive design that works on all devices
- Clear visual feedback for all interactions

### Code Quality
- Full TypeScript implementation for type safety
- Modular component architecture
- Consistent naming conventions
- Proper error handling

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any other hosting platform that supports Next.js.

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Build for Production
```bash
npm run build
npm start
```

## 📝 Future Enhancements

- Custom CSS editor for advanced styling
- More section types and templates
- Image upload functionality
- Undo/redo functionality
- Collaboration features
- Template marketplace

## 🤝 Contributing

This is a hiring assignment submission. For questions or feedback, please contact the hiring team.

## 📄 License

This project is created for the Rekaz hiring assignment.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
