<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Hero from '$lib/components/home-page/hero/Hero.svelte';
	import Services from '$lib/components/home-page/services/Services.svelte';
	import StudyGroups from '$lib/components/home-page/study-groups/StudyGroups.svelte';
	import Reviews from '$lib/components/home-page/reviews/Reviews.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

	export let data;
</script>

<Navbar {data} />

<Hero />

<Services />

<StudyGroups />

<Reviews />

<Footer homePage />
