<script>
	import Navbar from "../../../components/navbar/Navbar.svelte";

    export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Navbar {data}/>

<section>
	<div class="container">
		<h1>Professori</h1>
	</div>
</section>
