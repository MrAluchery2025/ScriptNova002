document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu ul li a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the about grid or gallery, trigger image reveal
                if(entry.target.classList.contains('about') || entry.target.classList.contains('gallery')) {
                    const imgReveal = entry.target.querySelector('.revealed-img');
                    if(imgReveal) {
                        setTimeout(() => {
                            imgReveal.classList.add('visible');
                        }, 200);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all hidden elements
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Observe image reveals if they aren't inside hidden sections
    const reveals = document.querySelectorAll('.revealed-img:not(.hidden .revealed-img)');
    reveals.forEach(el => observer.observe(el));

    // --- Form Submission Prevention (Demo purpose) ---
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerText;
            
            // simple visual feedback
            btn.innerHTML = '<i class="fas fa-check"></i> Request Sent';
            btn.style.backgroundColor = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                bookingForm.reset();
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        });
    }

});
