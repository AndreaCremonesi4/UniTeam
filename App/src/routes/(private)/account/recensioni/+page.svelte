<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { getRecensioniCorsi, getRecensioniProfessori } from '$lib/controller/profilo';
	import ListaRecensioni from '../../../../lib/components/profilo/ListaRecensioni.svelte';
	import RecensioneCorsoUtente from '../../../../lib/components/profilo/RecensioneCorsoUtente.svelte';
	import RecensioneProfessoreUtente from '../../../../lib/components/profilo/RecensioneProfessoreUtente.svelte';
	import Tabs from '../../../../lib/components/tabs/Tabs.svelte';

	export let data;
	let { supabase, recensioniCorsi, recensioniProfessori, pageSize } = data;
	$: ({ supabase, recensioniCorsi, recensioniProfessori, pageSize } = data);

	let rangeRecensioniCorsi;
	let rangeRecensioniProfessori;
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<h1 class="mb-4">Le mie recensioni</h1>

		<Tabs labels={['Corsi', 'Professori']}>
			<ListaRecensioni
				bind:range={rangeRecensioniCorsi}
				recensioni={recensioniCorsi}
				component={RecensioneCorsoUtente}
				{pageSize}
				showMore={() => {
					return getRecensioniCorsi(supabase, data.profile.id, rangeRecensioniCorsi);
				}}
			/>
			<ListaRecensioni
				bind:range={rangeRecensioniProfessori}
				recensioni={recensioniProfessori}
				component={RecensioneProfessoreUtente}
				{pageSize}
				showMore={() => {
					return getRecensioniProfessori(supabase, data.profile.id, rangeRecensioniProfessori);
				}}
			/>
		</Tabs>
	</div>
</section>
