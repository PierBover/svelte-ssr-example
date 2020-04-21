import Page from '../components/pages/Fruits.svelte';

new Page({
	target: document.body,
	hydrate: true,
	props: SERVER_DATA
});