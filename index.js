const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Closes the menu when you click a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});



// skills

const observerOptionsSkills = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pills = entry.target.querySelectorAll('.skill-pill');
            
            pills.forEach((pill, index) => {
                // Stagger the animation of each pill
                setTimeout(() => {
                    pill.classList.add('reveal');
                }, index * 100); // 100ms delay between each skill
            });
        }
    });
}, observerOptionsSkills);

// Start observing the skills container
skillObserver.observe(document.querySelector('.skills-container'));

// Bonus: Mouse Tracker Effect
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mousemove', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        // Subtle tilt based on mouse position inside the pill
        pill.style.transform = `rotateY(${(x - 50) / 5}deg) rotateX(${-(y - 20) / 5}deg) translateY(-10px)`;
    });
    
    pill.addEventListener('mouseleave', () => {
        pill.style.transform = `rotateY(0) rotateX(0) translateY(0)`;
    });
});


// contact

// 1. Magnetic Icons
const icons = document.querySelectorAll('.magnetic');
icons.forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
        const x = e.offsetX - icon.clientWidth / 2;
        const y = e.offsetY - icon.clientHeight / 2;
        icon.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = `translate(0,0)`;
    });
});

// 2. Form Submit Animation
const form = document.querySelector('.glass-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.querySelector('.send-btn');
    
    // Simple "Success" Animation
    btn.innerHTML = "<span>Sent!</span> <i class='bx bx-check'></i>";
    btn.style.background = "#4BB543";
    
    setTimeout(() => {
        form.reset();
        btn.innerHTML = "<span>Send Message</span> <i class='bx bx-paper-plane'></i>";
        btn.style.background = "#87CEEB";
    }, 3000);
});


// Function to trigger project entrance when Nav is clicked
const projectNavLink = document.querySelector('a[href="#projects"]');
const projectCards = document.querySelectorAll('.project-card');

projectNavLink.addEventListener('click', () => {
    // Add a temporary animation class
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(100px)';
        
        setTimeout(() => {
            card.style.transition = `all 0.6s ease ${index * 0.2}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100);
    });
});

// Intersection Observer for regular scrolling
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('project-visible');
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => projectObserver.observe(card));



// about 

// Function to restart animations
function playEntranceAnimations() {
    const elements = document.querySelectorAll('.about-visual, .about-content, .skill-item.cls');
    
    elements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; /* Trigger reflow to reset animation */
        el.style.animation = '';
    });
}

// Play on load
window.addEventListener('DOMContentLoaded', playEntranceAnimations);

// Play when clicking the logo or Home link
document.querySelectorAll('a[href="./index.html"], .logo').forEach(link => {
    link.addEventListener('click', () => {
        // If it's a single page app style, trigger here
        playEntranceAnimations();
    });
});


// project

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card, .projects-header');
    
    // This function resets and plays the animation
    const triggerAnimations = () => {
        cards.forEach((card) => {
            card.style.animation = 'none';
            card.offsetHeight; /* trigger reflow */
            card.style.animation = '';
        });
    };

    // Run on initial load
    triggerAnimations();

    // Run when clicking "Projects" in the nav
    const projectNavLink = document.querySelector('a[href="./project.html"]');
    if (projectNavLink) {
        projectNavLink.addEventListener('click', triggerAnimations);
    }
});