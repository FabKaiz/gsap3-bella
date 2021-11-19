const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const updateBodyColor = (color) => {
  gsap.to('.fill-background', { "--bcg-fill-color": color, ease: 'none'});
};

const getTextHeight = (textCopy) => {
  return textCopy.clientHeight;
};

function getPortfolioOffset(clientY) {
  return -(select(".portfolio__categories").clientHeight - clientY);
}

function createPortfolioMove(e) {
  const largeImage = select(".portfolio__image--l");
  const smallImage = select(".portfolio__image--s");


  const { clientY } = e;

  // move large image
  gsap.to(largeImage, {
    duration: 1.2,
    y: getPortfolioOffset(clientY) / 5,
    ease: "power3.out",
  });

  // move small image
  gsap.to(smallImage, {
    duration: 1.5,
    y: -getPortfolioOffset(clientY) / 3,
    ease: "power3.out",
  });
}

function portfolioHover() {
  // Initialize Portfolio hover;
  const allLinks = gsap.utils.toArray(".portfolio__categories a");
  const largeImage = select(".portfolio__image--l");
  const smallImage = select(".portfolio__image--s");
  const lInside = select(".portfolio__image--l .image_inside");
  const sInside = select(".portfolio__image--s .image_inside");
  
  // create hover effect for each portfolio navigation item
  function createPortfolioHover(e) {

    if (e.type === "mouseenter") {
      // change images to the right urls
      // fade in images
      // all siblings to white and fade out
      // active link to white
      // update page background color
      
      const { color, imagelarge, imagesmall } = e.target.dataset;
      const allSiblings = allLinks.filter((item) => item !== e.target);
      const tl = gsap.timeline({
        onStart: () => updateBodyColor(color),
      });
      tl.set(lInside, { backgroundImage: `url(${imagelarge})` })
      .set(sInside, { backgroundImage: `url(${imagesmall})` })
      .to([largeImage, smallImage], { autoAlpha: 1 })
      .to(allSiblings, { color: "#fff", autoAlpha: 0.2 }, 0)
      .to(e.target, { color: "#fff", autoAlpha: 1 }, 0);
    } else if (e.type === "mouseleave") {
      // fade out images
      // all links back to black
      // change background color back to default
  
      const tl = gsap.timeline({
        onStart: () => updateBodyColor("#ACB7AE"),
      });
      tl.to([largeImage, smallImage], { autoAlpha: 0 }).to(
        allLinks,
        { color: "#000000", autoAlpha: 1 },
        0
      );
    }
  }

  allLinks.forEach((link) => {
    link.addEventListener("mouseenter", (e) => createPortfolioHover(e));
    link.addEventListener("mouseleave", (e) => createPortfolioHover(e));
    link.addEventListener("mousemove", (e) => createPortfolioMove(e));

  });
}

function createHoverReveal(e) {

  const { imageBlock, mask, text, textCopy, textMask, textP, image, dataset } =
    e.target;

  const { color } = dataset;

  let tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power4.out",
    },
  });

  if (e.type === "mouseenter") {
    tl.to([mask, imageBlock, textMask, textP], {
      yPercent: 0,
      onStart: () => updateBodyColor(color),
    })
      .to(text, { y: () => -getTextHeight(textCopy) / 2 }, 0)
      .to(image, { duration: 1.1, scale: 1 }, 0);
  } else if (e.type === "mouseleave") {
    tl.to([mask, textP], { yPercent: 100 })
      .to([imageBlock, textMask], { yPercent: -101 }, 0)
      .to(text, { y: 0 }, 0)
      .to(image, { scale: 1.2 }, 0);
  }

  return tl;
}

function hoverReveal() {

  // Initialize the hover reveal after changing page
  const sections = selectAll(".rg__column");
  sections.forEach((section) => {
    // get componenets for animation
    section.imageBlock = section.querySelector(".rg__image");
    section.image = section.querySelector(".rg__image img");
    section.mask = section.querySelector(".rg__image--mask");
    section.text = section.querySelector(".rg__text");
    section.textCopy = section.querySelector(".rg__text--copy");
    section.textMask = section.querySelector(".rg__text--mask");
    section.textP = section.querySelector(".rg__text--copy p");
    
    // reset the initial position
    gsap.set([section.imageBlock, section.textMask], { yPercent: -101 });
    gsap.set([section.mask, section.textP], { yPercent: 100 });
    gsap.set(section.image, { scale: 1.2 });
    
    // add event listeners to each section
    section.addEventListener("mouseenter", createHoverReveal);
    section.addEventListener("mouseleave", createHoverReveal);
  });
}

export { hoverReveal, portfolioHover, updateBodyColor };