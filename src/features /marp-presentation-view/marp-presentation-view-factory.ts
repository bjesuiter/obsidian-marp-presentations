import { View, WorkspaceLeaf } from 'obsidian';
import { MarpPresentationView } from './marp-presentation-view';

export function marpPresentationViewFactory(leaf: WorkspaceLeaf): View {
	return new MarpPresentationView(leaf);
}
