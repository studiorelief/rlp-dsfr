import gsap from 'gsap';

export function darkmode(cssVariables: string, duration: number, ease: string) {
  const htmlElement = document.documentElement;
  const computed = getComputedStyle(htmlElement);
  let toggleEl: NodeListOf<Element>;
  let togglePressed = 'false';

  if (!cssVariables || !cssVariables.length) {
    throw new Error('CSS variables not provided');
  }

  const [lightColors, darkColors] = parseColors(cssVariables, computed);

  if (!Object.keys(lightColors).length) {
    throw new Error('No variables found matching provided CSS variables');
  }

  function setColors(colorObject: Record<string, string>, animate: boolean) {
    if (typeof gsap !== 'undefined' && animate) {
      gsap.to(htmlElement, {
        ...colorObject,
        duration,
        ease,
      });
    } else {
      Object.entries(colorObject).forEach(([key, value]) => {
        htmlElement.style.setProperty(key, value);
      });
    }
  }

  function goDark(dark: boolean, animate: boolean) {
    localStorage.setItem('dark-mode', dark.toString());
    htmlElement.classList.toggle('dark-mode', dark);
    setColors(dark ? darkColors : lightColors, animate);
    togglePressed = dark.toString();

    if (toggleEl) {
      toggleEl.forEach((element) => {
        element.setAttribute('aria-pressed', togglePressed);
      });
    }
  }

  function checkPreference(e: MediaQueryListEvent) {
    goDark(e.matches, false);
  }

  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  colorPreference.addEventListener('change', checkPreference);

  const storagePreference = localStorage.getItem('dark-mode');
  if (storagePreference !== null) {
    goDark(storagePreference === 'true', false);
  } else {
    goDark(colorPreference.matches, false);
  }

  function initializeToggle() {
    toggleEl = document.querySelectorAll('[tr-color-toggle]');
    toggleEl.forEach((element) => {
      element.setAttribute('aria-label', 'View Dark Mode');
      element.setAttribute('role', 'button');
      element.setAttribute('aria-pressed', togglePressed);
      element.addEventListener('click', () => {
        goDark(!htmlElement.classList.contains('dark-mode'), true);
      });
    });
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeToggle);
  } else {
    initializeToggle();
  }

  // Observe DOM changes and apply dark mode to new elements
  const observer = new MutationObserver(() => {
    const isDark = htmlElement.classList.contains('dark-mode');
    setColors(isDark ? darkColors : lightColors, false);
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function parseColors(
  cssVariables: string,
  computed: CSSStyleDeclaration
): [Record<string, string>, Record<string, string>] {
  const lightColors: Record<string, string> = {};
  const darkColors: Record<string, string> = {};

  cssVariables.split(',').forEach((item) => {
    const lightValue = computed.getPropertyValue(`--light--${item}`);
    let darkValue = computed.getPropertyValue(`--dark--${item}`);
    if (lightValue.length) {
      if (!darkValue.length) darkValue = lightValue;
      lightColors[`--light--${item}`] = lightValue;
      darkColors[`--light--${item}`] = darkValue;
    }
  });

  return [lightColors, darkColors];
}
