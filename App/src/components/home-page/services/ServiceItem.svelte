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
		display: flex;
		flex-direction: column;
		max-width: min(250px, 90%);
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
	}

	.service-image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 110px;
		aspect-ratio: 1;
		border-radius: 10000px;
	}

	.service-image > img {
		width: min(50px, 50vw);
	}

	.service-text {
		margin-bottom: 1rem;
	}
</style>
