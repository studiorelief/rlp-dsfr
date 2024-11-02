// Import DSFR core - Modifions l'ordre et ajoutons les imports manquants
import '@gouvfr/dsfr/dist/dsfr.min.css';
import '@gouvfr/dsfr/dist/dsfr.module.js';

// import { launchMarkerSDK } from './utils/global/marker';
// import '@gouvfr/dsfr/dist/dsfr.nomodule.js';
// import '@gouvfr/dsfr/dist/utility/utility.css';

window.Webflow ||= [];
window.Webflow.push(() => {
  // recettage staging
  // if (window.location.href.includes('webflow.io')) {
  //   launchMarkerSDK();
  // }
  // Set dark mode scheme
  document.documentElement.setAttribute('data-fr-scheme', 'system');
});
