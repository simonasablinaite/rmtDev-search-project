import {
    BASE_API_URL,
    jobListSearchEl,
    jobDetailsContentEl,
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDrtails from './JobDetails.js';

// -- JOB LIST COMPONENT --

// 4.11
const renderJobList = jobItems => {
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
}

// 4.1. Sukuriama clickHandler f-ja:
const clickHandler = event => {
    // prevent default behavior (navigation)
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
    renderSpinner('job-details');

    // 4.7. Gauti darbo ID:
    const id = jobItemEl.children[0].getAttribute('href');

    // 4.8. Gauti darbo elemento duomenis:
    fetch(`${BASE_API_URL}/${id}`)
        .then(response => {
            if (!response.ok) { // 4xx, 5xx status code
                throw new Error('Resource issue (e.g. resource doesn\'t exist) or server issue');
            }

            return response.json();
        })
        .then(data => {
            // 4.9. Isskleisti darbo elementa:
            const { jobItem } = data;

            // 4.10.Panaikinamas spineris:
            renderSpinner('job-details');

            // Pateikiamas detalus darbo aprasymas:
            renderJobDrtails(jobItem);

        })
        .catch(error => { // narsykles problemos arba kitos klaidos (pvz bandoma kazka isnagrineti kaip JSON, nors tai nera JSON)
            renderSpinner('job-details');
            renderError(error.message);
        });
};

// 4. Iskvieciamas listeneris job listui:
jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;