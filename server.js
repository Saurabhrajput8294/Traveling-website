const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory database (replace with real database in production)
let travelPackages = [
  {
    id: '1',
    name: 'Singapore Adventure',
    description: 'Explore the best of Singapore',
    destination: 'Singapore',
    duration: 10,
    price: 50000,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2Fwb3JlfGVufDB8fDB8fHww',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Singapore City Tour',
    description: 'Experience the city life of Singapore',
    destination: 'Singapore',
    duration: 10,
    price: 50000,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2luZ2Fwb3JlfGVufDB8fDB8fHww',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Singapore Nightlife',
    description: 'Experience the nightlife of Singapore',
    destination: 'Singapore',
    duration: 10,
    price: 50000,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2luZ2Fwb3JlfGVufDB8fDB8fHww',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Singapore Food Tour',
    description: 'Taste the best food in Singapore',
    destination: 'Singapore',
    duration: 10,
    price: 50000,
    image: 'https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let bookings = [];
let users = [];

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Routes

// Get all travel packages
app.get('/api/packages', (req, res) => {
  res.json(travelPackages);
});

// Get a specific travel package
app.get('/api/packages/:id', (req, res) => {
  const package = travelPackages.find(p => p.id === req.params.id);
  if (!package) {
    return res.status(404).json({ message: 'Package not found' });
  }
  res.json(package);
});

// Create a booking
app.post('/api/bookings', (req, res) => {
  const { userId, packageId, travelDate, numberOfPeople } = req.body;
  
  // Find the package
  const travelPackage = travelPackages.find(p => p.id === packageId);
  if (!travelPackage) {
    return res.status(404).json({ message: 'Package not found' });
  }
  
  // Calculate total price
  const totalPrice = travelPackage.price * numberOfPeople;
  
  // Create a new booking
  const newBooking = {
    id: uuidv4(),
    userId,
    packageId,
    bookingDate: new Date(),
    travelDate: new Date(travelDate),
    numberOfPeople,
    totalPrice,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  bookings.push(newBooking);
  
  // Create a payment intent with Stripe
  const paymentIntent = stripe.paymentIntents.create({
    amount: totalPrice * 100, // Stripe uses cents
    currency: 'usd',
    metadata: { bookingId: newBooking.id, packageId, userId }
  });
  
  res.status(201).json({
    booking: newBooking,
    clientSecret: paymentIntent.client_secret
  });
});

// Process payment
app.post('/api/payments', async (req, res) => {
  const { bookingId, paymentMethodId } = req.body;
  
  // Find the booking
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  
  try {
    // Confirm the payment with Stripe
    const paymentIntent = await stripe.paymentIntents.confirm(paymentMethodId);
    
    // Update booking status
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    booking.paymentId = paymentIntent.id;
    booking.updatedAt = new Date();
    
    // Send confirmation email
    const user = users.find(u => u.id === booking.userId);
    const travelPackage = travelPackages.find(p => p.id === booking.packageId);
    
    if (user && travelPackage) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Booking Confirmation - Travel School',
        html: `
          <h1>Booking Confirmation</h1>
          <p>Dear ${user.name},</p>
          <p>Your booking has been confirmed. Here are the details:</p>
          <ul>
            <li>Booking ID: ${booking.id}</li>
            <li>Package: ${travelPackage.name}</li>
            <li>Destination: ${travelPackage.destination}</li>
            <li>Travel Date: ${booking.travelDate.toLocaleDateString()}</li>
            <li>Number of People: ${booking.numberOfPeople}</li>
            <li>Total Price: $${booking.totalPrice}</li>
          </ul>
          <p>Thank you for choosing Travel School!</p>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

// Get user bookings
app.get('/api/users/:userId/bookings', (req, res) => {
  const userBookings = bookings.filter(b => b.userId === req.params.userId);
  res.json(userBookings);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 