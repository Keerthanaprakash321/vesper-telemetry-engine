/**
 * TelemetryModel
 * Manages kernel telemetry ring buffer, streaming state (LIVE/PAUSED),
 * event metrics, and trace row generation.
 */
export class TelemetryModel {
  constructor() {
    this.isStreaming = true;
    this.eventCount = 2840;
    this.maxRows = 25;
    this.listeners = [];

    this.mockEndpoints = [
      { method: 'GET', path: '/v1/telemetry/spans', status: 'fast', latency: '42μs', breakdown: 'ebpf_hook: 4μs | parse: 12μs | ringbuf: 26μs' },
      { method: 'POST', path: '/v1/auth/verify-token', status: 'fast', latency: '38μs', breakdown: 'ebpf_hook: 2μs | parse: 8μs | ringbuf: 28μs' },
      { method: 'gRPC', path: 'vesper.internal.Tracer/StreamSpans', status: 'fast', latency: '29μs', breakdown: 'ebpf_hook: 3μs | parse: 9μs | ringbuf: 17μs' },
      { method: 'GET', path: '/health/liveness', status: 'fast', latency: '14μs', breakdown: 'ebpf_hook: 1μs | parse: 5μs | ringbuf: 8μs' },
      { method: 'POST', path: '/v2/billing/webhooks', status: 'norm', latency: '112μs', breakdown: 'ebpf_hook: 8μs | parse: 40μs | ringbuf: 64μs' },
      { method: 'GET', path: '/v1/users/me/preferences', status: 'fast', latency: '48μs', breakdown: 'ebpf_hook: 5μs | parse: 15μs | ringbuf: 28μs' },
      { method: 'gRPC', path: 'vesper.internal.Metrics/FlushBatch', status: 'fast', latency: '54μs', breakdown: 'ebpf_hook: 4μs | parse: 20μs | ringbuf: 30μs' },
    ];
  }

  toggleStreaming() {
    this.isStreaming = !this.isStreaming;
    this.notifyStreamStatus();
    return this.isStreaming;
  }

  generateTraceEvent() {
    if (!this.isStreaming) return null;

    const template = this.mockEndpoints[Math.floor(Math.random() * this.mockEndpoints.length)];
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${Math.floor(Math.random() * 900 + 100)}`;
    
    this.eventCount += Math.floor(Math.random() * 4) + 1;

    const newTrace = {
      timestamp: timeStr,
      method: template.method,
      path: template.path,
      status: template.status,
      latency: template.latency,
      breakdown: template.breakdown
    };

    this.notifyNewTrace(newTrace);
    return newTrace;
  }

  getInitialTraces() {
    return this.mockEndpoints.map(template => {
      const now = new Date();
      return {
        timestamp: `${now.toTimeString().split(' ')[0]}.${Math.floor(Math.random() * 900 + 100)}`,
        method: template.method,
        path: template.path,
        status: template.status,
        latency: template.latency,
        breakdown: template.breakdown
      };
    });
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyNewTrace(trace) {
    this.listeners.forEach(fn => fn({ type: 'new_trace', trace, eventCount: this.eventCount }));
  }

  notifyStreamStatus() {
    this.listeners.forEach(fn => fn({ type: 'status_change', isStreaming: this.isStreaming }));
  }
}
