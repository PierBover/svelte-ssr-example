import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';

export default [
	// SSR components
	{
		input: 'client/components/Fruits.svelte',
		output: {
			format: 'cjs',
			file: 'server/ssr/Fruits.js',
		},
		plugins: [
			svelte({
				dev: false,
				immutable: true,
				generate: 'ssr',
				hydratable: true
			}),
			resolve({
				dedupe: ['svelte']
			})
		]
	},
	// Client components
	{
		input: 'client/components/Fruits.svelte',
		output: {
			format: 'esm',
			file: 'server/public/Fruits.js'
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
			})
		]
	}
];