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
    markers: true
  })
}

function init(){
    
    initNavigation();

}

window.addEventListener('load', function(){
    init();
});
