// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initProgramTabs();
    initRegistrationForm();
    // initContactForm(); // Removed - now using direct contact methods
    initScrollAnimations();
    initMobileMenu();
    initAdminPanel();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Program tabs functionality
function initProgramTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Registration form functionality
function initRegistrationForm() {
    const form = document.getElementById('registrationForm');

    if (form) {
        // Handle dietary preference dropdown
        const dietarySelect = document.getElementById('dietary');
        const otherDietaryDiv = document.getElementById('other-dietary');

        if (dietarySelect && otherDietaryDiv) {
            dietarySelect.addEventListener('change', function () {
                if (this.value === 'Other') {
                    otherDietaryDiv.style.display = 'block';
                } else {
                    otherDietaryDiv.style.display = 'none';
                }
            });
        }

        // Handle tutorial checkboxes
        const tutorialCheckboxes = document.querySelectorAll('input[name="tutorials"]');
        const noTutorialsCheckbox = document.getElementById('no-tutorials');

        if (tutorialCheckboxes.length > 0) {
            tutorialCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    if (this.id === 'no-tutorials' && this.checked) {
                        // If "No Tutorials" is checked, uncheck all others
                        tutorialCheckboxes.forEach(cb => {
                            if (cb.id !== 'no-tutorials') {
                                cb.checked = false;
                            }
                        });
                    } else if (this.id !== 'no-tutorials' && this.checked) {
                        // If any tutorial is checked, uncheck "No Tutorials"
                        noTutorialsCheckbox.checked = false;
                    }
                });
            });
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form
            if (validateRegistrationForm(data)) {
                // Save registration data locally
                saveRegistrationData(data);
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Contact functionality (removed form, now using direct email/phone contact)

// Form validation functions
function validateRegistrationForm(data) {
    const requiredFields = ['name', 'email', 'affiliation', 'banquet', 'dietary'];

    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    // Check if at least one tutorial option is selected
    const tutorialCheckboxes = document.querySelectorAll('input[name="tutorials"]:checked');
    if (tutorialCheckboxes.length === 0) {
        return false;
    }

    // If dietary preference is "other", check if other-dietary-text is filled
    if (data.dietary === 'Other' && (!data['other-dietary-text'] || data['other-dietary-text'].trim() === '')) {
        return false;
    }

    return true;
}

// Save registration data to localStorage
function saveRegistrationData(data) {
    // Get selected tutorials
    const selectedTutorials = [];
    const tutorialCheckboxes = document.querySelectorAll('input[name="tutorials"]:checked');
    tutorialCheckboxes.forEach(checkbox => {
        selectedTutorials.push(checkbox.value);
    });

    // Create registration record
    const registrationRecord = {
        id: Date.now(), // Unique ID
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        affiliation: data.affiliation,
        tutorials: selectedTutorials.join(', '),
        banquet: data.banquet,
        dietary: data.dietary,
        other_dietary: data['other-dietary-text'] || 'N/A'
    };

    // Get existing registrations
    let registrations = JSON.parse(localStorage.getItem('awoc_registrations') || '[]');

    // Add new registration
    registrations.push(registrationRecord);

    // Save back to localStorage
    localStorage.setItem('awoc_registrations', JSON.stringify(registrations));

    // Show success message
    showNotification('Registration submitted successfully! Thank you for registering.', 'success');

    // Reset form
    document.getElementById('registrationForm').reset();

    // Hide other dietary field
    const otherDietaryDiv = document.getElementById('other-dietary');
    if (otherDietaryDiv) {
        otherDietaryDiv.style.display = 'none';
    }

    console.log('Registration saved:', registrationRecord);

    // Registration saved successfully
}

// Admin Panel Functions
function initAdminPanel() {
    // Admin panel is now hidden by default
    // Only show download button in registration section
}

function updateAdminStats() {
    const registrations = JSON.parse(localStorage.getItem('awoc_registrations') || '[]');
    document.getElementById('totalRegistrations').textContent = registrations.length;
}

function downloadSpreadsheet() {
    // Check password
    const password = prompt('Enter password to download registration data:');
    if (password !== 'awoc2025') {
        showNotification('Incorrect password.', 'error');
        return;
    }

    const registrations = JSON.parse(localStorage.getItem('awoc_registrations') || '[]');

    if (registrations.length === 0) {
        showNotification('No registration data found.', 'error');
        return;
    }

    // Prepare data for Excel
    const excelData = registrations.map(reg => ({
        'ID': reg.id,
        'Registration Date': new Date(reg.timestamp).toLocaleDateString(),
        'Registration Time': new Date(reg.timestamp).toLocaleTimeString(),
        'Full Name': reg.name,
        'Email': reg.email,
        'Affiliation': reg.affiliation,
        'Tutorials': reg.tutorials,
        'Banquet': reg.banquet,
        'Dietary Preference': reg.dietary,
        'Other Dietary': reg.other_dietary
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'AWOC-JKWOC 2025 Registrations');

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `AWOC-JKWOC_2025_Registrations_${currentDate}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);

    showNotification(`Spreadsheet downloaded: ${filename}`, 'success');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all registration data? This action cannot be undone.')) {
        localStorage.removeItem('awoc_registrations');
        updateAdminStats();
        showNotification('All registration data has been cleared.', 'success');
    }
}

// Contact form validation removed (now using direct contact methods)

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-item, .speaker-card, .program-item, .pricing-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(function () {
    // Scroll handling logic here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add loading states for better UX
function addLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function removeLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Form submission with loading state
function submitFormWithLoading(form, callback) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    addLoadingState(form);
    submitBtn.textContent = '처리 중...';

    // Simulate API call
    setTimeout(() => {
        callback();
        removeLoadingState(form);
        submitBtn.textContent = originalText;
    }, 2000);
}

// Export functions for global access
window.AWOC = {
    showNotification,
    validateRegistrationForm,
    validateContactForm,
    submitFormWithLoading
};
