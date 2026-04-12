const destinations = [
    {
        id: 1,
        name: "La Palmera",
        description: "La Palmera is tucked in the landlocked town of Columbio, Sultan Kudarat in south central Mindanao, Philippines. The place is named after the palm plantation that surrounds the ridges. This plantation has been a source of livelihood to the B’laans– the indigenous people of Sultan Kudarat.",
        location: "La Palmera",
        image: "img/la palmera.jpg"
    },
    {
        id: 2,
        name: "Pangadilan Falls & Rock Formations",
        description: "Pangadilan Falls and Rock Formation is a must-visit for nature lovers, offering stunning rock formations and a beautiful river. Visitors mention the challenge of reaching the site due to rocky and slippery off-road conditions, advising to visit on sunny days to avoid muddy areas. ",
        location: "Pangadilan",
        image: "img/Pangadilan Falls & Rock Formations.jpg"
    },
    {
        id: 3,
        name: "Bansada Eco Park",
        description: "Bansada Agri-Eco Adventure Park in Sultan Kudarat is a serene and picturesque destination perfect for tourists seeking a blend of nature, adventure, and relaxation. With its lush landscapes, diverse flora and fauna, and recreational activities, this park offers a unique experience for all visitors.",
        location: "Bansada",
        image: "img/Bansada eco park.jpg"
    },
    {
        id: 4,
        name: "Baras Bird Sanctuary",
        description: "Home to various bird species in their natural habitat. A paradise for bird watching and wildlife photography.",
        location: "Baras",
        image: "img/Baras Birds sanctuary.jpg"
    },
    {
        id: 5,
        name: "Hot and Cold Marquez",
        description: "Unique spring resort with both hot and cold spring pools. Perfect for relaxation and therapeutic bathing.",
        location: "Marquez",
        image: "img/Hot and cold marguez.jpg"
    },
    {
        id: 6,
        name: "Balot Island",
        description: "Balot Island is a pristine and enchanting island renowned for its rich marine biodiversity. It has an incredible sanctuary with abounding wealth of the sea turtles, clown fish, sea cucumbers, clams, and seashells. ",
        location: "Various Islands",
        image: "img/balot Island.jpg"
    }
];

// Google Sheets Web App URL - REPLACE WITH YOUR DEPLOYED WEB APP URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwjV0gVEVlKNuU8T62M3FuQ30u-VjP64MFHG2FM-MErDxcS6RTUivfOiv6wArxTobW6Yg/exec';

document.addEventListener('DOMContentLoaded', () => {
    initDestinations();
    initNavigation();
    initLoginModal();
    initBookingForm();
    initAlert();
    checkLoginStatus();
    setMinDate();
    initAdminPanel();
    initSlideshow();
    initDestinationModal();
    initCustomCursor();
});

function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    const leaves = document.querySelectorAll('.leaf');
    const winds = document.querySelectorAll('.cursor-wind');
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let lastX = 0, lastY = 0;
    let velX = 0, velY = 0;
    let isMoving = false;
    let moveTimeout;
    let time = 0;
    const positions = [];
    const windPositions = [];
    for(let i = 0; i < 5; i++) {
        positions.push({x: 0, y: 0});
        windPositions.push({x: 0, y: 0});
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        velX = mouseX - lastX;
        velY = mouseY - lastY;
        
        const dist = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
        if (dist > 3) {
            isMoving = true;
            cursorTrail.classList.add('active');
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                isMoving = false;
                cursorTrail.classList.remove('active');
            }, 200);
        }
        lastX = mouseX;
        lastY = mouseY;
    });
    
    function animate() {
        time += 0.1;
        currentX += (mouseX - currentX) * 0.3;
        currentY += (mouseY - currentY) * 0.3;
        
        const speed = Math.sqrt(velX * velX + velY * velY);
        const windStrength = Math.min(speed * 2, 30);
        
        positions.unshift({x: currentX, y: currentY});
        positions.pop();
        
        windPositions.unshift({x: currentX + velX * 3, y: currentY + velY * 3});
        windPositions.pop();
        
        leaves.forEach((leaf, i) => {
            const pos = positions[i];
            if(pos) {
                leaf.style.left = pos.x + 'px';
                leaf.style.top = pos.y + 'px';
                
                const baseRotation = (Date.now() / 10) + (i * 30);
                const windSway = Math.sin(time + i) * windStrength * 0.5;
                const directionOffset = (velX > 0 ? -1 : 1) * windStrength * 0.3;
                
                leaf.style.transform = `translate(-50%, -50%) rotate(${baseRotation + windSway + directionOffset}deg)`;
            }
        });
        
        winds.forEach((wind, i) => {
            const pos = windPositions[i];
            if(pos) {
                wind.style.left = pos.x + 'px';
                wind.style.top = pos.y + 'px';
                
                const drift = Math.sin(time * 2 + i * 0.5) * 20;
                const fadeDelay = i * 0.1;
                
                wind.style.opacity = Math.max(0, 0.6 - fadeDelay);
                wind.style.transform = `translate(-50%, -50%) translateX(${drift}px)`;
            }
        });
        
        velX *= 0.9;
        velY *= 0.9;
        
        requestAnimationFrame(animate);
    }
    animate();
    
    const hoverElements = document.querySelectorAll('a, button, .destination-card, input, select, textarea, .hero-prev, .hero-next, .modal-prev, .modal-next, .card-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    
    initBgLeaves();
}

function initBgLeaves() {
    const destSection = document.getElementById('destinations');
    const bookSection = document.getElementById('book');
    
    [destSection, bookSection].forEach((section) => {
        if (!section) return;
        const bgLeaves = section.querySelector('.bg-leaves');
        if (!bgLeaves) return;
        
        for (let i = 0; i < 25; i++) {
            const leaf = document.createElement('i');
            leaf.className = `fas fa-leaf bg-leaf`;
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.animationDuration = (6 + Math.random() * 6) + 's';
            leaf.style.animationDelay = Math.random() * 5 + 's';
            leaf.style.fontSize = (20 + Math.random() * 35) + 'px';
            leaf.style.opacity = 0.15 + Math.random() * 0.2;
            bgLeaves.appendChild(leaf);
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        const sections = ['destinations', 'book'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const bgLeaves = section.querySelector('.bg-leaves');
                if (!bgLeaves) return;
                
                const leaves = bgLeaves.querySelectorAll('.bg-leaf');
                const offsetX = (e.clientX - rect.left) / rect.width * 30 - 15;
                const offsetY = (e.clientY - rect.top) / rect.height * 30 - 15;
                
                leaves.forEach((leaf, i) => {
                    const delay = i * 0.1;
                    leaf.style.transform = `translate(${offsetX * (1 + delay)}px, ${offsetY * (1 + delay)}px)`;
                });
            }
        });
    });
}

function initSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length === 0) return;
    
    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 4000);
    }
    
    window.changeSlide = function(n) {
        clearInterval(slideInterval);
        showSlide(currentSlide + n);
        startSlideshow();
    };
    
    window.currentSlide = function(n) {
        clearInterval(slideInterval);
        showSlide(n);
        startSlideshow();
    };
    
    startSlideshow();
}

function initAdminPanel() {
    loadBookings();
}

function loadBookings() {
    const bookingsList = document.getElementById('bookingsList');
    
    fetch(GOOGLE_SHEETS_URL, { 
        method: "GET"
    })
        .then(response => response.text())
        .then(text => {
            try {
                const bookings = JSON.parse(text);
                if (!bookings || bookings.length === 0) {
                    bookingsList.innerHTML = '<p class="no-bookings">No bookings yet.</p>';
                    return;
                }
                bookingsList.innerHTML = `
                    <table class="bookings-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Destination</th>
                                <th>Date</th>
                                <th>Guests</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bookings.map((booking, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${booking.name}</td>
                                    <td>${booking.email}</td>
                                    <td>${booking.phone}</td>
                                    <td>${booking.destination}</td>
                                    <td>${booking.date}</td>
                                    <td>${booking.guests}</td>
                                    <td>${formatDateTime(booking.timestamp)}</td>
                                    <td><button class="delete-btn" onclick="deleteBooking(${index})"><i class="fas fa-trash"></i></button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            } catch (e) {
                bookingsList.innerHTML = '<p class="no-bookings">Error: ' + text.substring(0, 200) + '</p>';
            }
        })
        .catch(error => {
            bookingsList.innerHTML = '<p class="no-bookings">Error: ' + error.message + '</p>';
        });
}

function deleteBooking(index) {
    if (confirm('Delete this booking?')) {
        const sheetUrl = GOOGLE_SHEETS_URL + '?action=delete&row=' + (index + 2);
        fetch(sheetUrl, { method: "GET" })
            .then(() => loadBookings())
            .catch(() => {
                showAlert('Delete failed', 'error');
            });
    }
}

function initDestinations() {
    const grid = document.getElementById('destinationsGrid');
    const select = document.getElementById('destination');
    
    destinations.forEach((dest, index) => {
        grid.innerHTML += `
            <div class="destination-card" onclick="openDestinationModal(${index})">
                <div class="card-image">
                    <img src="${dest.image}" alt="${dest.name}" onerror="this.style.display='none'">
                    <span class="card-location">${dest.location}</span>
                </div>
                <div class="card-content">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <button class="card-btn" onclick="event.stopPropagation(); selectDestination(${dest.id})">Book Now</button>
                </div>
            </div>
        `;
        
        select.innerHTML += `<option value="${dest.name}">${dest.name}</option>`;
    });
}

let currentDestIndex = 0;

function openDestinationModal(index) {
    currentDestIndex = index;
    const modal = document.getElementById('destinationModal');
    updateDestinationModal();
    modal.classList.add('active');
}

function updateDestinationModal() {
    const dest = destinations[currentDestIndex];
    document.getElementById('modalDestImage').src = dest.image;
    document.getElementById('modalDestLocation').textContent = dest.location;
    document.getElementById('modalDestName').textContent = dest.name;
    document.getElementById('modalDestDesc').textContent = dest.description;
    document.getElementById('modalDestImage').onerror = function() { this.style.display = 'none'; };
}

function changeDest(n) {
    currentDestIndex = (currentDestIndex + n + destinations.length) % destinations.length;
    updateDestinationModal();
}

function initDestinationModal() {
    const modal = document.getElementById('destinationModal');
    const closeBtn = document.getElementById('closeDestination');
    const bookBtn = document.getElementById('modalBookBtn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    bookBtn.addEventListener('click', () => {
        const dest = destinations[currentDestIndex];
        document.getElementById('destination').value = dest.name;
        document.getElementById('destinationModal').classList.remove('active');
        document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function initLoginModal() {
    const modal = document.getElementById('loginModal');
    const openBtn = document.getElementById('navLoginBtn');
    const closeBtn = document.getElementById('closeLogin');
    const form = document.getElementById('loginForm');
    
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    form.addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo credentials - In production, validate against Google Sheets
    const validUsers = {
        'admin': '1234',
        'user': 'password',
        'mary': 'web2026'
    };
    
    if (validUsers[username] && validUsers[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('loginForm').reset();
        
        showAlert('Login successful! Welcome ' + username, 'success');
        checkLoginStatus();
    } else {
        showAlert('Invalid username or password', 'error');
    }
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    const loginBtn = document.getElementById('navLoginBtn');
    const userMenu = document.getElementById('userMenu');
    const displayUsername = document.getElementById('displayUsername');
    const adminLink = document.getElementById('adminLink');
    const adminSection = document.getElementById('admin');
    
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        displayUsername.textContent = username;
        
        if (username === 'admin') {
            if (adminLink) adminLink.style.display = 'block';
            if (adminSection) adminSection.style.display = 'block';
        } else {
            if (adminLink) adminLink.style.display = 'none';
            if (adminSection) adminSection.style.display = 'none';
        }
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('bookings');
    showAlert('You have been logged out successfully!', 'success');
    checkLoginStatus();
    
    document.getElementById('loginModal').classList.remove('active');
}

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', handleBooking);
}

function handleBooking(e) {
    e.preventDefault();
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        showAlert('Please login to make a booking', 'error');
        document.getElementById('loginModal').classList.add('active');
        return;
    }
    
    const bookingData = {
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('bookingDate').value,
        guests: document.getElementById('guests').value,
        notes: document.getElementById('notes').value,
        username: localStorage.getItem('username'),
        timestamp: new Date().toISOString()
    };
    
    if (!bookingData.destination) {
        showAlert('Please select a destination', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('bookingSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Submit to Google Sheets (or store locally if URL not configured)
    submitToGoogleSheets(bookingData, submitBtn);
}

async function submitToGoogleSheets(data, btn) {
    // If Google Sheets URL is not configured, store in localStorage
    if (GOOGLE_SHEETS_URL === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL') {
        // Store locally for demo purposes
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(data);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        setTimeout(() => {
            showAlert('Booking submitted successfully! (Demo Mode)', 'success');
            document.getElementById('bookingForm').reset();
            btn.disabled = false;
            btn.innerHTML = '<span>Book Now</span><i class="fas fa-arrow-right"></i>';
        }, 1000);
        return;
    }
    
    try {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        
        const url = GOOGLE_SHEETS_URL;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            redirect: 'follow',
            mode: 'cors'
        });
        
        showAlert('Booking submitted successfully!', 'success');
        document.getElementById('bookingForm').reset();
    } catch (error) {
        console.error('Booking error:', error);
        
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(data);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        showAlert('Booking saved! (Offline mode)', 'success');
        document.getElementById('bookingForm').reset();
    }
    
    btn.disabled = false;
    btn.innerHTML = '<span>Book Now</span><i class="fas fa-arrow-right"></i>';
}

function selectDestination(id) {
    const dest = destinations.find(d => d.id === id);
    if (dest) {
        document.getElementById('destination').value = dest.name;
        document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    }
}

function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);
}

function initAlert() {
    const closeBtn = document.getElementById('alertClose');
    closeBtn.addEventListener('click', () => {
        document.getElementById('alertBox').classList.remove('success', 'error');
        document.getElementById('alertBox').style.display = 'none';
    });
}

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    alertBox.className = 'alert ' + type;
    alertBox.style.display = 'flex';
    
    setTimeout(() => {
        alertBox.classList.remove('success', 'error');
        alertBox.style.display = 'none';
    }, 5000);
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
}
