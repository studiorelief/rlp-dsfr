let lastScrollTop = 0;

export function navbarScroll() {
  const navbar = document.querySelector('.section_navbar') as HTMLElement;
  if (!navbar) return;

  // smooth transform
  navbar.style.transition = 'transform 0.25s ease-out';

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scrollTop > lastScrollTop;
    const isAboveThreshold = scrollTop > 30 * 16;

    if (isScrollingDown && isAboveThreshold) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}
