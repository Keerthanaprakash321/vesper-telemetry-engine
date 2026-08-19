/**
 * CommandView
 * Renders installation CTA command tabs, updates prompt command text,
 * and handles copy button animations and visual state.
 */
export class CommandView {
  constructor() {
    this.cmdTabs = document.querySelectorAll('.cmd-tab');
    this.commandText = document.getElementById('commandText');
    this.copyBtn = document.getElementById('copyBtn');
    this.copyIcon = this.copyBtn?.querySelector('.copy-icon');
    this.checkIcon = this.copyBtn?.querySelector('.check-icon');
    this.copyLabel = this.copyBtn?.querySelector('.copy-label');
  }

  bindTabChange(handler) {
    this.cmdTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cmdType = tab.getAttribute('data-cmd-type') || tab.textContent.trim().toLowerCase();
        handler(cmdType);
      });
    });
  }

  bindCopyCommand(handler) {
    this.copyBtn?.addEventListener('click', handler);
  }

  render(data) {
    const { activeTab, commandText, isCopied } = data;

    // Render active tab UI
    this.cmdTabs.forEach(tab => {
      const tabType = tab.getAttribute('data-cmd-type') || tab.textContent.trim().toLowerCase();
      if (tabType === activeTab) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // Render command text
    if (this.commandText && commandText) {
      this.commandText.textContent = commandText;
    }

    // Render copy button feedback
    if (this.copyBtn) {
      if (isCopied) {
        this.copyBtn.classList.add('copied');
        this.copyIcon?.classList.add('hidden');
        this.checkIcon?.classList.remove('hidden');
        if (this.copyLabel) this.copyLabel.textContent = 'Copied!';
      } else {
        this.copyBtn.classList.remove('copied');
        this.copyIcon?.classList.remove('hidden');
        this.checkIcon?.classList.add('hidden');
        if (this.copyLabel) this.copyLabel.textContent = 'Copy';
      }
    }
  }
}
