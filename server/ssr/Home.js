'use strict';

var index = require('./index-f0425e65.js');
var Menu = require('./Menu-efbdefd4.js');

/* components/pages/Home.svelte generated by Svelte v3.20.1 */

const css = {
	code: "h1.svelte-jph6jc{margin:2rem 0}",
	map: "{\"version\":3,\"file\":\"Home.svelte\",\"sources\":[\"Home.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport {onMount} from 'svelte';\\n\\timport Menu from '../Menu.svelte';\\n\\texport let dateString;\\n\\n\\tonMount(() => {\\n\\t\\tsetInterval(() => {\\n\\t\\t\\tdateString = (new Date()).toString() + ' Client-side rendered!';\\n\\t\\t}, 1000);\\n\\t});\\n</script>\\n\\n<Menu/>\\n\\n<h1>Home</h1>\\n\\n<div>{dateString}</div>\\n\\n<style>\\nh1 {\\n\\tmargin: 2rem 0;\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZXMvSG9tZS5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0NBQ0MsY0FBYztBQUNmIiwiZmlsZSI6ImNvbXBvbmVudHMvcGFnZXMvSG9tZS5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJcbmgxIHtcblx0bWFyZ2luOiAycmVtIDA7XG59XG4iXX0= */</style>\"],\"names\":[],\"mappings\":\"AAmBA,EAAE,cAAC,CAAC,AACH,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC\"}"
};

const Home = index.create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { dateString } = $$props;

	index.onMount(() => {
		setInterval(
			() => {
				dateString = new Date().toString() + " Client-side rendered!";
			},
			1000
		);
	});

	if ($$props.dateString === void 0 && $$bindings.dateString && dateString !== void 0) $$bindings.dateString(dateString);
	$$result.css.add(css);

	return `${index.validate_component(Menu.Menu, "Menu").$$render($$result, {}, {}, {})}

<h1 class="${"svelte-jph6jc"}">Home</h1>

<div>${index.escape(dateString)}</div>`;
});

module.exports = Home;
