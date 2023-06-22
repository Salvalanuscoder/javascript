//botones de siguiente y anterior
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas()
    }
});

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas()
    }
});


//fetch codigop de API tmdb
const cargarPeliculas = async () => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0d50393c104b03d18fd8407132ecd14a&language=es-MX&page=${pagina}`);

        console.log(respuesta);

        //si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            //parte visual, el poster de las pelis y los titulos
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster"  src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                

            <div class="info-product">
            <h3 class="titulo">${pelicula.title}</h3>
            <p class="precio">$200</p>
           
            <div class="icon-addCart"><img src="./recursos/add.png" alt="addcart.png">
            </div>
            </div>
            </div>
            `
            });

            document.getElementById('contenedor').innerHTML = peliculas;

            /*errores de poner mal codigos o peliculas-->
            cod 200 esta OK
            COD 401 es un error de codigo, osea de peticion 
            COD 401 es un error de codigo
            COD 404 es un error de busqueda, ej no existe lo que buscas por que lo copiaste mal, o etc.*/

        } else if (respuesta.status === 401) {
            console.log('pusiste mal la llave');
        } else if (respuesta.status === 404) {
            console.log('la pelicula que buscas no existe')
        } else {
            console.log('hubo un error y no sabemos que paso');
        }

    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();




