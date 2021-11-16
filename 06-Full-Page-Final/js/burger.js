const initBurger = () => {
  const burger = document.querySelector('.burger-menu');
  burger.addEventListener('click', () => burger.classList.toggle('active'));
};

export { initBurger };