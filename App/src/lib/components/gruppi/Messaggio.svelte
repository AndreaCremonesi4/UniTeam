<script>
	import { convertiDataMessaggio } from '../../controller/utilities';

	export let messaggio;
	export let isMittente;

	let profilo = messaggio.profiles;

	let media;
	if (messaggio?.media) {
		media = typeof messaggio.media === 'string' ? JSON.parse(messaggio.media) : messaggio.media;
	}
</script>

<div class="row {isMittente ? 'flex-row-reverse' : 'flex-row'} my-2 gap-2">
	<div class=" d-flex col-md-auto col-auto {isMittente ? 'justify-content-end' : ''}">
		<img src={profilo.profile_photo} class="img-fluid rounded-circle profile-picture" alt="" />
	</div>

	<div class="col-md-auto col-12 border rounded-1 px-3 py-2 {isMittente ? 'bg-light' : ''}">
		<p class="fw-bold mb-2">{isMittente ? 'Tu' : profilo.username}</p>
		{#if media}
			<a href={media?.publicUrl} target="_blank">{media?.filename}</a>
		{/if}
		<p class="mb-1">{messaggio.testo}</p>
		<p class="fw-light opacity-50 mb-1">{convertiDataMessaggio(messaggio.data)}</p>
	</div>
</div>

<style>
	.profile-picture {
		width: 50px;
		max-height: 50px;
	}
</style>
