<script>
    import hero from '$lib/assets/images/hero.png';
    import arrowDown from '$lib/assets/icons/arrow-down.svg';
</script>

<section class="container">
	<div class="hero">
        <div class="hero-body">
            <h1 class="text-gradient-reverse main-header">La Tua Community Universitaria Online</h1>
            <p class="text-body">
                Recensisci Corsi e Professori, Collabora in Gruppi di Studio, e Comunica in Tempo Reale con
                Altri Studenti Universitari
            </p>
            <a href="/registrazione" class="btn btn-primary btn-gradient-reverse sub-header mt-2">Unisciti Ora!</a>
        </div>
    
        <img class="hero-img" src={hero} alt="" />
    </div>

	<div class="row justify-content-center align-items-center sub-header">
		<div class="col text-center">
			<p class="mb-3 text-center sub-header">Scopri di più</p>
			<img src={arrowDown} style="height:40px;" alt="" />
		</div>
	</div>
</section>

<style>
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 15rem;
        margin-bottom: 11rem;
    }

    .hero-img {
        z-index: -1;
        width: 600px;
        position: absolute;
        right: 0;
    }

    .hero-body {
        width: min(600px, 70vw);
    }

    .btn{
        box-shadow: 2px 5px 10px 0px rgba(28, 53, 93, 0.30);
    }

    @media (max-width: 1200px) {
        .hero-body {
            width: 600px;
        }

        .hero-img {
            width: min(450px, 80vw);
        }
    }

    @media (max-width:992px) {
        .hero {
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 10rem;
            margin-bottom: 4rem;
        }

        .hero-body {
            width: 80vw;
            text-align: center;
            padding-bottom: 2rem;
        }

        .hero-img {
            position: relative;
            width: 95%;
        }
    }

    @media (max-width: 768px) {
        .hero {
            margin-top: 8rem;
        }
    }
</style>