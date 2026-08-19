/**
 * ThemeModel
 * Manages active theme state ('dark' / 'light'), persistence in localStorage,
 * and notifies listeners on theme updates.
 */
export class ThemeModel {
  constructor() {
    this.storageKey = 'vesper_theme';
    this.currentTheme = localStorage.getItem(this.storageKey) || 'dark';
    this.listeners = [];
  }

  getTheme() {
    return this.currentTheme;
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.storageKey, this.currentTheme);
    this.notify();
    return this.currentTheme;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.currentTheme));
  }
}
