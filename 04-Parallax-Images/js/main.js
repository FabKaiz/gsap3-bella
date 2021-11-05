gsap.registerPlugin(ScrollTrigger);

function init(){

  // Select all sections .with-parallax
  gsap.utils.toArray('.with-parallax').forEach(section => {

    // Get the image
    const image = section.querySelector('img');

    // Create tween for the image
    gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        scrub: true,
      }
    })

  })
}

window.addEventListener('load', function(){
  init();
});
