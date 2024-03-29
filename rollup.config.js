import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';

const isProd = process.env.BUILD === 'production';

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

// const outDir = `dist`
// Hack: To generate all output directly into an obsidian vault for testing:
const outDir = `./test-marp-plugin/.obsidian/plugins/obsidian-marp-presentations`;

export default {
	input: 'main.ts',
	output: {
		dir: outDir,
		sourcemap: 'inline',
		sourcemapExcludeSources: isProd,
		format: 'cjs',
		exports: 'default',
		banner,
	},
	external: ['obsidian'],
	plugins: [
		// This json plugin is used like this in marp-core
		json({ preferConst: true }),
		typescript(),
		nodeResolve({ browser: true }),
		commonjs({
			dynamicRequireTargets: [
				// Inside mathjax is the following circular dependency:
				// node_modules/mathjax-full/js/input/tex/TexParser.js
				// -> node_modules/mathjax-full/js/input/tex/ParseUtil.js
				// -> node_modules/mathjax-full/js/input/tex/TexParser.js
				// This simulates a dynamic 'require' environment for the whole mathjax library to resolve the problem
				// all in one solution - seems to break imports
				// `node_modules/mathjax-full/**/*.js`,
				// explicit solution
				`node_modules/mathjax-full/js/input/tex/TexParser.js`,
				`node_modules/mathjax-full/js/input/tex/ParseUtil.js`,
				`node_modules/mathjax-full/js/input/tex/mathtools/MathtoolsMethods.js`,
				`node_modules/mathjax-full/js/input/tex/mathtools/MathtoolsUtil.js`,
				`node_modules/mathjax-full/js/input/tex/mathtools/MathtoolsConfiguration.js`,
				`node_modules/mathjax-full/js/input/tex/mathtools/MathtoolsMappings.js`,
				`node_modules/mathjax-full/js/output/svg.js`,
				`node_modules/mathjax-full/js/output/svg/WrapperFactory.js`,
				`node_modules/mathjax-full/js/output/svg/Wrappers.js`,
			],
			ignoreDynamicRequires: [],
		}),
		copy({
			targets: [
				{ src: 'manifest.json', dest: outDir },
				{ src: 'styles.css', dest: outDir },
				{ src: 'versions.json', dest: outDir },
				{ src: 'README.md', dest: outDir },
			],
		}),
	],
};
