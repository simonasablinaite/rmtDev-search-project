// -- GLOBAL --
// 1. Paselektinami visi projektui reikalingi elementai:
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
//3. Sukuriama submitHandler f-ja, kuri:
const submitHandler = event => {
   event.preventDefault(); // 3.1. Neleidzia puslapiui persikrauti

   // 3.2. Gauti paieskos laukelio teksta
   const searchText = searchInputEl.value;

   // 3.3 Validacijos (regular expression exsample):
   const forbiddenPattern = /[0-9]/; //3.3.1 Surandami visi skaiciai, jie tekste negalimi
   const patternMatch = forbiddenPattern.test(searchText);
   if (patternMatch) {
      errorTextEl.textContent = 'Numbers are not allowed in the text';
      errorEl.classList.add('error--visible');

      setTimeout(() => {
         errorEl.classList.remove('error--visible');
      }, 3000);
   }

   // 3.4 Uzblurinamas inputas:
   searchInputEl.blur();

   // 3.11 Istrinti ankstesnius darbu elementu:
   jobListSearchEl.innerHTML = '';

   // 3.5 Spinerio parodymas:
   spinnerSearchEl.classList.add('spinner--visible');

   // 3.6 Gauti paieskos rezultatus:
   fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
      .then(res => {
         if (!res.ok) { //Patikrinamas, kad jei status code nera ok, grazintu 'Problem'
            console.log('Something went wrong!');
            return;  // return reikalingas tam, kad jei aptinkama problema - sustabdytu f-ja
         }
         return res.json();
      })
      .then(data => {
         // 3.7. Issitraukiami tik darbo elementai:
         const { jobItems } = data;

         // 3.8 Istrinamas spineris
         spinnerSearchEl.classList.remove('spinner--visible');

         // 3.9 Pateikti rezultatu skaiciu:
         numberEl.textContent = jobItems.length;

         // 3.10 Atvaizduoti darbo elementus darbu paieskos sarase:
         jobItems.slice(0, 7).forEach(jobItem => {
            const newJobItemHTML = `
            <li class="job-item">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
            jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
         });
      })
      .catch(error => console.log(error));
};

// 2. Sukuriamas liseneris searcho elementui
searchFormEl.addEventListener('submit', submitHandler);

// -- JOB LIST COMPONENT --

// 4.1. Sukuriama clickHandler f-ja:
const clickHandler = event => {
   event.preventDefault();

   // 4.2. Gauti paspausta darbo elementa:
   const jobItemEl = event.target.closest('.job-item');

   // 4.3. Pasalinti aktyvu uzdaryma is anksciau aktyvaus darbo elemento (patikrinama ar reiksme nelygi null):
   // document.querySelector('.job-item--active') && document.querySelector('.job-item--active').classList.remove('.job-item--active');
   document.querySelector('.job-item--active')?.classList.remove('.job-item--active');

   // 4.4. Pridedama active klase:
   jobItemEl.classList.add('job-item--active');

   // 4.5. Isvaloma informacijos apie darbus sekcija:
   jobDetailsContentEl.innerHTML = '';

   // 4.6. Paleidziamas suktis spineris:
   spinnerJobDetailsEl.classList.add('spinner--visible');

   // 4.7. Gauti darbo ID:
   const id = jobItemEl.children[0].getAttribute('href');

   // 4.8. Gauti darbo elemento duomenis:
   fetch(`https://bytegrad.com/course-assets/js/2/api/jobs/${id}`)
      .then(res => {
         if (!res.ok) {
            console.log('Something went wrong!');
            return;
         }
         return res.json();
      })
      .then(data => {
         // 4.9. Isskleisti darbo elementa:
         const { jobItem } = data;

         // 4.10.Panaikinamas spineris:
         spinnerJobDetailsEl.classList.remove('spinner--visible');

         // Pateikiamas detalus darbo aprasymas:
         const jobDetailsHTML = `
         <img src="${jobItem.coverImgURL}" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="${jobItem.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${jobItem.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${jobItem.daysAgo}d</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${jobItem.title}</h2>
        <p class="job-info__company">${jobItem.company}</p>
        <p class="job-info__description">${jobItem.descrition}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${jobItem.duration}</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${jobItem.salary}</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${jobItem.location}</p>
        </div>
    </div>
</section>

<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">
        ${jobItem.qualifications.map(qualificationText => `<li class='qualifications__item'>${qualificationText}</li>`).join('')}
           
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
        ${jobItem.reviews.map(reviewText => `<li class='reviews__item'>${reviewText}</li>`).join('')}

            
        </ul>
    </section>
</div>
         `;

         jobDetailsContentEl.innerHTML = jobDetailsHTML;
      })
      .catch(error => console.log(error));
};

// 4. Iskvieciamas listeneris job listui:
jobListSearchEl.addEventListener('cilck', clickHandler);