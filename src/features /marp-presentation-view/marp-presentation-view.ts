import { View } from 'obsidian';

export class MarpPresentationView extends View {
	getViewType(): string {
		return 'marp-presentation';
	}

	getDisplayText(): string {
		return 'My Custom View Display Text';
	}
}
