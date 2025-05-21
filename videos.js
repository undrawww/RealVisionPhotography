// Carousel Video Auto-Stop Script

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.item');
    const indicators = carousel.querySelectorAll('.carousel-indicators li');
    const prevButton = carousel.querySelector('.carousel-control.left');
    const nextButton = carousel.querySelector('.carousel-control.right');
    let currentIndex = 0;

    function showSlide(index) {
        // Pause and reset all videos in the carousel
        items.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            item.classList.remove('active');
        });
        indicators.forEach(indicator => indicator.classList.remove('active'));
        items[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    // Next/Prev button event listeners
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide((currentIndex - 1 + items.length) % items.length);
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide((currentIndex + 1) % items.length);
    });

    // Indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Initialize first slide
    showSlide(0);
});
