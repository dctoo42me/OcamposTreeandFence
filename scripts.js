// navigation
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const galleryImages = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('modal');
const modalImagesContainer = document.getElementById('modal-images');
const modalLabel = document.getElementById("modal-label");
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
if (closeModalBtn) {closeModalBtn.addEventListener('click', function() {
    setTimeout(closeModal, 5);
});
}
// Close modal when clicking outside the modal content
window.addEventListener('touchend', function(event) {
    if (event.target === modal) {
        setTimeout(closeModal, 5);
    }
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
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

// Navigation

    // Toggle menu and overlay on click
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close menu when clicking outside
    overlay.addEventListener('click', () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Listen for mobile menu 
    document.addEventListener('DOMContentLoaded', function () {
        // Select menu, overlay, and menu links (adjust selectors as needed)
        const menu = document.querySelector('.menu'); // Replace with your actual menu selector
        const overlay = document.querySelector('.overlay'); // Replace with your actual overlay selector
        const menuLinks = menu ? menu.querySelectorAll('a') : []; // Scope to menu
    
        if (menuLinks.length > 0) {
            menuLinks.forEach(link => {
                link.addEventListener('click', function () {
                    console.log("Menu link clicked!");
                    console.log(link);
    
                    // Close the menu and overlay
                    if (menu) menu.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                });
            });
        } else {
            console.log("No menu links found inside the menu.");
        }
    });

    // Close menu when a link is clicked
    // menuLinks.forEach(link => {
    // link.addEventListener('click', () => {
    //     menu.classList.remove('active');
    //     overlay.classList.remove('active');
    //     });
    // });