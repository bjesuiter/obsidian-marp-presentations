import { App, FileSystemAdapter } from 'obsidian';
import { logger } from 'src/consts/logger';

export function getVaultAbsolutePath(app: App) {
	let adapter = app.vault.adapter;
	if (adapter instanceof FileSystemAdapter) {
		return adapter.getBasePath();
	}
	logger.warn(
		`app.vault.adapter is not a FileSystemAdapter, as expected by function getVaultAbsolutePath!`
	);
}
