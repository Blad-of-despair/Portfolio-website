// Add any JavaScript functionality here later
// For example, smooth scrolling, form validation, dynamic content loading, etc.

console.log("Portfolio script loaded.");

// --- Smooth Reveal on Scroll ---

// Function to handle intersection changes
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        // If the element is intersecting (visible in viewport)
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // REMOVED: observer.unobserve(entry.target);
        }
        // If you want elements to fade out/reset when scrolling away
        else {
            entry.target.classList.remove('is-visible'); // Reset the class when not visible
        }
    });
}

// Set up the Intersection Observer
const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver(handleIntersection, options);

// Select all sections you want to animate
// We exclude #home because it's usually visible initially
const sectionsToReveal = document.querySelectorAll('section:not(#home)');

// Add the initial class and observe each section
sectionsToReveal.forEach(section => {
    section.classList.add('reveal-on-scroll'); // Add initial hidden state class
    observer.observe(section); // Start observing the section
});