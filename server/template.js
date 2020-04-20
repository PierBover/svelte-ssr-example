const path = require('path');
const fs = require('fs');

const dev = process.env.DEV === 'true';

const jsPagesDir = path.resolve(__dirname, 'public/js/pages');

// Since our components have hashes in their filenames
// eg: public/js/pages/Home.8f58e2d9.js
// We need to figure out its filenames beforehand when running the server
// and load them to memory

const componentsJsFiles = {};

if (!dev) {
	if (fs.existsSync(jsPagesDir)) {
		fs.readdirSync(jsPagesDir).forEach((filename) => {
			const componentName = filename.split('---')[0];
			componentsJsFiles[componentName] = filename;
		});
	}
}


module.exports = (page, data) => {

	const {render} = require(`./ssr/${page}.js`);

	// 'html' is the SSR'd markup
	// 'css' is the extracted CSS from the Svelte component and the child components
	// 'head' are some tags that go into the <head> so that Svelte can do hydration
	const {html, css, head } = render(data);

	let jsonData = data ? JSON.stringify(data) : '""';

	let jsFilename;

	// We only do this dynamically during dev since it's slow to read the disk
	// on every request
	if (dev) {
		const jsFiles = fs.readdirSync(jsPagesDir);

		for (const filename of jsFiles) {
			if (filename.includes(page)) {
				jsFilename = filename;
				break;
			}
		}
	} else {
		// When runnnig the server in prod we already have figured out the filenames
		// and we read those from memory
		jsFilename = componentsJsFiles[page];
	}

	return `
		<html>
			<head>
				<style>${css.code}</style>
				${head}
				<script type='module'>
					import Page from '/js/pages/${jsFilename}';

					new Page({
						target: document.body,
						hydrate: true,
						props: ${jsonData}
					});
				</script>
			</head>
			<body>
				${html}
			</body>
		</html>
	`;
};