// Welcome Page Functionality
function enterSite() {
    const welcomePage = document.getElementById('welcomePage');
    const mainSite = document.getElementById('mainSite');
    
    welcomePage.style.animation = 'fadeOut 0.8s ease-out forwards';
    
    setTimeout(() => {
        welcomePage.style.display = 'none';
        mainSite.classList.remove('hidden');
        createParticles();
    }, 800);
}

// Create Animated Particles for Welcome Page
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation styles dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate section title
            const title = entry.target.querySelector('.section-title');
            if (title) {
                setTimeout(() => {
                    title.classList.add('animate-in');
                }, 100);
            }
            
            // Animate section icon
            const icon = entry.target.querySelector('.section-icon');
            if (icon) {
                setTimeout(() => {
                    icon.classList.add('animate-in', 'animate-scale');
                }, 300);
            }
            
            // Animate content card
            const card = entry.target.querySelector('.content-card');
            if (card) {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, 500);
            }
            
            // Animate example cards with stagger
            const exampleCards = entry.target.querySelectorAll('.example-card');
            exampleCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, 700 + (index * 100));
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all material sections
document.querySelectorAll('.material-section').forEach(section => {
    observer.observe(section);
});

// Navbar Background on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect to example cards with tilt
document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add click animation to example cards
document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.innerHTML = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }
});

// Add Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Active Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.material-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Add active link style
const activeLinkStyle = document.createElement('style');
activeLinkStyle.innerHTML = `
    .active-link {
        color: white !important;
    }
    .active-link::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyle);

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorCircle;

function createCursorCircle() {
    cursorCircle = document.createElement('div');
    cursorCircle.style.position = 'fixed';
    cursorCircle.style.width = '20px';
    cursorCircle.style.height = '20px';
    cursorCircle.style.borderRadius = '50%';
    cursorCircle.style.border = '2px solid rgba(102, 126, 234, 0.5)';
    cursorCircle.style.pointerEvents = 'none';
    cursorCircle.style.zIndex = '9999';
    cursorCircle.style.transition = 'transform 0.15s ease';
    document.body.appendChild(cursorCircle);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorCircle) {
        cursorCircle.style.left = mouseX - 10 + 'px';
        cursorCircle.style.top = mouseY - 10 + 'px';
    }
});

// Initialize cursor circle on desktop only
if (window.innerWidth > 768) {
    createCursorCircle();
}

// Add scale effect to cursor on hover
document.querySelectorAll('a, button, .example-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursorCircle) {
            cursorCircle.style.transform = 'scale(1.5)';
            cursorCircle.style.borderColor = 'rgba(139, 92, 246, 0.8)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (cursorCircle) {
            cursorCircle.style.transform = 'scale(1)';
            cursorCircle.style.borderColor = 'rgba(102, 126, 234, 0.5)';
        }
    });
});

console.log('Website loaded successfully! Created by SOULAYMA DHAHBI & SIRINE ELAARBI | Developed by Med Aymen Troudi');
