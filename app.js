/**
 * AetherSpace - Spatial Workspace Landing Page Controller
 * Handles interactive behaviors, navigation style overrides, scroll-spy,
 * viewport reveals, design playground sliders, and form events.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Header Style on Scroll ---
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Listen for scroll events
    window.addEventListener('scroll', handleNavbarScroll);
    // Trigger once on load to catch initial state
    handleNavbarScroll();

    // --- Mobile Hamburger Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu-list');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickToggle = menuBtn.contains(event.target);
        if (!isClickInsideMenu && !isClickToggle && navMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // --- Scroll-Spy active state on Nav Links ---
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    // Trigger on load
    scrollSpy();

    // --- Interactive Workspace Demo Tabs ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active to current button
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Find target panel
            const panelId = btn.getAttribute('aria-controls');
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- Tab 1 Design Canvas Controls ---
    const opacitySlider = document.getElementById('opacity-slider');
    const blurSlider = document.getElementById('blur-slider');
    const colorDots = document.querySelectorAll('.color-dot');
    const glassCard = document.querySelector('.glass-card');
    const circleShape = document.querySelector('.circle-shape');

    if (opacitySlider && glassCard) {
        opacitySlider.addEventListener('input', (e) => {
            const val = e.target.value / 100;
            glassCard.style.backgroundColor = `rgba(255, 255, 255, ${val * 0.15})`;
        });
    }

    if (blurSlider && glassCard) {
        blurSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            glassCard.style.backdropFilter = `blur(${val}px)`;
        });
    }

    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            const color = dot.getAttribute('data-color');
            let colorVal = 'var(--clr-accent)';
            
            if (color === 'blue') {
                colorVal = 'var(--clr-secondary)';
            } else if (color === 'purple') {
                colorVal = 'var(--clr-primary)';
            }
            
            if (circleShape) {
                circleShape.style.backgroundColor = colorVal;
                circleShape.style.filter = `drop-shadow(0 0 15px ${colorVal})`;
            }
        });
    });

    // --- Interactive card features mouse tracking (3D card shine effect) ---
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Scroll Reveal Animations Observer ---
    const revealElements = document.querySelectorAll('.reveal-element');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- Contact Form Submission Handler ---
    const contactForm = document.getElementById('main-contact-form');
    const formStatus = document.getElementById('form-status-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // UI Feedback: Loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            // Simulate server request delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                formStatus.className = 'form-status success';
                formStatus.textContent = 'Success! Your message was sent. Our cloud architecture team will connect with you soon.';
                
                // Clear the form
                contactForm.reset();
                
                // Revert color selectors if modified
                if (circleShape) {
                    circleShape.style.backgroundColor = 'var(--clr-accent)';
                    circleShape.style.filter = 'drop-shadow(0 0 15px var(--clr-primary-glow))';
                }
                colorDots.forEach(d => {
                    d.classList.remove('active');
                    if (d.classList.contains('color-pink')) {
                        d.classList.add('active');
                    }
                });
                if (opacitySlider) opacitySlider.value = 85;
                if (blurSlider) blurSlider.value = 12;
                if (glassCard) {
                    glassCard.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                    glassCard.style.backdropFilter = 'blur(12px)';
                }

                // Fade message out after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.style.opacity = '1';
                    }, 300);
                }, 5000);

            }, 1200);
        });
    }

    // --- Footer Newsletter Form Handler ---
    const newsletterForm = document.getElementById('footer-newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status-msg');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            newsletterStatus.className = 'newsletter-status';
            newsletterStatus.textContent = '';

            setTimeout(() => {
                submitBtn.disabled = false;
                newsletterStatus.className = 'newsletter-status success';
                newsletterStatus.textContent = 'Subscribed successfully!';
                emailInput.value = '';

                setTimeout(() => {
                    newsletterStatus.style.opacity = '0';
                    setTimeout(() => {
                        newsletterStatus.textContent = '';
                        newsletterStatus.style.opacity = '1';
                    }, 300);
                }, 4000);

            }, 800);
        });
    }
});
