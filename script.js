(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.querySelector('.car-btn--prev');
  const nextBtn = document.querySelector('.car-btn--next');
  let index = 0;

  // build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to fit ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    slides.forEach((slide, i) => {
      slide.style.setProperty('--offset', i - index);
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // basic touch swipe
  let startX = null;
  const track = document.getElementById('carouselTrack');
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  render();
})();
