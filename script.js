/**
 * Jay Parmar — Developer Portfolio
 * Clean, lightweight, dependency-free vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  initTheme();

  // 2. Mobile Drawer Navigation
  initMobileDrawer();

  // 3. ScrollSpy & Sticky Navbar
  initScrollSpy();

  // 4. Back to Top Button
  initBackToTop();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme (default to dark)
  const currentTheme = savedTheme || (systemDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const target = active === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('theme', target);
      showToast(`Switched to ${target === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerClose');
  const navItems = document.querySelectorAll('.drawer-item');

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('active');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navItems.forEach(item => {
    item.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. ScrollSpy & Sticky Navbar
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar Scrolled Class
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link detection
    const triggerPoint = scrollY + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (triggerPoint >= top && triggerPoint < top + height) {
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   5. Certificate Lightbox Modal
   ========================================================================== */
function openCertModal(imagePath, title, subtitle) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalSubtitle = document.getElementById('lightboxSubtitle');
  const downloadLink = document.getElementById('lightboxDownload');

  if (!modal || !modalImg) return;

  modalImg.src = imagePath;
  modalImg.alt = title;
  modalTitle.textContent = title;
  modalSubtitle.textContent = subtitle;

  if (downloadLink) {
    downloadLink.href = imagePath;
    downloadLink.download = imagePath.split('/').pop();
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('lightboxModal');
  if (modal && e.target === modal) {
    closeCertModal();
  }
});

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

/* ==========================================================================
   6. Copy to Clipboard Utility
   ========================================================================== */
function copyText(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const temp = document.createElement('input');
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(temp);
}

/* ==========================================================================
   7. Toast Notification
   ========================================================================== */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toastBox');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   8. Contact Actions (Email & WhatsApp)
   ========================================================================== */
function handleMessageSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim() || 'Inquiry via Portfolio';
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.');
    return;
  }

  const emailTo = 'jayparmar4450@gmail.com';
  const body = `Hi Jay,

Name: ${name}
Email: ${email}

Message:
${message}
`;

  const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
  showToast('Opening default email application...');
}

function sendDirectWhatsApp() {
  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !message) {
    showToast('Please enter your name and message first.');
    return;
  }

  let text = `Hello Jay, my name is ${name}`;
  if (email) text += ` (${email})`;
  if (subject) text += `.\n\nSubject: ${subject}`;
  text += `\n\nMessage:\n${message}`;

  const phone = '919714611331';
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  
  window.open(waUrl, '_blank');
  showToast('Opening WhatsApp...');
}
