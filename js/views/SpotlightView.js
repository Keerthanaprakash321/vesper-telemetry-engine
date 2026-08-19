/**
 * SpotlightView
 * Tracks mouse movements and updates CSS custom properties (--mouse-x, --mouse-y)
 * optimized with requestAnimationFrame.
 */
export class SpotlightView {
  constructor() {
    this.ambientGlow = document.getElementById('ambientGlow');
    this.ticking = false;
  }

  init() {
    if (!this.ambientGlow) return;

    window.addEventListener('mousemove', (e) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  }
}
