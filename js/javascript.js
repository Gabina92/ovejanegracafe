let productos = [];
let total = 0;

function agregarProducto(producto, precio) {
    let carrito = document.getElementById("carrito");
    let productoItem = document.createElement("p");
    productoItem.textContent = `${producto} - $${precio}`;
    carrito.appendChild(productoItem);

    // Agregar el producto al array
    productos.push({ nombre: producto, precio: precio });

    // Actualizar el total
    total += precio;
    document.getElementById("btnPagar").textContent = `Pagar: $${total.toFixed(2)}`; // Muestra el total con 2 decimales
}

// Función para pagar
function pagar() {
    if (productos.length > 0) {
        // Guardar datos en localStorage
        localStorage.setItem('productos', JSON.stringify(productos));
        localStorage.setItem('total', total);

        // Redirige a la página de compra
        window.location.href = "compra.html"; 
    } else {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    }
}

// Función para limpiar el carrito
function limpiarCarrito() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        productos = [];
        total = 0;
        document.getElementById("carrito").innerHTML = ""; // Elimina todos los productos del carrito
        document.getElementById("btnPagar").textContent = "Pagar";

        // Limpiar los datos en localStorage
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
    }
}

// Puedes agregar un event listener en el botón de pagar y limpiar carrito
document.getElementById("btnLimpiar").addEventListener("click", limpiarCarrito);
document.getElementById("btnPagar").addEventListener("click", pagar);

if (window.location.pathname.includes("compra.html")) {
    window.onload = function() {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const total = parseFloat(localStorage.getItem('total')) || 0;

        const carritoContainer = document.getElementById("carrito");
        const totalContainer = document.getElementById("btnPagar");

        // Verificar si hay productos
        if (productos.length === 0) {
            carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
            totalContainer.textContent = "Pagar: $0.00";
        } else {
            // Mostrar los productos en la página
            productos.forEach(producto => {
                const item = document.createElement("p");
                item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
                carritoContainer.appendChild(item);
            });

            // Mostrar el total
            totalContainer.textContent = `Total: $${total.toFixed(2)}`;

            // Borrar datos del carrito tras mostrarlos
            localStorage.removeItem('productos');
            localStorage.removeItem('total');
        } 
    };
    }