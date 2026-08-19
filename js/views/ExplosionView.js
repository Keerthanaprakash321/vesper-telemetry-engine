/**
 * ExplosionView
 * Renders an aesthetically pleasing, on-theme 2-second particle burst explosion
 * with glowing shockwave rings, starbursts, and eBPF telemetry badges
 * whenever the user clicks the theme toggle button.
 */
export class ExplosionView {
  triggerExplosion(originX, originY) {
    // Default to button center if coordinates not passed
    if (!originX || !originY) {
      const btn = document.getElementById('themeToggleBtn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height / 2;
      } else {
        originX = window.innerWidth - 80;
        originY = 40;
      }
    }

    // 1. Create High-Visibility DOM Container Overlay
    const container = document.createElement('div');
    container.className = 'theme-explosion-overlay';
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '999999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    // 2. Shockwave Ring
    const shockwave = document.createElement('div');
    shockwave.className = 'explosion-shockwave';
    shockwave.style.left = `${originX}px`;
    shockwave.style.top = `${originY}px`;
    container.appendChild(shockwave);

    // 3. Telemetry & Particle Chips
    const colors = ['#38bdf8', '#818cf8', '#c084fc', '#10b981', '#f43f5e'];
    const telemetryLabels = ['14μs', '38μs', '42μs', '⚡ eBPF', 'kprobe', 'ringbuf', '0.00%', 'p99'];

    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      const isText = Math.random() < 0.35;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 180 + 60; // px distance
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      p.className = 'explosion-particle';
      p.style.left = `${originX}px`;
      p.style.top = `${originY}px`;
      p.style.setProperty('--tx', `${targetX}px`);
      p.style.setProperty('--ty', `${targetY}px`);
      p.style.setProperty('--color', color);

      if (isText) {
        p.classList.add('text-particle');
        p.textContent = telemetryLabels[Math.floor(Math.random() * telemetryLabels.length)];
      } else {
        p.classList.add('dot-particle');
        const size = Math.floor(Math.random() * 8 + 4);
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
      }

      container.appendChild(p);
    }

    // 4. Auto-cleanup after exactly 2.0 seconds (2000ms)
    setTimeout(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 2000);
  }
}
