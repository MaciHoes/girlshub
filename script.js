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

    if (!imageFilenames || imageFilenames.length === 0) {

        console.error("imageFilenames array is empty or not defined. Make sure imageFilenames.js is correct and populated with actual image URLs.");

        loadMoreBtn.style.display = 'none';

        loadingIndicator.style.display = 'none';

        endMessage.textContent = "Error: No image URLs found to display.";

        endMessage.style.display = 'block';

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

    fullImage.src = imageUrl;

    imageModal.style.display = 'flex'; // Use flex to easily center content

    document.body.classList.add('no-scroll'); // Prevent background scroll

}



// Function to close the modal

function closeImageModal() {

    imageModal.style.display = 'none';

    document.body.classList.remove('no-scroll'); // Re-enable background scroll

    fullImage.src = ''; // Clear image source to free up memory

}



// Event listeners for modal

closeBtn.addEventListener('click', closeImageModal);



// Close modal if user clicks anywhere outside the image (on the semi-transparent background)

imageModal.addEventListener('click', (event) => {

    if (event.target === imageModal) {

        closeImageModal();

    }

});



// Close modal with Escape key

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape' && imageModal.style.display === 'flex') {

        closeImageModal();

    }

});





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
