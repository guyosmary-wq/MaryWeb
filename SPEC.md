# MaryWeb - Sultan Kudarat Tourism Website

## Project Overview
- **Project Name**: MaryWeb - Sultan Kudarat Tourism Explorer
- **Type**: Single-page tourism website with booking functionality
- **Core Functionality**: User authentication, destination browsing, and booking system connected to Google Sheets
- **Target Users**: Tourists and travelers interested in Sultan Kudarat province destinations

## UI/UX Specification

### Layout Structure
- **Header**: Fixed navigation with logo and nav links (Home, Destinations, Book Now, Login)
- **Hero Section**: Full-width hero with welcome message and call-to-action
- **Destinations Grid**: Card-based layout showcasing 12 locations
- **Booking Section**: Form for making reservations
- **Footer**: Contact info and social links

### Responsive Breakpoints
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### Visual Design
- **Color Palette**:
  - Primary: #1a5f3c (Deep Forest Green)
  - Secondary: #f4a261 (Warm Orange)
  - Accent: #e9c46a (Golden Yellow)
  - Background: #fefae0 (Warm Cream)
  - Text: #264653 (Dark Teal)
  - White: #ffffff

- **Typography**:
  - Headings: 'Playfair Display', serif
  - Body: 'Source Sans Pro', sans-serif
  - Font sizes: H1: 3rem, H2: 2.5rem, H3: 1.5rem, Body: 1rem

- **Spacing**: 8px base unit (0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem)

- **Visual Effects**:
  - Card hover: translateY(-8px) with box-shadow
  - Buttons: scale(1.02) on hover
  - Smooth transitions: 0.3s ease
  - Subtle gradient overlays on hero images

### Components
1. **Navigation Bar**: Sticky, transparent to solid on scroll
2. **Destination Cards**: Image, title, description, location badge, book button
3. **Login Modal**: Username/password form with validation
4. **Booking Form**: Destination select, date picker, number of guests, contact info
5. **Alert System**: Success/error notifications

## Functionality Specification

### Core Features
1. **User Authentication**
   - Login form with username/password
   - Session management using localStorage
   - Protected booking functionality

2. **Destination Display**
   - 12 tourism locations from Sultan Kudarat
   - Filterable by category
   - Detailed information cards

3. **Booking System**
   - Destination selection
   - Date selection
   - Number of guests
   - Contact information
   - Google Sheets integration via Apps Script

4. **Google Sheets Integration**
   - Users sheet: Store registered users
   - Bookings sheet: Store all bookings
   - Web App deployment for form submission

### User Interactions
- Click destination card → View details / Book
- Submit booking → Save to Google Sheets → Show confirmation
- Login → Store session → Enable booking access

### Data Handling
- Form validation before submission
- JSON data exchange with Google Sheets
- Local storage for session management

## Locations (12 Destinations)
1. Columbio - Mountain resort area
2. La Palmera - Beach resort
3. Pangadilan Falls & Rock Formations - Natural attraction
4. Bagumbayan - Historical site
5. Bansada Eco Park - Eco tourism
6. Tacurong - City attractions
7. Baras Bird Sanctuary - Wildlife
8. Esperanza - Agricultural tourism
9. Hot and Cold Marquez - Spring resort
10. Lebak - Beach destination
11. Island Destinations (Olango, Gaboc, Silum) - Island hopping
12. Regional Museums & Cultural Centers

## Acceptance Criteria
1. ✓ Website loads without errors
2. ✓ All 12 destinations displayed with images and descriptions
3. ✓ Login form validates credentials
4. ✓ Booking form submits to Google Sheets
5. ✓ Responsive on mobile, tablet, desktop
6. ✓ External CSS file properly linked
7. ✓ JavaScript handles all interactivity
8. ✓ Navigation works between sections
