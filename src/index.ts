import './index.css';
import './utils/global/darkMode';

import { darkmode } from './utils/global/darkMode';
import { loadScript } from './utils/global/loadScript';
import { navbarScroll } from './utils/global/navbar';
// import { launchMarkerSDK } from './utils/global/marker';

window.Webflow ||= [];
window.Webflow.push(() => {
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),
  ]);

  // Recettage
  // if (window.location.hostname.includes('webflow.io')) {
  //   launchMarkerSDK();
  // }

  // Global
  navbarScroll();
  darkmode(
    // variables
    `
    brand-color--color-rlp-orange,
    brand-color--color-rlp-blue,
    text-color--text-default-grey,
    text-color--text-title-grey,
    text-color--text-inverted-grey,
    text-color--text-inverted-blue-france,
    text-color--text-action-high-blue-france,
    text-color--text-mention-grey,
    background-color--background-default-grey,
    background-color--background-alt-blue-france,
    background-color--background-action-high-blue-france,
    background-color--background-raised-grey,
    background-color--background-transparent-hover,
    background-color--background-alt-grey,
    border-color--border-default-grey,
    border-color--border-active-blue-france
    `.replace(/\s+/g, ''),
    // durée
    0,
    // ease
    'power1.out'
  );
});
