<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Navbar {data} />

<section>
	<div class="container">
		<h1>Corsi</h1>
	</div>
</section>
