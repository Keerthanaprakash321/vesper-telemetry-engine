/**
 * VESPER DEVELOPER TOOL HOMEPAGE — MVC BOOTSTRAP
 * Main entry point initializing AppController on DOM ready.
 */
import { AppController } from './controllers/AppController.js?v=20260819_v100';

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
