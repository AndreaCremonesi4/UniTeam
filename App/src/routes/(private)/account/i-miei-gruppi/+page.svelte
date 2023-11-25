<script>
	import Navbar from '../../../../lib/components/navbar/Navbar.svelte';
	import Footer from '../../../../lib/components/footer/Footer.svelte';
	import Tabs from '../../../../lib/components/tabs/Tabs.svelte';
	import ListaGruppi from '../../../../lib/components/profilo/ListaGruppi.svelte';
	import {
		getGruppiUtenteIscritto,
		getGruppiUtenteProprietario
	} from '../../../../lib/controller/profilo';

	export let data;
	let isLoading;

	let { supabase, session, gruppiProprietario, gruppiIscritto, pageSize } = data;
	$: ({ supabase, session, gruppiProprietario, gruppiIscritto, pageSize } = data);

	async function caricaAltriGruppiProprietario(event) {
		const { data: altriGruppi, error } = await getGruppiUtenteProprietario(
			supabase,
			session?.user?.id,
			{
				min: gruppiProprietario.length,
				max: gruppiProprietario.length + pageSize
			}
		);

		if (error) return window.alert(error);

		if (altriGruppi.length === 0) {
			event.target.setAttribute('style', 'display:none !important;');
		} else {
			gruppiProprietario = [...gruppiProprietario, ...altriGruppi];
		}
	}

	async function caricaAltriGruppiIscritto(event) {
		const { data: altriGruppi, error } = await getGruppiUtenteIscritto(
			supabase,
			session?.user?.id,
			{
				min: gruppiIscritto.length,
				max: gruppiIscritto.length + pageSize
			}
		);

		if (error) return window.alert(error);

		if (altriGruppi.length === 0) {
			event.target.setAttribute('style', 'display:none !important;');
		} else {
			gruppiIscritto = [...gruppiIscritto, ...altriGruppi];
		}
	}
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<h1 class="mb-4">I miei Gruppi</h1>

		<Tabs labels={['I Miei Gruppi', 'Altri Gruppi']}>
			<ListaGruppi gruppi={gruppiProprietario} caricaAltro={caricaAltriGruppiProprietario}>
				<span slot="noResults">Non hai creato nessun gruppo</span>
			</ListaGruppi>
			<ListaGruppi
				gruppi={gruppiIscritto.map((gruppo) => {
					return gruppo.gruppi;
				})}
				caricaAltro={caricaAltriGruppiIscritto}
			/>
		</Tabs>
	</div>
</section>

<Footer />
