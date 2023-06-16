// const btnCart = document.querySelector('.container-cart-icon');
// const containerCartProducts = document.querySelector('.container-cart-products');
// const contadorProductos = document.getElementById('contador-productos');
// let totalProductos = 0;

// btnCart.addEventListener('click', () => {
//   containerCartProducts.classList.toggle('hidden-cart');
// });

// const cartProductContainer = document.querySelector('.container-cart-product');

// // Obtener el contenedor principal de las películas
// const moviesContainer = document.getElementById('contenedor');

// // Asignar el evento de clic al contenedor principal
// moviesContainer.addEventListener('click', (e) => {
//   // Verificar si el clic ocurrió en el botón "Añadir al carrito"
//   if (e.target.classList.contains('icon-addCart') || e.target.parentElement.classList.contains('icon-addCart')) {
//     // Obtener la película seleccionada
//     const peliculaElement = e.target.closest('.pelicula');
//     if (peliculaElement) {
//       const productTitle = peliculaElement.querySelector('.titulo');
//       if (productTitle) {
//         const pelicula = productTitle.textContent;
//         console.log('Película seleccionada:', pelicula);

//         // Crea el elemento para mostrar en el carrito
//         const cartProduct = document.createElement('div');
//         cartProduct.classList.add('cart-product');
//         cartProduct.innerHTML = `
//           <div class="info-cart-product">
//             <span class="cant-producto-carrito">1</span>
//             <p class="titulo-producto-carrito">${pelicula}</p>
//             <span class="precio-producto-carrito">$200</span>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="icon-close">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//         `;

//         // Agrega el elemento al contenedor del carrito
//         cartProductContainer.appendChild(cartProduct);

//         // Incrementa el contador de productos y actualiza el valor visualmente
//         totalProductos++;
//         contadorProductos.textContent = totalProductos;
//       } else {
//         console.log('No se encontró el elemento del título de la película');
//       }
//     } else {
//       console.log('No se encontró el elemento de la película');
//     }
//   }
// });





const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const contadorProductos = document.getElementById('contador-productos');
let totalProductos = 0;

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartProductContainer = document.querySelector('.container-cart-product');
const cartProducts = {}; // Objeto para almacenar los productos en el carrito

// Obtener el contenedor principal de las películas
const moviesContainer = document.getElementById('contenedor');

// Asignar el evento de clic al contenedor principal
moviesContainer.addEventListener('click', (e) => {
    // Verificar si el clic ocurrió en el botón "Añadir al carrito"
    if (e.target.classList.contains('icon-addCart') || e.target.parentElement.classList.contains('icon-addCart')) {
        // Obtener la película seleccionada
        const peliculaElement = e.target.closest('.pelicula');
        if (peliculaElement) {
            const productTitle = peliculaElement.querySelector('.titulo');
            if (productTitle) {
                const pelicula = productTitle.textContent;
                console.log('Película seleccionada:', pelicula);

                // Verificar si la película ya está en el carrito
                if (cartProducts.hasOwnProperty(pelicula)) {
                    // Incrementar la cantidad del producto existente
                    cartProducts[pelicula].quantity++;
                } else {
                    // Crear un nuevo producto en el carrito
                    cartProducts[pelicula] = {
                        quantity: 1,
                        title: pelicula,
                        price: '$200',
                    };
                }

                // Actualizar el carrito visualmente
                updateCart();
            } else {
                console.log('No se encontró el elemento del título de la película');
            }
        } else {
            console.log('No se encontró el elemento de la película');
        }
    }
});

// Función para actualizar el carrito visualmente
const updateCart = () => {
    // Limpiar el contenido actual del carrito
    cartProductContainer.innerHTML = '';

    // Función para eliminar un producto del carrito
    const removeProduct = (title) => {
        delete cartProducts[title];
        updateCart();
    };

    // Función para disminuir la cantidad de un producto en el carrito
    const decreaseProductQuantity = (title) => {
        if (cartProducts.hasOwnProperty(title)) {
            if (cartProducts[title].quantity > 1) {
                cartProducts[title].quantity--;
            } else {
                removeProduct(title);
            }
        }
        updateCart();
    };

    // Función para aumentar la cantidad de un producto en el carrito
    const increaseProductQuantity = (title) => {
        if (cartProducts.hasOwnProperty(title)) {
            cartProducts[title].quantity++;
        }
        updateCart();
    };

    // Recorrer los productos en el carrito y crear los elementos correspondientes
    Object.values(cartProducts).forEach((product) => {
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('cart-product');
        cartProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cant-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
                <div class="quantity-buttons">
                    <button class="decrease-quantity">-</button>
                    <button class="increase-quantity">+</button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="icon-close">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        `;
        cartProductContainer.appendChild(cartProduct);

        // Asignar el evento de clic al botón de cruz para eliminar el producto
        const btnClose = cartProduct.querySelector('.icon-close');
        btnClose.addEventListener('click', () => {
            const productTitle = cartProduct.querySelector('.titulo-producto-carrito').textContent;
            removeProduct(productTitle);
        });

        // Asignar el evento de clic al botón de disminuir cantidad
        const btnDecrease = cartProduct.querySelector('.decrease-quantity');
        btnDecrease.addEventListener('click', () => {
            const productTitle = cartProduct.querySelector('.titulo-producto-carrito').textContent;
            decreaseProductQuantity(productTitle);
        });

        // Asignar el evento de clic al botón de aumentar cantidad
        const btnIncrease = cartProduct.querySelector('.increase-quantity');
        btnIncrease.addEventListener('click', () => {
            const productTitle = cartProduct.querySelector('.titulo-producto-carrito').textContent;
            increaseProductQuantity(productTitle);
        });
    });

    // Calcular el total de productos en el carrito
    totalProductos = Object.values(cartProducts).reduce((total, product) => total + product.quantity, 0);
    contadorProductos.textContent = totalProductos;

    // Calcular el total de la compra
    const totalCompra = Object.values(cartProducts).reduce((total, product) => {
        const price = parseFloat(product.price.slice(1)); // Convertir el precio a número eliminando el símbolo $
        return total + price * product.quantity;
    }, 0);

    // Mostrar el total de la compra en el elemento correspondiente
    const totalCompraElement = document.querySelector('.total-compra');
    if (totalCompraElement) {
        totalCompraElement.textContent = `$${totalCompra.toFixed(2)}`;
    } else {
        console.log('No se encontró el elemento del total de compra');
    }
};

// Obtén una referencia al botón "Comprar"
const btnComprar = document.createElement('button');
btnComprar.classList.add('btn-comprar');
btnComprar.textContent = 'Comprar';

// Agrega el evento click al botón "Comprar"
btnComprar.addEventListener('click', () => {
    // Muestra el SweetAlert para confirmar la compra
    Swal.fire({
        title: 'Confirmar compra',
        text: '¿Deseas confirmar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            cartProducts = {}; // Vaciar el carrito al confirmar la compra
            updateCart();
            Swal.fire('Compra realizada', '¡Gracias por tu compra!', 'success');
        }
    });
});

// Agrega el botón "Comprar" al contenedor del carrito
containerCartProducts.appendChild(btnComprar);

// Evento 'DOMContentLoaded' para los botones de precio
document.addEventListener('DOMContentLoaded', function () {
    const botonesPrecio = document.querySelectorAll('.boton-precio');
   
    botonesPrecio.forEach(boton => {
        boton.addEventListener('click', () => {
             console.log(comprado)
             Swal.fire({
                title: 'Confirmar compra',
                text: '¿Estás seguro de que deseas realizar esta compra?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Comprar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('¡Compra realizada!', 'La compra se ha realizado exitosamente.', 'success');
                } else {
                    Swal.fire('Compra cancelada', 'No se ha realizado ninguna compra.', 'info');
                }
            });
        });
    });
});





