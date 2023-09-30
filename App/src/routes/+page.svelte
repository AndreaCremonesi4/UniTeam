<script>
	import ServiceItem from './../components/home-page/services/ServiceItem.svelte';
	import ServiceList from '../components/home-page/services/ServiceList.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import Hero from '../components/home-page/hero/Hero.svelte';
</script>

<Navbar />

<section class="container-sm" style="margin-top: 8rem;">
	<Hero />

	<div class="row justify-content-center align-items-center sub-header mb-5 py-md-5 py-sm-3">
		<div class="col text-center">
			<p class="mb-3 text-center sub-header">Scopri di più</p>
			<img src="assets/icons/arrow-down.svg" style="height:40px;" alt="" />
		</div>
	</div>
</section>

<section class="container">
	<h2 class="text-title text-center display-6 text-dark mb-5">I Nostri Servizi</h2>
	<ServiceList>
		<ServiceItem
			src="assets/icons/reviews.png"
			text="Recensioni imparziali e dettagliate per fare scelte informate"
		/>

		<ServiceItem
			src="assets/icons/chat.png"
			text="Chat in tempo reale per la collaborazione efficace"
		/>

		<ServiceItem
			src="assets/icons/people.png"
			text="Crea e gestisci facilmente i tuoi gruppi studio"
		/>

		<ServiceItem
			src="assets/icons/link.png"
			text="Connettiti con studenti universitari simili a te"
		/>
	</ServiceList>
</section>
