/**
 * CommandModel
 * Holds installation commands dictionary for different package managers,
 * active tab state, and clipboard copying logic.
 */
export class CommandModel {
  constructor() {
    this.commands = {
      curl: 'curl -fsSL https://vesper.dev/install.sh | sh',
      cargo: 'cargo install vesper-cli',
      brew: 'brew install vesper-hq/tap/vesper',
      docker: 'docker run --privileged -d vesper/engine:latest'
    };

    this.activeTab = 'curl';
    this.isCopied = false;
    this.listeners = [];
  }

  getActiveCommand() {
    return this.commands[this.activeTab];
  }

  setActiveTab(tabKey) {
    if (this.commands[tabKey]) {
      this.activeTab = tabKey;
      this.notify();
    }
  }

  async copyCommandToClipboard() {
    const textToCopy = this.getActiveCommand();
    try {
      await navigator.clipboard.writeText(textToCopy);
      this.isCopied = true;
      this.notify();

      setTimeout(() => {
        this.isCopied = false;
        this.notify();
      }, 2000);

      return true;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      return false;
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      activeTab: this.activeTab,
      commandText: this.getActiveCommand(),
      isCopied: this.isCopied
    }));
  }
}
