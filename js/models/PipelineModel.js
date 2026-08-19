/**
 * PipelineModel
 * Manages eBPF kernel pipeline stage state and inspection details.
 */
export class PipelineModel {
  constructor() {
    this.activeStage = 'kprobe';
    this.listeners = [];

    this.stages = {
      kprobe: {
        title: 'eBPF Socket Hooks',
        desc: 'Hooks directly into Linux socket layers and kernel probe points (kprobes/uprobes). Zero code modification required.',
        latency: '2.4 μs',
        throughput: '1,450,000 req/s'
      },
      ringbuf: {
        title: 'Lock-Free Ring Buffer',
        desc: 'Kernel-to-user memory ring buffer with lock-free atomic pointer increments. Eliminates copy-to-user context switches.',
        latency: '8.1 μs',
        throughput: '1,200,000 req/s'
      },
      daemon: {
        title: 'Vesper Rust Engine',
        desc: 'Low-footprint static Rust daemon aggregates trace spans, generates p99 histograms, and applies local PII redaction.',
        latency: '14.5 μs',
        throughput: '980,000 req/s'
      },
      export: {
        title: 'Zero-Loss Exporter',
        desc: 'Streams binary OTLP/gRPC packets or exposes Prometheus endpoints directly to terminal or monitoring server.',
        latency: '11.0 μs',
        throughput: '980,000 req/s'
      }
    };
  }

  setActiveStage(stageKey) {
    if (this.stages[stageKey]) {
      this.activeStage = stageKey;
      this.notify();
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      activeStage: this.activeStage,
      details: this.stages[this.activeStage]
    }));
  }
}
