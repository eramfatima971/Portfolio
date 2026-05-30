/* ==========================================
   POWDER BLUE THEME PORTFOLIO JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Custom Cursor Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // 3. Dynamic Card Glow Effect (Radial Gradient on Hover)
    const cards = document.querySelectorAll('.section-card, .family-member-card, .hobby-card, .contact-detail-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 4. Dark / Light Theme Toggle & Color Palette Selector
    const themeToggle = document.getElementById('theme-toggle');
    const paletteDots = document.querySelectorAll('.palette-dot');
    
    // Check local storage for dark/light preference, default to dark
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            // Save preference to local storage
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // Color Palette Selection Logic
    const currentPalette = localStorage.getItem('color-palette') || 'blue';
    applyPalette(currentPalette);

    paletteDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const selectedPalette = dot.getAttribute('data-theme');
            applyPalette(selectedPalette);
            localStorage.setItem('color-palette', selectedPalette);
        });
    });

    function applyPalette(paletteName) {
        // Remove all previous theme variations from body
        document.body.classList.remove('theme-sage', 'theme-yellow', 'theme-pink');
        
        // Add new class if not the default powder blue theme
        if (paletteName !== 'blue') {
            document.body.classList.add(`theme-${paletteName}`);
        }

        // Highlight the active dot selector
        paletteDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-theme') === paletteName) {
                dot.classList.add('active');
            }
        });
    }

    // 5. Mobile Menu Toggle Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const openIcon = mobileToggle?.querySelector('.open-icon');
    const closeIcon = mobileToggle?.querySelector('.close-icon');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            // Toggle icons
            if (openIcon && closeIcon) {
                if (isActive) {
                    openIcon.style.display = 'none';
                    closeIcon.style.display = 'block';
                } else {
                    openIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            }
        });

        // Close mobile drawer on navigation link click
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (openIcon && closeIcon) {
                    openIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            });
        });
    }

    // 6. Navigation Link Highlight on Scroll (IntersectionObserver)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies core viewport area
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

});
