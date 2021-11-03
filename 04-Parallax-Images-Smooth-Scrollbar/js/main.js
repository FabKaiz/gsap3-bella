gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initImageParallax() {
    
    // select all sections .with-parallax
    gsap.utils.toArray('.with-parallax').forEach(section => {

        // get the image
        const image = section.querySelector('img');

        // create tween for the image
        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: true
            }
        });

    });

}

function initPinSteps() {
    
    ScrollTrigger.create({
        trigger: '.fixed-nav',
        start: 'top center',
        endTrigger: '#stage4',
        end: 'center center',
        pin: true
    });

    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    }

    const updateBodyColor = (color) => {
        // gsap.to('.fill-background', { backgroundColor: color, ease: 'none'});
        document.documentElement.style.setProperty('--bcg-fill-color', color);
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {

        const navLinks = gsap.utils.toArray('.fixed-nav li');

        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            end: () => `+=${stage.clientHeight+getVh()/10}`,
            toggleClass: {
                targets: navLinks[index],
                className: 'is-active'
            },
            onEnter: () => updateBodyColor(stage.dataset.color),
            onEnterBack: () => updateBodyColor(stage.dataset.color),
        });

    });

}

function initScrollTo(){

    // find all links and animate to the right position
    gsap.utils.toArray('.fixed-nav a').forEach(link => {

        const target = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {duration: 1.5, scrollTo: target, ease: 'Power2.out'});
        });

    });

}

function init(){
    
    initImageParallax();
    initPinSteps();
    initScrollTo();

}

window.addEventListener('load', function(){
    init();
});