<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import GridLayout from '../../lib/components/layout/GridLayout.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const pageSize = 20;
	var corsi = load();
	var page;
	var pageCount;

	let isFilterOpen = true;
	var inputNome = '';
	var inputAnno = '';
	var inputFacolta = '';

	async function fetchData() {
		const { data, count } = await supabase
			.from('corsi')
			.select('*', { count: 'exact' })
			.or(
				`nome.ilike.${inputNome ? `%${inputNome}%` : '%*%'},codice.ilike.${
					inputNome ? `%${inputNome}%` : '%*%'
				}`
			)
			.ilike('anno_full', inputAnno ? `%${inputAnno}%` : '%*%')
			.ilike('facolta', inputFacolta ? `%${inputFacolta}%` : '%*%')
			.range(page * pageSize, page * pageSize + pageSize)
			.order('nome', { ascending: true });
		return { data, count };
	}

	async function load() {
		page = 0;
		corsi = await fetchData();
		pageCount = Math.round(corsi.count / pageSize);
	}

	async function changePage(index) {
		page = index;
		corsi = fetchData();
	}

	async function getAnni() {
		const { data } = await supabase.rpc('get_distinct_values', {
			column_name: 'anno_full',
			table_name: 'corsi'
		});

		return data;
	}

	async function getFacolta() {
		const { data } = await supabase.rpc('get_distinct_values', {
			column_name: 'facolta',
			table_name: 'corsi'
		});

		return data;
	}

	function toggleFilters() {
		isFilterOpen = !isFilterOpen;
	}
</script>

<Navbar {data} />

<section>
	<div class="container">
		<h1 class="text-title">Corsi</h1>

		<div class="filter-wrapper {isFilterOpen ? 'open' : ''} ">
			<button class="show-filters-btn btn" on:click={toggleFilters}
				><i class="bi bi-funnel" />
				<i class="bi {isFilterOpen ? 'bi-chevron-down' : 'bi-chevron-up'}" /></button
			>
			<div class="filters my-2 d-flex gap-2 flex-wrap">
				<div style="max-width:400px">
					<span>Nome / Codice</span>
					<input
						type="text"
						bind:value={inputNome}
						on:input={() => {
							load();
						}}
						class="form-control"
					/>
				</div>

				<div>
					<span>Anno</span>
					<select
						class="form-select w-100"
						bind:value={inputAnno}
						on:change={() => {
							load();
						}}
					>
						<option value="">-</option>
						{#await getAnni() then data}
							{#each data as anno}
								{#if anno}
									<option value={anno}>{anno}</option>
								{/if}
							{/each}
						{/await}
					</select>
				</div>

				<div style="max-width: 500px">
					<span>Facoltà</span>
					<select
						class="form-select"
						bind:value={inputFacolta}
						on:change={() => {
							load();
						}}
					>
						<option value="">-</option>
						{#await getFacolta() then data}
							{#each data as facolta}
								<option value={facolta}>{facolta}</option>
							{/each}
						{/await}
					</select>
				</div>
			</div>
		</div>

		{#if pageCount}
			<nav>
				<ul class="pagination">
					<li class="page-item {page === 0 ? 'disabled' : ''}">
						<button
							class="page-link {page > 0 ? 'bg-primary text-white' : ''}"
							on:click={() => {
								changePage(page - 1);
							}}><i class="bi bi-chevron-left" /></button
						>
					</li>
					<div class="px-2 d-flex align-items-center">
						<select bind:value={page} on:change={changePage(page)} class="form-select">
							{#each Array.from(Array(pageCount).keys()) as i}
								<option value={i}>{i + 1}</option>
							{/each}
						</select>
					</div>

					<li class="page-item {page === pageCount - 1 ? 'disabled' : ''}">
						<button
							class="page-link {page < pageCount - 1 ? 'bg-primary text-white' : ''}"
							on:click={() => {
								changePage(page + 1);
							}}><i class="bi bi-chevron-right" /></button
						>
					</li>
				</ul>
			</nav>
		{/if}

		{#await corsi}
			<p>Caricamento...</p>
		{:then corsi}
			{#if corsi.data && corsi.data.length > 0}
				<GridLayout>
					{#each corsi.data as corso (corso.id)}
						<a class="px-3 scheda-corso text-black" href="/corso/{corso.id}">
							<p class="mb-0 mt-3"><em>{corso.codice}</em></p>
							<h1 class="mb-3 sub-header fw-semibold">
								{corso.nome} ({corso.crediti} CFU)
							</h1>
							<p class="mb-3">
								{corso.anno_full} - {corso.facolta}
							</p>
						</a>
					{/each}
				</GridLayout>
			{:else}
				<h3 class="fw-normal mt-4">Nessun Risultato</h3>
			{/if}
		{/await}
	</div>
</section>

<Footer />

<style>
	button:focus {
		outline: none;
		box-shadow: none;
	}

	.scheda-corso {
		border: 1px solid #c5c5c5;
		border-radius: 7px;
		text-decoration: none;

		transition: box-shadow 250ms ease-out, background-color 250ms ease-out;

		text-wrap: balance;
	}

	.scheda-corso:hover {
		background-color: rgba(0, 33, 85, 0.1);
		box-shadow: 0px 0px 10px rgba(0, 33, 85, 0.5);
	}

	.filter-wrapper {
		position: relative;
	}

	.show-filters-btn {
		display: none;
	}

	@media (max-width: 768px) {
		.filter-wrapper {
			z-index: 100;
			position: fixed;
			background-color: var(--bs-primary-dark);

			display: flex;
			align-items: center;
			padding: 1rem 1rem;
			inset: auto -1px 0 0;
			margin: 0 !important;

			color: white;

			transition: transform 250ms ease-in-out;
		}

		.filter-wrapper.open {
			transform: translateY(0);
		}

		.filter-wrapper {
			transform: translateY(100%);
		}

		.filters {
			max-height: min(50vh, 250px);
			overflow-y: scroll;
		}

		.filters > div {
			max-width: 100%;
			width: 100%;
		}

		.show-filters-btn {
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			transform: translateY(-99%);
			background: var(--bs-primary-dark);
			color: white;
			border-radius: 5px 5px 0 0;
		}
	}
</style>
