/**
 * BenchmarkView
 * Renders animated comparison bars and label values for the honest benchmark simulator.
 */
export class BenchmarkView {
  constructor() {
    this.slider = document.getElementById('workloadSlider');
    this.workloadVal = document.getElementById('workloadVal');

    this.vesperCpuVal = document.getElementById('vesperCpuVal');
    this.vesperCpuBar = document.getElementById('vesperCpuBar');
    this.vesperRamVal = document.getElementById('vesperRamVal');
    this.vesperRamBar = document.getElementById('vesperRamBar');
    this.vesperLatVal = document.getElementById('vesperLatVal');
    this.vesperLatBar = document.getElementById('vesperLatBar');

    this.tradCpuVal = document.getElementById('tradCpuVal');
    this.tradCpuBar = document.getElementById('tradCpuBar');
    this.tradRamVal = document.getElementById('tradRamVal');
    this.tradRamBar = document.getElementById('tradRamBar');
    this.tradLatVal = document.getElementById('tradLatVal');
    this.tradLatBar = document.getElementById('tradLatBar');
  }

  bindSliderChange(handler) {
    this.slider?.addEventListener('input', (e) => {
      handler(e.target.value);
    });
  }

  render(data) {
    if (!data) return;

    if (this.workloadVal) this.workloadVal.textContent = data.workloadRps;

    // Vesper Updates
    if (this.vesperCpuVal) this.vesperCpuVal.textContent = data.vesper.cpu;
    if (this.vesperCpuBar) this.vesperCpuBar.style.width = `${Math.max(data.vesper.cpuPercent, 4)}%`;

    if (this.vesperRamVal) this.vesperRamVal.textContent = data.vesper.ram;
    if (this.vesperRamBar) this.vesperRamBar.style.width = `${Math.max(data.vesper.ramPercent, 4)}%`;

    if (this.vesperLatVal) this.vesperLatVal.textContent = data.vesper.latency;
    if (this.vesperLatBar) this.vesperLatBar.style.width = `${Math.max(data.vesper.latPercent, 4)}%`;

    // Traditional Updates
    if (this.tradCpuVal) this.tradCpuVal.textContent = data.traditional.cpu;
    if (this.tradCpuBar) this.tradCpuBar.style.width = `${Math.max(data.traditional.cpuPercent, 4)}%`;

    if (this.tradRamVal) this.tradRamVal.textContent = data.traditional.ram;
    if (this.tradRamBar) this.tradRamBar.style.width = `${Math.max(data.traditional.ramPercent, 4)}%`;

    if (this.tradLatVal) this.tradLatVal.textContent = data.traditional.latency;
    if (this.tradLatBar) this.tradLatBar.style.width = `${Math.max(data.traditional.latPercent, 4)}%`;
  }
}
