document.addEventListener('DOMContentLoaded', function() {

    // --- GSAP & Feather Icons Init ---
    gsap.registerPlugin(ScrollTrigger);
    feather.replace();

    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.classList.remove('no-scroll'); // Allow scrolling
                    // Start all page content animations after preloader is gone
                    animatePageContent();
                }
            });
        });
        document.body.classList.add('no-scroll'); // Prevent scrolling during preload
    } else {
        // If no preloader, animate everything right away
        animatePageContent();
    }

    // --- STICKY HEADER (FIXED LOGIC) ---
    const header = document.querySelector('.header');
    if (header) {
        // This is the corrected, stable method. It uses GSAP's built-in toggleClass
        // to add/remove the 'scrolled' class without flickering.
        ScrollTrigger.create({
            trigger: "body", // The trigger is the body itself
            start: "top -100px", // Add the class when the user has scrolled 100px down
            end: "bottom bottom", // A dummy end point
            toggleClass: {
                targets: header,
                className: "scrolled"
            },
        });
    }

    // --- PAGE CONTENT ANIMATION FUNCTION (UPDATED) ---
    function animatePageContent() {
        // Animate Hero Section if it exists
        if (document.querySelector('.hero')) {
            const tl = gsap.timeline({delay: 0.2});
            tl.from('.hero-headline', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
              .from('.hero-subheadline', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, "-=0.8")
              .from('.hero-choice-wrapper', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, "-=0.8")
              .from('.hero-image', { duration: 1.2, scale: 0.9, opacity: 0, ease: 'power3.out' }, "-=0.8");
        }

        // Animate all other reveal elements on the page with a stagger effect on load
        const revealElements = document.querySelectorAll('.anim-reveal');
        gsap.from(revealElements, {
            delay: document.querySelector('.hero') ? 0.5 : 0.2, // Add a slight delay if there's a hero section
            duration: 1,
            y: 60,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.15 // Stagger the animation of each element for a smooth cascade effect
        });
    }

    // --- VALUATION FORM ---
    const valuationForm = document.getElementById('valuation-form');
    if (valuationForm) {
        const steps = valuationForm.querySelectorAll('.valuation-step');
        const nextButtons = valuationForm.querySelectorAll('.next-step');
        let currentStep = 0;

        const goToStep = (stepIndex) => {
            gsap.to(steps[currentStep], { opacity: 0, duration: 0.3, onComplete: () => {
                steps[currentStep].classList.remove('active');
                steps[stepIndex].classList.add('active');
                gsap.fromTo(steps[stepIndex], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
                currentStep = stepIndex;
            }});
        };

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                goToStep(currentStep + 1);
            });
        });

        valuationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            goToStep(steps.length - 1); // Go to thank you step
        });
    }

    // --- MOBILE NAVIGATION ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
            document.body.classList.toggle('no-scroll'); // Prevent background scroll when menu is open
        });
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
