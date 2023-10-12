<script>
	import ServiceItem from './../components/home-page/services/ServiceItem.svelte';
	import Services from '../components/home-page/services/Services.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import Hero from '../components/home-page/hero/Hero.svelte';
	import StudyGroups from '../components/home-page/study-groups/StudyGroups.svelte';
	import Reviews from '../components/home-page/reviews/Reviews.svelte';
	import Footer from '../components/footer/Footer.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Navbar {data} />

<Hero />

{#if data.session}
	<button on:click={() => data.supabase.auth.signOut()} style="z-index:1000">Logout</button>
{/if}

<Services />

<StudyGroups />

<Reviews />

<Footer homePage />
