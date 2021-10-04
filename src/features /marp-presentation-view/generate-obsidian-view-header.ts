import { WorkspaceLeaf } from 'obsidian';
import { iconObsidianClose } from '../../consts/icon-obsidian-close';
import { iconMarpLogo } from '../../consts/icon-marp-logo';

export function generateObsidianViewHeader(containerEl: HTMLElement, leaf: WorkspaceLeaf) {
	const header = containerEl.createDiv({ cls: 'view-header' });

	// generates header icon
	const icon = header.createDiv({ cls: 'view-header-icon' });
	icon.innerHTML = iconMarpLogo;

	// generates header title
	const titleContainer = header.createDiv({ cls: 'view-header-title-container' });
	const title = titleContainer.createDiv({ cls: 'view-header-title' });
	title.textContent = 'MARP Presentation View';

	const actions = header.createDiv({ cls: 'view-actions' });

	// generates close action button
	const closeAction = actions.createEl('a', {
		cls: 'view-action mod-close-leaf',
	});
	closeAction.innerHTML = iconObsidianClose;
	closeAction.onClickEvent(() => {
		leaf.detach();
	});

	return {
		header,
		icon,
		title,
		actions,
	};
}
