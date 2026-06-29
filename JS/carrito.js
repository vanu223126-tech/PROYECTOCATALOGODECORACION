
'use strict';


var STORAGE_KEY = 'artesanosSRL_carrito';


var carrito = cargarCarritoStorage();

// ── Al cargar la página, renderizar el carrito ────
document.addEventListener('DOMContentLoaded', function () {
  renderCarrito();
});


function guardarCarritoStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

function cargarCarritoStorage() {
  var datos = localStorage.getItem(STORAGE_KEY);
  if (datos) {
    try {
      return JSON.parse(datos);
    } catch (e) {
      return [];
    }
  }
  return [];
}



function filtrar(cat, btn) {
  // actualizar botón activo
  var botones = document.querySelectorAll('.filtro-btn');
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove('activo');
  }
  btn.classList.add('activo');

  // mostrar/ocultar cards
  var cards = document.querySelectorAll('.prod-card');
  for (var j = 0; j < cards.length; j++) {
    if (cat === 'todos' || cards[j].dataset.cat === cat) {
      cards[j].style.display = '';
    } else {
      cards[j].style.display = 'none';
    }
  }
}



function agregarAlCarrito(btn, nombre, precio, img) {
  var idx = -1;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) { idx = i; break; }
  }

  if (idx >= 0) {
    carrito[idx].cantidad++;
  } else {
    carrito.push({ nombre: nombre, precio: precio, img: img, cantidad: 1 });
  }

  guardarCarritoStorage();
  renderCarrito();
  mostrarToast('✓ ' + nombre + ' agregado');

  
  btn.textContent = '✓ Agregado';
  btn.style.background = '#4a7c59';
  setTimeout(function () {
    btn.textContent = '+ Agregar';
    btn.style.background = '';
  }, 1800);
}



function cambiarCantidad(nombre, delta) {
  var idx = -1;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) { idx = i; break; }
  }
  if (idx < 0) return;

  carrito[idx].cantidad += delta;
  if (carrito[idx].cantidad <= 0) {
    carrito.splice(idx, 1);
  }

  guardarCarritoStorage();
  renderCarrito();
}



function eliminarItem(nombre) {
  carrito = carrito.filter(function (item) {
    return item.nombre !== nombre;
  });
  guardarCarritoStorage();
  renderCarrito();
}



function vaciarCarrito() {
  carrito = [];
  guardarCarritoStorage();
  renderCarrito();
}



function finalizarCompra() {
  if (carrito.length === 0) return;

  var totalPesos = 0;
  for (var i = 0; i < carrito.length; i++) {
    totalPesos += carrito[i].precio * carrito[i].cantidad;
  }

  // construir resumen HTML
  var lineas = '';
  for (var j = 0; j < carrito.length; j++) {
    var item = carrito[j];
    var subtotal = item.precio * item.cantidad;
    lineas += '<div>' +
      '<strong>' + item.nombre + '</strong> x' + item.cantidad +
      ' <span style="color:#9a8878"> — $' + subtotal.toLocaleString('es-AR') + '</span>' +
      '</div>';
  }
  lineas += '<div class="modal-total">Total: $' + totalPesos.toLocaleString('es-AR') + '</div>';

  document.getElementById('modal-resumen').innerHTML = lineas;
  document.getElementById('modal-overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';

  
  vaciarCarrito();
  cerrarCarrito();
}



function cerrarModal() {
  document.getElementById('modal-overlay').classList.remove('visible');
  document.body.style.overflow = '';
}


document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) cerrarModal();
});



function renderCarrito() {
  var itemsEl  = document.getElementById('carrito-items');
  var vacioEl  = document.getElementById('carrito-vacio');
  var footerEl = document.getElementById('drawer-footer');
  var contEl   = document.getElementById('carrito-contador');
  var totalEl  = document.getElementById('carrito-total');

  
  var totalUnid = 0;
  var totalPeso = 0;
  for (var i = 0; i < carrito.length; i++) {
    totalUnid += carrito[i].cantidad;
    totalPeso += carrito[i].precio * carrito[i].cantidad;
  }

  
  contEl.textContent = totalUnid;
  if (totalUnid > 0) {
    contEl.classList.add('visible');
  } else {
    contEl.classList.remove('visible');
  }

  
  vacioEl.style.display  = carrito.length === 0 ? 'block' : 'none';
  footerEl.style.display = carrito.length === 0 ? 'none'  : 'block';

  
  var html = '';
  for (var j = 0; j < carrito.length; j++) {
    var item = carrito[j];
    var nombreSafe = item.nombre.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    var subtotal = item.precio * item.cantidad;

    html += '<div class="carrito-item">' +
      '<img src="' + item.img + '" alt="' + item.nombre + '">' +
      '<div>' +
        '<p class="ci-nombre">' + item.nombre + '</p>' +
        '<p class="ci-precio">$' + subtotal.toLocaleString('es-AR') + '</p>' +
        '<button class="ci-eliminar" onclick="eliminarItem(\'' + nombreSafe + '\')">Eliminar</button>' +
      '</div>' +
      '<div class="ci-controles">' +
        '<button class="ci-btn" onclick="cambiarCantidad(\'' + nombreSafe + '\', -1)">−</button>' +
        '<span class="ci-cantidad">' + item.cantidad + '</span>' +
        '<button class="ci-btn" onclick="cambiarCantidad(\'' + nombreSafe + '\', 1)">+</button>' +
      '</div>' +
    '</div>';
  }
  itemsEl.innerHTML = html;

  // total
  totalEl.textContent = '$' + totalPeso.toLocaleString('es-AR');
}



function abrirCarrito() {
  document.getElementById('carrito-overlay').classList.add('abierto');
  document.getElementById('carrito-drawer').classList.add('abierto');
  document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
  document.getElementById('carrito-overlay').classList.remove('abierto');
  document.getElementById('carrito-drawer').classList.remove('abierto');
  document.body.style.overflow = '';
}


document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    cerrarCarrito();
    cerrarModal();
  }
});



var toastTimer;

function mostrarToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    t.classList.remove('show');
  }, 2200);
}
