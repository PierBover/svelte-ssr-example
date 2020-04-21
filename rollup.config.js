const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const rimraf = require('rimraf');
const svelte = require('rollup-plugin-svelte');
const resolve = require('@rollup/plugin-node-resolve');
const {terser} = require('rollup-plugin-terser');
const del = require('rollup-plugin-delete');
const virtual = require('@rollup/plugin-virtual');
const scss = require('rollup-plugin-scss');

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
const ssrDir = path.join(__dirname, 'server/ssr');
const staticJsPagesDir = path.join(__dirname, 'server/static/js/pages');
const staticCssPagesDir = path.join(__dirname, 'server/static/css/pages');
const staticCssGlobalDir = path.join(__dirname, 'server/static/css/global');

// Delete the target directory in case there is some garbage left
// from last dev session
rimraf.sync(ssrDir);
rimraf.sync(staticJsPagesDir);
rimraf.sync(staticCssPagesDir);
rimraf.sync(staticCssGlobalDir);

fs.mkdirSync(staticCssGlobalDir);

// For each page component we generate 2 rollup outputs:
// 1. CommonJS module for doing SSR on Node
// 2. JS file for for using client-side and hydrating the SSR'd markup
const rollupConfigs = [];

const pagesComponentsFiles = fs.readdirSync(pagesComponentsDir);

// SSR
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

rollupConfigs.push(ssrConfig);

// Client entry points

const clientSideConfigs = pagesComponentsFiles.map(filename => {

	const name = filename.replace('.svelte', '');

	const code = `
		import ${name} from '${path.join(pagesComponentsDir, filename)}';

		new ${name}({
			target: document.body,
			hydrate: true,
			props: SERVER_DATA
		});
	`;

	return {
		code,
		name
	}
});

// For the client JS we need to pass Rollup an array since it doesn't support
// an entry object for IIFE format

clientSideConfigs.forEach((config) => {
	rollupConfigs.push({
		input: config.name,
		output: {
			format: 'iife',
			dir: staticJsPagesDir,
			// We add the hash to the filename so that whenever we update the site
			// our users with cached .js files will only need to download the newer ones
			// Note: that you cannot use the separator --- in your component filenames!
			entryFileNames: config.name + '---[hash].js'
		},
		plugins: [
			virtual({
				[config.name]: config.code
			}),
			svelte({
				dev: false,
				css: (css) => {
					const hash = crypto.createHash('md5').update(css.code).digest("hex");
					css.write(path.join(staticCssPagesDir, `${config.name}---${hash}.css`), false);
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
				targets: path.join(staticJsPagesDir, config.name + '*')
			})
		]
	});
});

// SCSS

const scssConfig = {
	input: 'scssVirtual',
	output: {
		file: './scss.js'
	},
	onwarn: (warning) => {
		if (warning.code !== 'EMPTY_BUNDLE') console.log(warning.message);
	},
	plugins: [
		virtual({
			scssVirtual: `import '${path.join(__dirname,'scss/index.scss')}';`
		}),
		scss({
			output (styles) {
				const hash = crypto.createHash('md5').update(styles).digest("hex");
				const outputPath = path.join(staticCssGlobalDir, `styles---${hash}.css`);
				fs.writeFileSync(outputPath, styles, 'utf-8');
			},
			watch: path.join(__dirname,'scss')
		}),
		del({
			targets: './scss.js',
			hook: 'buildEnd'
		})
	]
}

rollupConfigs.push(scssConfig);

module.exports = rollupConfigs;