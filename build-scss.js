const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const rimraf = require('rimraf');

const outputDir = path.join(__dirname, 'server/public/css/global');

rimraf.sync(outputDir);
fs.mkdirSync(outputDir);

sass.render({
	file: path.join(__dirname,'scss/index.scss'),
	outputStyle: 'compressed'
}, function(err, result) {
	const css = result.css.toString();
	const hash = crypto.createHash('md5').update(css).digest("hex");
	const outputPath = path.join(outputDir, `styles---${hash}.css`);
	fs.writeFileSync(outputPath, css, 'utf-8');
	console.log('SCSS done!');
});