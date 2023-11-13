import {
    BASE_API_URL,
    state,
    RESULTS_PER_PAGE,
    jobListSearchEl,
    jobDetailsContentEl,
    getData
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

// -- JOB LIST COMPONENT --

// 4.11
const renderJobList = () => {
    // 5.5. Pasalinami ankstesni darbu elementai:
    jobListSearchEl.innerHTML = '';

    // 5.6. Atvaizduojami elementai:


    // 3.10 Atvaizduoti darbo elementus darbu paieskos sarase:
    state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE).forEach(jobItem => {
        const newJobItemHTML = `
               <li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
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
const clickHandler = async event => {
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

    // Atnaujinama būsena:
    state.activeJobItem = state.searchJobItems.find(jobItem => jobItem.id === +id);

    // Pridedamas ID prie URL:
    history.pushState(null, '', `/#${id}`);

    // 4.8. Gauti darbo elemento duomenis:
    try {
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);

        // 4.9. Isskleisti darbo elementa:
        const { jobItem } = data;

        // 4.10.Panaikinamas spineris:
        renderSpinner('job-details');

        // Pateikiamas detalus darbo aprasymas:
        renderJobDetails(jobItem);

    } catch (error) {
        renderSpinner('job-details');
        renderError(error.message);
    };
};

// 4. Iskvieciamas listeneris job listui:
jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;