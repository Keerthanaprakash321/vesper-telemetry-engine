/**
 * LoadingView
 * Manages the 3-second fullscreen intro countdown sequence (0% to 100%),
 * smoothly animating the progress bar and percentage display, then automatically
 * fading out to reveal the landing page.
 */
export class LoadingView {
  constructor() {
    this.overlay = document.getElementById('loadingOverlay');
    this.progressFill = document.getElementById('loadingProgressFill');
    this.percentageText = document.getElementById('loadingPercentageText');
    this.statusText = document.getElementById('loadingStatusText');
  }

  startSequence(onComplete) {
    if (!this.overlay) {
      if (onComplete) onComplete();
      return;
    }

    // Lock scroll during countdown
    document.body.style.overflow = 'hidden';

    const duration = 3000; // 3 seconds exact duration
    const startTime = performance.now();

    const updateCountdown = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      const percentage = Math.floor(progress * 100);

      if (this.progressFill) this.progressFill.style.width = `${percentage}%`;
      if (this.percentageText) this.percentageText.textContent = `${percentage}%`;

      // Status message milestones
      if (this.statusText) {
        if (percentage < 30) {
          this.statusText.textContent = 'Attaching eBPF kernel socket hooks...';
        } else if (percentage < 60) {
          this.statusText.textContent = 'Initializing lock-free ring buffer...';
        } else if (percentage < 90) {
          this.statusText.textContent = 'Verifying Vesper Rust telemetry daemon...';
        } else {
          this.statusText.textContent = 'Engine operational. Opening workspace...';
        }
      }

      if (progress < 1.0) {
        requestAnimationFrame(updateCountdown);
      } else {
        setTimeout(() => {
          this.overlay.classList.add('fade-out');
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 200);
      }
    };

    requestAnimationFrame(updateCountdown);
  }
}
