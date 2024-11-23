const galleryImages = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('modal');
const modalImagesContainer = document.getElementById('modal-images');
const closeModalBtn = document.querySelector('.close');
const galleryContainer = document.querySelector('.gallery-container');
const galleryContainers = document.querySelectorAll('.gallery-container');


let currentGalleryImages = []; // Tracks the images of the selected gallery
let currentIndex = 0;

// Function to open the modal and display images from the selected gallery group
function openModal(clickedImageSrc, galleryGroup) {
    // Clear existing images in the modal
    modalImagesContainer.innerHTML = '';

    // Get images from the specified gallery group
    currentGalleryImages = Array.from(galleryImages).filter(image =>{
        const imageGallery = image.closest('.gallery-container').getAttribute('data-gallery');
        return imageGallery === galleryGroup;
    });

    // Log for debugging: check if gallery group images are properly filtered
    console.log("Gallery Group:", galleryGroup);
    console.log("Images in Group:", currentGalleryImages.map(img => img.src));

    // Add filtered images to the modal
    currentGalleryImages.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        modalImagesContainer.appendChild(imgElement);
    });

    // Display the modal
    modal.style.display = 'block';
    galleryContainer.style.display = 'none';

    // Set currentIndex based on the clicked image's position in currentGalleryImages
    currentIndex = currentGalleryImages.findIndex(image => image.src === clickedImageSrc);

    // Scroll to the clicked image in the modal
    const modalImages = modalImagesContainer.querySelectorAll('img');
    if (modalImages[currentIndex]) {
        modalImages[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Event listener for clicking images in the gallery
galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        const galleryGroup = this.closest('.gallery-container').getAttribute('data-gallery');
        openModal(this.src, galleryGroup);
    });
});

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', function() {
    setTimeout(closeModal, 5);
});

// Close modal when clicking outside the modal content
window.addEventListener('touchend', function(event) {
    if (event.target === modal) {
        setTimeout(closeModal, 5);
    }
});

window.addEventListener('click', function(event) {
    if (event.target === modalImagesContainer) {
        setTimeout(closeModal, 5);
    }
});

function closeModal() {
    modal.style.display = 'none';
    galleryContainer.style.display = 'block';
}


function updateModalGallery() {
    // Ensure currentIndex wraps within bounds of currentGalleryImages
    if (currentIndex >= currentGalleryImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentGalleryImages.length - 1;
    }

    // Scroll to the current image within modal
    const modalImages = modalImagesContainer.querySelectorAll('img');
    const selectedImage = modalImages[currentIndex];
    if (selectedImage) {
        selectedImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Gallery arrow functionality outside the modal
document.querySelectorAll('.prev').forEach(button => {
    button.addEventListener('click', (event) => {
        const galleryGroup = event.target.closest('.gallery-container').getAttribute('data-gallery');
        currentGalleryImages = Array.from(document.querySelectorAll(`.gallery-container[data-gallery="${galleryGroup}"] .gallery-item img`));
        currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        currentGalleryImages[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

document.querySelectorAll('.next').forEach(button => {
    button.addEventListener('click', (event) => {
        const galleryGroup = event.target.closest('.gallery-container').getAttribute('data-gallery');
        currentGalleryImages = Array.from(document.querySelectorAll(`.gallery-container[data-gallery="${galleryGroup}"] .gallery-item img`));
        currentIndex = (currentIndex + 1) % currentGalleryImages.length;
        currentGalleryImages[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
});