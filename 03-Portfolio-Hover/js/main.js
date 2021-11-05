gsap.registerPlugin(ScrollTrigger);

// create hover effect for each portfolio navigation item
const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBackground = document.querySelector('.fill-background');
const largeImage = document.querySelector('.portfolio__image--l');
const smallImage = document.querySelector('.portfolio__image--s');
const lInside = document.querySelector('.portfolio__image--l .image_inside');
const sInside = document.querySelector('.portfolio__image--s .image_inside');
 
function initPortfolioHover() {
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', createPortfolioHover);
        link.addEventListener('mouseleave', createPortfolioHover);
        link.addEventListener('mousemove', createPortfolioMove);
    });
}
 
function createPortfolioHover(e){
 
    if(e.type === 'mouseenter'){

      const { color, imagelarge, imagesmall } = e.target.dataset;
      const allSiblings = allLinks.filter(item => item !== e.target);
      const tl = gsap.timeline();
      tl
        // Change images to the right urls
        .set(lInside, { backgroundImage: `url(${imagelarge})`})
        .set(sInside, { backgroundImage: `url(${imagesmall})`})
        // Fade in images
        .to([largeImage, smallImage], { duration: 0.7, autoAlpha: 1 })
        // All siblings to white and fade out
        .to(allSiblings, { color: '#fff', autoAlpha: 0.2 }, 0)
        // Active link to white
        .to(e.target, { color: '#fff', autoAlpha: 1 }, 0)
        // Update page background color
        .to(pageBackground, { backgroundColor: color, ease: 'none' }, 0);

 
    } else if(e.type === 'mouseleave'){

      const tl = gsap.timeline();
      tl
        // Fade out images
        .to([largeImage, smallImage], { autoAlpha: 0 })
        // All links back to black
        .to(allLinks, { color: '#000', autoAlpha: 1 }, 0)
        // Change background color back to default #ACB7AE
        .to(pageBackground, { backgroundColor: '#ACB7AE', ease: 'none' }, 0);

    }
 
}

function createPortfolioMove(e) {

  const { clientY } = e;

  // Move large image
  gsap.to(largeImage, {
    duration: 1.2,
    y: getPortfolioOffset(clientY) / 5,
    ease: 'Power3.out',
  })

  // Move small image
  gsap.to(smallImage, {
    duration: 1.5,
    y: -getPortfolioOffset(clientY) / 2.5,
    ease: 'Power3.out',
  })

}
 
function getPortfolioOffset(clientY) {
  return -(document.querySelector('.portfolio__categories').clientHeight - clientY);
}

function init(){
     
    initPortfolioHover();
 
}
 
window.addEventListener('load', function(){
    init();
});
