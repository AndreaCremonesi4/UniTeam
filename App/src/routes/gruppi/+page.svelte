<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import PageSelector from '../../lib/components/layout/PageSelector.svelte';
	import GridLayout from '../../lib/components/layout/GridLayout.svelte';
	import SchedaGruppo from '../../lib/components/gruppi/SchedaGruppo.svelte';
	import { getGruppiWithCount } from '../../lib/controller/gruppi';
	import FiltriGruppi from '../../lib/components/gruppi/FiltriGruppi.svelte';
	import FormGruppoModal from '../../lib/components/gruppi/FormGruppoModal.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let pageSize = 21;
	let page;
	let pageCount;

	let gruppiData;
	let filtri = {};

	gruppiData = updateData();

	async function fetchData() {
		return getGruppiWithCount(supabase, filtri.inputNome, filtri.inputVisibilita, page, pageSize);
	}

	async function updateData() {
		page = 0;
		gruppiData = await fetchData();
		pageCount = Math.round(gruppiData.count / pageSize);
	}

	async function changePage(e) {
		page = e.detail.page;
		gruppiData = fetchData();
	}

	function filter(e) {
		filtri = { ...e.detail };
		updateData();
	}
</script>

<Navbar {data} />

<section>
	<div class="container">
		<h1 class="text-title text-dark">Gruppi</h1>

		<FiltriGruppi on:changeFilters={filter} />

		<button
			class="btn btn-primary rounded-1 lh-1 py-2 px-4 d-flex align-items-center justify-content-center mt-2 mb-4"
			data-bs-toggle="modal"
			data-bs-target="#groupFormModal"
		>
			Crea un gruppo <i class="bi bi-plus fs-3" />
		</button>

		<FormGruppoModal {supabase} id="groupFormModal" />

		<PageSelector {page} {pageCount} on:pageChange={changePage} />

		{#await gruppiData}
			<p>Caricamento...</p>
		{:then gruppi}
			{#if gruppi && gruppi.data && gruppi.data.length > 0}
				<GridLayout items={gruppi.data} let:prop={item} component={SchedaGruppo} />
			{:else}
				<h3 class="fw-normal mt-4">Nessun Risultato</h3>
			{/if}
		{/await}

		<PageSelector class="mt-3" {page} {pageCount} on:pageChange={changePage} />
	</div>
</section>

<Footer />
