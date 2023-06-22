const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const contadorProductos = document.getElementById('contador-productos');
let totalProductos = 0;

// Recuperar los productos del carrito desde localStorage (si existen)
let cartProducts = localStorage.getItem('cartProducts');
cartProducts = cartProducts ? JSON.parse(cartProducts) : {};

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartProductContainer = document.querySelector('.container-cart-product');

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

    // Almacenar los productos del carrito en localStorage
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

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
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
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

// Agrega el evento click al botón "Comprar"
const btnComprar = document.createElement('button');
btnComprar.classList.add('btn-comprar');
btnComprar.textContent = 'Comprar';

btnComprar.addEventListener('click', () => {
    // Verificar si el carrito está vacío
    if (Object.keys(cartProducts).length === 0) {
        Swal.fire('Carrito vacío', 'Por favor, selecciona al menos una película antes de realizar la compra', 'error');
        return; // Detener la ejecución del código
    }

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
            Object.keys(cartProducts).forEach((title) => {
                // Puedes realizar las acciones necesarias para completar la compra de cada producto aquí
                // Por ejemplo, enviar una solicitud al servidor para procesar el pago y registrar la compra
                // ...
            });

            // Limpiar el carrito después de realizar la compra
            cartProducts = {};
            updateCart();

            Swal.fire('¡Compra realizada!', 'La compra se ha realizado con éxito', 'success');
        }
    });
});

// Agrega el botón de compra al contenedor principal del carrito
containerCartProducts.appendChild(btnComprar);

// Actualizar el carrito al cargar la página
updateCart();




