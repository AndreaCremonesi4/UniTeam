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

	async function mostraAltreRecensioniCorsi(event) {
		const { data: altreRecensioni, error } = await getRecensioniCorsi(supabase, data.profile.id, {
			min: recensioniCorsi.length,
			max: recensioniCorsi.length + pageSize
		});

		if (error) return window.alert(error);

		if (altreRecensioni.length === 0) {
			event.target.setAttribute('style', 'display:none !important;');
		} else {
			recensioniCorsi = [...recensioniCorsi, ...altreRecensioni];
		}
	}

	async function mostraAltreRecensioniProfessori(event) {
		const { data: altreRecensioni, error } = await getRecensioniProfessori(
			supabase,
			data.profile.id,
			{
				min: recensioniProfessori.length,
				max: recensioniProfessori.length + pageSize
			}
		);

		if (error) return window.alert(error);

		if (altreRecensioni.length === 0) {
			event.target.setAttribute('style', 'display:none !important;');
		} else {
			recensioniProfessori = [...recensioniProfessori, ...altreRecensioni];
		}
	}
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<h1 class="mb-4">Le mie recensioni</h1>

		<Tabs labels={['Corsi', 'Professori']}>
			<ListaRecensioni
				recensioni={recensioniCorsi}
				component={RecensioneCorsoUtente}
				showMore={mostraAltreRecensioniCorsi}
			/>
			<ListaRecensioni
				recensioni={recensioniProfessori}
				component={RecensioneProfessoreUtente}
				showMore={mostraAltreRecensioniProfessori}
			/>
		</Tabs>
	</div>
</section>
