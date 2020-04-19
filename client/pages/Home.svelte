<script>
	import {onMount} from 'svelte';
	import Menu from '../components/Menu.svelte';
	export let dateString;

	onMount(() => {
		setInterval(() => {
			dateString = (new Date()).toString() + ' Client-side rendered!';
		}, 1000);
	});
</script>

<Menu/>

<h1>Home</h1>

<div>{dateString}</div>

<style>
	h1 {
		margin: 2rem 0;
	}
</style>