'use strict';

// variables
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

// Modal window
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

// navigation scrolling (with event delegation)
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

// button scrolling
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

// Tapped Component
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

// Menu fade animation
// refactor
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

// Sticky Navigation (Intersectionobserverapi)
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

// Revealing elements on scroll
// select all sections
const sections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  // logic
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
///////////////////////////////
//////////////////////////////
