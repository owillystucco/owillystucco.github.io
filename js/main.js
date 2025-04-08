// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const content = answer.querySelector('.faq-answer-content');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            const faqAnswer = faqItem.querySelector('.faq-answer');
            faqItem.classList.remove('active');
            faqAnswer.style.height = '0';
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
            answer.style.height = content.offsetHeight + 'px';
        }
    });
});

// Function to update height on window resize
function updateHeight() {
    const activeItem = document.querySelector('.faq-item.active');
    if (activeItem) {
        const activeAnswer = activeItem.querySelector('.faq-answer');
        const activeContent = activeAnswer.querySelector('.faq-answer-content');
        activeAnswer.style.height = activeContent.offsetHeight + 'px';
    }
}

// Update height on window resize
window.addEventListener('resize', updateHeight);

// Initialize map
function initMap() {
    const map = L.map('map', {
        center: [41.094120, -112.064621],
        zoom: 7,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        zoomControl: false,
        keyboard: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([41.094120, -112.064621]).addTo(map)
        .bindPopup('Advanced Exteriors & Construction')
        .openPopup();
}

// Call initMap when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initMap);

// Smooth scrolling for navigation links with offset and slower animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 80; // Should match your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Slower scroll animation
            smoothScrollTo(offsetPosition, 1500); // 1500ms = 1.5 seconds, adjust as needed
        }

        // Close mobile menu after clicking a link (if you have this functionality)
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// Custom smooth scroll function with adjustable duration
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smoother animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
