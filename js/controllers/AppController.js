/**
 * AppController
 * Orchestrates the application logic according to the MVC pattern.
 * Connects ThemeModel, CommandModel, TelemetryModel, CodeModel, BenchmarkModel, PipelineModel
 * to their respective Views including AnimationView for rich 3D tilt & particle FX,
 * LoadingView for intro splash, and GhostView for the Persistent Dark Mode Ghost Easter Egg.
 */
import { ThemeModel } from '../models/ThemeModel.js?v=20260819_v100';
import { CommandModel } from '../models/CommandModel.js?v=20260819_v100';
import { TelemetryModel } from '../models/TelemetryModel.js?v=20260819_v100';
import { CodeModel } from '../models/CodeModel.js?v=20260819_v100';
import { BenchmarkModel } from '../models/BenchmarkModel.js?v=20260819_v100';
import { PipelineModel } from '../models/PipelineModel.js?v=20260819_v100';

import { HeaderView } from '../views/HeaderView.js?v=20260819_v100';
import { CommandView } from '../views/CommandView.js?v=20260819_v100';
import { TelemetryView } from '../views/TelemetryView.js?v=20260819_v100';
import { CodeView } from '../views/CodeView.js?v=20260819_v100';
import { SpotlightView } from '../views/SpotlightView.js?v=20260819_v100';
import { BenchmarkView } from '../views/BenchmarkView.js?v=20260819_v100';
import { PipelineView } from '../views/PipelineView.js?v=20260819_v100';
import { AnimationView } from '../views/AnimationView.js?v=20260819_v100';
import { LoadingView } from '../views/LoadingView.js?v=20260819_v100';
import { GhostView } from '../views/GhostView.js?v=20260819_v100';

export class AppController {
  constructor() {
    // Instantiate Models
    this.themeModel = new ThemeModel();
    this.commandModel = new CommandModel();
    this.telemetryModel = new TelemetryModel();
    this.codeModel = new CodeModel();
    this.benchmarkModel = new BenchmarkModel();
    this.pipelineModel = new PipelineModel();

    // Instantiate Views
    this.headerView = new HeaderView();
    this.commandView = new CommandView();
    this.telemetryView = new TelemetryView();
    this.codeView = new CodeView();
    this.spotlightView = new SpotlightView();
    this.benchmarkView = new BenchmarkView();
    this.pipelineView = new PipelineView();
    this.animationView = new AnimationView();
    this.loadingView = new LoadingView();
    this.ghostView = new GhostView();
  }

  init() {
    // 0. Trigger Fullscreen Intro Splash Sequence
    if (this.loadingView) {
      this.loadingView.startSequence();
    }

    // 1. Initialize Theme MVC
    if (this.headerView && this.themeModel) {
      this.headerView.render(this.themeModel.getTheme());
      this.themeModel.subscribe(theme => this.headerView.render(theme));
      this.headerView.bindToggleTheme(() => this.themeModel.toggleTheme());
    }

    // 2. Initialize Command MVC
    if (this.commandView && this.commandModel) {
      this.commandView.render({
        activeTab: this.commandModel.activeTab,
        commandText: this.commandModel.getActiveCommand(),
        isCopied: this.commandModel.isCopied
      });
      this.commandModel.subscribe(data => this.commandView.render(data));
      this.commandView.bindTabChange(tabKey => this.commandModel.setActiveTab(tabKey));
      this.commandView.bindCopyCommand(() => this.commandModel.copyCommandToClipboard());
    }

    // 3. Initialize Telemetry Stream & Waveform Oscilloscope MVC
    if (this.telemetryView && this.telemetryModel) {
      const initialTraces = this.telemetryModel.getInitialTraces();
      initialTraces.forEach(trace => this.telemetryView.addTraceRow(trace, false));
      this.telemetryView.renderStatus(this.telemetryModel.isStreaming);

      this.telemetryModel.subscribe(event => {
        if (event.type === 'new_trace') {
          this.telemetryView.addTraceRow(event.trace, true);
          this.telemetryView.renderCounter(event.eventCount);
        } else if (event.type === 'status_change') {
          this.telemetryView.renderStatus(event.isStreaming);
        }
      });

      this.telemetryView.bindToggleStream(() => this.telemetryModel.toggleStreaming());

      // Continuous trace stream interval
      setInterval(() => {
        this.telemetryModel.generateTraceEvent();
      }, 1200);
    }

    // 4. Initialize Code Config MVC
    if (this.codeView && this.codeModel) {
      this.codeView.render({
        activeTab: this.codeModel.activeTab,
        snippetHtml: this.codeModel.getActiveSnippet()
      });
      this.codeModel.subscribe(data => this.codeView.render(data));
      this.codeView.bindTabChange(tabKey => this.codeModel.setActiveTab(tabKey));
    }

    // 5. Initialize Benchmark Simulator MVC
    if (this.benchmarkView && this.benchmarkModel) {
      this.benchmarkView.render(this.benchmarkModel.getMetrics());
      this.benchmarkModel.subscribe(metrics => this.benchmarkView.render(metrics));
      this.benchmarkView.bindSliderChange(rps => this.benchmarkModel.setWorkload(rps));
    }

    // 6. Initialize eBPF Kernel Pipeline MVC
    if (this.pipelineView && this.pipelineModel) {
      this.pipelineView.render({ activeStage: this.pipelineModel.activeStage });
      this.pipelineModel.subscribe(data => this.pipelineView.render(data));
      this.pipelineView.bindStageClick(stage => this.pipelineModel.setActiveStage(stage));
    }

    // 7. Initialize Ambient Cursor Spotlight & Rich Animations
    if (this.spotlightView) this.spotlightView.init();
    if (this.animationView) this.animationView.init();

    // 8. Initialize The Persistent Dark Mode Ghost Easter Egg
    if (this.ghostView) this.ghostView.init();
  }
}
