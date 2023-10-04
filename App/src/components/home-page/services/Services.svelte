<script>
	import ServiceItem from "./ServiceItem.svelte";

</script>
<section class="container">
	<h2 class="text-title text-center display-6 text-dark mb-5">I Nostri Servizi</h2>
	<div class="list-services my-5">
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
	</div>
</section>


<style>
	.list-services {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
