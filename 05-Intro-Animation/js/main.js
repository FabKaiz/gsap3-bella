gsap.registerPlugin(ScrollTrigger);

// Query selector shortcut
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loader');
const loaderInner = select('.loader .inner');
const progressBar = select('.loader .progress');
const loaderMask = select('.loader__mask')

// Show loader on page load
gsap.set(loader, { autoAlpha: 1 })

// Scale loader down
gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: 'bottom' });

// Make a tween that scales the laoder
const progressTween = gsap.to(progressBar, { paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right' });

// Setup variables
// https://codepen.io/desandro/pen/hlzaw
let loadedImageCount = 0, imageCount;
const container = select('#main');

// Setup Imagesloaded
const imgLoad = imagesLoaded( container );
imageCount = imgLoad.images.length;


// Set the initial progress to 0
updateProgress(0);

// triggered after each item is loaded
imgLoad.on( 'progress', function() {
  // increase the number of loaded images
  loadedImageCount++;
  // update progress
  updateProgress( loadedImageCount );
});

// update the progress of our progressBar tween
function updateProgress( value ) {
  // console.log(value/imageCount)
  // tween progress bar tween to the right value
  gsap.to(progressTween, {progress: value/imageCount, duration: 0.3, ease: 'power1.out'})
}

// do whatever you want when all images are loaded
imgLoad.on( 'done', function( instance ) {
  // we will simply init our loader animation onComplete
  gsap.set(progressBar, {autoAlpha: 0, onComplete: initPageTransitions});
});

const initLoader = () => {

  const image = select('.loader__image img');
  const mask = select('.loader__image--mask');
  const line1 = select('.loader__title--mask:nth-child(1) span');
  const line2 = select('.loader__title--mask:nth-child(2) span');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');
 

  const tlLoaderIn = gsap.timeline({
    defaults: {
      duration: 1.1,
      ease: 'power2.out'
    },
    onComplete: () => select('body').classList.remove('is-loading')
  });

  tlLoaderIn
    .set(loaderContent, { autoAlpha: 1 })
    .to(loaderInner, {
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: 'power1.inOut'
    })
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

function pageTransitionIn({container}) {

  // Timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power1.inOut'
    }
  });
  tl
    .set(loaderInner, { autoAlpha: 0 })
    .fromTo(loader, { yPercent: -100 },{ yPercent: 0 })
    .fromTo(loaderMask, { yPercent: 65 },{ yPercent: 0 }, 0)
    .to(container, {y: 150}, 0);

  return tl;
}

function pageTransitionOut({container}) {

  // Timeline to move the loader away down
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power1.inOut'
    }
  });
  tl
    .to(loader, { yPercent: 100 })
    .to(loaderMask, { yPercent: -75 }, 0)
    .from(container, {y: -150}, 0);


  return tl;
}

function initPageTransitions() {

  //Add the cursor loading class before the transition starts
  barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning');
  });

  // Remove the cursor loading class after the transition finishes
  barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning');
  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });

  barba.init({
      transitions: [{
          once() {
              // Do something once on the initial page load
              initLoader();
          },
          async leave({current}) {
              // Animate loading screen in
              await pageTransitionIn(current);
          },
          enter({next}) {
              // Animate loading screen away
              pageTransitionOut(next);
          }
      }]
  });
}

// function init(){

//   initLoader();

// }

// window.addEventListener('load', function(){
//   init();
// });
