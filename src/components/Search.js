import {
   BASE_API_URL,
   state,
   searchInputEl,
   searchFormEl,
   jobListSearchEl,
   numberEl,
   getData
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';


// -- SEARCH COMPONENT --
//3. Sukuriama submitHandler f-ja, kuri:
const submitHandler = async event => {
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
   try {
      const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

      // 3.7.Issitraukiami tik darbo elementai:
      const { jobItems } = data;

      // 6. Atnaujinamas state (busena):
      state.searchJobItems = jobItems;

      // 3.8 Istrinamas spineris
      renderSpinner('search');

      // 3.9 Pateikti rezultatu skaiciu:
      numberEl.textContent = jobItems.length;

      // // 3.10 (refact) Atvaizduoti darbo elementus darbu paieskos sarase:
      renderJobList();

   } catch (error) { // narsykles problemos arba kitos klaidos (pvz bandoma kazka isnagrineti kaip JSON, nors tai nera JSON)
      renderSpinner('search');
      renderError(error.message);
   };
};

// 2. Sukuriamas liseneris searcho elementui
searchFormEl.addEventListener('submit', submitHandler);