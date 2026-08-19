/**
 * GhostView — The Persistent Dark Mode Ghost Easter Egg
 * When Dark Mode is on, a tiny pair of cartoon ghost eyes glows in a dark corner of the screen.
 * If the user tries to hover or move their mouse over the eyes, they instantly disappear.
 * If the user leaves their mouse still or moves away, the eyes slowly blink back into view.
 */
export class GhostView {
  constructor() {
    this.ghost = null;
    this.pupils = [];
    this.scareTimer = null;
    this.stillTimer = null;
  }

  init() {
    this.createGhostMarkup();
    this.ghost = document.getElementById('darkGhostEyes');
    if (!this.ghost) return;

    this.pupils = Array.from(this.ghost.querySelectorAll('.ghost-pupil'));

    // Instant vanish on hover
    this.ghost.addEventListener('mouseenter', () => this.scareGhost());

    // Proximity dodge & pupil tracking on mouse move
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    // Listen for theme changes
    const observer = new MutationObserver(() => this.checkThemeState());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    this.checkThemeState();
  }

  createGhostMarkup() {
    if (document.getElementById('darkGhostEyes')) return;

    const el = document.createElement('div');
    el.id = 'darkGhostEyes';
    el.className = 'dark-ghost-eyes';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="ghost-eye left-eye"><div class="ghost-pupil"></div></div>
      <div class="ghost-eye right-eye"><div class="ghost-pupil"></div></div>
    `;
    document.body.appendChild(el);
  }

  checkThemeState() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      setTimeout(() => {
        if (this.ghost && !this.ghost.classList.contains('scared')) {
          this.ghost.classList.add('is-active');
        }
      }, 400);
    } else {
      if (this.ghost) {
        this.ghost.classList.remove('is-active');
        this.ghost.classList.remove('scared');
      }
    }
  }

  scareGhost() {
    if (!this.ghost) return;

    this.ghost.classList.remove('is-active');
    this.ghost.classList.add('scared');

    clearTimeout(this.scareTimer);
    // Slowly blink back into view after mouse leaves/stays away
    this.scareTimer = setTimeout(() => {
      if (this.ghost && document.documentElement.getAttribute('data-theme') === 'dark') {
        this.ghost.classList.remove('scared');
        this.ghost.classList.add('is-active');
      }
    }, 2200);
  }

  handleMouseMove(e) {
    if (!this.ghost) return;

    const theme = document.documentElement.getAttribute('data-theme');
    if (theme !== 'dark') return;

    const rect = this.ghost.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Proximity scare: if mouse comes within 90px, eyes instantly vanish
    if (dist < 90 && !this.ghost.classList.contains('scared')) {
      this.scareGhost();
      return;
    }

    // Eye pupil tracking: pupils look towards cursor direction when visible
    if (dist >= 90 && !this.ghost.classList.contains('scared')) {
      const angle = Math.atan2(dy, dx);
      const px = Math.cos(angle) * 3;
      const py = Math.sin(angle) * 3;

      this.pupils.forEach(pupil => {
        pupil.style.transform = `translate(${px}px, ${py}px)`;
      });
    }

    // Mouse still / away timer: eyes slowly blink back into view
    clearTimeout(this.stillTimer);
    this.stillTimer = setTimeout(() => {
      if (this.ghost && this.ghost.classList.contains('scared') && dist >= 120) {
        this.ghost.classList.remove('scared');
        this.ghost.classList.add('is-active');
      }
    }, 1800);
  }
}
