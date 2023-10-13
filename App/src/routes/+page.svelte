<script>
	import Navbar from '../components/navbar/Navbar.svelte';
	import Hero from '../components/home-page/hero/Hero.svelte';
	import Services from '../components/home-page/services/Services.svelte';
	import StudyGroups from '../components/home-page/study-groups/StudyGroups.svelte';
	import Reviews from '../components/home-page/reviews/Reviews.svelte';
	import Footer from '../components/footer/Footer.svelte';

	export let data;
</script>

<Navbar {data} />

<Hero />

<Services />

<StudyGroups />

<Reviews />

<Footer homePage />