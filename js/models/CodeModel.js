/**
 * CodeModel
 * Manages configuration snippets (yaml, rust, json) and tab selection state.
 */
export class CodeModel {
  constructor() {
    this.activeTab = 'yaml';
    this.snippets = {
      yaml: `<span class="c-key">version</span>: <span class="c-str">"1.4"</span>
<span class="c-key">engine</span>:
  <span class="c-key">probe_type</span>: <span class="c-str">"ebpf_ringbuffer"</span>
  <span class="c-key">buffer_size_mb</span>: <span class="c-num">64</span>
  <span class="c-key">sampling_rate</span>: <span class="c-str">"1.0"</span>

<span class="c-key">targets</span>:
  - <span class="c-key">process</span>: <span class="c-str">"api-gateway"</span>
    <span class="c-key">ports</span>: [<span class="c-num">8080</span>, <span class="c-num">443</span>]
    <span class="c-key">trace_depth</span>: <span class="c-str">"full_stack"</span>

<span class="c-key">export</span>:
  <span class="c-key">otlp_endpoint</span>: <span class="c-str">"http://127.0.0.1:4317"</span>
  <span class="c-key">stdout_format</span>: <span class="c-str">"compact_color"</span>`,

      rust: `<span class="c-key">use</span> vesper_core::Tracer;

<span class="c-key">#[tokio::main]</span>
<span class="c-key">async fn</span> main() -> Result&lt;(), Box&lt;<span class="c-key">dyn</span> std::error::Error&gt;&gt; {
    <span class="c-key">let</span> tracer = Tracer::attach_ebpf(<span class="c-str">"/sys/fs/bpf"</span>)?;
    println!(<span class="c-str">"Vesper kernel probe listening on port 8080..."</span>);

    tracer.stream_spans(|span| {
        println!(<span class="c-str">"[TRACER] ID: {} Latency: {}us"</span>, span.id, span.micros);
    }).<span class="c-key">await</span>?;

    Ok(())
}`,

      json: `{
  <span class="c-key">"vesper_version"</span>: <span class="c-str">"1.4.0"</span>,
  <span class="c-key">"metrics"</span>: {
    <span class="c-key">"p99_latency_micros"</span>: <span class="c-num">38.4</span>,
    <span class="c-key">"memory_rss_bytes"</span>: <span class="c-num">18874368</span>,
    <span class="c-key">"dropped_events"</span>: <span class="c-num">0</span>
  }
}`
    };

    this.listeners = [];
  }

  getActiveSnippet() {
    return this.snippets[this.activeTab];
  }

  setActiveTab(tabKey) {
    if (this.snippets[tabKey]) {
      this.activeTab = tabKey;
      this.notify();
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      activeTab: this.activeTab,
      snippetHtml: this.getActiveSnippet()
    }));
  }
}
