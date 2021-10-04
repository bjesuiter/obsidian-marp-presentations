const path = require('path');

module.exports = {
	entry: './main.ts',
	mode: 'production',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		// Add an alias
		// alias: {
		// 	obsidian: path.resolve(__dirname, 'node_modules/obsidian/obsidian.d.ts'),
		// },
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
