/**
 * main.js
 * ==========================================================================
 * UI Logic for Zovatek Website
 * 
 * Purpose: Handles all user interface interactions and DOM manipulation
 * including mobile navigation, scroll-triggered animations, and 
 * IntersectionObserver-based fade-in effects.
 * 
 * Features:
 * - Mobile menu toggle functionality
 * - IntersectionObserver for scroll-based animations
 * - Hero section immediate animation trigger
 * ==========================================================================
 */

// ==========================================================================
// Mobile Menu Toggle
// ==========================================================================

/**
 * Initialize mobile menu functionality
 * Toggles the visibility of the mobile navigation menu
 */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ==========================================================================
// Intersection Observer for Fade-In Animations
// ==========================================================================

/**
 * Configuration for the IntersectionObserver
 * - root: null (uses viewport)
 * - rootMargin: '0px' (no margin)
 * - threshold: 0.1 (triggers when 10% of element is visible)
 */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

/**
 * IntersectionObserver callback
 * Triggers animations when elements enter the viewport
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/**
 * Initialize fade-in animations
 * - Pause all animations initially
 * - Observe elements for viewport intersection
 */
document.querySelectorAll('.fade-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

/**
 * Hero Section Immediate Animations
 * Start animations for elements in the first section immediately
 * (above the fold content should animate on page load)
 */
document.querySelectorAll('section:first-of-type .fade-in').forEach(el => {
  el.style.animationPlayState = 'running';
});
