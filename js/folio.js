(function(){
  // Support multiple instances if you duplicate the section
  document.querySelectorAll('.cmp-wrapper').forEach(function(wrapper){
    const after    = wrapper.querySelector('.cmp-after');
    const scroller = wrapper.querySelector('.cmp-scroller');

    let active = false;

    function scrollIt(xPage){
      // Use pageX like your original, but normalize against viewport offset + scroll
      const rect = wrapper.getBoundingClientRect();
      const leftInPage = rect.left + window.pageXOffset;
      const x = xPage - leftInPage;

      // Clamp
      const max = wrapper.offsetWidth;
      const pos = Math.max(0, Math.min(x, max));

      // Set widths/positions (mirror your original math: 50px knob -> half = 25)
      after.style.width = pos + 'px';
      scroller.style.left = (pos - 25) + 'px';
    }

    // Mouse
    scroller.addEventListener('mousedown', function(e){
      active = true;
      scroller.classList.add('cmp-scrolling');
      e.preventDefault();
    });

    document.addEventListener('mouseup', function(){
      active = false;
      scroller.classList.remove('cmp-scrolling');
    });

    document.addEventListener('mouseleave', function(){
      active = false;
      scroller.classList.remove('cmp-scrolling');
    });

    document.addEventListener('mousemove', function(e){
      if(!active) return;
      scrollIt(e.pageX);
    });

    // Touch
    scroller.addEventListener('touchstart', function(e){
      active = true;
      scroller.classList.add('cmp-scrolling');
      // prevent scroll while dragging
      e.preventDefault();
    }, {passive:false});

    document.addEventListener('touchend', function(){
      active = false;
      scroller.classList.remove('cmp-scrolling');
    });

    document.addEventListener('touchcancel', function(){
      active = false;
      scroller.classList.remove('cmp-scrolling');
    });

    document.addEventListener('touchmove', function(e){
      if(!active) return;
      if(e.touches && e.touches.length){
        scrollIt(e.touches[0].pageX);
      }
    }, {passive:false});

    // Init (exactly like your original intent)
    // Set to 150px so both images are visible at start
    (function init(){
      const start = Math.min(150, wrapper.offsetWidth);
      after.style.width = start + 'px';
      scroller.style.left = (start - 25) + 'px';
    })();
  });
})();