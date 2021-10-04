import { Plugin, View } from 'obsidian';
import { DEFAULT_SETTINGS } from './consts/marp-plugin-default-settings';
import { MarpSettingsTab } from './features /marp-settings-tab/marp-settings-tab';
import { MarpPluginSettings } from './types/marp-plugin-settings';
import { marpPresentationViewFactory } from './features /marp-presentation-view/marp-presentation-view-factory';
import { logger } from './consts/logger';
import { MarkdownViewState } from './types/markdown-view-state';
import { stat } from 'fs';
import { MarpPresentationViewOptions } from './features /marp-presentation-view/marp-presentation-view-options';

export class MarpPlugin extends Plugin {
	settings: MarpPluginSettings;

	async onload() {
		logger.log('loading ...');

		await this.loadSettings();

		this.addSettingTab(new MarpSettingsTab(this.app, this));

		this.registerView('marp-presentation', marpPresentationViewFactory);

		// this.addRibbonIcon('dice', 'Sample Plugin', () => {
		// 	new Notice('This is a notice!');
		// });

		// this.addStatusBarItem().setText('Status Bar Text');

		this.addCommand({
			id: 'marp-open-presentation-view',
			name: 'Open Presentation View',
			checkCallback: (obsidianIsChecking) => {
				if (!obsidianIsChecking) {
					const { type, state } = this.app.workspace.activeLeaf.getViewState();
					this.openPresentationView((state as MarkdownViewState).file);
					return;
				}

				const { type, state } = this.app.workspace.activeLeaf.getViewState();
				if (type === 'markdown' && (state as MarkdownViewState).mode === 'source') {
					logger.log('Active leaf is markdown source view!');
					return true;
				}

				return false;
			},
		});

		// this.addCommand({
		// 	id: 'open-sample-modal',
		// 	name: 'Open Sample Modal',
		// 	// callback: () => {
		// 	// 	console.log('Simple Callback');
		// 	// },
		// 	checkCallback: (checking: boolean) => {
		// 		let leaf = this.app.workspace.activeLeaf;
		// 		if (leaf) {
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// });

		// this.registerCodeMirror((cm: CodeMirror.Editor) => {
		// 	console.log('codemirror', cm);
		// });

		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		logger.log('loading finshed');
	}

	openPresentationView(sourceFilePath: string) {
		logger.log('Opening presentation view ...');
		// the last param shows the new split pane on the left side of the current leaf
		const newWorkspaceLeaf = this.app.workspace.createLeafBySplit(
			this.app.workspace.getLeaf(),
			'vertical',
			false
		);
		const options: MarpPresentationViewOptions = {
			sourceFilePath,
		};
		newWorkspaceLeaf.open(marpPresentationViewFactory(newWorkspaceLeaf, options));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
