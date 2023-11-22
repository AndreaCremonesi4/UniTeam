<script>
	export let session;
	export let profilo;
	export let gruppo;
</script>

<div class="d-flex align-items-center mb-2 {$$props.class}">
	<img
		class="rounded-circle"
		style="max-width: min(40px, 10vw);"
		src={profilo?.profile_photo}
		alt=""
	/>
	<p class="ms-2 mb-0 fw-normal">
		{session && session.user.id === profilo.id ? 'Tu' : profilo.username}
		{#if profilo.id === gruppo.proprietario}
			<em> (Proprietario)</em>
		{/if}
	</p>
</div>
