<script>
	import { onMount } from 'svelte';

	export let modal;
	export let id;

	let thisModal;

	onMount(() => {
		modal = new bootstrap.Modal(thisModal);
	});
</script>

<div bind:this={thisModal} {id} class="modal fade" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="staticBackdropLabel"><slot name="title" /></h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<slot name="body" />
			</div>
		</div>
	</div>
</div>
