<script>
	import StarRating from '../reviews/StarRating.svelte';
	import userIcon from '$lib/assets/icons/User.png';

	export let item;
</script>

<a class="px-3 scheda text-black d-flex" href="/professori/{item.id}">
	<div class="row">
		<div class="col-4 d-flex justify-content-center align-items-start">
			<img class="mt-3 img-fluid rounded-circle" src={item.immagine ?? userIcon} alt="" />
		</div>
		<div class="col-8">
			<p class="mb-1 mt-3 lh-sm text-black-50"><em>{item.ruolo}</em></p>
			<h1 class="mb-1 sub-header fw-semibold">
				{item.nome}
			</h1>
			<p class="mb-2 lh-sm">
				{item.struttura}
			</p>
			{#if item.email}
				<p class="mb-0">
					<a class="text-break" href="mailto:{item.email}">{item.email}</a>
				</p>
			{/if}

			<StarRating
				class="mb-2"
				showLabel={false}
				readOnly={true}
				value={Math.round(item.valutazione_media)}
			/>
		</div>
	</div>
</a>
