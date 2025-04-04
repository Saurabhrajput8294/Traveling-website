// Booking System for Travel School

// API URL - change this to your actual server URL when deployed
const API_URL = 'http://localhost:3000/api';

// Sample travel packages for testing (will be replaced with API call)
const samplePackages = [
  {
    id: '1',
    name: 'Singapore Adventure',
    description: 'Explore the best of Singapore with our comprehensive tour package.',
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
    description: 'Experience the vibrant city life of Singapore.',
    destination: 'Singapore',
    duration: 7,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2luZ2Fwb3JlfGVufDB8fDB8fHww',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Singapore Night Safari',
    description: 'Discover the nocturnal wildlife of Singapore.',
    destination: 'Singapore',
    duration: 5,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2luZ2Fwb3JlfGVufDB8fDB8fHww',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Singapore Food Tour',
    description: 'Taste the diverse culinary offerings of Singapore.',
    destination: 'Singapore',
    duration: 3,
    price: 15000,
    image: 'https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample destinations for the Popular Destinations section
const sampleDestinations = [
  {
    id: '1',
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2luZ2Fwb3JlfGVufDB8fDB8fHww'
  },
  {
    id: '2',
    name: 'Marina Bay Sands',
    image: 'https://images.unsplash.com/photo-1552415274-73ad7198cb93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '3',
    name: 'Gardens by the Bay',
    image: 'https://images.unsplash.com/photo-1533281808624-e9b07b4294ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '4',
    name: 'Sentosa Island',
    image: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: '5',
    name: 'Chinatown',
    image: 'https://images.unsplash.com/photo-1600664356348-10686526af4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D'
  }
];

// Add search and filter functionality
function addSearchAndFilter() {
  // Create search and filter elements
  const searchFilterContainer = document.createElement('div');
  searchFilterContainer.className = 'search-filter-container';
  searchFilterContainer.style.cssText = 'margin: 20px auto; max-width: 800px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;';
  
  // Search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search destinations...';
  searchInput.style.cssText = 'padding: 8px 15px; border: 1px solid #ddd; border-radius: 5px; flex: 1; min-width: 200px;';
  searchInput.id = 'searchInput';
  
  // Price range filter
  const priceFilter = document.createElement('select');
  priceFilter.style.cssText = 'padding: 8px 15px; border: 1px solid #ddd; border-radius: 5px;';
  priceFilter.id = 'priceFilter';
  
  const priceOptions = [
    { value: 'all', text: 'All Prices' },
    { value: 'low', text: 'Under $20,000' },
    { value: 'medium', text: '$20,000 - $40,000' },
    { value: 'high', text: 'Over $40,000' }
  ];
  
  priceOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    priceFilter.appendChild(optionElement);
  });
  
  // Duration filter
  const durationFilter = document.createElement('select');
  durationFilter.style.cssText = 'padding: 8px 15px; border: 1px solid #ddd; border-radius: 5px;';
  durationFilter.id = 'durationFilter';
  
  const durationOptions = [
    { value: 'all', text: 'All Durations' },
    { value: 'short', text: '1-3 Days' },
    { value: 'medium', text: '4-7 Days' },
    { value: 'long', text: '8+ Days' }
  ];
  
  durationOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    durationFilter.appendChild(optionElement);
  });
  
  // Add elements to container
  searchFilterContainer.appendChild(searchInput);
  searchFilterContainer.appendChild(priceFilter);
  searchFilterContainer.appendChild(durationFilter);
  
  // Add container to the page
  const offerSection = document.querySelector('.offer');
  const offerText = document.querySelector('.offer .txt');
  offerSection.insertBefore(searchFilterContainer, offerText.nextSibling);
  
  // Add event listeners for search and filter
  searchInput.addEventListener('input', filterPackages);
  priceFilter.addEventListener('change', filterPackages);
  durationFilter.addEventListener('change', filterPackages);
}

// Filter packages based on search and filter criteria
function filterPackages() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const priceFilter = document.getElementById('priceFilter').value;
  const durationFilter = document.getElementById('durationFilter').value;
  
  // Get all packages
  const packages = JSON.parse(localStorage.getItem('travelPackages') || '[]');
  
  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    // Search term filter
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm) || 
                          pkg.description.toLowerCase().includes(searchTerm) || 
                          pkg.destination.toLowerCase().includes(searchTerm);
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter !== 'all') {
      if (priceFilter === 'low' && pkg.price >= 20000) matchesPrice = false;
      if (priceFilter === 'medium' && (pkg.price < 20000 || pkg.price > 40000)) matchesPrice = false;
      if (priceFilter === 'high' && pkg.price <= 40000) matchesPrice = false;
    }
    
    // Duration filter
    let matchesDuration = true;
    if (durationFilter !== 'all') {
      if (durationFilter === 'short' && pkg.duration > 3) matchesDuration = false;
      if (durationFilter === 'medium' && (pkg.duration < 4 || pkg.duration > 7)) matchesDuration = false;
      if (durationFilter === 'long' && pkg.duration <= 7) matchesDuration = false;
    }
    
    return matchesSearch && matchesPrice && matchesDuration;
  });
  
  // Update UI with filtered packages
  updatePackagesUI(filteredPackages);
  
  // Show message if no packages match the criteria
  const packagesContainer = document.querySelector('.offer .main-con');
  if (filteredPackages.length === 0) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.style.cssText = 'text-align: center; padding: 20px; color: #666;';
    noResultsMessage.textContent = 'No travel packages match your criteria.';
    packagesContainer.appendChild(noResultsMessage);
  }
}

// Load travel packages from the server or use sample data if server is not available
async function loadTravelPackages() {
  try {
    // Try to fetch from API
    const response = await fetch(`${API_URL}/packages`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    const packages = await response.json();
    
    // Store packages in localStorage for offline access
    localStorage.setItem('travelPackages', JSON.stringify(packages));
    
    // Update UI with packages
    updatePackagesUI(packages);
  } catch (error) {
    console.error('Error loading travel packages:', error);
    
    // If API call fails, try to load from localStorage
    const cachedPackages = JSON.parse(localStorage.getItem('travelPackages') || '[]');
    
    if (cachedPackages.length > 0) {
      // Use cached packages
      updatePackagesUI(cachedPackages);
    } else {
      // Use sample packages if no cached data
      localStorage.setItem('travelPackages', JSON.stringify(samplePackages));
      updatePackagesUI(samplePackages);
    }
  }
  
  // Add search and filter functionality
  addSearchAndFilter();
  
  // Load destinations
  loadDestinations();
}

// Load destinations for the Popular Destinations section
function loadDestinations() {
  try {
    // For now, use sample destinations
    // In a real app, this would come from an API
    updateDestinationsUI(sampleDestinations);
  } catch (error) {
    console.error('Error loading destinations:', error);
  }
}

// Update the UI with travel packages
function updatePackagesUI(packages) {
  // Hide loading indicator
  document.getElementById('loading').style.display = 'none';
  
  // Get the container for travel packages
  const packagesContainer = document.querySelector('.offer .main-con');
  packagesContainer.innerHTML = '';
  
  // Get user's favorite packages
  const currentUser = sessionStorage.getItem('currentUser');
  const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');
  
  // Add each package to the UI
  packages.forEach(package => {
    const packageElement = document.createElement('div');
    packageElement.className = 'box';
    
    // Check if package is in favorites
    const isFavorite = favorites.includes(package.id);
    
    packageElement.innerHTML = `
      <img width="280px" src="${package.image}" alt="${package.name}">
      <div class="txt">
        <p>${package.description}</p>
        <p>${package.duration} Days From <span>${package.price}</span></p>
      </div>
      <div class="btn" style="display: flex; justify-content: space-between; align-items: center;">
        <button class="book-now-btn" data-package-id="${package.id}">Book Now</button>
        <button class="favorite-btn" data-package-id="${package.id}" style="background: none; border: none; font-size: 20px; cursor: pointer; color: ${isFavorite ? '#ff4444' : '#ccc'};">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
    `;
    
    packagesContainer.appendChild(packageElement);
  });
  
  // Add event listeners to Book Now buttons
  document.querySelectorAll('.book-now-btn').forEach(button => {
    button.addEventListener('click', function() {
      const packageId = this.getAttribute('data-package-id');
      openBookingModal(packageId);
    });
  });
  
  // Add event listeners to Favorite buttons
  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
      const packageId = this.getAttribute('data-package-id');
      toggleFavorite(packageId, this);
    });
  });
}

// Toggle favorite status for a package
function toggleFavorite(packageId, buttonElement) {
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
    alert('Please log in to save favorites.');
    window.location.href = 'login.html';
    return;
  }
  
  // Get current favorites
  const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser}`) || '[]');
  
  // Check if package is already in favorites
  const index = favorites.indexOf(packageId);
  
  if (index === -1) {
    // Add to favorites
    favorites.push(packageId);
    buttonElement.style.color = '#ff4444';
    showNotification('Package added to favorites!');
  } else {
    // Remove from favorites
    favorites.splice(index, 1);
    buttonElement.style.color = '#ccc';
    showNotification('Package removed from favorites.');
  }
  
  // Save updated favorites
  localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(favorites));
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    animation: fadeInOut 3s forwards;
  `;
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(20px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
  
  // Set message and add to page
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove after animation completes
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Update the UI with destinations
function updateDestinationsUI(destinations) {
  // Hide loading indicator
  document.getElementById('loading-dest').style.display = 'none';
  
  // Get the container for destinations
  const destinationsContainer = document.querySelector('.dest .main-con');
  destinationsContainer.innerHTML = '';
  
  // Create the first large destination box
  const firstDestination = destinations[0];
  const firstBox = document.createElement('div');
  firstBox.className = 'box';
  
  firstBox.innerHTML = `
    <img src="${firstDestination.image}" alt="${firstDestination.name}">
    <div class="name">
      <p>${firstDestination.name}</p>
    </div>
  `;
  
  destinationsContainer.appendChild(firstBox);
  
  // Create the container for smaller destination boxes
  const boxSec2 = document.createElement('div');
  boxSec2.className = 'box-sec-2';
  
  // Add the remaining destinations
  for (let i = 1; i < destinations.length; i++) {
    const destination = destinations[i];
    const box2 = document.createElement('div');
    box2.className = 'box2';
    
    box2.innerHTML = `
      <img src="${destination.image}" alt="${destination.name}">
      <div class="name">
        <p>${destination.name}</p>
      </div>
    `;
    
    boxSec2.appendChild(box2);
  }
  
  destinationsContainer.appendChild(boxSec2);
}

// Open booking modal for a specific package
function openBookingModal(packageId) {
  // Check if user is logged in
  if (!sessionStorage.getItem('isLoggedIn')) {
    alert('Please log in to book a travel package.');
    window.location.href = 'login.html';
    return;
  }
  
  // Get the package details
  const packages = JSON.parse(localStorage.getItem('travelPackages') || '[]');
  const travelPackage = packages.find(p => p.id === packageId);
  
  if (!travelPackage) {
    alert('Package not found.');
    return;
  }
  
  // Create modal HTML
  const modalHTML = `
    <div id="bookingModal" class="modal" style="display: block; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.7);">
      <div class="modal-content" style="background-color: #fefefe; margin: 10% auto; padding: 20px; border-radius: 10px; width: 50%; max-width: 500px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
        <span class="close" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>
        <h2 style="color: #007bff; margin-bottom: 20px;">Book ${travelPackage.name}</h2>
        <p><strong>Destination:</strong> ${travelPackage.destination}</p>
        <p><strong>Duration:</strong> ${travelPackage.duration} days</p>
        <p><strong>Price per person:</strong> $${travelPackage.price}</p>
        
        <form id="bookingForm" style="margin-top: 20px;">
          <div style="margin-bottom: 15px;">
            <label for="travelDate" style="display: block; margin-bottom: 5px; font-weight: bold;">Travel Date:</label>
            <input type="date" id="travelDate" name="travelDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
          </div>
          
          <div style="margin-bottom: 15px;">
            <label for="numberOfPeople" style="display: block; margin-bottom: 5px; font-weight: bold;">Number of People:</label>
            <input type="number" id="numberOfPeople" name="numberOfPeople" min="1" value="1" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
          </div>
          
          <div style="margin-bottom: 15px;">
            <p><strong>Total Price:</strong> $<span id="totalPrice">${travelPackage.price}</span></p>
          </div>
          
          <button type="submit" style="background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%;">Proceed to Payment</button>
        </form>
      </div>
    </div>
  `;
  
  // Add modal to the page
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
  
  // Update total price when number of people changes
  document.getElementById('numberOfPeople').addEventListener('change', function() {
    const numberOfPeople = parseInt(this.value);
    const totalPrice = travelPackage.price * numberOfPeople;
    document.getElementById('totalPrice').textContent = totalPrice;
  });
  
  // Close modal when clicking the X
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('bookingModal').remove();
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
      modal.remove();
    }
  });
  
  // Handle form submission
  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const travelDate = document.getElementById('travelDate').value;
    const numberOfPeople = parseInt(document.getElementById('numberOfPeople').value);
    const totalPrice = travelPackage.price * numberOfPeople;
    
    // Create booking object
    const booking = {
      id: Date.now().toString(),
      userId: sessionStorage.getItem('currentUser'),
      packageId: travelPackage.id,
      bookingDate: new Date().toISOString(),
      travelDate: travelDate,
      numberOfPeople: numberOfPeople,
      totalPrice: totalPrice,
      status: 'pending',
      paymentId: '',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real application, this would be an API call
    // For now, we'll store in localStorage
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Close the modal
    document.getElementById('bookingModal').remove();
    
    // Redirect to booking confirmation page
    window.location.href = `booking-confirmation.html?booking_id=${booking.id}`;
  });
}

// Load user bookings
async function loadUserBookings() {
  try {
    // In a real application, this would be an API call
    // For now, we'll use localStorage
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    return bookings;
  } catch (error) {
    console.error('Error loading user bookings:', error);
    return [];
  }
}

// Add event listener to load travel packages when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // This will be called by the window.onload function in index.html
  // We don't need to call loadTravelPackages() here
}); 