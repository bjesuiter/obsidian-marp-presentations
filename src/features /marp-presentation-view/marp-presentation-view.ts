import { View, WorkspaceLeaf } from 'obsidian';
import { generateObsidianViewHeader } from './generate-obsidian-view-header';
import { MarpPresentationViewOptions } from './marp-presentation-view-options';
import { logger } from '../../consts/logger';
import { exec } from 'shelljs';
import execa from 'execa';
import path from 'path';
import { marpPluginId } from 'src/consts/marp-plugin-id';
import { getVaultAbsolutePath } from '../../helper/get-vault-absolute-path';

export class MarpPresentationView extends View {
	leaf: WorkspaceLeaf;

	constructor(leaf: WorkspaceLeaf, private options: MarpPresentationViewOptions) {
		super(leaf);
		this.leaf = leaf;

		logger.log(`Got options in MarpPresentationView: `, options);
	}

	async onOpen() {
		return this.display();
	}

	async display() {
		const { containerEl } = this;
		const { header, icon, title, actions } = generateObsidianViewHeader(containerEl, this.leaf);

		const content = containerEl.createDiv({ cls: 'view-content' });

		// Convert Markdown slide deck into HTML and CSS
		// marp-core Docs: https://github.com/marp-team/marp-core#readme
		// Maybe find usage infos for marp-core at
		// https://github.com/marp-team/marp-cli

		// TODO: Re-enable when compiling this with rollup is fixed!
		// const marp = new Marp({
		// 	math: false,
		// });
		// const { html, css } = marp.render('# Hello, marp-core!');
		// content.createEl('style');
		// content.innerText = css;
		// const marpContent = content.createDiv();
		// marpContent.innerHTML = html;

		// Workaround with marp-cli
		const vaultRoot = getVaultAbsolutePath(this.app);
		const vaultConfigDir = path.join(vaultRoot, this.app.vault.configDir);
		const pluginFolder = path.join(vaultConfigDir, 'plugins', marpPluginId);
		const cli = path.join(pluginFolder, 'assets', 'marp-mac');

		logger.log(`Some calculated paths: `, {
			vaultRoot,
			vaultConfigDir,
			pluginFolder,
			cli,
		});

		try {
			const { exitCode, stdout } = execa.sync(
				cli,
				[this.options.sourceFilePath, '-o', 'output2.html'],
				{
					cwd: vaultRoot,
				}
			);

			logger.log(`Result of marp-cli: `, { exitCode, stdout });
		} catch (error) {
			logger.error(error);
		}
	}

	getViewType(): string {
		return 'marp-presentation';
	}

	getDisplayText(): string {
		return 'My Custom View Display Text';
	}
}
