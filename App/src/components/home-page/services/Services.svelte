<script>
	import ServiceItem from "./ServiceItem.svelte";

	import reviews from '$lib/assets/icons/reviews.png';
	import chat from '$lib/assets/icons/chat.png';
	import people from '$lib/assets/icons/people.png';
	import link from '$lib/assets/icons/link.png';
</script>
<section class="container">
	<h2 class="text-title text-center display-6 text-dark mb-5">I Nostri Servizi</h2>
	<div class="list-services my-5">
		<ServiceItem
			src={reviews}
			text="Recensioni imparziali e dettagliate per fare scelte informate"
		/>

		<ServiceItem
			src={chat}
			text="Chat in tempo reale per la collaborazione efficace"
		/>

		<ServiceItem
			src={people}
			text="Crea e gestisci facilmente i tuoi gruppi studio"
		/>

		<ServiceItem
			src={link}
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
