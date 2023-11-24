<script>
	import viewport from '../../controller/utilities';

	export let caricaAltro = () => {};
</script>

<div
	class="d-flex w-100 justify-content-center {$$props.class}"
	use:viewport
	on:enterViewport={caricaAltro}
>
	<div class="spinner-border text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>
