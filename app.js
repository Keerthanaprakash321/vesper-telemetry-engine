/**
 * VESPER DEVELOPER TOOL HOMEPAGE — MVC BOOTSTRAP DELEGATE
 * Redirects entry point to AppController for modular MVC architecture.
 */
import { AppController } from './js/controllers/AppController.js?v=20260819_v100';

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
