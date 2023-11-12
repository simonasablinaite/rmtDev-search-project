import {
   RESULTS_PER_PAGE,
   state,
   paginationEl,
   paginationBtnNextEl,
   paginationBtnBackEl,
   paginationNumberNextEl,
   paginationNumberBackEl
} from '../common.js';

import renderJobList from './JobList.js';

const renderPaginationBtns = () => {
   // Rodyti atgal mygtuka, jei esame antrame ar tolimesniame puslapyje:
   if (state.currentPage >= 2) {
      paginationBtnBackEl.classList.remove('pagination__button--hidden');
   } else {
      paginationBtnBackEl.classList.add('pagination__button--hidden');
   };

   // Rodyti kita mygtuka, jei kitame puslapyje yra daugiau darbu:
   if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
      paginationBtnNextEl.classList.add('pagination__button--hidden');
   } else {
      paginationBtnNextEl.classList.remove('pagination__button--hidden');
   };

   // Pakeiciami puslapiavimo mygtuku numeriai:
   paginationNumberNextEl.textContent = state.currentPage + 1;
   paginationNumberBackEl.textContent = state.currentPage - 1;

   // Nesufokusuoti  ('uzblurinta') mygtuka:
   paginationBtnNextEl.blur();
   paginationBtnBackEl.blur();
}

const clickHandler = event => {
   // Gaunamas paspaustas mygtuko elementas:
   const clickedBtnEl = event.target.closest('.pagination__button');

   // Sustabdoma f-ja:
   if (!clickedBtnEl) return;

   // Patikrinama ar ketinama spausti i prieki ar atgal:
   const nextPage = clickedBtnEl.className.includes('--next') ? true : false;

   // Atvaizduojami sekantys RESULTS_PER_PAGE darbo elementai (update state):
   nextPage ? state.currentPage++ : state.currentPage--;

   // Atvaizduoti puslapiavimo mygtukus:
   renderPaginationBtns();

   // Atvaizduojami darbu elementai puslapiuose:
   renderJobList();

}

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationBtns;