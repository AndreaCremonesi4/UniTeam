<script>
	import { onMount } from 'svelte';

	export let modal;
	export let id;
	export let onConfirm = () => {};
	export let disabled;

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
			<div class="modal-footer">
				<button
					type="button"
					class="btn bg-black opacity-50 text-white rounded-1 py-2"
					data-bs-dismiss="modal"
					{disabled}
				>
					<slot name="reject-text">Annulla</slot>
				</button>
				<button
					type="button"
					class="btn btn-primary rounded-1 py-2"
					on:click={onConfirm}
					{disabled}
				>
					<slot name="confirm-text">Conferma</slot>
				</button>
			</div>
		</div>
	</div>
</div>
