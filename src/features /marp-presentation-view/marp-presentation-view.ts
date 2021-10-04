import { Constructor, MarkdownEditView, View, WorkspaceLeaf } from 'obsidian';
import { generateObsidianViewHeader } from './generate-obsidian-view-header';
import { MarpPresentationViewOptions } from './marp-presentation-view-options';
import { logger } from '../../consts/logger';

export class MarpPresentationView extends View {
	leaf: WorkspaceLeaf;

	constructor(leaf: WorkspaceLeaf, private options: MarpPresentationViewOptions) {
		super(leaf);
		this.leaf = leaf;

		logger.log(`Got options in MarpPresentationView: `, options);
	}

	async onOpen() {
		this.display();
	}

	display() {
		const { containerEl } = this;
		const { header, icon, title, actions } = generateObsidianViewHeader(containerEl, this.leaf);

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
