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

<style>
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 15rem;
        margin-bottom: 10rem;
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