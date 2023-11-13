import {
   state,
   bookmarksBtnEl,
   jobDetailsEl,
   jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList.js';

const clickHandler = event => {
   // Netssti veiksmo, jei spusteleta uz zymes mygtuko ribu:
   if (!event.target.className.includes('bookmark')) return;

   // Busenos atnaujinimas:
   if (state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
      state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
   } else {
      state.bookmarkJobItems.push(state.activeJobItem);
   }

   // Islaikyti duomenis localstorage:
   localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));

   // Atnaujinama zymos ikona:
   document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');

   // Pateikti ieskomu darbu sarasa:
   renderJobList();
};

const mouseEnterHandler = () => {
   // Padaryti, kad bookmark'o mygtukas atrodytu aktyvus:
   bookmarksBtnEl.classList.add('bookmarks-btn--activ');

   // Padaryti darbu sarasa matomu:
   jobListBookmarksEl.classList.add('job-list--visible');

   // Atvaizduoti bookmarko sarase darbus:
   renderJobList('bookmarks');

};

const mouseLeaveHandler = () => {
   // Padaryti, kad bookmark'o mygtukas atrodytu neaktyvus:
   bookmarksBtnEl.classList.remove('bookmarks-btn--active');

   // Padaryti darbu sarasa nematomu:
   jobListBookmarksEl.classList.remove('job-list--visible');
};

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);