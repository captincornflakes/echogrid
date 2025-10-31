// Common JavaScript functionality for EchoGrid website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('EchoGrid website loaded successfully!');
    
    // Initialize all functionality
    initNavigation();
    initButtons();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation
                updateActiveNav(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// Button functionality
function initButtons() {
    const ctaButton = document.querySelector('.cta-button');
    const contactButton = document.querySelector('.contact-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to services section
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            showContactModal();
        });
    }
}

// Contact modal functionality
function showContactModal() {
    // Simple alert for now - can be replaced with a proper modal
    alert('Thank you for your interest! Contact form coming soon.\n\nFor now, please reach out to us at:\ninfo@echogrid.win');
}

// Scroll effects
function initScrollEffects() {
    // Add scroll listener for header shadow
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service items for animation
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Simple form validation
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        initNavigation,
        initButtons,
        initScrollEffects
    };
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for analytics (placeholder)
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, a')) {
            console.log('User clicked:', e.target.textContent || e.target.href);
            // Here you could send analytics data to your tracking service
        }
    });
});