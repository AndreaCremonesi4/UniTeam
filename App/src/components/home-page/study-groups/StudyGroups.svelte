<script>
	import blob from '$lib/assets/images/blob.svg';
	import gruppiStudio from '$lib/assets/images/gruppi-studio.png'
</script>

<section class="radial-gradient">
	<div class="container">
		<div class="row justify-content-center align-items-center gap-5">
			<div class="col text-center">
				<div class="image-container">
					<img class="blob" src={blob} alt="" />
					<img class="image" src={gruppiStudio} alt="" />
				</div>
			</div>

			<div class="col text-center text-white">
				<h2 class="text-title">Gruppi Studio</h2>
				<p class="text-body-white">
					Crea gruppi di studio dedicati ai tuoi corsi preferiti o ai tuoi interessi. Collabora in
					modo efficiente con i tuoi colleghi studenti utilizzando la nostra chat in tempo reale.
				</p>
				<a href="/gruppi" class="btn btn-secondary sub-header mt-3">Entra</a>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: 15rem 0rem;
	}

	.image-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.blob {
		width: min(425px, 80vw);
	}

	.image {
		position: absolute;
		width: min(550px, 90vw);
	}

	@media (max-width: 992px) {
		section {
			padding: 8rem 0rem;
		}

		.row {
			flex-direction: column;
			gap: 4rem;
		}
	}
</style>
