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
                    // Start hero animation after preloader is gone
                    animateHero();
                }
            });
        });
    } else {
        // If no preloader, animate hero right away
        animateHero();
    }

    // --- STICKY HEADER ---
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            start: 'top -100px',
            onUpdate: self => {
                if (self.direction === 1 && self.progress > 0) { // Scrolling down
                    header.classList.add('scrolled');
                } else { // Scrolling up
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    // --- HERO ANIMATION FUNCTION ---
    function animateHero() {
        if (!document.querySelector('.hero')) return; // Only run on homepage
        
        const tl = gsap.timeline({delay: 0.2});
        tl.from('.hero-headline', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
          .from('.hero-subheadline', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, "-=0.8")
          .from('.hero-choice-wrapper', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, "-=0.8")
          .from('.hero-image', { duration: 1.2, scale: 0.9, opacity: 0, ease: 'power3.out' }, "-=0.8");
    }

    // --- GENERAL REVEAL ANIMATION (THE FIX) ---
    // This is the corrected logic. It works reliably.
    const revealElements = document.querySelectorAll('.anim-reveal');
    revealElements.forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 }, // from state
            { // to state
                opacity: 1, 
                y: 0,
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

    // --- VALUATION FORM ---
    const valuationForm = document.getElementById('valuation-form');
    if (valuationForm) {
        const steps = valuationForm.querySelectorAll('.valuation-step');
        const nextButtons = valuationForm.querySelectorAll('.next-step');
        let currentStep = 0;

        const goToStep = (stepIndex) => {
            if (stepIndex >= steps.length || stepIndex < 0) return;

            const current = steps[currentStep];
            const next = steps[stepIndex];

            gsap.to(current, { 
                opacity: 0, 
                duration: 0.3, 
                onComplete: () => {
                    current.classList.remove('active');
                    next.classList.add('active');
                    gsap.fromTo(next, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
                }
            });
            currentStep = stepIndex;
        };

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Simple validation for demo
                const input = steps[currentStep].querySelector('input[required]');
                if (input && !input.value) {
                    input.style.border = '1px solid red';
                    return;
                }
                if(input) input.style.border = '1px solid #333';
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
            mainNav.classList.toggle('open');
        });
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});