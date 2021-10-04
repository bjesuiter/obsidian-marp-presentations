import { View, WorkspaceLeaf } from 'obsidian';
import { generateObsidianViewHeader } from './generate-obsidian-view-header';

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
		const { header, icon, title, actions } = generateObsidianViewHeader(containerEl);

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
