<script>
	export let src, text;
</script>

<div class="service">
	<div class="service-image gradient-light">
		<img {src} alt="" />
	</div>
	<div class="service-text">
		<p>{text}</p>
	</div>
</div>

<style>
	.service {
		position: relative;
		display: flex;
		flex-direction: column;
		max-width: min(250px, 90%);
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
		padding: 1rem 2rem;
	}

	.service-image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: min(110px, 80%);
		aspect-ratio: 1;
		border-radius: 10000px;
	}

	.service-image > img {
		width: min(50px, 50%);
	}

	.service-text {
		flex: 2;
		font-size: min(16px, calc(0.85rem + 0.5vw));
		color: var(--bs-primary-dark);
		opacity: 0.75;
	}
</style>
