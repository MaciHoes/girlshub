// imageFilenames array is available globally because it's loaded before this script.
// It now contains full web URLs to images.

const gallery = document.getElementById('image-gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingIndicator = document.getElementById('loading-indicator');
const endMessage = document.getElementById('end-message');

const imagesPerLoad = 50; // Number of images to load at a time
let currentIndex = 0;

// IMAGE_BASE_PATH is no longer needed because imageFilenames now contains full web URLs.
// You can remove or comment out the line below.
// const IMAGE_BASE_PATH = `images/YOUR_GOOGLE_TAKEOUT_FOLDER_NAME/Saved/`; // Formerly for local paths

function loadImages() {
    // Check if imageFilenames array is available and has content
    if (!imageFilenames || imageFilenames.length === 0) {
        console.error("imageFilenames array is empty or not defined. Make sure imageFilenames.js is correct and populated with actual image URLs.");
        loadMoreBtn.style.display = 'none';
        loadingIndicator.style.display = 'none';
        endMessage.textContent = "Error: No image URLs found to display.";
        endMessage.style.display = 'block';
        return;
    }

    // Disable button and show loading indicator
    loadMoreBtn.disabled = true;
    loadingIndicator.style.display = 'block';

    const fragment = document.createDocumentFragment(); // Use a document fragment for performance

    const endIndex = Math.min(currentIndex + imagesPerLoad, imageFilenames.length);

    // Simulate a small delay for demonstration of loading indicator (remove in production if not needed)
    setTimeout(() => {
        for (let i = currentIndex; i < endIndex; i++) {
            const fullPath = imageFilenames[i]; // The array now holds the full URL directly

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = fullPath;
            // Use the last part of the URL as alt text if possible, or a generic one
            img.alt = `Image ${i + 1}`;
            img.loading = 'lazy'; // Native lazy loading

            galleryItem.appendChild(img);
            fragment.appendChild(galleryItem);
        }

        gallery.appendChild(fragment); // Append all images at once to the DOM

        currentIndex = endIndex;

        // Re-enable button and hide loading indicator
        loadMoreBtn.disabled = false;
        loadingIndicator.style.display = 'none';

        // Check if all images are loaded
        if (currentIndex >= imageFilenames.length) {
            loadMoreBtn.style.display = 'none'; // Hide button
            endMessage.textContent = "You've seen all the images (or tried to)!";
            endMessage.style.display = 'block'; // Show end message
        }
    }, 200); // Small delay
}

// Initial load of images when the page loads
document.addEventListener('DOMContentLoaded', loadImages);

// Add event listener for the "Load More" button
loadMoreBtn.addEventListener('click', loadImages);

// Optional: Implement simple infinite scroll (uncomment if you want this instead of button)
/*
window.addEventListener('scroll', () => {
    if (loadMoreBtn.disabled || currentIndex >= imageFilenames.length) {
        return; // Don't load if already loading or all images are loaded
    }

    // Check if the user has scrolled near the bottom of the page
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) { // Load when 200px from bottom
        loadImages();
    }
});
*/