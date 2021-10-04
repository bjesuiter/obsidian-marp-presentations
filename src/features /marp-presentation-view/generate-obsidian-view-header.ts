import { iconObsidianClose } from 'src/consts/icon-obsidian-close';
import { iconMarpLogo } from '../../consts/icon-marp-logo';

export function generateObsidianViewHeader(containerEl: HTMLElement) {
	const header = containerEl.createDiv({ cls: 'view-header' });

	const icon = header.createDiv({ cls: 'view-header-icon' });
	icon.innerHTML = iconMarpLogo;

	const titleContainer = header.createDiv({ cls: 'view-header-title-container' });
	const title = titleContainer.createDiv({ cls: 'view-header-title' });
	title.textContent = 'MARP Presentation View';

	const actions = header.createDiv({ cls: 'view-actions' });
	const closeAction = actions.createEl('a', {
		cls: 'view-action mod-close-leaf',
	});
	closeAction.innerHTML = iconObsidianClose;

	return {
		header,
		icon,
		title,
		actions,
	};
}
