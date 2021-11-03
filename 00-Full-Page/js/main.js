gsap.registerPlugin(ScrollTrigger);

function initNavigation() {

  const mainNavLinks = gsap.utils.toArray('.main-nav a');
  mainNavLinks.forEach(link => {
    link.addEventListener('mouseleave', e => {
      // Add class to the nav link
      link.classList.add('animate-out');
      // Remove class of the nav link at the end of the animation
      link.ontransitionend = () => link.classList.remove('animate-out');
    })
  })

  ScrollTrigger.create({
    start: 100,
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled'
    },
    markers: true
  })
}

function init(){
    
    initNavigation();

}

window.addEventListener('load', function(){
    init();
});
