// Enhanced Navigation Functionality
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');

        // Special handling for projects section due to GSAP ScrollTrigger
        if (targetId === '#projects') {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 0
                },
                ease: "power2.inOut"
            });
        } else {
            // Normal scrolling for other sections
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 70 // Account for navbar height
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Add active state based on scroll position
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
});

// Form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
}); 