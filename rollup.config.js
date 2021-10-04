import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

const isProd = process.env.BUILD === 'production';

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

export default {
	input: 'main.ts',
	output: {
		dir: 'dist',
		sourcemap: 'inline',
		sourcemapExcludeSources: isProd,
		format: 'cjs',
		exports: 'default',
		banner,
	},
	external: ['obsidian'],
	plugins: [
		typescript(),
		nodeResolve({ browser: true }),
		commonjs(),
		copy({
			targets: [
				{ src: 'manifest.json', dest: 'dist' },
				{ src: 'styles.css', dest: 'dist' },
				{ src: 'versions.json', dest: 'dist' },
				{ src: 'README.md', dest: 'dist' },
			],
		}),
	],
};
