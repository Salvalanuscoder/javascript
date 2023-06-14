const btnCart = document.querySelector('.container-cart-icon');

const containerCartProducts = document.querySelector('.container-cart-products ');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

//lista de todos los contenedores de productos
const productsList = document.querySelector('.pelicula')

//variable de arreglo de productos
let allProducts = [];




    productsList.addEventListener('click', e => {

        console.log(e)
      
        
    })