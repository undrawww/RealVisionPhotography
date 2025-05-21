function ensureLoadingOverlay() {
  if (!document.querySelector('.loading-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(overlay);
  }
}

function showLoadingOverlay() {
  ensureLoadingOverlay();
  document.querySelector('.loading-overlay').classList.add('active');
}

function hideLoadingOverlay() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) overlay.classList.remove('active');
}

window.addEventListener('DOMContentLoaded', function() {
  ensureLoadingOverlay();
  hideLoadingOverlay();

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (
        href &&
        !href.startsWith('http') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('#') &&
        !link.hasAttribute('target')
      ) {
        showLoadingOverlay();
      }
    });
  });

  window.addEventListener('pageshow', hideLoadingOverlay);
}); 