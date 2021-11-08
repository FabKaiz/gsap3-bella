gsap.registerPlugin(ScrollTrigger);

const initLoader = () => {

  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  
  const loaderInner = select('.loader .inner');
  const image = select('.loader__image img');
  const mask = select('.loader__image--mask');
  const line1 = select('.loader__title--mask:nth-child(1) span');
  const line2 = select('.loader__title--mask:nth-child(2) span');

  const tlLoaderIn = gsap.timeline({
    defaults: {
      duration: 1.1,
      ease: 'Power2.out'
    }
  });
  tlLoaderIn
    .from(loaderInner, {
      scaleY: 0,
      transformOrigin: 'bottom'
    }, 0.2)
    .addLabel('revealImage')
    .from(mask, { yPercent: 100 }, 'revealImage-=0.6')
    .from(image, { yPercent: -90 }, 'revealImage-=0.6')

    

}

function init(){

  initLoader();

}

window.addEventListener('load', function(){
  init();
});
