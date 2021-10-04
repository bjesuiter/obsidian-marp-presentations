import { View, WorkspaceLeaf } from 'obsidian';
import { MarpPresentationView } from './marp-presentation-view';
import { MarpPresentationViewOptions } from './marp-presentation-view-options';

export function marpPresentationViewFactory(
	leaf: WorkspaceLeaf,
	options: MarpPresentationViewOptions
): View {
	return new MarpPresentationView(leaf, options);
}
