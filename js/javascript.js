let productos = [];
$.ajax({
  url: "./data/catalogo.json",
  dataType: "json",
  success: (respuesta) => {
    cargarProductos(respuesta);
  },
});

const cargarProductos = (respuesta) => {
  productos = respuesta;

  const contenedor = document.getElementById("container");
  contenedor.innerHTML = "";

  productos.forEach((producto, indice) => {
    let card = document.createElement("div");
    card.classList.add("producto");
    let html = `
  <div>
      <img src="${producto.imagen}" class="d-block w-100 imProduct" alt="...">
  </div>
<p>${producto.nombre}</p>
<div><strong><p class="price">${producto.precio} $</p></strong></div>
<button class="btn btn-dark btn-sm" class="button" onClick= "agregarAlCarrito(${indice})">COMPRAR</button>
    `;
    card.innerHTML = html;
    contenedor.appendChild(card);
  });
};

function comprar() {
  alert("carrito abierto");
}
let modalCarrito = document.getElementById("cart");

const dibujarCarrito = () => {
  let total = 0;
  modalCarrito.className = "cart";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details"> Precio: $ ${producto.precio}</div>
        <div class="product-details"> Subtotal: $ ${
          producto.precio * producto.cantidad
        }</div>
        <button class="btn btn-secondary"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
    <button class= "btn btn-secondary finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
    modalCarrito.appendChild(totalContainer);
  } else {
    modalCarrito.classList.remove("cart");
  }
};

let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  dibujarCarrito();
}

const agregarAlCarrito = (indiceDelArrayProducto) => {
const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceDelArrayProducto].id;
  });
  if (indiceEncontradoCarrito === -1) {
    const productoAgregar = productos[indiceDelArrayProducto];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
    actualizarStorage(cart);
    dibujarCarrito();
  } else {
    cart[indiceEncontradoCarrito].cantidad += 1;
    actualizarStorage(cart);
    dibujarCarrito();
  }
};

const removeProduct = (indice) => {
  cart.splice(indice, 1);
  actualizarStorage(cart);
  dibujarCarrito();
};

function finalizarCompra(){
  alert("Tu compra fue realizada con exito")
}

const actualizarStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

let boton = document.createElement("div");
boton.innerHTML = `<div class="catalogo">
<p class="subtitle"> SI QUIERES VER NUESTRO CATALOGO HAZ CLICK EN EL BOTON </p>
<input type="button" id="botonp" class="botonp btn-dark btn-lg" value="CATALOGO" onClick="mostrar()">
<table id="tabla" class="table table-striped">
<thead>
    <tr>
      <th scope="col">Producto</th>
      <th scope="col">Talle</th>
      <th scope="col">Color</th>
    </tr>
  </thead>
  <tbody id="tabProducto">
  </tbody>
</table>
</div>`;
$("#catalogo").append(boton)
function mostrar(){
  $("#tabla").toggle("slow")
}


const localdeljson = "../data/catalogo.json";

$.get(localdeljson, (respuesta,status) => {
  if (status === "success"){
    
    for(let lista of respuesta){
      $("#tabProducto").append(
        `
        <tr>
        
        <td>${lista.nombre}</td>
        <td>${lista.talleDisponible}</td>
        <td>${lista.color}</td>
      </tr>`
      )
    }
  }
})

