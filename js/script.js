// ===================================
// HARMONI DALAM KEBERAGAMAN DIY
// JavaScript Functions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SPLASH SCREEN HANDLER =====
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const btnStart = document.getElementById('btnStart');
    
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
        // Skip splash screen if already visited in this session
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        if (mainContent) {
            mainContent.classList.add('visible');
            mainContent.style.display = 'block';
        }
    }
    
    // Start button click handler
    if (btnStart) {
        btnStart.addEventListener('click', function() {
            // Mark as visited
            sessionStorage.setItem('hasVisited', 'true');
            
            // Hide splash screen
            if (splashScreen) {
                splashScreen.classList.add('hidden');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 800);
            }
            
            // Show main content
            setTimeout(() => {
                if (mainContent) {
                    mainContent.classList.add('visible');
                    mainContent.style.display = 'block';
                }
            }, 400);
        });
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });
    
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and content elements
    const animatedElements = document.querySelectorAll('.tujuan-card, .info-card, .budaya-card, .pekerjaan-card, .gallery-item, .nilai-detail-card, .kesimpulan-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter animation for nilai showcase
    const counters = document.querySelectorAll('.nilai-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Gallery image placeholder hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const placeholder = this.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1.1)';
                placeholder.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const placeholder = this.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'scale(1)';
            }
        });
    });
    
    // Table row highlight
    const tableRows = document.querySelectorAll('.evaluation-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove highlight from all rows
            tableRows.forEach(r => r.style.backgroundColor = '');
            // Highlight clicked row
            this.style.backgroundColor = '#FFF9F0';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Print friendly
    window.addEventListener('beforeprint', () => {
        // Expand all collapsed sections before printing
        console.log('Preparing for print...');
    });
    
    // Add copy to clipboard for quotes
    const quotes = document.querySelectorAll('.quote-box');
    
    quotes.forEach(quote => {
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '📋 Salin Kutipan';
        copyBtn.style.cssText = `
            background: var(--gold);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
            font-family: inherit;
            transition: all 0.3s ease;
        `;
        
        copyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 10px rgba(212, 175, 55, 0.3)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        copyBtn.addEventListener('click', function() {
            const quoteText = quote.querySelector('.quote-text, .quote-text-large');
            if (quoteText) {
                navigator.clipboard.writeText(quoteText.textContent).then(() => {
                    this.innerHTML = '✅ Tersalin!';
                    setTimeout(() => {
                        this.innerHTML = '📋 Salin Kutipan';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
        
        quote.appendChild(copyBtn);
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('id', 'backToTop');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #D4AF37, #B87333);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // Console message
    console.log('%c🏛️ Harmoni dalam Keberagaman DIY', 'font-size: 20px; color: #D4AF37; font-weight: bold;');
    console.log('%cWebsite Edukatif PPKn - Kelas X', 'font-size: 14px; color: #6B4423;');
    console.log('%cDibuat untuk tugas pembelajaran', 'font-size: 12px; color: #9E9E9E;');
    
    // ===== MODAL IMAGE HANDLER =====
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');
    
    // Get all clickable cards
    const clickableCards = document.querySelectorAll('.clickable-card');
    
    // Add click event to each card
    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const image = this.getAttribute('data-image');
            const desc = this.getAttribute('data-desc');
            
            // Set modal content
            if (modalTitle) modalTitle.textContent = title;
            if (modalImage) modalImage.src = image;
            if (modalDescription) {
                // Format deskripsi dengan memisahkan filosofi
                let formattedDesc = desc;
                
                // Ganti 🌟 FILOSOFI: dengan format yang lebih menarik
                formattedDesc = formattedDesc.replace(/🌟 FILOSOFI:/g, '\n\n━━━━━━━━━━━━━━━━━━━━━━\n🌟 FILOSOFI & MAKNA:\n');
                formattedDesc = formattedDesc.replace(/⚫ FILOSOFI:/g, '\n\n━━━━━━━━━━━━━━━━━━━━━━\n🌟 FILOSOFI & MAKNA:\n');
                formattedDesc = formattedDesc.replace(/⚫ MAKNA & FILOSOFI:/g, '\n\n━━━━━━━━━━━━━━━━━━━━━━\n🌟 MAKNA & FILOSOFI:\n');
                
                modalDescription.textContent = formattedDesc;
            }
            
            // Show modal
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });
    
    // Close modal when clicking X
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
});

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Lazy loading for images (if real images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}