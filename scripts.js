// ========================================
// DueD™ - Enterprise Interactive Scripts
// Version 2.0 - Production Ready
// ========================================

'use strict';

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    loaderTimeout: 5000,
    toastDuration: 3000,
    scrollOffset: 80,
    debounceDelay: 100
};

// ========================================
// UTILITY FUNCTIONS
// ========================================
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    isMobile() {
        return window.innerWidth < 768;
    },
    
    isReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
};

// ========================================
// TOAST NOTIFICATIONS
// ========================================
const Toast = {
    container: null,
    
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.setAttribute('aria-live', 'polite');
            this.container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'success', duration = CONFIG.toastDuration) {
        this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        
        const icons = {
            success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
            info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, duration);
    },
    
    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); },
    info(message) { this.show(message, 'info'); }
};

// ========================================
// PAGE LOADER
// ========================================
const PageLoader = {
    element: null,
    
    init() {
        this.element = document.getElementById('page-loader');
        if (!this.element) return;
        
        // Hide on window load
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 300);
        });
        
        // Fallback timeout
        setTimeout(() => this.hide(), CONFIG.loaderTimeout);
    },
    
    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                this.element.style.display = 'none';
            }, 500);
        }
    }
};

// ========================================
// NAVBAR
// ========================================
const Navbar = {
    element: null,
    
    init() {
        this.element = document.querySelector('.navbar');
        if (!this.element) return;
        
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));
        
        // Initial check
        this.handleScroll();
    },
    
    handleScroll() {
        if (!this.element) return;
        
        if (window.scrollY > 50) {
            this.element.classList.add('scrolled');
        } else {
            this.element.classList.remove('scrolled');
        }
    }
};

// ========================================
// SMOOTH SCROLL
// ========================================
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e, anchor));
        });
    },
    
    handleClick(e, anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = CONFIG.scrollOffset;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: Utils.isReducedMotion() ? 'auto' : 'smooth'
            });
            
            // Update URL without triggering scroll
            history.pushState(null, '', targetId);
        }
    }
};

// ========================================
// CLIPBOARD
// ========================================
const Clipboard = {
    async copy(text) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            return this.fallbackCopy(text);
        } catch (err) {
            console.error('Clipboard error:', err);
            return this.fallbackCopy(text);
        }
    },
    
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('aria-hidden', 'true');
        document.body.appendChild(textArea);
        
        try {
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
};

// ========================================
// COPY LINK FUNCTIONALITY
// ========================================
async function copyLink() {
    const url = window.location.href.split('?')[0]; // Clean URL
    const copyText = document.getElementById('copyText');
    
    const success = await Clipboard.copy(url);
    
    if (success) {
        if (copyText) {
            copyText.textContent = '✓ Copied!';
            setTimeout(() => {
                copyText.textContent = 'Copy';
            }, 2000);
        }
        Toast.success('Link copied to clipboard');
    } else {
        Toast.error('Failed to copy link');
    }
}

// ========================================
// CV TABS (Profile Pages)
// ========================================
const CVTabs = {
    init() {
        const tabs = document.querySelectorAll('.cv-tab');
        const panels = document.querySelectorAll('.cv-panel');
        
        if (tabs.length === 0) return;
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.target;
                
                // Update ARIA states
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                
                // Update panels
                panels.forEach(p => {
                    p.classList.remove('active');
                    p.setAttribute('aria-hidden', 'true');
                });
                
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.setAttribute('aria-hidden', 'false');
                }
            });
            
            // Keyboard navigation
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tab.click();
                }
            });
        });
    }
};

// ========================================
// VCARD DOWNLOAD
// ========================================
function downloadVCard(founderName) {
    const vcardUrl = `vcards/${founderName}.vcf`;
    
    fetch(vcardUrl)
        .then(response => {
            if (!response.ok) throw new Error('vCard not found');
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${founderName}.vcf`;
            link.click();
            URL.revokeObjectURL(url);
            Toast.success('Contact downloaded');
        })
        .catch(err => {
            console.error('Download error:', err);
            Toast.error('Failed to download contact');
        });
}

// ========================================
// INTERSECTION OBSERVER (Animations)
// ========================================
const ScrollAnimations = {
    observer: null,
    
    init() {
        if (Utils.isReducedMotion()) return;
        
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
    }
};

// ========================================
// ACCESSIBILITY
// ========================================
const Accessibility = {
    init() {
        // Skip link
        this.setupSkipLink();
        
        // Focus management
        this.setupFocusManagement();
    },
    
    setupSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        if (!skipLink) return;
        
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.tabIndex = -1;
                target.focus();
            }
        });
    },
    
    setupFocusManagement() {
        // Add visible focus styles only for keyboard users
        document.body.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });
        
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
    }
};

// ========================================
// ERROR HANDLING
// ========================================
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error:', { msg, url, lineNo, columnNo, error });
    return false;
};

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled rejection:', event.reason);
});

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Core modules
    PageLoader.init();
    Navbar.init();
    SmoothScroll.init();
    CVTabs.init();
    ScrollAnimations.init();
    Accessibility.init();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('DueD™ v2.0 initialized');
});

// Re-init on dynamic content
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
