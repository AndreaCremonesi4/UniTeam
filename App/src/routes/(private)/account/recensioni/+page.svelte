<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Navbar {data} />
<section>
	<div class="container d-flex flex-column align-items-center text-center">
		<img
			src={data.session.user.user_metadata.profile_photo}
			class="user-avatar rounded-circle image-fluid"
			alt="Responsive"
		/>
		<h1>Le tue recensioni</h1>
	</div>
</section>

<style>
	.user-avatar {
		width: min(60vw, 150px);
	}
</style>
