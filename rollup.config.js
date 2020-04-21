const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const rimraf = require('rimraf');
const svelte = require('rollup-plugin-svelte');
const resolve = require('@rollup/plugin-node-resolve');
const {terser} = require('rollup-plugin-terser');
const del = require('rollup-plugin-delete');

// SCSS
const sveltePreprocess = require('svelte-preprocess');
const preprocess = sveltePreprocess({
	scss: {
		includePaths: ['./scss'],
	},
	postcss: {
		plugins: [require('autoprefixer')],
	}
});


const pagesComponentsDir = path.join(__dirname, 'components/pages');

// Since Rollup doesn't accept a string as code we need to create
// each entry point on '/client-entrypoints'
const entryPointsDir = path.join(__dirname, 'client-entrypoints');

const ssrDir = path.join(__dirname, 'server/ssr');
const clientJsPagesDir = path.join(__dirname, 'server/public/js/pages');
const clientCssPagesDir = path.join(__dirname, 'server/public/css/pages');

// Delete the target directory in case there is some garbage left
// from last dev session
rimraf.sync(ssrDir);
rimraf.sync(clientJsPagesDir);
rimraf.sync(clientCssPagesDir);

// We generate 2 arrays of inputs for Rollup:
// 1. CommonJS module for doing SSR on Node
// 2. JS file for for using client-side and hydrating the SSR'd markup

// SSR
const pagesComponentsFiles = fs.readdirSync(pagesComponentsDir);
const ssrInputs = pagesComponentsFiles.map(filename => path.join(pagesComponentsDir, filename));

const ssrConfig = {
	input: ssrInputs,
	output: {
		format: 'cjs',
		dir: ssrDir,
		entryFileNames: '[name].js'
	},
	plugins: [
		svelte({
			// Svelte compiler options:
			// https://svelte.dev/docs#Compile_time
			dev: false,
			immutable: true,
			generate: 'ssr',
			hydratable: true,
			preprocess
		}),
		resolve({
			dedupe: ['svelte']
		})
	]
};

const rollupConfigs = [ssrConfig];

// Client entry points
const entrypointsFiles = fs.readdirSync(entryPointsDir);
const clientSideInputs = entrypointsFiles.map(filename => {
	return {
		input: path.join(entryPointsDir, filename),
		name: filename.replace('.js', '')
	}
});

clientSideInputs.forEach((entry) => {
	rollupConfigs.push({
		input: entry.input,
		output: {
			format: 'iife',
			dir: clientJsPagesDir,
			// We add the hash to the filename so that whenever we update the site
			// our users with cached .js files will only need to download the newer ones
			// Note: that you cannot use the separator --- in your component filenames!
			entryFileNames: '[name]---[hash].js'
		},
		plugins: [
			svelte({
				dev: false,
				css: (css) => {
					const hash = crypto.createHash('md5').update(css.code).digest("hex");
					css.write(path.join(clientCssPagesDir, `${entry.name}---${hash}.css`), false);
				},
				hydratable: true,
				preprocess
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			terser(),
			// We need to delete the previous file, otherwise we will end up with multiple
			// files with different hashes during dev
			del({
				targets: path.join(clientJsPagesDir, entry.name + '*')
			})
		]
	});
});


module.exports = rollupConfigs;