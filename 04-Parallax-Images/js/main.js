gsap.registerPlugin(ScrollTrigger);

function initImageParallax() {

  // Select all sections .with-parallax
  gsap.utils.toArray(".with-parallax").forEach((section) => {

    // Get the image
    const image = section.querySelector("img");

    // Create tween for the image
    gsap.to(image, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        scrub: true,
      },
    });

  });

}

function initPinSteps() {

  ScrollTrigger.create({
    trigger: '.fixed-nav',
    start: 'top center',
    endTrigger: '#stage4',
    end: 'center center',
    pin: true,
    markers: true,
  })

}

function init() {
  initImageParallax();
  initPinSteps();
}

window.addEventListener("load", function () {
  init();
});
