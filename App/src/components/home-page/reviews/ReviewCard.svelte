<script>
    export let icon, title, description, href;
</script>

<div class="card">
    <div class="icon">
        <img src={icon} alt="">
    </div>
    <div>
        <h2 class="text-subtitle text-dark mb-1">{title}</h2>
        <p class="text-body mb-5">{description}</p>
    </div>
    <a class="btn btn-secondary sub-header" {href}>Scopri</a>
</div>

<style>
    .card{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
        
        width: min(350px, 90vw);
        
        border-radius: 20px;

        padding: 4.5rem 1rem 2.5rem 1rem;
        margin-bottom: 3rem;
    }

    .icon{
        display: flex;
        align-items: center;
        justify-content: center;

        
        position: absolute;
        width: min(100px, 50%);
        aspect-ratio: 1;
        background-color: white;
        border-radius: 1000px;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);

        top: max(-50px, -25%);
    }

    .icon > img{
        width: 60%;
    }

    a{
        justify-self: flex-end;
    }

    /*.card::after,
    .card::before{
        content: '';
        position: absolute;
        border-radius: 1000px;
        aspect-ratio: 1/1;
    }

    .card::before{
        width:min(115px, 42%);
        top: calc(-3rem - 10px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25) inset;

        z-index: 1;

        clip-path: polygon(0% 48%, 100% 48%, 100% 100%, 0% 100%);
    }

    .card::after{
        width:min(95px, 35%);
        top:-3rem;
        background-color: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.25),
                    0 0 0 10px white;
    }*/
</style>