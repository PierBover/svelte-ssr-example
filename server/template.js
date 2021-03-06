const path = require('path');
const fs = require('fs');

const dev = process.env.DEV === 'true';

const ssrModulesDir = path.resolve(__dirname, 'ssr');
const jsPagesDir = path.resolve(__dirname, 'static/js/pages');
const cssPagesDir = path.resolve(__dirname, 'static/css/pages');
const cssGlobalDir = path.resolve(__dirname, 'static/css/global');

// Since our components have hashes
// eg: public/js/pages/Home---8f58e2d9.js
// we need to figure out its filenames beforehand when running the server
// and load the filenames to memory

const componentsJsFiles = {};
const componentsCssFiles = {};
let globalCssFiles;
let ssrModules = {};

// preload stuff when not doing dev
if (!dev) {
	// get the client-side js files
	fs.readdirSync(jsPagesDir).forEach((filename) => {
		const componentName = filename.split('---')[0];
		componentsJsFiles[componentName] = filename;
	});

	// get the css files for the pages
	fs.readdirSync(cssPagesDir).forEach((filename) => {
		const componentName = filename.split('---')[0];
		componentsCssFiles[componentName] = filename;
	});

	// get the global css files
	globalCssFiles = fs.readdirSync(cssGlobalDir).map(filename => filename);

	// get the ssr modules
	fs.readdirSync(ssrModulesDir).forEach((filename) => {
		const componentName = filename.replace('.js', '');
		ssrModules[componentName] = require(`./ssr/${filename}`);
	});
}


module.exports = (page, data) => {

	let ssrModule;

	if (dev) {
		ssrModule = require(`./ssr/${page}.js`);
	} else {
		ssrModule = ssrModules[page];
	}

	// 'html' is the SSR'd markup
	// 'head' are some tags that go into the <head> so that Svelte can do hydration
	// render() also returns 'css' but we don't need it here since Rollup has already
	// generated the css files
	const {html, head } = ssrModule.render(data);
	let jsonData = data ? JSON.stringify(data) : '""';
	let jsFilename, cssFilename;

	// We only do this dynamically during dev since it's slower to read the disk
	// on every request
	if (dev) {
		// JS pages
		const jsFiles = fs.readdirSync(jsPagesDir);

		for (const filename of jsFiles) {
			if (filename.includes(page)) {
				jsFilename = filename;
				break;
			}
		}

		// CSS pages
		const cssFiles = fs.readdirSync(cssPagesDir);

		for (const filename of cssFiles) {
			if (filename.includes(page)) {
				cssFilename = filename;
				break;
			}
		}

		// CSS global
		globalCssFiles = fs.readdirSync(cssGlobalDir).map(filename => filename);
	} else {
		// When runnnig the server in prod we've already figured out the filenames
		// and we read those from memory
		jsFilename = componentsJsFiles[page];
		cssFilename = componentsCssFiles[page];
	}

	let globalCssLinkTags = globalCssFiles.map(filename => `<link rel="stylesheet" href="/css/global/${filename}" />`).join(' ');

	return `
		<html>
			<head>
				${globalCssLinkTags}
				<link rel="stylesheet" href="/css/pages/${cssFilename}" />
				${head}
				<script>
					const SERVER_DATA = ${jsonData};
				</script>
				<script defer src="/js/pages/${jsFilename}"></script>
			</head>
			<body>
				${html}
			</body>
		</html>
	`;
};