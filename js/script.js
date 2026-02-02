// CYBERDARK 2026 - Advanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU TOGGLE ==========
    const cyberMenuToggle = document.getElementById('cyberMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    let isMenuOpen = false;

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active', isMenuOpen);
        cyberMenuToggle.classList.toggle('active', isMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        // Update aria attributes for accessibility
        cyberMenuToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
    }

    cyberMenuToggle.addEventListener('click', toggleMobileMenu);
    closeMenu.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && 
            !mobileMenu.contains(event.target) && 
            !cyberMenuToggle.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    });

    // ========== NAVIGATION SCROLL EFFECT ==========
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMobileMenu();
                }

                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.cyber-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ANIMATED COUNTERS ==========
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const suffix = target.getAttribute('data-count') === '99' ? '%' : '+';
                animateCounter(target, count, suffix);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));

    // ========== PURCHASE MODAL ==========
    const purchaseButtons = document.querySelectorAll('.btn-purchase');
    const purchaseModal = document.querySelector('.cyber-modal');
    const closeModal = document.getElementById('closeModal');
    const cancelPurchase = document.getElementById('cancelPurchase');
    const confirmPurchase = document.getElementById('confirmPurchase');
    const modalAppTitle = document.getElementById('modalAppTitle');
    const modalAppDescription = document.getElementById('modalAppDescription');
    const modalPrice = document.getElementById('modalPrice');

    const appDetails = {
        'sms': {
            title: 'SMS SPY SERVICE',
            description: 'Monitor all incoming and outgoing text messages on target device with complete SMS tracking and timestamp.',
            price: '100 KSH'
        },
        'location': {
            title: 'LOCATION SPY SERVICE',
            description: 'Real-time GPS tracking and location history. Know exact position anytime with precision mapping.',
            price: '100 KSH'
        },
        'gallery': {
            title: 'GALLERY SPY SERVICE',
            description: 'Access photos, videos, and media files from device gallery remotely with full preview capability.',
            price: '100 KSH'
        },
        'phone': {
            title: 'PHONE SPY SERVICE',
            description: 'Get detailed device information, contacts, call logs, and comprehensive app data analysis.',
            price: '100 KSH'
        }
    };

    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appType = this.getAttribute('data-app');
            const appDetail = appDetails[appType];

            if (appDetail) {
                modalAppTitle.textContent = appDetail.title;
                modalAppDescription.textContent = appDetail.description;
                modalPrice.textContent = appDetail.price;

                // Set Telegram message with app details
                const message = `Hello! I want to purchase the ${appDetail.title} for ${appDetail.price}. Please provide payment details.`;
                const encodedMessage = encodeURIComponent(message);
                confirmPurchase.href = `https://t.me/Four04unkown?text=${encodedMessage}`;

                // Show modal
                purchaseModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functions
    function closePurchaseModal() {
        purchaseModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (closeModal) closeModal.addEventListener('click', closePurchaseModal);
    if (cancelPurchase) cancelPurchase.addEventListener('click', closePurchaseModal);

    // Close modal when clicking outside
    purchaseModal.addEventListener('click', function(event) {
        if (event.target === purchaseModal) {
            closePurchaseModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && purchaseModal.style.display === 'flex') {
            closePurchaseModal();
        }
    });

    // ========== CYBER TERMINAL ANIMATION ==========
    const terminal = document.querySelector('.cyber-terminal');
    if (terminal) {
        let commandIndex = 0;
        const commands = [
            'status --system',
            'scan --bots',
            'monitor --apps',
            'security --check'
        ];

        function typeCommand() {
            const commandElement = terminal.querySelector('.command');
            const currentCommand = commands[commandIndex];
            let charIndex = 0;

            function typeChar() {
                if (charIndex < currentCommand.length) {
                    commandElement.textContent = currentCommand.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    setTimeout(clearCommand, 2000);
                }
            }

            function clearCommand() {
                if (charIndex > 0) {
                    commandElement.textContent = currentCommand.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(clearCommand, 30);
                } else {
                    commandIndex = (commandIndex + 1) % commands.length;
                    setTimeout(typeCommand, 500);
                }
            }

            typeChar();
        }

        // Start typing animation
        setTimeout(typeCommand, 1000);
    }

    // ========== GLOWING EFFECTS ==========
    const cyberCards = document.querySelectorAll('.cyber-card');
    cyberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 40px rgba(0, 243, 255, 0.6)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ========== SCROLL ANIMATIONS ==========
    const animatedElements = document.querySelectorAll('.cyber-card, .section-header');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => scrollObserver.observe(element));

    // ========== BACKGROUND INTERACTIVITY ==========
    const glowParticles = document.querySelectorAll('.glow-particle');
    const cyberLines = document.querySelectorAll('.cyber-line');

    // Mouse move effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Subtle particle movement
        glowParticles.forEach((particle, index) => {
            const speed = 0.02 * (index + 1);
            const x = (mouseX - 0.5) * 50 * speed;
            const y = (mouseY - 0.5) * 50 * speed;

            particle.style.transform += ` translate(${x}px, ${y}px)`;
        });

        // Line speed effect
        cyberLines.forEach((line, index) => {
            const distance = Math.abs(e.clientY - line.offsetTop);
            if (distance < 200) {
                const currentSpeed = parseFloat(getComputedStyle(line).animationDuration);
                if (currentSpeed > 10) {
                    line.style.animationDuration = `${currentSpeed * 0.8}s`;
                    setTimeout(() => {
                        line.style.animationDuration = '';
                    }, 100);
                }
            }
        });
    });

    // ========== PERFORMANCE OPTIMIZATION ==========
    let lastScrollTime = 0;
    const SCROLL_THROTTLE = 100; // ms

    window.addEventListener('scroll', function() {
        const now = Date.now();

        if (now - lastScrollTime >= SCROLL_THROTTLE) {
            updateActiveNav();
            lastScrollTime = now;
        }
    });

    // ========== IMAGE ERROR HANDLING ==========
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Handle logo errors
            if (this.classList.contains('logo-img') || 
                this.parentElement.classList.contains('bot-icon') ||
                this.src.includes('catbox.moe')) {

                const seed = this.src.includes('9k5pq0') ? '404xmd' : 
                            this.src.includes('dgx6oa') ? 'madmax' : 'cyberdark';

                this.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=0d0d1a&hair=variant08`;
                this.style.objectFit = 'contain';
                this.style.padding = '10px';
            }
        });

        // Add lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // ========== KEYBOARD NAVIGATION ==========
    document.addEventListener('keydown', function(e) {
        // Tab navigation for cards
        if (e.key === 'Tab') {
            const focused = document.activeElement;
            if (focused.classList.contains('cyber-card')) {
                focused.style.outline = '2px solid var(--cyber-blue)';
                focused.style.outlineOffset = '5px';
            }
        }

        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.altKey) {
            const sections = ['home', 'bots', 'apps', 'tools', 'contact'];
            const index = parseInt(e.key) - 1;

            if (sections[index]) {
                const targetSection = document.getElementById(sections[index]);
                if (targetSection) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.cyber-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });

    // ========== INITIALIZE ANIMATIONS ==========
    function initializeAnimations() {
        // Add initial animation classes
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);

        // Start background animations
        glowParticles.forEach((particle, index) => {
            particle.style.animationDelay = `${index * 2}s`;
        });
    }

    initializeAnimations();

    // ========== CONSOLE LOGO ==========
    console.log(`
    ██████╗██╗   ██╗██████╗ ███████╗██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗
    ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
    ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██████╔╝███████║██████╔╝█████╔╝ 
    ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██╔══██╗██╔══██║██╔══██╗██╔═██╗ 
    ╚██████╗   ██║   ██████╔╝███████╗██║  ██║██║  ██║██║  ██║██║  ██║██║  ██╗
     ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
                                                                            
    ████████╗███████╗ ██████╗██╗  ██╗    ██████╗  █████╗ ██████╗ ██╗  ██╗
    ╚══██╔══╝██╔════╝██╔════╝██║  ██║    ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
       ██║   █████╗  ██║     ███████║    ██████╔╝███████║██████╔╝█████╔╝ 
       ██║   ██╔══╝  ██║     ██╔══██║    ██╔══██╗██╔══██║██╔══██╗██╔═██╗ 
       ██║   ███████╗╚██████╗██║  ██║    ██║  ██║██║  ██║██║  ██║██║  ██╗
       ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
                                                                        
    ════════════════════════════════════════════════════════════════════
    Website: CYBERDARK 2026 | WhatsApp Bots & Monitoring Solutions
    Telegram: @Four04unkown | GitHub: 404unkown
    ════════════════════════════════════════════════════════════════════
    `);
});

// Window load event for final optimizations
window.addEventListener('load', function() {
    // Remove pre-loader if exists
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }

    // Optimize images
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
    });

    // Initialize service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
});

// Performance monitoring
window.addEventListener('pageshow', function() {
    const perfData = window.performance.getEntriesByType('navigation')[0];
    if (perfData) {
        console.log(`Page loaded in ${Math.round(perfData.domContentLoadedEventEnd)}ms`);
    }
});