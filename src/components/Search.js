import {
   searchInputEl,
   searchFormEl,
   jobListSearchEl,
   numberEl
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';


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
      renderError('Your search may not contain numbers');
      return;
   }

   // 3.4 Uzblurinamas inputas:
   searchInputEl.blur();

   // 3.11 Istrinti ankstesnius darbu elementu:
   jobListSearchEl.innerHTML = '';

   // 3.5 Spinerio parodymas:
   renderSpinner('search');

   // 3.6 Gauti paieskos rezultatus:
   fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
      .then(response => {
         if (!response.ok) {
            console.log('Something went wrong');
            return;
         }

         return response.json();
      })
      .then(data => {
         // 3.7. Issitraukiami tik darbo elementai:
         const { jobItems } = data;

         // 3.8 Istrinamas spineris
         renderSpinner('search');

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