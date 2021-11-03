gsap.registerPlugin(ScrollTrigger);

function initNavigation() {

  const mainNavLinks = gsap.utils.toArray('.main-nav a');
  const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();

  mainNavLinks.forEach(link => {
    link.addEventListener('mouseleave', e => {
      // Add class to the nav link
      link.classList.add('animate-out');
      // Remove class of the nav link at the end of the animation
      link.ontransitionend = () => link.classList.remove('animate-out');
    })
  })

  function navAnimation(direction) {

    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;

    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => scrollingDown ? 0 : 1,
      y: () => scrollingDown ? 20 : 0,
      ease: 'power4.out'
    })
  }

  // Moving the burger, text, and fading logo
  ScrollTrigger.create({
    start: 100,
    end: 'bottom bottom-=20',
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled'
    },
    onEnter: ({direction}) => navAnimation(direction),
    onLeaveBack: ({direction}) => navAnimation(direction),
  })
}
function initHeaderTilt() {

  document.querySelector('header').addEventListener('mousemove', moveImages);
}

function moveImages(e) {

  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;

  // Get 0 0 in the center of the screen
  const xPos = (offsetX / clientWidth) - 0.5;
  const yPos = (offsetY / clientHeight) - 0.5;

  const leftImages = gsap.utils.toArray('.hg__left .hg__image');
  const rightImages = gsap.utils.toArray('.hg__right .hg__image');


  const modifier = (index) => index * 1.2 + 0.5;

  // Move the 3 images on the left
  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.4,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: -(xPos * 35),
      rotationX: -(yPos * 10),
      ease: 'power3.out'
    });
  });

  // Move the 3 images on the right
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.4,
      x: xPos * 20 * modifier(index),
      y: -yPos * 30 * modifier(index),
      rotationY: -(xPos * 35),
      rotationX: -(yPos * 10),
      ease: 'power3.out'
    });
  });

  // Move the background circle
  gsap.to('.decor__circle', {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: 'power4.out'
  })
  
}

function init(){
    
    initNavigation();
    initHeaderTilt();

}

window.addEventListener('load', function(){
    init();
});
