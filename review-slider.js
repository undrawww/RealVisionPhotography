document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.review-slide');
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000);

  const stars = document.querySelectorAll('#starRating .star');
  const ratingValue = document.getElementById('ratingValue');
  let selectedRating = 0;

  stars.forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      highlightStars(idx + 1);
    });
    star.addEventListener('mouseleave', () => {
      highlightStars(selectedRating);
    });
    star.addEventListener('click', () => {
      selectedRating = idx + 1;
      ratingValue.value = selectedRating;
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach((star, i) => {
      if (i < rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!ratingValue.value) {
        alert('Please select a star rating.');
        return;
      }
      alert('Thank you for your feedback!');
      feedbackForm.reset();
      highlightStars(0);
      selectedRating = 0;
    });
  }
}); 