gsap.registerPlugin(ScrollTrigger);
import { hoverReveal, portfolioHover, updateBodyColor } from './initBarba.js';
import { initBurger } from './burger-menu.js'

let bodyScrollBar;

// Query selector shortcut
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select(".loader");
const loaderInner = select(".loader .inner");
const progressBar = select(".loader .progress");
const loaderMask = select(".loader__mask");

// images loaded
function init() {
  // show loader on page load
  gsap.set(loader, { autoAlpha: 1 });

  // scale loader down
  gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: "bottom" });

  // make a tween that scales the loader
  const progressTween = gsap.to(progressBar, {
    paused: true,
    scaleX: 0,
    ease: "none",
    transformOrigin: "right",
  });

  // setup variables
  // https://codepen.io/desandro/pen/hlzaw
  let loadedImageCount = 0,
    imageCount;
  const container = select("#main");

  // setup Images loaded
  const imgLoad = imagesLoaded(container);
  imageCount = imgLoad.images.length;

  // set the initial progress to 0
  updateProgress(0);

  // triggered after each item is loaded
  imgLoad.on("progress", function () {
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    updateProgress(loadedImageCount);
  });

  // update the progress of our progressBar tween
  function updateProgress(value) {
    // console.log(value/imageCount)
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
      progress: value / imageCount,
      duration: 0.3,
      ease: "power1.out",
    });
  }

  // do whatever you want when all images are loaded
  imgLoad.on("done", function (instance) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, { autoAlpha: 0, onComplete: initPageTransitions });
  });
}

init();

function pageTransitionIn({ container }) {
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power1.inOut",
    },
  });
  tl.set(loaderInner, { autoAlpha: 0 })
    .fromTo(loader, { yPercent: -100 }, { yPercent: 0 })
    .fromTo(loaderMask, { yPercent: 65 }, { yPercent: 0 }, 0)
    .to(container, { y: 150 }, 0);
  return tl;
}

function pageTransitionOut({ container }) {
  // timeline to move loader away down
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power1.inOut",
    },
    onComplete: () => initContent(),
  });
  tl.to(loader, { yPercent: 100 })
    .to(loaderMask, { yPercent: -75 }, 0)
    .from(container, { y: -150 }, 0);
  return tl;
}

function destorySmoothScroll() {
  bodyScrollBar.destroy();
}

function killScrollTriggers() {
  let triggers = ScrollTrigger.getAll();
  triggers.forEach( trigger => {      
    trigger.kill();
  });
}

function initPageTransitions() {
  // Add the cursor loading class before the transition starts
  barba.hooks.before(() => {
    select("html").classList.add("is-transitioning");
    destorySmoothScroll();
    killScrollTriggers();
  });

  // Remove the cursor loading class after the transition finishes
  barba.hooks.after(() => {
    select("html").classList.remove("is-transitioning");

  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
    initSmoothScrollbar();
  });

  barba.init({
    views: [ // Use views to enbale Javascript or plugins on specific pages before or after transition
      {
        namespace: 'home',
        afterEnter: () => {
          hoverReveal();
          portfolioHover();
        },
      },
      {
        namespace: 'page2',
        afterEnter: () => {
          hoverReveal();
          portfolioHover();
          initBurger();
        },
      },
    ],
    transitions: [
      {
        once() {
          // do something once on the initial page load
          initLoader();
        },
        async leave({ current }) {
          // animate loading screen in
          await pageTransitionIn(current);
        },
        enter({ next }) {
          // animate loading screen away
          pageTransitionOut(next);
        },
      },
    ],
  });
}

function initLoader() {
  const tlLoaderIn = gsap.timeline({
    id: "tlLoaderIn",
    defaults: {
      duration: 1.1,
      ease: "power2.out",
    },
    onComplete: () => initContent(),
  });

  const image = select(".loader__image img");
  const mask = select(".loader__image--mask");
  const line1 = select(".loader__title--mask:nth-child(1) span");
  const line2 = select(".loader__title--mask:nth-child(2) span");
  const lines = selectAll(".loader__title--mask");
  const loaderContent = select(".loader__content");

  tlLoaderIn
    .set(loaderContent, { autoAlpha: 1 })
    .to(loaderInner, {
      scaleY: 1,
      transformOrigin: "bottom",
      ease: "power1.inOut",
    })
    .addLabel("revealImage")
    .from(mask, { yPercent: 100 }, "revealImage-=0.6")
    .from(image, { yPercent: -90 }, "revealImage-=0.6")
    .from([line1, line2], { yPercent: 100, stagger: 0.1 }, "revealImage-=0.4");

  const tlLoaderOut = gsap.timeline({
    id: "tlLoaderOut",
    defaults: {
      duration: 1.2,
      ease: "power2.inOut",
    },
    delay: 1,
  });

  tlLoaderOut
    .to(lines, { yPercent: -500, stagger: 0.2 }, 0)
    .to([loader, loaderContent], { yPercent: -100 }, 0.2)
    .from("#main", { y: 150 }, 0.2);

  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn).add(tlLoaderOut);
}

function initContent() {
  select("body").classList.remove("is-loading");
  initSmoothScrollbar();
  initNavigation();
  initHeaderTilt();
  initImageParallax();
  initPinSteps();
  initScrollTo();
  initBurger();
}

// Smoooth Scrollbar
function initSmoothScrollbar() {
  bodyScrollBar = Scrollbar.init(select("#viewport"), { damping: 0.07 });

  // remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove();

  // keep ScrollTrigger in sync with Smooth Scrollbar
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },
  });

  // Custom fixnav with smooth scrollbar
  const fixedElem = document.getElementsByClassName('main-nav')[0]

  bodyScrollBar.addListener(({ offset }) => {  
    fixedElem.style.top = offset.y + 'px';
  });

  // when the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
}

// Navigation Away - with updated trigger
function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      // add class
      link.classList.add("animate-out");
    });
    link.ontransitionend = function () {
      //remove class
      link.classList.remove("animate-out");
    };
  });

  function navAnimation(direction) {
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: "power4.out",
    });
  }

  // updated trigger to #main instead of absolute 100
  ScrollTrigger.create({
    trigger: "#main",
    start: "top top",
    end: "bottom bottom-=200",
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
  });
}

// Header Tilt
function initHeaderTilt() {
  select("header").addEventListener("mousemove", moveImages);
}

function moveImages(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;

  // get 0 0 in the center
  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientHeight - 0.5;

  const leftImages = gsap.utils.toArray(".hg__left .hg__image");
  const rightImages = gsap.utils.toArray(".hg__right .hg__image");

  const modifier = (index) => index * 1.2 + 0.5;

  // Move the 3 images on the left
  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.4,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: -(xPos * 25),
      rotationX: -(yPos * 10),
      ease: "power3.out",
    });
  });

  // Move the 3 images on the right
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.4,
      x: xPos * 20 * modifier(index),
      y: -yPos * 30 * modifier(index),
      rotationY: -(xPos * 25),
      rotationX: -(yPos * 10),
      ease: "power3.out",
    });
  });

  // Move the background circle
  gsap.to(".decor__circle", {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: "power4.out",
  });
}

// Parallax Images
function initImageParallax() {
  // select all sections .with-parallax
  gsap.utils.toArray(".with-parallax").forEach((section) => {
    // get the image
    const image = section.querySelector("img");

    // create tween for the image
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

// Fixed navigation
function initPinSteps() {
  ScrollTrigger.create({
    trigger: ".fixed-nav",
    start: "top center",
    endTrigger: "#stage4",
    end: "center center",
    pin: true,
    pinReparent: true,
  });

  const getVh = () => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return vh;
  };

  gsap.utils.toArray(".stage").forEach((stage, index) => {
    const navLinks = gsap.utils.toArray(".fixed-nav li");

    ScrollTrigger.create({
      trigger: stage,
      start: "top center",
      end: () => `+=${stage.clientHeight + getVh() / 10}`,
      toggleClass: {
        targets: navLinks[index],
        className: "is-active",
      },
      onEnter: () => updateBodyColor(stage.dataset.color),
      onEnterBack: () => updateBodyColor(stage.dataset.color),
    });
  });
}

function initScrollTo() {
  // find all links and animate to the right position
  gsap.utils.toArray(".fixed-nav a").forEach((link) => {
    const target = link.getAttribute("href");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      bodyScrollBar.scrollIntoView(select(target), {
        damping: 0.07,
        offsetTop: 100,
      });
    });
  });
}
