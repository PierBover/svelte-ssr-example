<script>
	import {onMount} from 'svelte';
	export let fruits;

	onMount(() => {
		console.log('mounted!');
	});
</script>

<h1>Hello Svelte SSR!</h1>

<ul>
	{#each fruits as fruit}
		<li>{fruit.name}</li>
	{/each}
</ul>

<style>
	h1 {
		font-family: sans-serif;
		color: tomato;
	}
</style>