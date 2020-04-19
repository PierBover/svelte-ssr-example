import path from 'path';
import fs from 'fs';

import rimraf from 'rimraf';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

const rollupConfigs = [];

const pagesDir = path.join(__dirname, 'client/pages/');
const ssrDir = path.join(__dirname, 'server/ssr');
const clientDir = path.join(__dirname, 'server/public/js/pages');

// Delete the target directory
rimraf.sync(ssrDir);
rimraf.sync(clientDir);

const pagesFiles = fs.readdirSync(pagesDir);

// We generate an array of configs for Rollup with 2 configs per page component:
// 1. CommonJS module for doing SSR on Node
// 2. ES module for importing client-side and hydrating the SSR'd markup

pagesFiles.forEach((filename) => {

	// Ignore non .svelte files
	if (!filename.includes('.svelte')) return;

	// Remove the .svelte extension to be able to use the component name
	const componentName = filename.replace('.svelte', '');

	// SSR component
	rollupConfigs.push({
		input: path.join(pagesDir, filename),
		output: {
			format: 'cjs',
			file: path.join(ssrDir, componentName + '.js')
		},
		plugins: [
			svelte({
				// Svelte compiler options:
				// https://svelte.dev/docs#Compile_time
				dev: false,
				immutable: true,
				generate: 'ssr',
				hydratable: true
			}),
			resolve({
				dedupe: ['svelte']
			})
		]
	});

	// Client side component
	rollupConfigs.push({
		input: path.join(pagesDir, filename),
		output: {
			// We use esm to be able to import the component client-side
			// eg: import Home from 'public/Home.js';
			// Note that old browsers don't support modules
			// https://caniuse.com/#feat=es6
			format: 'esm',
			dir: clientDir,
			// We add the hash to the filename so that whenever we update the site
			// our users with cached .js files will only need to download the newer ones
			// Note: that you cannot use the separator --- in your component filenames
			entryFileNames: '[name]---[hash].js'
		},
		plugins: [
			svelte({
				dev: false,
				emitCss: false,
				hydratable: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			terser()
		]
	});
});


export default rollupConfigs;