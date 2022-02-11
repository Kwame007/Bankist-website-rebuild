'use strict';

// GLOBAL VARIABLES
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// navigation scrolling variable
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.getElementById('section--1');

// navigation scrolling variable
const navLink = document.querySelectorAll('.nav__link');

// Menu fade animation variable
const nav = document.querySelector('.nav');

// tapped component variables
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// nav links variables
const navLinks = document.querySelector('.nav__links');

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// MODAL WINDOW
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// // navigation scrolling
// navLink.forEach(element =>
//   element.addEventListener('click', function (e) {
//     e.preventDefault();

//     // smooth scrolling
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log(id);
//   })
// );

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// NAGATION SCROLLING (with event delegation)

// 1. Add event listener to common parent element
// 2. Determine which element originated the event

navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// BUTTON SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  //  get section coordinates
  // const sectionOneCoords = sectionOne.getBoundingClientRect();
  // console.log(sectionOneCoords);

  // scrolling
  // window.scrollTo(
  //   sectionOneCoords.left + window.pageXOffset,
  //   sectionOneCoords.top + window.pageYOffset
  // );

  // alternative (old school)
  // window.scrollTo({
  //   left: sectionOneCoords.left + window.pageXOffset,
  //   top: sectionOneCoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // new way
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// TAPPED COMPONENT

// tab buttons event
tabsContainer.addEventListener('click', e => {
  // get clicked element
  const clickedElement = e.target.closest('.operations__tab');

  // Guard cluase
  if (!clickedElement) return;

  // remove active class from all tabs button
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // add active class to clicked element
  clickedElement.classList.add('operations__tab--active');

  // remove active state from content( non active contents)
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // show content area
  document
    .querySelector(`.operations__content--${clickedElement.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// MENU FADE ANIMATION

// REFACTOR CODE
const fadeFunction = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //  change siblings opacity
    siblings.forEach(element => {
      if (element !== link) {
        element.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// set fade
nav.addEventListener('mouseover', fadeFunction.bind(0.5));
// set nav fade to default
nav.addEventListener('mouseout', fadeFunction.bind(1));

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Sticky Navigation

// const initialCoords = sectionOne.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function (e) {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// STICKY NAVIGATION (Intersectionobserverapi)
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

// observer function
const observerCallback = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

// observer option
const observerOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

// observer
const headerObserver = new IntersectionObserver(
  observerCallback,
  observerOption
);

// call observer
headerObserver.observe(header);

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// REVEALING ELEMENTS ON SCROLL

// select all sections
const sections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  // logic (guard clause)
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // unobeserve
  observer.unobserve(entry.target);
};

// call observer
const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// LAZY LOADING IMAGES
const images = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  // listen for load event
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

// image observer
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: ' 200px',
});

images.forEach(image => imgObserver.observe(image));

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// SLIDER FUNCTION
const sliderFunc = function () {
  // SLIDER
  const slides = document.querySelectorAll('.slide');

  //current slide
  let currentSlide = 0;
  // max slides
  const maxSlide = slides.length;

  // slider buttons
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  // go to slide function
  const goToSlide = function (slider) {
    slides.forEach(
      // move slide
      (slide, index) =>
        (slide.style.transform = `translate(${100 * (index - slider)}%)`)
    );
  };

  // DOTS
  const dotsWrapper = document.querySelector('.dots');
  console.log(dotsWrapper);

  const createDots = function () {
    // create element
    slides.forEach((_, index) => {
      dotsWrapper.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${index}'></button>`
      );
    });
  };
  // active dot function()
  const activateDot = function (slide) {
    // select all dots and remove active class
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // select base on data attributes and add active class
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // next slide function
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  // next slide function
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // init function
  const init = function () {
    // create slider dots
    createDots();

    // show active dot on dom load
    activateDot(0);

    // set slide at translateX(0)
    goToSlide(0);
  };
  // call init function
  init();

  // slide right
  btnRight.addEventListener('click', nextSlide);
  // slide left
  btnLeft.addEventListener('click', prevSlide);

  // slide with left and right arrow keys
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  // dots events
  dotsWrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const [slideNumber] = e.target.dataset.slide;
      e.target.classList.add('dots__dot--active');

      goToSlide(slideNumber);
      activateDot(slideNumber);
    }
  });
};
// Call slider function
sliderFunc();
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// TODO: IMPLEMENT AUTOMATIC SLIDER
///////////////////////////////
//////////////////////////////
