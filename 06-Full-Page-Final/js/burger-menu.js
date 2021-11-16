const burgerNav = document.querySelector('.burger-nav');
const logo      = document.querySelector('.logo');
const mainNav   = document.querySelector('.main-nav');
const viewport = document.querySelector('#viewport');


const initBurger = () => {

  const burger = document.querySelector('.burger-menu');
  const burgerNav = document.querySelector('.burger-nav')


  burger.addEventListener('click', () => {
    if (burger.classList.contains('active')) {
      burger.classList.remove('active');
      closeNav();
    } else {
      burger.classList.add('active');
      openNav();
    }
  });

};

const openNav = () => {
  // Show the menu
  burgerNav.style.display = 'block';
  burgerNav.style.opacity = 1;


  console.log('NAV OPEN');
}

const closeNav = () => {
  burgerNav.style.display = 'none';
  burgerNav.style.opacity = 0;
  console.log('NAV CLOSED');
}

export { initBurger };