gsap.registerPlugin(ScrollTrigger);

const initLoader = () => {

  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);
  
  const loaderInner = select('.loader .inner');
  const image = select('.loader__image img');
  const mask = select('.loader__image--mask');
  const line1 = select('.loader__title--mask:nth-child(1) span');
  const line2 = select('.loader__title--mask:nth-child(2) span');
  const lines = selectAll('.loader__title--mask');
  const loader = select('.loader');
  const loaderContent = select('.loader__content');
 

  const tlLoaderIn = gsap.timeline({
    defaults: {
      duration: 1.1,
      ease: 'power2.out'
    },
    onComplete: () => select('body').classList.remove('is-loading')
  });

  tlLoaderIn
  .set([loader, loaderContent], { autoAlpha: 1 })
    .from(loaderInner, {
      scaleY: 0,
      transformOrigin: 'bottom'
    }, 0.2)
    .addLabel('revealImage')
    .from(mask, { yPercent: 100 }, 'revealImage-=0.6')
    .from(image, { yPercent: -90 }, 'revealImage-=0.6')
    .from([line1, line2], { y: 100, stagger: 0.1 }, 'revealImage-=0.4');  // tween for lines animating in

  const tlLoaderOut = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: 'power2.inOut'
    },
    delay: 1
  });

  tlLoaderOut
    .to(lines, { yPercent: -500, stagger: 0.2 }, 0)
    .to([loader, loaderContent], { yPercent: -100 }, 0.2)
    .from('#main', { y: 150 }, 0);

  const tlLoader = gsap.timeline();
  tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut)

}

function init(){

  initLoader();

}

window.addEventListener('load', function(){
  init();
});
