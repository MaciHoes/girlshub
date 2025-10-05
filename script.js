const gallery = document.getElementById('image-gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingIndicator = document.getElementById('loading-indicator');
const endMessage = document.getElementById('end-message');

// Modal elements
const imageModal = document.getElementById('image-modal');
const fullImage = document.getElementById('full-image');
const closeBtn = document.querySelector('.close-btn');

const imagesPerLoad = 50; // Number of images to load at a time
let currentIndex = 0;

function loadImages() {
    // This check is robust for finding a global variable that is undefined/null or empty.
    if (typeof imageFilenames === 'undefined' || imageFilenames === null || imageFilenames.length === 0) {
        console.error("imageFilenames array is undefined, null, or empty. Ensure it's defined globally before this script runs.");
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (endMessage) {
            endMessage.textContent = "Error: No image URLs found to display.";
            endMessage.style.display = 'block';
        }
        return;
    }

    // Defensive checks for core DOM elements
    if (!loadMoreBtn || !loadingIndicator || !gallery) {
        console.error("Missing one or more required DOM elements (gallery, load-more-btn, loading-indicator).");
        return;
    }

    loadMoreBtn.disabled = true;
    loadingIndicator.style.display = 'block';

    const fragment = document.createDocumentFragment();

    const endIndex = Math.min(currentIndex + imagesPerLoad, imageFilenames.length);

    setTimeout(() => { // Simulate a small delay for demonstration of loading indicator
        for (let i = currentIndex; i < endIndex; i++) {
            const fullPath = imageFilenames[i];

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = fullPath;
            img.alt = `Image ${i + 1}`;
            img.loading = 'lazy';

            // Add click event listener to open the modal
            img.addEventListener('click', () => {
                openImageModal(fullPath);
            });

            galleryItem.appendChild(img);
            fragment.appendChild(galleryItem);
        }

        gallery.appendChild(fragment);

        currentIndex = endIndex;

        loadMoreBtn.disabled = false;
        loadingIndicator.style.display = 'none';

        if (currentIndex >= imageFilenames.length) {
            loadMoreBtn.style.display = 'none';
            endMessage.textContent = "You've seen all the images (or tried to)!";
            endMessage.style.display = 'block';
        }
    }, 200);
}

// Function to open the modal
function openImageModal(imageUrl) {
    if (!imageModal || !fullImage) return;
    fullImage.src = imageUrl;
    imageModal.style.display = 'flex';
    document.body.classList.add('no-scroll');
}

// Function to close the modal
function closeImageModal() {
    if (!imageModal || !fullImage) return;
    imageModal.style.display = 'none';
    document.body.classList.remove('no-scroll');
    fullImage.src = '';
}

// Event listeners for modal
if (closeBtn) {
    closeBtn.addEventListener('click', closeImageModal);
}

// Close modal if user clicks anywhere outside the image (on the semi-transparent background)
if (imageModal) {
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeImageModal();
        }
    });
}


// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    // Only check if modal is defined and currently visible
    if (imageModal && event.key === 'Escape' && imageModal.style.display === 'flex') {
        closeImageModal();
    }
});


// Initial load of images when the page loads
document.addEventListener('DOMContentLoaded', loadImages);

// Add event listener for the "Load More" button
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadImages);
}

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
*/
