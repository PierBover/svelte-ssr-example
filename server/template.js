const path = require('path');
const fs = require('fs');

// Since our components have hashes in their filenames
// eg: public/js/pages/Home.8f58e2d9.js
// We need to figure out its filenames beforehand

const pagesComponents = {};

fs.readdirSync(path.resolve(__dirname, 'public/js/pages')).forEach((filename) => {
	const componentName = filename.split('---')[0];
	pagesComponents[componentName] = filename;
});


module.exports = (page, data) => {

	const {render} = require(`./ssr/${page}.js`);

	// 'html' is the SSR'd markup
	// 'css' is the extracted CSS from the Svelte component and the child components
	// 'head' are some tags that go into the <head> so that Svelte can do hydration
	const {html, css, head } = render(data);

	let jsonData = data ? JSON.stringify(data) : '""';

	return `
		<html>
			<head>
				<style>${css.code}</style>
				${head}
				<script type='module'>
					import Page from '/js/pages/${pagesComponents[page]}';

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