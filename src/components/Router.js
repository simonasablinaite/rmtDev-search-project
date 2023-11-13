import {
   BASE_API_URL,
   state,
   jobDetailsContentEl,
   getData
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';

const loadHandler = async () => {
   // Gauti ID is URL adreso:
   const id = window.location.hash.substring(1);

   if (id) {
      // 4.3.Pasalinti aktyvu uzdaryma is anksciau aktyvaus darbo elemento(patikrinama ar reiksme nelygi null):
      // document.querySelector('.job-item--active') && document.querySelector('.job-item--active').classList.remove('.job-item--active');
      document.querySelectorAll('.job-item--active').forEach(jobItemWithActivClass => jobItemWithActivClass.classList.remove('.job-item--active'));

      // Pasalinamas ankstesnis darbo aprasymo turinys:
      jobDetailsContentEl.innerHTML = '';

      // Pridedamas spinerio elementas:
      renderSpinner('job-details');

      try {
         const data = await getData(`${BASE_API_URL}/jobs/${id}`);

         // 4.9. Isskleisti darbo elementa:
         const { jobItem } = data;

         // Busenos atnaujinimas:
         state.activeJobItem = jobItem;

         // Pateikiami ieskomi darbo skelbimai paiesku liste:
         renderJobList();

         // 4.10.Panaikinamas spineris:
         renderSpinner('job-details');

         // Pateikiamas detalus darbo aprasymas:
         renderJobDetails(jobItem);

      } catch (error) {
         renderSpinner('job-details');
         renderError(error.message);
      };
   }
};

window.addEventListener('DOMContentLoaded', loadHandler);
// window.addEventListener('hashchange', loadHashChangeHandler);