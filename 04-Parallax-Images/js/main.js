gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

function initScrollTo() {

  // Find all links and animate them to the right position
  gsap.utils.toArray('.fixed-nav a').forEach((link) => {

    const target = link.getAttribute('href');

    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, {duration: 0.8, scrollTo: target, ease: 'Power2.out'});
    })

  });

}

function init() {

  initImageParallax();
  initPinSteps();
  initScrollTo();

}

window.addEventListener("load", function () {
  init();
});
