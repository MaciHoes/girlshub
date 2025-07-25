// imageFilenames array is available globally because it's loaded before this script.
// It should contain paths like "image_0001.jpg", "image_0002.png", etc.

const gallery = document.getElementById('image-gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingIndicator = document.getElementById('loading-indicator');
const endMessage = document.getElementById('end-message');

const imagesPerLoad = 50; // Number of images to load at a time
let currentIndex = 0;

function loadImages() {
    // Disable button and show loading indicator
    loadMoreBtn.disabled = true;
    loadingIndicator.style.display = 'block';

    const fragment = document.createDocumentFragment(); // Use a document fragment for performance

    const endIndex = Math.min(currentIndex + imagesPerLoad, imageFilenames.length);

    // Simulate a small delay for demonstration of loading indicator
    setTimeout(() => {
        for (let i = currentIndex; i < endIndex; i++) {
            const filename = imageFilenames[i];
            const fullPath = `images/takeout/${filename}`; // IMPORTANT: Correct path!

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = fullPath;
            img.alt = filename; // Use filename as alt text for accessibility
            img.loading = 'lazy'; // Native lazy loading

            galleryItem.appendChild(img);
            fragment.appendChild(galleryItem);
        }

        gallery.appendChild(fragment); // Append all images at once

        currentIndex = endIndex;

        // Re-enable button and hide loading indicator
        loadMoreBtn.disabled = false;
        loadingIndicator.style.display = 'none';

        // Check if all images are loaded
        if (currentIndex >= imageFilenames.length) {
            loadMoreBtn.style.display = 'none'; // Hide button
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

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) { // Load when 200px from bottom
        loadImages();
    }
});
*/