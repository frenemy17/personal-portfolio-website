// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section parallax
gsap.to(".hero", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 200,
    opacity: 0.5
});

// Skills section animations
gsap.utils.toArray('.skill-item').forEach((skill, i) => {
    gsap.from(skill, {
        scrollTrigger: {
            trigger: skill,
            start: "top bottom",
            end: "top center",
            scrub: 1
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0
    });
});

// Project cards stagger animation
gsap.from(".project-card", {
    scrollTrigger: {
        trigger: ".projects-grid",
        start: "top center",
        end: "bottom center",
        scrub: 1
    },
    y: 100,
    opacity: 0,
    stagger: 0.2
});

// Contact form parallax
gsap.from("#contact-form", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "center center",
        scrub: 1
    },
    y: 50,
    opacity: 0
});

// Smooth section transitions
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            markers: false
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Enhanced React logo animation
gsap.to(".react-logo", {
    rotate: 360,
    duration: 10,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

// Navbar parallax effect
gsap.to(".glass-nav", {
    scrollTrigger: {
        start: 0,
        end: "max",
        onUpdate: (self) => {
            gsap.to(".glass-nav", {
                backgroundColor: `rgba(0, 0, 0, ${0.3 + self.progress * 0.4})`,
                duration: 0.3
            });
        }
    }
});

// Initialize intersection observer for other animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.skill-item').forEach(skill => {
    observer.observe(skill);
});

// Projects Section Animation
const projectsSection = document.querySelector('#projects');
const projectsContainer = document.querySelector('.projects-container');
const projectCards = gsap.utils.toArray('.project-card');
const lastCard = projectCards[projectCards.length - 1];

// Set up the horizontal scroll animation
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#projects",
        pin: true,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        anticipatePin: 1,
        snap: {
            snapTo: 1 / (projectCards.length - 1),
            duration: { min: 0.1, max: 0.3 },
            ease: "power1.inOut"
        },
        onUpdate: (self) => {
            if (self.progress > 0.95) {
                self.pin(false);
            }
        }
    }
});

// Create the horizontal scroll animation
tl.to(projectsContainer, {
    x: () => -(projectsContainer.offsetWidth - window.innerWidth - lastCard.offsetWidth),
    ease: "none"
});

// Add parallax effect to each card
projectCards.forEach((card, i) => {
    gsap.set(card, {
        opacity: 0.5,
        scale: 0.9
    });

    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "left center",
            end: "right center",
            containerAnimation: tl,
            scrub: true,
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        scale: 1,
        ease: "power2.out"
    });
});

// Transition to contact section
ScrollTrigger.create({
    trigger: lastCard,
    start: "center center",
    endTrigger: "#contact",
    end: "top top",
    scrub: true,
    onEnter: () => {
        gsap.to("#contact", {
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }
});

// Hover effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            zIndex: 10,
            boxShadow: "0 5px 15px rgba(0,0,0,0.3), 0 0 30px rgba(18,206,164,0.15)"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.in",
            zIndex: 1,
            boxShadow: "none"
        });
    });
});

// Performance optimization
ScrollTrigger.addEventListener("refresh", () => {
    projectCards.forEach(card => {
        card.style.willChange = "transform";
    });
});

ScrollTrigger.addEventListener("scrollEnd", () => {
    projectCards.forEach(card => {
        card.style.willChange = "auto";
    });
});

// Projects heading animation
gsap.from("#projects h2", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top center",
        toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 1
});

// Update CSS for projects section
const style = document.createElement('style');
style.textContent = `
    #projects {
        overflow: hidden;
        padding: 4rem 0;
    }
    .projects-grid {
        padding: 2rem;
    }
    .project-card {
        flex-shrink: 0;
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: "power3.inOut"
        });
    });
});

// Optional: Add a parallax effect to the background
gsap.to("#projects", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false
    },
    backgroundPosition: "50% 100%",
    ease: "none"
});

// Skills section animations
const skillLogos = document.querySelectorAll('.skill-logo');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add animation with delay based on index
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
        }
    });
}, observerOptions);

skillLogos.forEach(logo => {
    skillsObserver.observe(logo);
});

// Initialize pie charts
function initPieCharts() {
    const pieCharts = document.querySelectorAll('.pie-chart-circle');
    
    pieCharts.forEach(chart => {
        const value = chart.getAttribute('data-value');
        chart.style.setProperty('--percentage', value + '%');
    });
}

// Animate skills when they come into view
gsap.from(".pie-chart", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top center",
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    onComplete: initPieCharts
});

function initCyberBars() {
    const hexContents = document.querySelectorAll('.hexagon-content');
    
    hexContents.forEach(content => {
        const value = content.getAttribute('data-value');
        const barFill = content.querySelector('.cyber-bar-fill');
        barFill.style.width = value + '%';
    });
}

gsap.from(".hexagon-item", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top center",
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    onComplete: initCyberBars
});

// Add floating animation to hexagons
gsap.to(".hexagon", {
    y: 10,
    duration: 2,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
    stagger: {
        each: 0.2,
        from: "random"
    }
}); 