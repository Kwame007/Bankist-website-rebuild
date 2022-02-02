'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.getElementById('section--1');

// button event listener
btnScrollTo.addEventListener('click', function (e) {
  //  get section coordinates
  const sectionOneCoords = sectionOne.getBoundingClientRect();
  console.log(sectionOneCoords);

  // console.log(e.target.getBoundingClientRect());
  // console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

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
///////////////////////////////
////////////////////////////////
