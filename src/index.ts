import './index.css';

import { greetUser } from '$utils/global/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'John Doe';
  greetUser(name);
});
