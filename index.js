// -- GLOBAL --
const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
const errorEl = document.querySelector('.error');
const errorTextEl = document.querySelector('.error__text');
const jobDetailsEl = document.querySelector('.job-details');
const jobDetailsContentEl = document.querySelector('.job-details__content');
const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
const jobListSearchEl = document.querySelector('.job-list--search');
const numberEl = document.querySelector('.count__number');
const paginationEl = document.querySelector('.pagination');
const paginationBtnNextEl = document.querySelector('.pagination__button--next');
const paginationBtnBackEl = document.querySelector('.pagination__button--back');
const paginationNumberNextEl = document.querySelector('.pagination__number--next');
const paginationNumberBackEl = document.querySelector('.pagination__number--back');
const searchFormEl = document.querySelector('.search');
const searchInputEl = document.querySelector('.search__input');
const sortingEl = document.querySelector('.sorting');
const sortingBtnRelevantEl = document.querySelector('.sorting__button--relevant');
const sortingBtnRecentEl = document.querySelector('.sorting__button--recent');
const spinnerSearchEl = document.querySelector('.spinner--search');
const spinnerJobDetailsEl = document.querySelector('.spinner--job-details');

// -- SEARCH COMPONENT --
const submitHandler = event => {
   event.preventDefault();

   // Gauti paieskos laukelio teksta
   const searchText = searchInputEl.value;

   // Validacijos (regular expression exsample):
   const forbiddenPattern = /python/;
   const patternMatch = forbiddenPattern.test(searchText);
   if (patternMatch) {
      errorTextEl.textContent = 'Your search may not contain Python';
      errorEl.classList.add('error--visible');

      setTimeout(() => {
         errorEl.classList.remove('error--visible');
      }, 3000)
   }

}

searchFormEl.addEventListener('submit', submitHandler);