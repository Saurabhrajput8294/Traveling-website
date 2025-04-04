<<<<<<< HEAD
# Travel School Booking System

A complete travel booking system with user authentication, package browsing, booking management, and payment processing.

## Features

- **User Authentication**: Login and registration system
- **Travel Packages**: Browse and view available travel packages
- **Booking Management**: Book travel packages, view booking history, and cancel bookings
- **Payment Processing**: Secure payment processing with Stripe integration
- **Email Notifications**: Booking confirmation emails sent to users
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

- `index.html`: Main landing page with travel packages
- `login.html`: User login page
- `register.html`: User registration page
- `my-bookings.html`: Page to view and manage user bookings
- `booking-confirmation.html`: Booking confirmation page
- `style.css`: Main stylesheet
- `script.js`: Main JavaScript file
- `booking.js`: Booking system functionality
- `server.js`: Backend server with API endpoints
- `db_schema.js`: Database schema definitions
- `.env`: Environment variables (API keys, etc.)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Stripe account for payment processing
- Email account for sending notifications

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/travel-school-booking.git
   cd travel-school-booking
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `STRIPE_SECRET_KEY`: Your Stripe secret key
     - `EMAIL_USER`: Your email address
     - `EMAIL_PASS`: Your email password or app-specific password

### Running the Application

1. Start the backend server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

2. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/packages`: Get all travel packages
- `GET /api/packages/:id`: Get a specific travel package
- `POST /api/bookings`: Create a new booking
- `POST /api/payments`: Process payment for a booking
- `GET /api/users/:userId/bookings`: Get bookings for a specific user

## Development

### Adding New Travel Packages

To add new travel packages, update the `travelPackages` array in `server.js`:

```javascript
let travelPackages = [
  {
    id: '1',
    name: 'Singapore Adventure',
    description: 'Explore the best of Singapore',
    destination: 'Singapore',
    duration: 10,
    price: 50000,
    image: 'https://example.com/singapore.jpg',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add more packages here
];
```

### Customizing the UI

The UI can be customized by modifying the CSS in `style.css` and the HTML structure in the respective HTML files.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Unsplash for travel images
- Stripe for payment processing
=======
# Traveling-website
 A modern travel booking website built with HTML, CSS, and JavaScript. 
>>>>>>> 8a021bed925c76632d09db8d88062dbba106da53
