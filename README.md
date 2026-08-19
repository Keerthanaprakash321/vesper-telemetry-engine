# Vesper — Observability at the Speed of Compiled Code

> **Acdyon Technologies Frontend Challenge (Part 2 — The Premium Home Page)**  
> *Observe. Understand. Optimize.*

---

## ⚡ Overview

**Vesper** is a next-generation eBPF kernel telemetry engine designed for extreme restraint and sub-40μs tracing overhead. Stream microsecond traces, memory spans, and kernel metrics straight to your terminal with zero wrappers, zero runtime dependencies, and flat memory footprint scaling.

Built for the **Acdyon Technologies Frontend Challenge**, this landing page demonstrates high-performance web architecture, zero-dependency design, 100% honest performance data, and subtle micro-interactions that earn their keep.

---

## 🔥 Key Features

- **Fullscreen Cyberpunk Intro Loading Screen:**  
  Integrated high-precision `0%` → `100%` 3-second countdown countdown with auto-fade landing page transition.
- **Interactive Command Installation Switcher:**  
  One-click command tabs supporting `cURL`, `Cargo`, `Homebrew`, and `Docker` with instant feedback.
- **Live Terminal & Latency Waveform Oscilloscope:**  
  Real-time HTTP & eBPF trace event stream powered by a live browser resource timing engine (`performance.now()`), paired with an SVG waveform frequency analyzer.
- **Honest Benchmark Simulator:**  
  Interactive workload slider computing real-time comparative CPU, RAM, and latency overhead between Vesper (eBPF) and traditional APM agents under 10k to 500k req/sec workloads.
- **Zero-Copy eBPF Pipeline Explorer:**  
  Interactive 4-stage kernel probe inspection (`kprobe → ringbuf → BPF map → user-space aggregator`).
- **Declarative Config Sandbox:**  
  Syntax-highlighted manifest sandbox supporting `vesper.yaml`, `main.rs`, and `metrics.json`.
- **👻 The Persistent Dark Mode Ghost (Easter Egg):**  
  When Dark Mode is enabled, a tiny pair of glowing cartoon ghost eyes appears in the bottom-right corner. The pupils track cursor direction, instantly vanish when hovered or approached, and shyly blink back into view when the mouse stays still.

---

## 🏗️ Architecture & Technology Stack

- **Architecture:** Modular ES6 Model-View-Controller (MVC)
  - **Models:** `ThemeModel`, `TelemetryModel`, `BenchmarkModel`, `PipelineModel`, `CodeModel`, `CommandModel`
  - **Views:** `HeaderView`, `TelemetryView`, `BenchmarkView`, `PipelineView`, `CodeView`, `CommandView`, `AnimationView`, `SpotlightView`, `LoadingView`, `GhostView`
  - **Controller:** `AppController`
- **Styling:** Custom Vanilla CSS Design System with HSL tokens, glassmorphism layers, and responsive flex/grid layouts (390px mobile to 1440px desktop).
- **Dependencies:** **Zero external runtime dependencies** (no React, Next.js, jQuery, or heavy UI frameworks).
- **Performance:** Hardware-accelerated canvas background, ambient cursor spotlighting, and 60FPS scroll reveals (`.reveal-on-scroll`).

---

## 📄 Design Decisions (`DECISIONS.md`)

See [`DECISIONS.md`](./DECISIONS.md) for the 1-page submission rationale covering:
1. Why Modular Vanilla ES6 MVC was chosen over heavy frameworks.
2. Trade-offs made under time limits and what would be built in a full engineering week.
3. Where AI tools were leveraged and what was personally verified, audited, and custom-coded.

---

## 🛠️ Local Setup & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Keerthanaprakash321/vesper-telemetry-engine.git
   cd vesper-telemetry-engine
   ```

2. **Serve locally:**
   Run any static HTTP server (e.g. using `http-server` or Python):
   ```bash
   npx http-server . -p 8000 -c-1
   ```
   Or:
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8000`.

---

## 📜 License

MIT License © 2026 Vesper Open Source Project. Built for developers with extreme restraint.
