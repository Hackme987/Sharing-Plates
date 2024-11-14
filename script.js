document.addEventListener('DOMContentLoaded', () => {
    const shareFoodForm = document.getElementById('share-food-form');
    const foodListings = document.getElementById('food-listings');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    };

    navSlide();

    // Sample data for food listings
    const sampleListings = [
        { name: 'Wedding Reception', location: 'Grand Hotel', datetime: '2024-03-15T20:00', description: 'Assorted appetizers and main courses', method: 'pickup', type: 'catered' },
        { name: 'Corporate Event', location: 'Tech Center', datetime: '2024-03-20T18:30', description: 'Sandwiches, salads, and desserts', method: 'onsite', type: 'catered' },
        { name: 'Local Restaurant Surplus', location: 'Downtown Cafe', datetime: '2024-03-18T21:00', description: 'Various menu items', method: 'pickup', type: 'restaurant' },
        { name: 'Homemade Lasagna', location: 'Community Center', datetime: '2024-03-22T19:00', description: 'Large tray of homemade lasagna', method: 'pickup', type: 'homemade' },
        { name: 'Grocery Donation', location: 'Food Bank', datetime: '2024-03-25T10:00', description: 'Assorted non-perishable items', method: 'pickup', type: 'groceries' },
    ];

    // Function to create a food listing element
    function createFoodListing(listing) {
        const listingElement = document.createElement('div');
        listingElement.classList.add('food-item');
        listingElement.dataset.type = listing.type;
        listingElement.innerHTML = `
            <h3>${listing.name}</h3>
            <p><strong>Location:</strong> ${listing.location}</p>
            <p><strong>Date & Time:</strong> ${new Date(listing.datetime).toLocaleString()}</p>
            <p><strong>Food Available:</strong> ${listing.description}</p>
            <p><strong>Sharing Method:</strong> ${listing.method === 'pickup' ? 'Available for pickup' : 'Join event on-site'}</p>
            <p><strong>Type:</strong> ${listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}</p>
        `;
        return listingElement;
    }

    // Display sample listings
    sampleListings.forEach(listing => {
        foodListings.appendChild(createFoodListing(listing));
    });

    // Handle form submission
    shareFoodForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newListing = {
            name: document.getElementById('event-name').value,
            location: document.getElementById('location').value,
            datetime: document.getElementById('datetime').value,
            description: document.getElementById('food-description').value,
            method: document.getElementById('sharing-method').value,
            type: document.getElementById('food-type').value
        };

        // Add new listing to the page
        foodListings.insertBefore(createFoodListing(newListing), foodListings.firstChild);

        // Clear form fields
        shareFoodForm.reset();

        // Show success message (you can enhance this with a modal or toast notification)
        alert('Thank you for sharing! Your food listing has been added.');
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.type;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter food listings
            const foodItems = document.querySelectorAll('.food-item');
            foodItems.forEach(item => {
                if (filterType === 'all' || item.dataset.type === filterType) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});