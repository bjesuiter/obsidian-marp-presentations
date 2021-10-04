import { View, WorkspaceLeaf } from 'obsidian';

export class MarpPresentationView extends View {
	leaf: WorkspaceLeaf;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.leaf = leaf;
	}

	async onOpen() {
		this.display();
	}

	display() {
		const { containerEl } = this;

		const header = containerEl.createDiv({ cls: 'view-header' });

		const icon = header.createDiv({ cls: 'view-header-icon' });
		const titleContainer = header.createDiv({ cls: 'view-header-title-container' });
		const title = titleContainer.createDiv({ cls: 'view-header-title' });
		title.textContent = 'MARP Presentation View';
		const actions = header.createDiv({ cls: 'view-actions' });

		const body = containerEl.createDiv({ cls: 'view-content' });

		body.createEl('h2', { text: 'My MARP Presentation View' });
	}

	getViewType(): string {
		return 'marp-presentation';
	}

	getDisplayText(): string {
		return 'My Custom View Display Text';
	}
}
