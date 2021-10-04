import { App, PluginSettingTab, Setting } from 'obsidian';
import { MarpPlugin } from 'src/marp-plugin';

export class MarpSettingsTab extends PluginSettingTab {
	plugin: MarpPlugin;

	constructor(app: App, plugin: MarpPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder('Enter your secret')
					.setValue('')
					.onChange(async (value) => {
						console.log('Secret: ' + value);
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
