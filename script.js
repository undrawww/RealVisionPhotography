document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    // Carousel functionality
    const carousel = document.querySelector('#carousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.item');
        const indicators = carousel.querySelectorAll('.carousel-indicators li');
        const prevButton = carousel.querySelector('.carousel-control.left');
        const nextButton = carousel.querySelector('.carousel-control.right');
        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            // Remove active class from all items and indicators
            items.forEach(item => item.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current item and indicator
            items[index].classList.add('active');
            indicators[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            showSlide((currentIndex + 1) % items.length);
        }

        function prevSlide() {
            showSlide((currentIndex - 1 + items.length) % items.length);
        }

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });

    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    const elementsToAnimate = document.querySelectorAll('section, .heading, .gallery, .slider, .main-footer');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in-element');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('gallery')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '50px'
    });

    document.querySelectorAll('.fade-in-element').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.img-w').forEach(function(el) {
        var wrapper = document.createElement('div');
        wrapper.className = 'img-c';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        var img = el.querySelector('img');
        if (img) {
            el.style.backgroundImage = 'url(' + img.src + ')';
        }
    });

    document.querySelectorAll('.img-c').forEach(function(el) {
        el.addEventListener('click', function() {
            var w = el.offsetWidth;
            var h = el.offsetHeight;
            var x = el.getBoundingClientRect().left + window.scrollX;
            var y = el.getBoundingClientRect().top + window.scrollY;

            document.querySelectorAll('.img-c.active').forEach(function(active) {
                if (active !== el) active.remove();
            });

            var copy = el.cloneNode(true);
            el.parentNode.insertBefore(copy, el.nextSibling);
            copy.style.width = w + 'px';
            copy.style.height = h + 'px';
            
            requestAnimationFrame(() => {
                copy.classList.add('active');
                copy.style.top = (y - 8) + 'px';
                copy.style.left = (x - 8) + 'px';
                requestAnimationFrame(() => {
                    copy.classList.add('positioned');
                });
            });

            copy.addEventListener('click', function() {
                copy.classList.remove('positioned', 'active');
                copy.classList.add('postactive');
                setTimeout(function() {
                    copy.remove();
                }, 500);
            });
        });
    });
}); 