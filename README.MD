# 🏺 Artesanos SRL — Catálogo de Decoración

Proyecto final del curso **Front-End JS** (Talento Tech).  
Tienda online de productos artesanales en yeso, madera y resina, con carrito de compras funcional y persistencia en localStorage.

---

## 🌐 Demo en vivo

🔗 [Ver sitio en GitHub Pages](https://vanu223126-tech.github.io/PROYECTOCATALOGODECORACION/)

---

## 📋 Descripción

Sitio web tipo e-commerce para **Artesanos SRL**, empresa con más de 50 años en decoración artesanal.  
Permite explorar el catálogo de productos, filtrarlos por categoría, agregarlos al carrito y confirmar el pedido.

---

## ✨ Funcionalidades

- 🎥 **Hero con video** de fondo en loop
- 🛍️ **Catálogo de 9 productos** organizados en grilla responsive
- 🔍 **Filtros por categoría** (Yeso / Madera / Resina) con JavaScript puro
- 🛒 **Carrito lateral (drawer)** con animación de apertura/cierre
- ➕➖ **Control de cantidades** por producto
- 🗑️ **Eliminar productos** individualmente o vaciar el carrito completo
- 💾 **localStorage** — el carrito persiste al recargar o cerrar el navegador
- 🎉 **Modal de confirmación** con resumen del pedido al finalizar la compra
- 🔔 **Toast de notificación** al agregar cada producto
- ⭐ **Sección de reseñas** de clientes
- 📬 **Formulario de contacto** integrado con Formspree
- 🗺️ **Mapa de Google Maps** embebido con la ubicación de la sucursal
- 📱 **Diseño responsive** para mobile, tablet y desktop

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica del sitio |
| CSS3 | Estilos, animaciones y diseño responsive |
| JavaScript (ES5/Vanilla) | Lógica del carrito, filtros y localStorage |
| localStorage API | Persistencia del carrito en el navegador |
| Google Fonts (Lora) | Tipografía principal |
| Formspree | Procesamiento del formulario de contacto |
| Google Maps Embed | Mapa de ubicación de la sucursal |
| GitHub Pages | Deploy y hosting del sitio |

---

## 📁 Estructura del proyecto

```
PROYECTOCATALOGODECORACION/
│
├── index.html                  # Página principal
│
├── css/
│   ├── styles.css              # Estilos generales del sitio
│   └── carrito.css             # Estilos del carrito y productos
│
├── js/
│   └── carrito.js              # Lógica del carrito con localStorage
│
├── IMG/
│   ├── logoartesanos.jpg
│   ├── set_de_6_budas.jpg
│   ├── busto_decorativo_.jpg
│   ├── Figura_floral_orgánica.jpg
│   ├── Estante_live_edge.jpg
│   ├── Bowl_decorativo_nogal.jpg
│   ├── Porta_objetos_geométrico.jpg
│   ├── Mesa_river_table.jpg
│   ├── Vela_con_flores_secas.jpg
│   └── Posavasos_efecto_mármol.jpg
│
└── VIDEO/
    └── Beige Minimalist Home Decor Video.mp4
```

---

## 🛒 Cómo funciona el carrito

1. El usuario hace clic en **+ Agregar** en cualquier producto
2. El producto se suma al carrito y se guarda en **localStorage**
3. El ícono flotante 🛒 muestra el contador de unidades
4. Al abrir el carrito se pueden **modificar cantidades** o **eliminar productos**
5. Al hacer clic en **Finalizar compra** aparece un modal con el resumen del pedido
6. El carrito se vacía y el localStorage se limpia automáticamente

---

## 💾 localStorage

El carrito usa la clave `artesanosSRL_carrito` para guardar el estado en el navegador.  
Los datos persisten aunque el usuario recargue la página o cierre el navegador.  
Al confirmar la compra, los datos se eliminan automáticamente.

---

## 🚀 Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:
```bash
git clone https://github.com/vanu223126-tech/PROYECTOCATALOGODECORACION.git
```

2. Abrir la carpeta en **VS Code**

3. Usar la extensión **Live Server** para ver el sitio:
   - Clic derecho en `index.html`
   - Seleccionar **"Open with Live Server"**

---

## 👩‍💻 Autora

**Andrea Vanesa Veron**  
Curso Front-End JS — Talento Tech  
📧 ventasartesanos@gmail.com

---

## 📄 Licencia

Proyecto educativo — uso libre con fines de aprendizaje.