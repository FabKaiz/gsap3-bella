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

// Get viewport height
const getVh = () => {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  return vh;
}

// Get viewport width
const getVw = () => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return vw;
}

const updateBodyColor = (color) => {
  document.documentElement.style.setProperty('--bcg-fill-color', color)
}

function initPinSteps() {

  ScrollTrigger.create({
    trigger: '.fixed-nav',
    start: 'top center',
    endTrigger: '#stage4',
    end: 'center center',
    pin: true,
  })

  gsap.utils.toArray('.stage').forEach((stage, index) => {

    const navLinks = gsap.utils.toArray('.fixed-nav li');

    ScrollTrigger.create({
      trigger: stage,
      start: 'top center',
      end: () => `+=${stage.clientHeight + getVh() / 10}`,
      toggleClass: {
        targets: navLinks[index],
        className: 'is-active'
      },
      onEnter: () => updateBodyColor(stage.dataset.color),
      onEnterBack: () => updateBodyColor(stage.dataset.color),
    })

  })

}

function init() {
  initImageParallax();
  initPinSteps();
}

window.addEventListener("load", function () {
  init();
});
