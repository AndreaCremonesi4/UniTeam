<script>
	import ContactForm from './ContactForm.svelte';

	import topFooterImage from '$lib/assets/images/reviews-illustration.png';
	import footerImage from '$lib/assets/images/footer_image.png';

	export let homePage;
</script>

<footer>
	{#if homePage}
		<div class="d-flex align-items-center justify-content-center">
			<img class="illustration" src={topFooterImage} alt="" />
		</div>
	{/if}
	<section
		class="radial-gradient-reverse d-flex flex-column align-items-center justify-content-center"
	>
		{#if homePage}
			<div
				class="container-cta d-flex flex-column justify-content-center align-items-center text-center"
			>
				<h1 class="text-title text-white">
					Unisciti a UniTeam oggi stesso e inizia a sfruttare i vantaggi della nostra piattaforma
				</h1>
				<p class="text-body-white mb-5">
					La tua esperienza universitaria non è mai stata così coinvolgente e informativa.
				</p>
				<a href="/registrazione" class="btn btn-secondary sub-header">Unisciti Ora!</a>
			</div>
		{/if}

		<div class="container">
			<ContactForm />

			<div class="links text-body fw-semibold">
				<div>
					<a href="/" class="text-dark">Privacy Policy</a> -
					<a href="/" class="text-dark">Termini di Servizio</a>
				</div>
				<span class="mt-4 text-dark">©2023 UniTeam</span>
				<span class="text-dark">Tutti i diritti riservati</span>
			</div>
		</div>

		<img class="footer-image" src={footerImage} alt="" />
	</section>
</footer>

<style>
	footer {
		position: relative;
		margin-top: 0;
	}

	section {
		position: relative;
		margin-bottom: 0px;
		margin-top: 0;
		padding-top: 10rem;
		overflow: hidden;
	}

	.container {
		z-index: 1;
	}

	.container-cta {
		width: min(1000px, 95vw);
		margin: 0 0 10rem 0;
	}

	.footer-image {
		position: absolute;
		width: max(700px, min(1100px, 100vw));
		bottom: -5px;
		opacity: 0.5;
		mix-blend-mode: lighten;
		filter: grayscale(1);
		background-color: transparent;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		justify-self: flex-end;

		margin-top: 15rem;
		margin-bottom: 1rem;
	}

	.illustration {
		margin-top: -5rem;
		width: min(500px, 90vw);
	}

	@media (max-width: 768px) {
		section {
			padding-top: 8rem;
		}

		.container-cta {
			margin: 0 0 8rem 0;
		}

		.links {
			margin-top: 8rem;
		}
	}
</style>
