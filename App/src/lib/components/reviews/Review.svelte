<script>
	import StarRating from './StarRating.svelte';

	export let data;
</script>

<div class="review p-3">
	<div class="d-flex flex-wrap mb-4 align-items-center">
		<p class="sub-header mb-0">{data.username}</p>
		<StarRating class="ms-2" value={data.valutazione} readOnly />
	</div>
	<p class="text-body d-flex align-items-baseline">
		{data.descrizione}
	</p>
	<p class="review-data text-body mt-3">{data.data_modifica}</p>
</div>

<style>
	.review {
		border: 0.9px solid rgb(199, 200, 201);

		border-radius: 7px;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
	}
</style>
