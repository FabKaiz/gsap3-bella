gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {

  const sections = document.querySelectorAll('.rg__column');
  sections.forEach(section => {
    
    // Get the component for the animation
    const imageBlock = section.querySelector('.rg__image');
    const mask = section.querySelector('.rg__image--mask');

    // Reset the inital position
    gsap.set(imageBlock, { yPercent: -101 });
    gsap.set(mask, { yPercent: -101 });

    //add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);


  })
}

function createHoverReveal(e) {

  console.log(e.type);

}

function init(){

  initHoverReveal();

}

window.addEventListener('load', function(){
    init();
});
