<script>
	import StarRating from './StarRating.svelte';

	export let data;

	let data_modifica = new Date(data.data_modifica).toLocaleDateString();
</script>

<div class="review p-3">
	<div class="d-flex flex-wrap mb-4 align-items-center">
		<p class="sub-header mb-0">{data.profiles.username}</p>
		<StarRating class="ms-2" value={data.valutazione} readOnly />
	</div>
	<p class="text-body d-flex align-items-baseline">
		{data.descrizione}
	</p>
	<p class="review-data text-body mt-3">{data_modifica}</p>
</div>

<style>
	.review {
		border: 0.9px solid rgb(199, 200, 201);

		border-radius: 7px;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
	}
</style>
