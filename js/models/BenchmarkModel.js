/**
 * BenchmarkModel
 * Calculates real-time comparative overhead metrics for Vesper (eBPF) vs Traditional APM Agent
 * based on traffic workload (requests/sec).
 */
export class BenchmarkModel {
  constructor() {
    this.workloadRps = 150000; // default 150k RPS
    this.listeners = [];
  }

  setWorkload(rps) {
    this.workloadRps = parseInt(rps, 10);
    this.notify();
  }

  getMetrics() {
    const rps = this.workloadRps;

    // Scaling factors based on RPS
    const scale = rps / 100000;

    // Vesper (eBPF) metrics scale extremely flatly
    const vesperCpu = Math.min(0.2 + scale * 0.15, 0.9).toFixed(1); // 0.2% - 0.9%
    const vesperRam = Math.round(16 + scale * 2); // 16MB - 26MB
    const vesperLat = Math.round(25 + scale * 10); // 25us - 75us

    // Traditional Agent metrics scale heavily
    const tradCpu = Math.min(1.5 + scale * 2.2, 14.0).toFixed(1); // 1.5% - 14.0%
    const tradRam = Math.round(120 + scale * 110); // 120MB - 670MB
    const tradLatMs = (0.8 + scale * 2.2).toFixed(1); // 0.8ms - 11.8ms

    return {
      workloadRps: rps.toLocaleString() + ' req/sec',
      vesper: {
        cpu: `${vesperCpu}%`,
        cpuPercent: Math.min(parseFloat(vesperCpu) * 10, 100),
        ram: `${vesperRam} MB`,
        ramPercent: Math.min((vesperRam / 700) * 100, 100),
        latency: `${vesperLat} μs`,
        latPercent: Math.min((vesperLat / 500) * 100, 100)
      },
      traditional: {
        cpu: `${tradCpu}%`,
        cpuPercent: Math.min(parseFloat(tradCpu) * 7.14, 100),
        ram: `${tradRam} MB`,
        ramPercent: Math.min((tradRam / 700) * 100, 100),
        latency: `${tradLatMs} ms`,
        latPercent: Math.min((parseFloat(tradLatMs) / 12) * 100, 100)
      }
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    const metrics = this.getMetrics();
    this.listeners.forEach(fn => fn(metrics));
  }
}
