# United We Stand CAC - Website Modernization

## Project Overview

This is the modernized website for United We Stand Community Assistance Center, featuring a modern React frontend with an interactive calendar, responsive design, and enhanced user experience.

## Features

### ✅ Completed in Phase 1
- **Modern React Architecture**: Organized component structure with hooks and styled-components
- **Design System**: Comprehensive theme with colors, typography, and spacing constants
- **Responsive Header**: Mobile-friendly navigation with hamburger menu
- **Interactive Calendar**: Full-featured calendar with event filtering and modal details
- **Hero Section**: Engaging hero with community statistics and call-to-action
- **Modern Footer**: Multi-column footer with contact information and quick links
- **Global Styles**: Consistent styling across all components
- **API Integration**: Backend API for content and events
- **Loading States**: Professional loading and error handling

### 🔄 Features Overview
- **Interactive Calendar**: Community events with filtering by category
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Modern UI Components**: Styled-components with consistent theming
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations and transitions
- **React Big Calendar** - Interactive calendar component
- **React Icons** - Consistent iconography
- **Moment.js** - Date handling for calendar

### Backend
- **Express.js** - Node.js web framework
- **JSON Data Storage** - Simple file-based content and events storage
- **CORS Enabled** - Cross-origin resource sharing
- **RESTful API** - Well-structured API endpoints

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── sections/        # Hero, About sections
│   │   ├── calendar/        # Calendar components
│   │   └── common/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles and themes
│   └── constants/           # Theme and configuration constants
backend/
├── server.js               # Express server
├── content.json           # Website content data
└── events.json            # Calendar events data
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd "United We Stand CAC"
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   node server.js
   ```
   Backend will run on http://localhost:5000
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on http://localhost:3000

### API Endpoints

- `GET /api/content/:page` - Get page content
- `GET /api/events` - Get calendar events (with optional filtering)
- `GET /api/events/:id` - Get specific event details
- `POST /api/events/:id/rsvp` - RSVP for an event
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## Component Documentation

### Layout Components
- **Header**: Responsive navigation with mobile menu
- **Footer**: Multi-column footer with contact info and links

### Section Components
- **HeroSection**: Main hero with call-to-action and statistics
- **CalendarSection**: Interactive calendar with event management

### Utilities
- **Theme System**: Centralized design tokens
- **Custom Hooks**: Reusable logic for API calls, local storage, forms
- **Helper Functions**: Date formatting, validation, API calls

## Key Features

### Interactive Calendar
- Multiple view modes (month, week, day, agenda)
- Event category filtering
- Detailed event modals
- RSVP functionality
- Mobile-responsive design

### Modern Design System
- Consistent color palette based on UWS branding
- Typography scale with proper hierarchy
- Responsive breakpoints
- Accessible focus states
- Smooth animations and transitions

### Mobile-First Responsive Design
- Progressive enhancement approach
- Touch-friendly interfaces
- Optimized for all screen sizes
- Fast loading and smooth performance

## Customization

### Adding New Events
1. Edit `backend/events.json`
2. Follow the existing event structure:
```json
{
  "id": 1,
  "title": "Event Name",
  "start": "2025-06-01T10:00:00",
  "end": "2025-06-01T12:00:00",
  "category": "workshop",
  "description": "Event description",
  "location": "Event location",
  "contact": "contact@email.com",
  "maxAttendees": 50
}
```

### Updating Content
1. Edit `backend/content.json`
2. Content is organized by page sections
3. Changes take effect immediately

### Styling
- Edit theme constants in `src/constants/theme.js`
- Component-specific styles are in styled-components
- Global styles in `src/styles/GlobalStyles.js`

## Next Steps (Future Phases)

### Phase 2: Enhanced Features
- [ ] Admin dashboard for content management
- [ ] Email integration for RSVPs and contact forms
- [ ] User authentication system
- [ ] Newsletter signup with mailing list integration

### Phase 3: Advanced Functionality
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment processing for donations
- [ ] Volunteer management system
- [ ] Resource request tracking

### Phase 4: Performance & Analytics
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Accessibility audit

## Support

For technical questions or issues:
- Email: mmiller.UnitedWeStand@gmail.com
- Phone: 315-502-0007

## License

This project is created for United We Stand Community Assistance Center.
#   u n i t e d - w e - s t a n d  
 