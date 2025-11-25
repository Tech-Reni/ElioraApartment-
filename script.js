// ========================================
// AOS Animation Initialization
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: false,
        offset: 100,
        delay: 0
    });
});

// ========================================
// Navbar Functionality
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll to Top Button
// ========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Navbar Background Change on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    }
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:elioraapartment@gmail.com?subject=Booking Inquiry from ${name}&body=Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${message}`;

        // Open email client
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();

        // Show success message
        showAlert('Thank you! We will get back to you soon.', 'success');
    });
}

// ========================================
// Alert Notification Function
// ========================================

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ========================================
// Add CSS Animations for Alerts
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.99);
        padding: 2rem;
        gap: 1rem;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;

document.head.appendChild(style);

// ========================================
// Parallax Effect on Hero Section
// ========================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', function() {
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ========================================
// Counter Animation
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-card');
    let hasAnimated = false;

    window.addEventListener('scroll', function() {
        if (!hasAnimated && window.pageYOffset > 500) {
            counters.forEach(counter => {
                counter.style.animation = 'slideUp 0.6s ease-out';
            });
            hasAnimated = true;
        }
    });
}

animateCounters();

// ========================================
// Image Lazy Loading
// ========================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.style.animation = 'fadeIn 0.5s ease-out';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Active Navigation Link Highlight
// ========================================

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--accent-light);
    }
`;
document.head.appendChild(activeStyle);

// ========================================
// Lightbox Configuration
// ========================================

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'showImageNumberLabel': true,
    'alwaysShowNavOnTouchDevices': true,
    'fitImagesInViewport': true
});

// ========================================
// Dynamic Gallery Filtering (Optional)
// ========================================

function initGalleryFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// Smooth Page Load Animation
// ========================================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// ========================================
// Mobile-Friendly Touches
// ========================================

// Prevent zooming on double tap for touch devices
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// ========================================
// Enhanced Interactivity for Buttons
// ========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// WhatsApp Link Tracking
// ========================================

const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp booking link clicked');
        // You can add analytics tracking here if needed
    });
});

// ========================================
// Performance Optimization
// ========================================

// Defer non-critical images
document.querySelectorAll('img').forEach(img => {
    if (!img.classList.contains('logo-img')) {
        img.loading = 'lazy';
    }
});

// ========================================
// Error Handling for Images
// ========================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.error('Image failed to load:', this.src);
        this.style.background = 'rgba(212, 175, 55, 0.1)';
    });
});

// ========================================
// Initialize Everything
// ========================================

console.log('Eliora Apartment Website - All systems ready!');
