const initBurger = () => {

  const burger             = document.querySelector('.burger-menu');
  const burgerNav          = document.querySelector('.burger-nav');
  const burgerNavContainer = document.querySelector('.burger-nav--container');
  const splitText          = document.querySelectorAll('.split-text');
  const menuCounterAfter   = document.querySelectorAll('.menu-item');
  const root               = document.querySelector(':root');
  const viewport           = document.querySelector('#viewport');


  burger.addEventListener('click', () => {
    // If no animation is playing on the nav then open / close the nav,
    // prevent for the user clicking multiple time on the menu
    if (!gsap.isTweening(burgerNav)) {
      burger.classList.contains('active') ? closeNav() : openNav();
    }
  });

  const openNav = () => {

    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power1.inOut",
      },
    });
    
    // Slide down and show the menu
    tl.set(burgerNav, { duration: 0.1, autoAlpha: 1, display: 'block' })
      .to(burgerNavContainer, { duration: 0.1, autoAlpha: 1, display: 'block' }, 0)
      .fromTo(burgerNav, { yPercent: -100 }, { yPercent: 0 }, 0)
      .to(root, {duration: 2, ease: "slow(0.9, 0.1, false)", '--background-size': "100% 100%" }, 0.5)
      // Animate the navigation links
      .to(splitText, {duration: 0.8, y: '0', stagger: 0.1 }, 0.4)
      .to(splitText, {duration: 0.6, stagger: 0.1, autoAlpha: 1 }, 0.6)
      // Move and show the counter ::after element
      .to(menuCounterAfter, {
        duration: 0.6,
        stagger: 0.1,
        '--padding-left':
        '-13vw',
        '--counter-opacity': 0.4
      }, 1.3)
      // Move the "body" behind the menu when it open
      .to(viewport, { duration: 0.8, y: '300px' }, 0.1) 
      burger.classList.add('active'); // transform the burger to a cross

  }
  
  const closeNav = () => {

    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power1.inOut",
      },
    });
    
    // Slide down and hide the menu
    tl.to(burgerNav, { yPercent: 100 })
      .to(burgerNav, { duration: 0.1, autoAlpha: 0 }, 0.7)
      .to(burgerNavContainer, { duration: 0.1, autoAlpha: 0, display: 'none' }, 0.7)
      .to(root, {
        duration: 0.1,
        ease: "power4.easeOut",
        '--background-size': "130% 130%"
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
      // Move the "body" behind the menu when it open
      .fromTo(viewport, { y: '-300px' }, { duration: 0.7, y: 0 }, 0.1)
      burger.classList.remove('active'); // transform the cross to a burger

  }

  const closeNavToTop = () => {

    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power1.inOut",
      },
    });
    
    // Slide down and hide the menu
    tl.to(burgerNav, { yPercent: -100 })
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
      .fromTo(viewport, { y: '150px' }, { duration: 0.6, y: 0 }, 0.2)
      burger.classList.remove('active'); // transform the cross to a burger

  }

  const changeFilterOpacity = (opacity) => {

    const tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "power1.inOut",
      },
    });

    tl.to(root, { '--filter-opacity': `${opacity}` }, 0.);

  }

  const menuHover = () => {

    const menuItems = [...document.querySelectorAll('.menu-item')];

    menuItems.forEach(item => {

      let word = item.children[0].children[0].innerText.split('');
      item.children[0].innerHTML = '';
      word.forEach((letter, index) => {
        item.children[0].innerHTML += `<span style="--index: ${index};">${letter}</span>`;
      })
      let cloneDiv = item.children[0].cloneNode(true);
      cloneDiv.style.position = 'absolute';
      cloneDiv.style.left = '0';
      cloneDiv.style.top = '0';
      item.appendChild(cloneDiv);
      item.addEventListener('click', () => closeNavToTop());
      item.addEventListener('mouseenter', () => changeFilterOpacity('0.17'));
      item.addEventListener('mouseleave', () => changeFilterOpacity('0.1'));
    })

  }

  menuHover();

};

export { initBurger };
