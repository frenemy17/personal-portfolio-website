
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

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
                    offsetY: 70 
                },
                ease: "power2.inOut"
            });
        }
    });
});


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
  
    console.log('Form submitted');
}); 
