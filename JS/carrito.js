
'use strict';


/* ----------- 1) Lista de productos disponibles ----------- */
/* Cada producto tiene nombre, precio, imagen y categoría.  */

let productos = [
    { nombre: "Set de 6 Budas arcoíris",    precio: 4500,  img: "./IMG/set_de_6_budas.jpg",              categoria: "yeso"   },
    { nombre: "Busto decorativo",           precio: 6200,  img: "./IMG/busto_decorativo.jpg",             categoria: "yeso"   },
    { nombre: "Figura floral orgánica",      precio: 3800,  img: "./IMG/Figura_floral_orgánica.jpg",      categoria: "yeso"   },
    { nombre: "Estante live edge",           precio: 18500, img: "./IMG/Estante_live_edge.jpg",           categoria: "madera" },
    { nombre: "Bowl decorativo nogal",       precio: 8900,  img: "./IMG/Bowl_decorativo_nogal.jpg",       categoria: "madera" },
    { nombre: "Porta objetos geométrico",    precio: 5600,  img: "./IMG/Porta_objetos_geométrico.jpg",    categoria: "madera" },
    { nombre: "Mesa river table",            precio: 45000, img: "./IMG/Mesa_river_table.jpg",            categoria: "resina" },
    { nombre: "Vela con flores secas",       precio: 3200,  img: "./IMG/Vela_con_flores_secas.jpg",       categoria: "resina" },
    { nombre: "Posavasos efecto mármol",     precio: 2800,  img: "./IMG/Posavasos_efecto_mármol.jpg",     categoria: "resina" }
];


/* ----------- 2) El módulo del carrito ----------- */

let carrito = [];

// Nombre de la caja donde guardamos el carrito en el navegador.
const CLAVE_CARRITO = "artesanosSRL_carrito";

// Guarda el carrito en localStorage.
// Como localStorage solo guarda texto, convertimos el array a JSON.
function guardarCarrito() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Lee el carrito guardado (si existe) y lo vuelve a cargar en memoria.
function cargarCarrito() {
    let guardado = localStorage.getItem(CLAVE_CARRITO);
    if (guardado) {
        // JSON.parse convierte el texto de vuelta a un array de objetos.
        carrito = JSON.parse(guardado);
    }
}

// Agrega un producto al carrito o suma cantidad si ya existe.
function agregarProducto(indice) {
    let producto = productos[indice];

    // Buscamos si el producto ya está en el carrito.
    let encontrado = -1;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === producto.nombre) {
            encontrado = i;
            break;
        }
    }

    if (encontrado >= 0) {
        // Si ya existe, sumamos una unidad.
        carrito[encontrado].cantidad++;
    } else {
        // Si no existe, lo agregamos con cantidad 1.
        carrito.push({
            nombre:    producto.nombre,
            precio:    producto.precio,
            img:       producto.img,
            cantidad:  1
        });
    }

    console.log(producto.nombre + " agregado al carrito");

    // Actualizamos la pantalla y guardamos.
    actualizarCarrito();
    mostrarToast("✓ " + producto.nombre + " agregado");
}

// Cambia la cantidad de un producto en el carrito.
function cambiarCantidad(nombre, delta) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            carrito[i].cantidad += delta;

            // Si la cantidad llega a 0, lo quitamos.
            if (carrito[i].cantidad <= 0) {
                console.log(carrito[i].nombre + " quitado del carrito");
                carrito.splice(i, 1);
            }
            break;
        }
    }
    actualizarCarrito();
}

// Saca un producto del carrito por su nombre.
function quitarProducto(nombre) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            console.log(carrito[i].nombre + " quitado del carrito");
            carrito.splice(i, 1);
            break;
        }
    }
    actualizarCarrito();
}

// Vacía el carrito completo.
function vaciarCarrito() {
    carrito = [];
    console.log("Carrito vaciado");
    actualizarCarrito();
}

// Calcula el total del carrito.
function calcularTotal() {
    let total = 0;
    for (let item of carrito) {
        total += item.precio * item.cantidad;
    }
    return total;
}

// Muestra el carrito en la consola (como en el ejemplo de clase).
function mostrarCarrito() {
    console.log("Productos en el carrito:");
    for (let item of carrito) {
        console.log(item.nombre + " x" + item.cantidad + " - $" + (item.precio * item.cantidad));
    }
    console.log("Total: $" + calcularTotal());
}


/* ----------- 3) Mostrar productos en la página ----------- */

// Dibuja la grilla de productos con su botón Agregar.
function mostrarProductos() {
    let grilla = document.getElementById("productos-grid");
    grilla.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let p = productos[i];

        let card = document.createElement("div");
        card.className = "prod-card";
        card.setAttribute("data-cat", p.categoria);

        card.innerHTML =
            "<div class='prod-img-wrap'>" +
                "<img src='" + p.img + "' alt='" + p.nombre + "'>" +
                "<span class='prod-badge badge-" + p.categoria + "'>" + p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1) + "</span>" +
            "</div>" +
            "<div class='prod-body'>" +
                "<h3 class='prod-nombre'>" + p.nombre + "</h3>" +
                "<div class='prod-footer'>" +
                    "<span class='prod-precio'>$" + p.precio.toLocaleString("es-AR") + "</span>" +
                    "<button class='btn-agregar' data-indice='" + i + "'>+ Agregar</button>" +
                "</div>" +
            "</div>";

        grilla.appendChild(card);
    }

    // Evento click para cada botón Agregar.
    let botones = document.querySelectorAll(".btn-agregar");
    for (let boton of botones) {
        boton.addEventListener("click", function () {
            let indice = boton.getAttribute("data-indice");
            agregarProducto(indice);

            // Feedback visual en el botón.
            boton.textContent = "✓ Agregado";
            boton.style.background = "#4a7c59";
            setTimeout(function () {
                boton.textContent = "+ Agregar";
                boton.style.background = "";
            }, 1800);
        });
    }
}


/* ----------- 4) Filtros por categoría ----------- */

function filtrar(cat, btn) {
    let botones = document.querySelectorAll(".filtro-btn");
    for (let b of botones) {
        b.classList.remove("activo");
    }
    btn.classList.add("activo");

    let cards = document.querySelectorAll(".prod-card");
    for (let card of cards) {
        if (cat === "todos" || card.getAttribute("data-cat") === cat) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}


/* ----------- 5) Actualizar el carrito en pantalla ----------- */

function actualizarCarrito() {
    let itemsEl   = document.getElementById("carrito-items");
    let vacioEl   = document.getElementById("carrito-vacio");
    let footerEl  = document.getElementById("drawer-footer");
    let contEl    = document.getElementById("carrito-contador");
    let totalEl   = document.getElementById("carrito-total");

    // Calcular totales.
    let totalUnid = 0;
    for (let item of carrito) {
        totalUnid += item.cantidad;
    }

    // Contador del botón flotante.
    contEl.textContent = totalUnid;
    if (totalUnid > 0) {
        contEl.classList.add("visible");
    } else {
        contEl.classList.remove("visible");
    }

    // Mostrar/ocultar secciones del drawer.
    vacioEl.style.display  = carrito.length === 0 ? "block" : "none";
    footerEl.style.display = carrito.length === 0 ? "none"  : "block";

    // Renderizar items.
    itemsEl.innerHTML = "";

    if (carrito.length === 0) {
        // No hacemos nada más, vacioEl ya se muestra.
    } else {
        for (let i = 0; i < carrito.length; i++) {
            let item = carrito[i];
            let subtotal = item.precio * item.cantidad;

            let li = document.createElement("div");
            li.className = "carrito-item";

            li.innerHTML =
                "<img src='" + item.img + "' alt='" + item.nombre + "'>" +
                "<div>" +
                    "<p class='ci-nombre'>" + item.nombre + "</p>" +
                    "<p class='ci-precio'>$" + subtotal.toLocaleString("es-AR") + "</p>" +
                    "<button class='ci-eliminar' data-nombre='" + item.nombre + "'>Eliminar</button>" +
                "</div>" +
                "<div class='ci-controles'>" +
                    "<button class='ci-btn ci-menos' data-nombre='" + item.nombre + "'>−</button>" +
                    "<span class='ci-cantidad'>" + item.cantidad + "</span>" +
                    "<button class='ci-btn ci-mas' data-nombre='" + item.nombre + "'>+</button>" +
                "</div>";

            itemsEl.appendChild(li);
        }

        // Eventos para los botones de cantidad y eliminar.
        let botonesEliminar = document.querySelectorAll(".ci-eliminar");
        for (let btn of botonesEliminar) {
            btn.addEventListener("click", function () {
                quitarProducto(btn.getAttribute("data-nombre"));
            });
        }

        let botonesMenos = document.querySelectorAll(".ci-menos");
        for (let btn of botonesMenos) {
            btn.addEventListener("click", function () {
                cambiarCantidad(btn.getAttribute("data-nombre"), -1);
            });
        }

        let botonesMas = document.querySelectorAll(".ci-mas");
        for (let btn of botonesMas) {
            btn.addEventListener("click", function () {
                cambiarCantidad(btn.getAttribute("data-nombre"), 1);
            });
        }
    }

    totalEl.textContent = "$" + calcularTotal().toLocaleString("es-AR");

    // Guardamos el estado actual para no perderlo al recargar.
    guardarCarrito();

    // También lo mostramos en consola, como en el ejemplo de clase.
    mostrarCarrito();
}


/* ----------- 6) Pago con SweetAlert2 ----------- */

function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Tu carrito está vacío",
            text: "Agregá productos antes de finalizar la compra.",
            confirmButtonColor: "#8b6845"
        });
        return;
    }

    // Armar resumen del pedido.
    let resumen = "";
    for (let item of carrito) {
        resumen += "• " + item.nombre + " x" + item.cantidad +
                   " — $" + (item.precio * item.cantidad).toLocaleString("es-AR") + "<br>";
    }

    Swal.fire({
        icon: "success",
        title: "¡Gracias por tu compra!",
        html:
            resumen +
            "<br><strong>Total: $" + calcularTotal().toLocaleString("es-AR") + "</strong>" +
            "<br><br><small>El pago es solo una demostración, no se procesa ningún cobro.</small>",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#8b6845"
    });

    // Vaciamos el carrito después de confirmar.
    vaciarCarrito();
    cerrarCarrito();
}


/* ----------- 7) Abrir / cerrar drawer ----------- */

function abrirCarrito() {
    document.getElementById("carrito-overlay").classList.add("abierto");
    document.getElementById("carrito-drawer").classList.add("abierto");
    document.body.style.overflow = "hidden";
}

function cerrarCarrito() {
    document.getElementById("carrito-overlay").classList.remove("abierto");
    document.getElementById("carrito-drawer").classList.remove("abierto");
    document.body.style.overflow = "";
}


/* ----------- 8) Toast de notificación ----------- */

let toastTimer;

function mostrarToast(msg) {
    let t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        t.classList.remove("show");
    }, 2200);
}


/* ----------- 9) Arranque: cuando carga la página ----------- */

document.addEventListener("DOMContentLoaded", function () {

    // Primero recuperamos el carrito que el usuario tenía guardado.
    cargarCarrito();

    // Dibujamos los productos en la página.
    mostrarProductos();

    // Actualizamos el carrito con lo que había guardado.
    actualizarCarrito();

    // Eventos del drawer.
    document.getElementById("carrito-fab").addEventListener("click", abrirCarrito);
    document.getElementById("carrito-overlay").addEventListener("click", cerrarCarrito);
    document.getElementById("btn-cerrar-drawer").addEventListener("click", cerrarCarrito);
    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
    document.getElementById("btn-finalizar").addEventListener("click", finalizarCompra);

    // Cerrar con tecla Escape.
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") cerrarCarrito();
    });

    // Eventos de los filtros.
    let filtros = document.querySelectorAll(".filtro-btn");
    for (let btn of filtros) {
        btn.addEventListener("click", function () {
            filtrar(btn.getAttribute("data-cat"), btn);
        });
    }
});
