// ============================================================
// ScriptNova | main.js
// ============================================================

// --- Dynamic Copyright Year ---
document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// --- Navbar & Scroll Progress ---
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Only update progress bar on desktop to save mobile performance and match CSS hiding
    if (window.innerWidth > 768 && progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    }
});

// --- Active Nav Link (highlight current page) ---
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});

// --- Mobile Menu Toggle (with aria-expanded) ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

const toggleMenu = (forceClose = false) => {
    const isOpen = navLinksContainer.classList.contains('open');
    if (forceClose && !isOpen) return;
    const willOpen = !isOpen && !forceClose;
    mobileMenuBtn.classList.toggle('open', willOpen);
    navLinksContainer.classList.toggle('open', willOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
};

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMenu());
}

navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});

document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) toggleMenu(true);
});

// --- Page Transition ---
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !link.hasAttribute('target')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('page-exit');
            setTimeout(() => { window.location.href = href; }, 100);
        });
    }
});

// --- Scroll Reveal ---
const revealElements = () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealElements, { passive: true });
window.addEventListener('DOMContentLoaded', revealElements);

// --- Animated Counter for Stats ---
const animateCounter = (el, target, suffix = '') => {
    const duration = 1800;
    const start = performance.now();
    const update = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
};

window.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCounter(el, parseInt(el.dataset.target, 10), el.dataset.suffix || '');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => observer.observe(el));
});



// --- Portfolio Touch Overlay (mobile) ---
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('touchend', (e) => {
        e.preventDefault();
        const wasActive = item.classList.contains('touched');
        document.querySelectorAll('.portfolio-item.touched').forEach(i => i.classList.remove('touched'));
        if (!wasActive) item.classList.add('touched');
    });
});

// --- Contact Form: Professional Success State ---
window.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            contactForm.parentElement.innerHTML = `
                <div class="form-success reveal active">
                    <div class="form-success-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <h3>Message Received</h3>
                    <p>Thank you for reaching out. We review every inquiry and will be in touch within 24 hours.</p>
                </div>`;
        }, 1200);
    });
});

// --- Professional Signature ---
console.log('%cScriptNova | Strategic Digital Agency', 'color: #1E3A8A; font-weight: bold; font-size: 14px; letter-spacing: 1px;');
console.log('%cBuilt with precision. Designed with intent.', 'color: #6B7280; font-size: 11px;');

// --- Cyber Grid Mouse Follow Effect ---
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// --- NovaBot Interactive Logic ---
const initNovaBot = () => {
    const toggle = document.querySelector('.novabot-toggle');
    const chat = document.querySelector('.novabot-chat');
    const input = document.querySelector('.novabot-input-area input');
    const sendBtn = document.querySelector('.novabot-send');
    const messages = document.querySelector('.novabot-messages');
    const typing = document.querySelector('.bot-typing');

    if (!toggle || !chat) return;

    // Toggle Chat
    toggle.addEventListener('click', () => {
        chat.classList.toggle('open');
        if (chat.classList.contains('open') && messages.children.length === 0) {
            setTimeout(() => addBotMessage("Greetings. I am NovaBot. How can I assist your digital strategy today?"), 600);
        }
    });

    // Send Message Function
    const sendMessage = () => {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        messages.appendChild(userMsg);
        input.value = '';
        scrollToBottom();

        // Bot Response
        handleBotResponse(text);
    };

    const handleBotResponse = (text) => {
        typing.style.display = 'block';
        scrollToBottom();

        const query = text.toLowerCase();
        let response = "I'm processing that. For precise inquiries, I recommend our 'Let's Talk' consultation. Would you like to see our services or packages?";

        if (query.includes('service')) {
            response = "We offer Brand Strategy, Custom Engineering, and Performance Optimization. You can find full details on our Services page.";
        } else if (query.includes('portfolio') || query.includes('work')) {
            response = "Our portfolio showcases elite projects ranging from Fintech to Luxury brands. Explore the 'Portfolio' section to see our craftsmanship.";
        } else if (query.includes('price') || query.includes('cost') || query.includes('package')) {
            response = "Our packages range from 'Launch' for startups to 'Authority' for elite brands. Check the 'Packages' page for transparent pricing.";
        } else if (query.includes('contact') || query.includes('talk') || query.includes('hire')) {
            response = "Excellent. You can reach the team directly via the 'Contact' page or email hello@scriptnova.com.";
        } else if (query.includes('roadmap') || query.includes('process')) {
            response = "We follow a rigorous 4-phase Roadmap: Discovery, Drafting, Engineering, and Launch. Details are in the 'Roadmap' section.";
        } else if (query.includes('hello') || query.includes('hi')) {
            response = "Hello. How can ScriptNova help elevate your digital presence today?";
        }

        setTimeout(() => {
            typing.style.display = 'none';
            addBotMessage(response);
        }, 1500);
    };

    const addBotMessage = (text) => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.textContent = text;
        messages.appendChild(botMsg);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        messages.scrollTop = messages.scrollHeight;
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
};

// --- Gmail Integration (Custom Node.js Backend) ---
const initGmailBackend = () => {
    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('contact-submit');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Visual Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        feedback.style.display = 'block';
        feedback.textContent = 'Connecting to secure relay...';
        feedback.style.color = 'var(--text-secondary)';

        // Prepare Data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Send to Private Backend (Relative path works for Vercel & local dev)
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(async (response) => {
            const result = await response.json();
            if (response.ok) {
                // Success
                submitBtn.textContent = 'Sent Successfully';
                feedback.textContent = 'Project inquiry transmitted via Gmail relay.';
                feedback.style.color = '#22c55e';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Inquiry';
                    feedback.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(result.error || 'Backend transmission failed.');
            }
        })
        .catch((error) => {
            // Error
            console.error('Submission Error:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Retry Submission';
            feedback.textContent = 'Relay failed. Ensure the Node server is running or contact hello@scriptnova.com.';
            feedback.style.color = '#ef4444';
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    initNovaBot();
    initGmailBackend();
});
