<script>
	import Menu from '../Menu.svelte';
	export let fruits;
</script>

<Menu/>

<h1>Fruits</h1>

<ul>
	{#each fruits as fruit}
		<li>{fruit.name}</li>
	{/each}
</ul>

<style>
	h1 {
		margin: 2rem 0;
	}
</style>