// Simple interactive features for the website

// Function to show a message when button is clicked
function showMessage() {
    alert('Trang Web này sẽ nổ tung sau 5 giây');
    
    // Add popping effect after 5 seconds
    setTimeout(() => {
        const button = document.querySelector('.hero button');
        if (button) {
            // Add pop animation class
            button.classList.add('pop-effect');
            
            // Create explosion effect
            createExplosionEffect(button);
            
            // Remove the class after animation completes
            setTimeout(() => {
                button.classList.remove('pop-effect');
            }, 1000);
        }
    }, 5000);
}

// Create explosion effect function
function createExplosionEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple particles for explosion effect
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = '#667eea';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        // Random direction and distance
        const angle = (360 / 20) * i;
        const distance = 100 + Math.random() * 50;
        const radian = (angle * Math.PI) / 180;
        const endX = centerX + Math.cos(radian) * distance;
        const endY = centerY + Math.sin(radian) * distance;
        
        particle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        document.body.appendChild(particle);
        
        // Animate particle
        setTimeout(() => {
            particle.style.left = endX + 'px';
            particle.style.top = endY + 'px';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 10);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
    
    // Add animation to project cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to button
    const button = document.querySelector('.hero button');
    if (button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const size = Math.max(this.clientWidth, this.clientHeight);
            const x = e.clientX - this.offsetLeft - size / 2;
            const y = e.clientY - this.offsetTop - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Simple contact form validation (if you add a form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Console message for visitors
console.log('Welcome to my website! Feel free to explore the code.');
console.log('This website is built with vanilla HTML, CSS, and JavaScript.');
console.log('Perfect for GitHub Pages hosting!');
