/**
 * HeaderView
 * Renders header state, theme toggle button, and handles toggle click events.
 */
export class HeaderView {
  constructor() {
    this.htmlDoc = document.documentElement;
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
  }

  bindToggleTheme(handler) {
    if (this.themeToggleBtn && handler) {
      this.themeToggleBtn.addEventListener('click', handler);
    }
  }

  render(theme) {
    this.htmlDoc.setAttribute('data-theme', theme);
  }
}
