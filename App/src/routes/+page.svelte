<script>
	import Navbar from '../components/navbar/Navbar.svelte';

	import Konva from 'konva';
	const circle = new Konva.Circle({
		x: x,
		y: y,
		radius: r,
		fill: fill,
		stroke: stroke,
		strokeWidth: strokeWidth
	});
</script>

<Navbar />

<section class="container-sm" style="margin-top: 8rem;">
	<div class="hero">
		<div class="hero-body">
			<h1 class="text-gradient-reverse main-header">La Tua Community Universitaria Online</h1>
			<p class="text-body">
				Recensisci Corsi e Professori, Collabora in Gruppi di Studio, e Comunica in Tempo Reale con
				Altri Studenti Universitari
			</p>
			<button
				class="btn btn-primary btt-gradient-reverse sub-header mt-2"
				style="padding: 1.15rem 3rem; box-shadow: 2px 5px 10px 0px rgba(28, 53, 93, 0.30);"
				>Unisciti Ora!</button
			>
		</div>

		<img class="hero-img" src="assets/images/hero.png" alt="" />
	</div>

	<div class="row justify-content-center align-items-center sub-header my-5">
		<div class="col text-center">
			<p class="text-title mb-3 text-center sub-header">Scopri di più</p>
			<img src="assets/icons/arrow-down.svg" style="height:40px;" alt="" />
		</div>
	</div>
</section>

<section class="container">
	<h2 class="fw-bolder text-center display-6 text-dark">I Nostri Servizi</h2>
	<div class="icons">
		<div class="row justify-content-center align-items-center sub-header g-1 mx-4 my-5">
			<div class="col">
				<img class="icon" src="assets/icons/reviews.png" alt="" />
			</div>
			<div class="col">
				<img class="icon" src="assets/icons/chat.png" alt="" />
			</div>
			<div class="col">
				<img class="icon" src="assets/icons/people.png" alt="" />
			</div>
			<div class="col">
				<img class="icon" src="assets/icons/link.png" alt="" />
			</div>
		</div>
	</div>
</section>

<div class="circle">
	<Circle x="100" y="100" r="23" fill="red" strokeWidth="3" />
	<Circle x="200" y="200" r="13" fill="green" strokeWidth="3" />
</div>
