<script>
	import ServiceItem from './ServiceItem.svelte';
</script>

<div class="list-services my-5">
	<slot />
</div>

<style>
	.list-services {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
