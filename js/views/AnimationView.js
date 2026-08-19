/**
 * AnimationView
 * Manages background particle canvas, 3D card tilt effect,
 * IntersectionObserver scroll reveal animations, and number count-up rollups.
 */
export class AnimationView {
  constructor() {
    this.canvas = document.getElementById('heroCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.particleCount = 50;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isCanvasActive = false;
  }

  init() {
    this.initParticleCanvas();
    this.initScrollReveals();
    this.init3DTilt();
    this.initCounterRollups();
  }

  /* --------------------------------------------------------------------------
     1. HERO PARTICLES & eBPF VECTOR CANVAS
     -------------------------------------------------------------------------- */
  initParticleCanvas() {
    if (!this.canvas || !this.ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    // Create particles
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(56, 189, 248, '
      });
    }

    this.isCanvasActive = true;
    this.animateCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || 600;
  }

  animateCanvas() {
    if (!this.isCanvasActive || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw node dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + '0.7)';
      this.ctx.fill();

      // Connect nearby particles with glowing lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }

      // Mouse attraction / wave line
      const mdx = p.x - this.mouseX;
      const mdy = p.y - this.mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < 150) {
        const malpha = (1 - mdist / 150) * 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.strokeStyle = `rgba(56, 189, 248, ${malpha})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();
      }
    }

    requestAnimationFrame(() => this.animateCanvas());
  }

  /* --------------------------------------------------------------------------
     2. INTERSECTION OBSERVER SCROLL REVEALS
     -------------------------------------------------------------------------- */
  initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     3. 3D TILT EFFECT ON CARDS & WIDGETS
     -------------------------------------------------------------------------- */
  init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // max 5deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. NUMERIC COUNTER ROLLUP ANIMATIONS
     -------------------------------------------------------------------------- */
  initCounterRollups() {
    const counters = document.querySelectorAll('.counter-num');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200; // ms
    const startTime = performance.now();

    const isFloat = target % 1 !== 0;

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOutQuad * target;

      el.textContent = `${prefix}${isFloat ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${prefix}${isFloat ? target.toFixed(1) : target}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  }
}
