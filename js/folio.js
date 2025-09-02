(function(){
  document.querySelectorAll('.cmp-wrapper').forEach(function(wrapper){
    const after = wrapper.querySelector('.cmp-after');
    const scroller = wrapper.querySelector('.cmp-scroller');
    let active = false;

    function scrollIt(xPage){
      const rect = wrapper.getBoundingClientRect();
      const leftInPage = rect.left + window.pageXOffset;
      const x = xPage - leftInPage;
      const max = wrapper.offsetWidth;
      const pos = Math.max(0, Math.min(x, max));
      // Clip the after image
      after.style.clipPath = `inset(0 calc(100% - ${pos}px) 0 0)`;
      scroller.style.left = (pos - 25) + 'px';
    }

    // Mouse Events
    scroller.addEventListener('mousedown', function(e){
      active = true;
      scroller.classList.add('cmp-scrolling');
      e.preventDefault();
    });
    document.addEventListener('mouseup', function(){
      active = false;
      scroller.classList.remove('cmp-scrolling');
    });
    document.addEventListener('mousemove', function(e){
      if(!active) return;
      scrollIt(e.pageX);
    });

    // Touch Events
    scroller.addEventListener('touchstart', function(e){
      active = true;
      scroller.classList.add('cmp-scrolling');
      e.preventDefault();
    }, {passive:false});
    document.addEventListener('touchend', function(){
      active = false;
      scroller.classList.remove('cmp-scrolling');
    });
    document.addEventListener('touchmove', function(e){
      if(!active) return;
      if(e.touches && e.touches.length){
        scrollIt(e.touches[0].pageX);
      }
    }, {passive:false});

    // Initialize position
    (function init(){
      const start = Math.min(150, wrapper.offsetWidth);
      after.style.clipPath = `inset(0 calc(100% - ${start}px) 0 0)`;
      scroller.style.left = (start - 25) + 'px';
    })();
  });
})();

/* ========= Carousel ========= */
(function(){
  const track = document.querySelector('.cmp-track');
  const slides = document.querySelectorAll('.cmp-slide');
  let current = 0;

  function updateSlide(){
    track.style.transform = `translateX(-${current * 100}%)`;
  }
  document.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });
  document.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

  updateSlide();
})();