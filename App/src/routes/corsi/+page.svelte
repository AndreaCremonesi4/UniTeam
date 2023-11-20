<script>
	import { getCorsiWithCount } from '../../lib/controller/corsi';

	import Navbar from '../../lib/components/navbar/Navbar.svelte';
	import Footer from '../../lib/components/footer/Footer.svelte';
	import SchedaCorso from '../../lib/components/corsi/SchedaCorso.svelte';
	import FiltriCorsi from '../../lib/components/corsi/FiltriCorsi.svelte';
	import GridLayout from '../../lib/components/layout/GridLayout.svelte';
	import PageSelector from '../../lib/components/layout/PageSelector.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let pageSize = 21;
	let page;
	let pageCount;

	let corsiData = {};
	let filtri = {};

	async function fetchData() {
		return getCorsiWithCount(
			supabase,
			filtri.inputNome,
			filtri.inputAnno,
			filtri.inputFacolta,
			page,
			pageSize
		);
	}

	async function updateData() {
		page = 0;
		corsiData = await fetchData();
		pageCount = Math.round(corsiData.count / pageSize);
	}

	function changePage(e) {
		page = e.detail.page;
		corsiData = fetchData();
	}

	function filter(e) {
		filtri = { ...e.detail };
		updateData();
	}

	corsiData = updateData();
</script>

<Navbar {data} />

<section>
	<div class="container">
		<h1 class="text-title">Corsi</h1>

		<FiltriCorsi on:changeFilters={filter} {supabase} />

		<PageSelector {page} {pageCount} on:pageChange={changePage} />

		{#await corsiData}
			<p>Caricamento...</p>
		{:then corsi}
			{#if corsi && corsi.data && corsi.data.length > 0}
				<GridLayout items={corsi.data} let:prop={item} component={SchedaCorso} />
			{:else}
				<h3 class="fw-normal mt-4">Nessun Risultato</h3>
			{/if}
		{/await}

		<PageSelector class="mt-3" {page} {pageCount} on:pageChange={changePage} />
	</div>
</section>

<Footer />
