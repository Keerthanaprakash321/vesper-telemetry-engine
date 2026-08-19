/**
 * CodeView
 * Renders configuration code tabs and syntax-highlighted block.
 */
export class CodeView {
  constructor() {
    this.codeTabs = document.querySelectorAll('.code-tab');
    this.codeDisplay = document.getElementById('codeDisplay');
  }

  bindTabChange(handler) {
    this.codeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const fileType = tab.getAttribute('data-file');
        if (fileType) handler(fileType);
      });
    });
  }

  render(data) {
    const { activeTab, snippetHtml } = data;

    this.codeTabs.forEach(tab => {
      if (tab.getAttribute('data-file') === activeTab) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    if (this.codeDisplay && snippetHtml) {
      this.codeDisplay.innerHTML = snippetHtml;
    }
  }
}
