import Page from '../components/pages/Home.svelte';

new Page({
	target: document.body,
	hydrate: true,
	props: SERVER_DATA
});