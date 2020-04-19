const fs = require('fs');
const path = require('path');

// init
const fastify = require('fastify')({
	ignoreTrailingSlash: true,
	logger: true
});

fastify.register(require('fastify-static'), {
	root: path.join(__dirname, 'public'),
	prefix: '/public/'
});

fastify.route({
	method: 'GET',
	url: '/',
	handler: (request, reply) => {

		const props = {
			fruits: [
				{name: 'Mango'},
				{name: 'Apple'},
				{name: 'Banana'}
			]
		};

		const {render} = require('./ssr/Fruits.js');
		const {html, css, head } = render(props);

		reply.headers({
			'Content-Type': 'text/html'
		});

		reply.send(`
			<html>
				<head>
					<style>${css.code}</style>
					${head}
					<script type='module'>
						import Fruits from '/public/Fruits.js';

						new Fruits({
							target: document.body,
							hydrate: true,
							props: ${JSON.stringify(props)}
						});
					</script>
				</head>
				<body>
					${html}
				</body>
			</html>
		`)
	}
})

fastify.listen('8888', function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
});