import {
   state,
   sortingEl,
   sortingBtnRecentEl,
   sortingBtnRelevantEl
} from '../common.js';

import renderJoblist from './JobList.js';

const clickHandler = event => {
   // 5. Gauti  paspausto mygtuko elementa:
   const clickedBtnEl = event.target.closest('.sorting__button');

   //  5.1. Sustabdoma f-ja, jei mygtukas nepaspaudziamas:
   if (!clickedBtnEl) return;

   // 5.2. Patikrinama ar rusiavimas buvo neseniai atliktas:
   const recent = clickedBtnEl.className.includes('--recent') ? true : false;
   // 5.7. Padaromas recent aktyvus mygtukas:
   if (recent) {
      sortingBtnRecentEl.classList.add('sorting__button--active');
      sortingBtnRelevantEl.classList.remove('sorting__button--active');
   } else {
      sortingBtnRecentEl.classList.remove('sorting__button--active');
      sortingBtnRelevantEl.classList.add('sorting__button--active');
   }
   // 5.3. R86iuojami darbo elementai:
   if (recent) {
      state.searchJobItems.sort((a, b) => {
         return a.daysAgo - b.daysAgo;
      });
   } else {
      state.searchJobItems.sort((a, b) => {
         return b.relevanceScore - a.relevanceScore;
      });
   }
   // 5.4. Pateikiami darbo elementai sarase:
   renderJoblist();
};

sortingEl.addEventListener('click', clickHandler);