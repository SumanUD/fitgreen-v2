
var blogSlider = new Swiper('.cards-wrapper', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },
  breakpoints: {
    992: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  }
});
