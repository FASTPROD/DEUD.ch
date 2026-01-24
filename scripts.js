// ========================================
// DueD™ - Interactive Scripts
// ========================================

// Copy link functionality
function copyLink() {
    const url = window.location.href;
    const copyText = document.getElementById('copyText');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            copyText.textContent = '✓ Copied!';
            setTimeout(() => {
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            fallbackCopy(url);
        });
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        const copyText = document.getElementById('copyText');
        copyText.textContent = '✓ Copied!';
        setTimeout(() => {
            copyText.textContent = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Fallback: Unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// CV Tab switching (for profile pages)
function initCVTabs() {
    const tabs = document.querySelectorAll('.cv-tab');
    const panels = document.querySelectorAll('.cv-panel');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active panel
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Download vCard
function downloadVCard(founderName) {
    const vcardUrl = `vcards/${founderName}.vcf`;
    const link = document.createElement('a');
    link.href = vcardUrl;
    link.download = `${founderName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initCVTabs();
    
    // Re-initialize Lucide icons if dynamically loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
