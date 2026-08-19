/**
 * TelemetryView
 * Renders kernel trace stream terminal, real-time latency waveform oscilloscope,
 * line popovers, pause/play state, and event counter label.
 */
export class TelemetryView {
  constructor() {
    this.terminalStream = document.getElementById('terminalStream');
    this.streamToggleBtn = document.getElementById('streamToggleBtn');
    this.streamStatusLabel = document.getElementById('streamStatusLabel');
    this.pauseIcon = this.streamToggleBtn?.querySelector('.pause-icon');
    this.playIcon = this.streamToggleBtn?.querySelector('.play-icon');
    this.eventCounter = document.getElementById('eventCounter');
    this.waveformContainer = document.getElementById('waveformContainer');
    this.maxRows = 25;
    this.maxWaveformBars = 36;

    this.initWaveform();
  }

  initWaveform() {
    if (!this.waveformContainer) return;

    // Pre-populate waveform container with initial smooth bars
    for (let i = 0; i < this.maxWaveformBars; i++) {
      const bar = document.createElement('div');
      bar.className = 'waveform-bar';
      const initialHeight = Math.floor(Math.random() * 35 + 15);
      bar.style.height = `${initialHeight}%`;
      this.waveformContainer.appendChild(bar);
    }
  }

  addWaveformSample(status, latencyStr) {
    if (!this.waveformContainer) return;

    const bar = document.createElement('div');
    bar.className = 'waveform-bar';

    // Parse microsecond latency value into height percentage
    let latNum = parseInt(latencyStr, 10) || 30;
    let heightPercent = Math.min(Math.max((latNum / 150) * 100, 15), 95);

    if (status === 'slow') {
      bar.classList.add('spike');
      heightPercent = Math.min(heightPercent + 20, 100);
    }

    bar.style.height = `${heightPercent}%`;
    this.waveformContainer.appendChild(bar);

    // Limit maximum bars to keep oscilloscope smooth
    if (this.waveformContainer.querySelectorAll('.waveform-bar').length > this.maxWaveformBars) {
      const oldestBar = this.waveformContainer.querySelector('.waveform-bar');
      if (oldestBar) this.waveformContainer.removeChild(oldestBar);
    }
  }

  bindToggleStream(handler) {
    this.streamToggleBtn?.addEventListener('click', handler);
  }

  addTraceRow(trace, autoScroll = true) {
    if (!this.terminalStream || !trace) return;

    const row = document.createElement('div');
    row.className = 'trace-line';
    row.setAttribute('data-tooltip', trace.breakdown);

    row.innerHTML = `
      <span class="trace-timestamp">${trace.timestamp}</span>
      <span class="trace-method ${trace.method.toLowerCase()}">${trace.method}</span>
      <span class="trace-path">${trace.path}</span>
      <span class="trace-latency ${trace.status}">${trace.latency}</span>
    `;

    this.terminalStream.appendChild(row);

    // Add corresponding sample to waveform
    this.addWaveformSample(trace.status, trace.latency);

    if (this.terminalStream.children.length > this.maxRows) {
      this.terminalStream.removeChild(this.terminalStream.firstElementChild);
    }

    if (autoScroll) {
      this.terminalStream.scrollTop = this.terminalStream.scrollHeight;
    }
  }

  renderStatus(isStreaming) {
    if (isStreaming) {
      this.pauseIcon?.classList.remove('hidden');
      this.playIcon?.classList.add('hidden');
      if (this.streamStatusLabel) this.streamStatusLabel.textContent = 'LIVE';
    } else {
      this.pauseIcon?.classList.add('hidden');
      this.playIcon?.classList.remove('hidden');
      if (this.streamStatusLabel) this.streamStatusLabel.textContent = 'PAUSED';
    }
  }

  renderCounter(count) {
    if (this.eventCounter && count) {
      this.eventCounter.textContent = `${count.toLocaleString()} events/sec`;
    }
  }
}
