/**
 * PipelineView
 * Handles interactive eBPF kernel pipeline stage node clicks and active highlights.
 */
export class PipelineView {
  constructor() {
    this.nodes = document.querySelectorAll('.pipeline-node');
  }

  bindStageClick(handler) {
    this.nodes.forEach(node => {
      node.addEventListener('click', () => {
        const stage = node.getAttribute('data-stage');
        if (stage) handler(stage);
      });
    });
  }

  render(data) {
    const { activeStage } = data;

    this.nodes.forEach(node => {
      if (node.getAttribute('data-stage') === activeStage) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }
}
