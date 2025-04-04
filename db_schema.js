// Database Schema for Travel School

// Travel Packages Collection
const travelPackagesSchema = {
  id: "String", // Unique identifier
  name: "String", // Package name
  description: "String", // Package description
  destination: "String", // Destination name
  duration: "Number", // Duration in days
  price: "Number", // Price in currency
  image: "String", // Image URL
  available: "Boolean", // Whether the package is available
  createdAt: "Date", // Creation date
  updatedAt: "Date" // Last update date
};

// Bookings Collection
const bookingsSchema = {
  id: "String", // Unique booking ID
  userId: "String", // Reference to user
  packageId: "String", // Reference to travel package
  bookingDate: "Date", // Date of booking
  travelDate: "Date", // Date of travel
  numberOfPeople: "Number", // Number of people
  totalPrice: "Number", // Total price
  status: "String", // Status: pending, confirmed, cancelled
  paymentId: "String", // Payment reference ID
  paymentStatus: "String", // Payment status: pending, completed, failed
  createdAt: "Date", // Creation date
  updatedAt: "Date" // Last update date
};

// Users Collection (extends your existing user data)
const usersSchema = {
  id: "String", // Unique identifier
  name: "String", // User's name
  email: "String", // User's email
  password: "String", // Hashed password
  phone: "String", // User's phone number
  address: "String", // User's address
  createdAt: "Date", // Creation date
  updatedAt: "Date" // Last update date
};

module.exports = {
  travelPackagesSchema,
  bookingsSchema,
  usersSchema
}; 