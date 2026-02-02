// Mobile-optimized JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Menu Toggle with Rotation
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuLogoImg = document.getElementById('menuLogo');
    let isMenuOpen = false;

    // Optimized menu toggle for mobile
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Add/remove active classes
        menuToggle.classList.toggle('active', isMenuOpen);
        dropdownMenu.classList.toggle('active', isMenuOpen);
        
        // Rotate effects only on non-touch devices
        if (!isTouchDevice) {
            menuLogoImg.style.transform = isMenuOpen ? 'rotate(360deg)' : 'rotate(0deg)';
            menuToggle.style.transform = isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        
        // Prevent body scroll when menu is open on mobile
        if (isMobile) {
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        }
        
        // Update aria attributes for accessibility
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        dropdownMenu.setAttribute('aria-hidden', !isMenuOpen);
    }

    // Menu Event Listeners with touch optimization
    menuToggle.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    closeMenu.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(event) {
        if (isMenuOpen && 
            !dropdownMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Bot Showcase Switcher (Mobile optimized)
    const botPreviews = document.querySelectorAll('.bot-preview');
    const showcaseIndicators = document.querySelectorAll('.showcase-indicator span');
    let currentPreview = 0;
    let previewInterval;

    function showPreview(index) {
        // Validate index
        if (index < 0 || index >= botPreviews.length) return;
        
        botPreviews.forEach(preview => preview.classList.remove('active'));
        showcaseIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        botPreviews[index].classList.add('active');
        showcaseIndicators[index].classList.add('active');
        currentPreview = index;
    }

    // Auto rotate bot previews (pause on hover/touch)
    function startPreviewRotation() {
        if (previewInterval) clearInterval(previewInterval);
        
        previewInterval = setInterval(() => {
            let nextPreview = (currentPreview + 1) % botPreviews.length;
            showPreview(nextPreview);
        }, 5000);
    }

    function stopPreviewRotation() {
        if (previewInterval) {
            clearInterval(previewInterval);
            previewInterval = null;
        }
    }

    // Start rotation initially
    startPreviewRotation();

    // Pause rotation on touch/hover
    const showcaseContent = document.querySelector('.showcase-content');
    if (showcaseContent) {
        showcaseContent.addEventListener('touchstart', stopPreviewRotation);
        showcaseContent.addEventListener('touchend', startPreviewRotation);
        
        if (!isTouchDevice) {
            showcaseContent.addEventListener('mouseenter', stopPreviewRotation);
            showcaseContent.addEventListener('mouseleave', startPreviewRotation);
        }
    }

    // Manual indicator click/touch
    showcaseIndicators.forEach((indicator, index) => {
        indicator.addEventListener(isTouchDevice ? 'touchstart' : 'click', (e) => {
            e.preventDefault();
            showPreview(index);
            stopPreviewRotation();
            setTimeout(startPreviewRotation, 10000); // Restart after 10 seconds
        });
    });

    // Bot Deployment Options
    const deployButtons = document.querySelectorAll('.btn-deploy');
    const deploymentOptions = document.getElementById('deploymentOptions');
    const closeDeployment = document.getElementById('closeDeployment');

    deployButtons.forEach(button => {
        button.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(e) {
            e.preventDefault();
            deploymentOptions.classList.add('active');
            
            // Smooth scroll on mobile
            if (isMobile) {
                deploymentOptions.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                deploymentOptions.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    closeDeployment.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(e) {
        e.preventDefault();
        deploymentOptions.classList.remove('active');
    });

    // Spy App Purchase Modal
    const purchaseButtons = document.querySelectorAll('.btn-purchase');
    const purchaseModal = document.getElementById('purchaseModal');
    const closeModal = document.getElementById('closeModal');
    const cancelPurchase = document.getElementById('cancelPurchase');
    const confirmPurchase = document.getElementById('confirmPurchase');
    const modalAppTitle = document.getElementById('modalAppTitle');
    const modalAppDescription = document.getElementById('modalAppDescription');
    const modalPrice = document.getElementById('modalPrice');

    const appDetails = {
        'sms-spy': {
            title: 'SMS Spy Service',
            description: 'Monitor all incoming and outgoing text messages on target device.',
            price: '100 KSH'
        },
        'location-spy': {
            title: 'Location Spy Service',
            description: 'Track real-time GPS location and location history of target device.',
            price: '100 KSH'
        },
        'gallery-spy': {
            title: 'Gallery Spy Service',
            description: 'Access photos, videos, and media files from device gallery.',
            price: '100 KSH'
        },
        'phone-spy': {
            title: 'About Phone Spy Service',
            description: 'Get detailed device information, contacts, call logs, and app data.',
            price: '100 KSH'
        }
    };

    purchaseButtons.forEach(button => {
        button.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(e) {
            e.preventDefault();
            const appType = this.getAttribute('data-app');
            const appDetail = appDetails[appType];
            
            if (appDetail) {
                modalAppTitle.textContent = appDetail.title;
                modalAppDescription.textContent = appDetail.description;
                modalPrice.textContent = appDetail.price;
                
                // Set Telegram message
                const message = `Hello, I want to purchase ${appDetail.title} for ${appDetail.price}.`;
                const encodedMessage = encodeURIComponent(message);
                confirmPurchase.href = `https://t.me/Four04unkown?text=${encodedMessage}`;
                
                purchaseModal.style.display = 'flex';
                
                // Prevent body scroll on mobile when modal is open
                if (isMobile) {
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // Close modal functions
    function closePurchaseModal() {
        purchaseModal.style.display = 'none';
        if (isMobile) {
            document.body.style.overflow = '';
        }
    }

    closeModal.addEventListener(isTouchDevice ? 'touchstart' : 'click', closePurchaseModal);
    cancelPurchase.addEventListener(isTouchDevice ? 'touchstart' : 'click', closePurchaseModal);

    // Close modal when clicking outside
    purchaseModal.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(event) {
        if (event.target === purchaseModal) {
            closePurchaseModal();
        }
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener(isTouchDevice ? 'touchstart' : 'click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close menu if open
                if (isMenuOpen) {
                    toggleMenu();
                }
                
                // Scroll to section with mobile optimization
                const offset = isMobile ? 80 : 100;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-count') === '99' ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Intersection Observer for counters with mobile optimization
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateCounter(target, count);
                observer.unobserve(target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.5,
        rootMargin: '50px'
    });

    statNumbers.forEach(stat => observer.observe(stat));

    // Parallax Effect for Background (Optimized for mobile)
    let lastScrollY = 0;
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const backgroundLogo = document.querySelector('.background-logo');
        
        if (backgroundLogo && !isMobile) {
            backgroundLogo.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.05}px))`;
        }
        
        // Update navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        lastScrollY = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Image Error Handling with mobile optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (this.classList.contains('bot-logo') || 
                this.classList.contains('preview-image') ||
                this.classList.contains('menu-logo-img') ||
                this.classList.contains('background-logo')) {
                
                const seed = this.src.includes('9k5pq0') ? '404xmd' : 'madmax';
                this.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=8b0000`;
                
                // For background logo, keep it subtle
                if (this.classList.contains('background-logo')) {
                    this.style.opacity = '0.02';
                    this.style.filter = 'blur(25px)';
                }
            }
        });
        
        // Lazy loading for mobile
        if (isMobile && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Mobile touch feedback for cards
    if (isTouchDevice) {
        const cards = document.querySelectorAll('.bot-card, .app-card, .tool-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            card.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize mobile viewport height fix
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set initial height
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Add CSS for mobile-specific fixes
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-height: 600px) {
            .hero {
                min-height: auto;
                padding-top: 70px;
                padding-bottom: 30px;
            }
            
            .hero-stats {
                margin: 20px 0;
            }
            
            .hero-buttons {
                margin-top: 20px;
            }
        }
        
        @media (max-width: 360px) {
            .nav-container {
                padding: 0 10px;
            }
            
            .social-icon {
                width: 32px !important;
                height: 32px !important;
                font-size: 0.9rem !important;
            }
            
            .logo-text {
                font-size: 1.2rem !important;
            }
            
            .hero-title {
                font-size: 1.5rem !important;
            }
            
            .stat-number {
                font-size: 1.5rem !important;
            }
        }
        
        /* Prevent text selection on buttons for better UX */
        .btn, .menu-link, .social-icon {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
        }
        
        /* Improve scrolling performance */
        .bg-animation, .ball, .line {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
        }
    `;
    document.head.appendChild(mobileStyles);

    // Enhanced Background Animations with Mobile Optimization
    const balls = document.querySelectorAll('.ball');
    const lines = document.querySelectorAll('.line');
    
    // Only enable interactive effects on non-mobile
    if (!isMobile) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Subtle parallax effect on balls
            balls.forEach((ball, index) => {
                const speed = 0.02 * (index + 1);
                const x = (mouseX - 0.5) * 50 * speed;
                const y = (mouseY - 0.5) * 50 * speed;
                
                ball.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Randomize line angles periodically (throttled for mobile)
    let lastRandomizeTime = 0;
    function randomizeLines() {
        const now = Date.now();
        if (now - lastRandomizeTime > 10000) { // Every 10 seconds
            lines.forEach(line => {
                const randomAngle = Math.random() * 180 - 90;
                line.style.transform = `rotate(${randomAngle}deg)`;
            });
            lastRandomizeTime = now;
        }
    }
    
    // Throttle the randomize function
    window.addEventListener('scroll', function() {
        requestAnimationFrame(randomizeLines);
    });

    // Performance optimization: Reduce animations when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopPreviewRotation();
        } else {
            startPreviewRotation();
        }
    });

    // Initialize the page
    console.log('CYBERDARK Website - Mobile Optimized Version Loaded');
});

// Add a CSS variable for viewport height
window.addEventListener('load', function() {
    // Set viewport height variable
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
});