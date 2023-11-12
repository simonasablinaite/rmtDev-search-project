import {
   sortingEl,
   sortingBtnRecentEl,
   sortingBtnRelevantEl
} from '../common.js';

const clickHandler = event => {
   // 5. Gauti  paspausto mygtuko elementa:
   const clickedBtnEl = event.target.closest('.sorting__button');

   //  5.1. Sustabdoma f-ja, jei mygtukas nepaspaudziamas:
   if (!clickedBtnEl) return;

   // 5.2. Patikrinama ar rusiavimas buvo neseniai atliktas:
   const recent = clickedBtnEl.className.includes('--recent') ? true : false;

   // 5.3. R86iuojami darbo elementai:
   if (recent) {

   } else {

   }
};

sortingEl.addEventListener('click', clickHandler);