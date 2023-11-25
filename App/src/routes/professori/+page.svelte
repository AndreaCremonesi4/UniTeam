<script>
	import { getProfessoriWithCount } from '../../lib/controller/professori';

	import Navbar from '../../lib/components/navbar/Navbar.svelte';
	import Footer from '../../lib/components/footer/Footer.svelte';
	import GridLayout from '../../lib/components/layout/GridLayout.svelte';
	import PageSelector from '../../lib/components/layout/PageSelector.svelte';
	import FiltriProfessori from '../../lib/components/professori/FiltriProfessori.svelte';
	import SchedaProfessore from '../../lib/components/professori/SchedaProfessore.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let pageSize = 21;
	let page;
	let pageCount;

	let professoriData;
	let filtri = {};

	async function fetchData() {
		return getProfessoriWithCount(
			supabase,
			filtri.inputNome,
			filtri.inputRuolo,
			filtri.inputStruttura,
			page,
			pageSize
		);
	}

	async function updateData() {
		page = 0;
		professoriData = await fetchData();
		pageCount = Math.round(professoriData.count / pageSize);
	}

	async function changePage(e) {
		page = e.detail.page;
		professoriData = fetchData();
	}

	function filter(e) {
		filtri = { ...e.detail };
		updateData();
	}

	professoriData = updateData();
</script>

<Navbar {data} />

<section>
	<div class="container">
		<h1 class="text-title text-dark">Professori</h1>

		<FiltriProfessori on:changeFilters={filter} {data} />

		<PageSelector {page} {pageCount} on:pageChange={changePage} />

		{#await professoriData}
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Caricamento...</span>
			</div>
		{:then professori}
			{#if professori && professori.data && professori.data.length > 0}
				<GridLayout items={professori.data} let:prop={item} component={SchedaProfessore} />
			{:else}
				<h3 class="fw-normal mt-4">Nessun Risultato</h3>
			{/if}
		{/await}

		<PageSelector class="mt-3" {page} {pageCount} on:pageChange={changePage} />
	</div>
</section>

<Footer />
