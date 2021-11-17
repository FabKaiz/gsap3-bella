const initBurger = () => {

  const burger             = document.querySelector('.burger-menu');
  const burgerNav          = document.querySelector('.burger-nav');
  const burgerNavContainer = document.querySelector('.burger-nav--container');
  const splitText          = document.querySelectorAll('.split-text');
  const menuCounterAfter = document.querySelectorAll('.menu-item');


  burger.addEventListener('click', () => {

    if (!gsap.isTweening(burgerNav)) {
      if (burger.classList.contains('active') ) {
        burger.classList.remove('active');
        closeNav();
      } else {
          burger.classList.add('active');
          openNav();
      }
    }

  });

  const openNav = () => {

    // Slide down and show the menu
    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power1.inOut",
      },
    });

    tl.set(burgerNav, { duration: 0.1, autoAlpha: 1, display: 'block' })
      .to(burgerNavContainer, { duration: 0.1, autoAlpha: 1, display: 'block' }, 0)
      .fromTo(burgerNav, { yPercent: -100 }, { yPercent: 0 }, 0)
      .to(burgerNav, {duration: 2, ease: "power4.out", backgroundSize: "100% 100%" }, 0.6)
      // Animate the navigation links
      .to(splitText, {duration: 0.8, y: '0', stagger: 0.1 }, 0.4)
      .to(splitText, {duration: 0.6, stagger: 0.1, autoAlpha: 1 }, 0.6)
      // Move and show the counter ::after element
      .to(menuCounterAfter, {
        duration: 0.6,
        stagger: 0.1,
        '--padding-left':
        '-13vw',
        '--counter-opacity': 0.5
      }, 1.3)

    return tl;

  }
  
  const closeNav = () => {

    // Slide down and hide the menu
    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power1.inOut",
      },
    });

    tl.to(burgerNav, { yPercent: 100 })
      .to(burgerNav, { duration: 0.1, autoAlpha: 0 }, 0.7)
      .to(burgerNavContainer, { duration: 0.1, autoAlpha: 0, display: 'none' }, 0.7)
      .to(burgerNav, {
        duration: 0.1,
        ease: "power4.easeOut",
        backgroundSize: "130% 130%"
      }, 0.7)
      // Animate the navigation links back to normal
      .to(splitText, {
        duration: 0.1,
        y: '100px',
        autoAlpha: 0
      }, 0.7)
      // hide and move back the counter ::after element
      .to(menuCounterAfter, {
        duration: 0.1,
        stagger: 0.1,
        '--padding-left': '-23vw',
        '--counter-opacity': 0
      }, 0.7)

    return tl;

  }

};

export { initBurger };
