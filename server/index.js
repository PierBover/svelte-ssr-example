const fs = require('fs');
const path = require('path');
const template = require('./template.js');

const dev = process.env.DEV === 'true';

console.log('Starting server!');
console.log('Dev mode: ', dev);

// init
const fastify = require('fastify')({
	ignoreTrailingSlash: true,
	logger: true
});

fastify.register(require('fastify-compress'));

fastify.register(require('fastify-static'), {
	root: path.join(__dirname, 'static')
});

fastify.route({
	method: 'GET',
	url: '/',
	handler: (request, reply) => {
		reply.header('Content-Type', 'text/html');
		reply.send(template('Home', {
			dateString: (new Date()).toString() + ' Server-side rendered!'
		}));
	}
});

fastify.route({
	method: 'GET',
	url: '/fruits',
	handler: (request, reply) => {
		reply.header('Content-Type', 'text/html');
		reply.send(template('Fruits', {
			fruits: [
				{name: 'Mango'},
				{name: 'Apple'},
				{name: 'Banana'}
			]
		}));
	}
});

fastify.listen(process.env.PORT || '8888', '0.0.0.0', function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
});