gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {

  const sections = document.querySelectorAll('.rg__column');
  sections.forEach(section => {
    
    // Get the component for the animation
    section.imageBlock = section.querySelector('.rg__image');
    section.mask = section.querySelector('.rg__image--mask');
    section.text = section.querySelector('.rg__text');
    section.textCopy = section.querySelector('.rg__text--copy');
    section.textMask = section.querySelector('.rg__text--mask');
    section.textP = section.querySelector('.rg__text--copy p');
    section.image = section.querySelector('.rg__image img');

    // Reset the inital position
    gsap.set([section.imageBlock, section.textMask], { yPercent: -101 });
    gsap.set([section.mask, section.textP], { yPercent: 100 });
    gsap.set(section.image, { scale: 1.2 });

    //add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);


  })
}

function getTextHeight(textCopy) {
  return textCopy.clientHeight;
}

function createHoverReveal(e) {

  const { imageBlock, mask, text, textCopy, textMask, textP, image } = e.target;

  const tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'power4.out'
    }
  });

  if (e.type === 'mouseenter') {
    tl
      .to([mask, imageBlock, textMask, textP], { yPercent: 0 })
      .to(text, { y: -getTextHeight(textCopy) / 2 }, 0)
      .to(image, { duration: 1.1, scale: 1 }, 0);



  } else if (e.type === 'mouseleave') {

    tl
      .to([mask, textP], { yPercent: 100 })
      .to([imageBlock, textMask], { yPercent: -101 }, 0)
      .to(text, { y: 0 }, 0)
      .to(image, { duration: 1.1, scale: 1.2 }, 0);



  }
  return tl;

}

function init(){

  initHoverReveal();

}

window.addEventListener('load', function(){
    init();
});
