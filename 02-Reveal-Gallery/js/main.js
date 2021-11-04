gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {

  const sections = document.querySelectorAll('.rg__column');
  sections.forEach(section => {
    
    // Get the component for the animation
    section.imageBlock = section.querySelector('.rg__image');
    section.mask = section.querySelector('.rg__image--mask');

    // Reset the inital position
    gsap.set(section.imageBlock, { yPercent: -101 });
    gsap.set(section.mask, { yPercent: -101 });

    //add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);


  })
}

function createHoverReveal(e) {

  const { imageBlock, mask } = e.target;

  const tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'power4.out'
    }
  });

  if (e.type === 'mouseenter') {
    tl.to([mask, imageBlock], { yPercent: 0 });

  } else if (e.type === 'mouseleave') {

    tl.to(mask, { yPercent: 100 });
    tl.to(imageBlock, { yPercent: -101 }, 0);


  }
  return tl;

}

function init(){

  initHoverReveal();

}

window.addEventListener('load', function(){
    init();
});
