import { View, WorkspaceLeaf } from 'obsidian';
import { generateObsidianViewHeader } from './generate-obsidian-view-header';
import { MarpPresentationViewOptions } from './marp-presentation-view-options';
import { logger } from '../../consts/logger';
import Marp from '@marp-team/marp-core';

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

		const content = containerEl.createDiv({ cls: 'view-content' });

		// Convert Markdown slide deck into HTML and CSS
		// marp-core Docs: https://github.com/marp-team/marp-core#readme
		// Maybe find usage infos for marp-core at
		// https://github.com/marp-team/marp-cli
		const marp = new Marp({
			math: false,
		});
		const { html, css } = marp.render('# Hello, marp-core!');

		content.createEl('style');
		content.innerText = css;

		const marpContent = content.createDiv();
		marpContent.innerHTML = html;
	}

	getViewType(): string {
		return 'marp-presentation';
	}

	getDisplayText(): string {
		return 'My Custom View Display Text';
	}
}
