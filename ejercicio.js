const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let detalle = [];
let productos = {};

const menus = document.querySelectorAll(".menu");
const carro = document.getElementById("carroCompras");
const positiveCanceling = document.getElementById("definitivo");
const hacerTabla = function () {
  let categoria = document.getElementById("Categoria");
  categoria.innerHTML = "Order detail";
  let division = document.getElementById("Cards");
  division.innerHTML = "";
  let tabla = document.createElement("table");
  tabla.className = "table table-striped text-center";
  let encabezados = document.createElement("tr");
  let encabezado1 = document.createElement("th");

  let texto1 = document.createTextNode("Item");
  encabezado1.appendChild(texto1);
  encabezados.appendChild(encabezado1);
  let encabezado2 = document.createElement("th");
  let texto2 = document.createTextNode("Qty.");
  encabezado2.appendChild(texto2);
  encabezados.appendChild(encabezado2);
  let encabezado3 = document.createElement("th");
  let texto3 = document.createTextNode("Description");
  encabezado3.appendChild(texto3);
  encabezados.appendChild(encabezado3);

  let encabezado4 = document.createElement("th");
  let texto4 = document.createTextNode("Unit Price");
  encabezado4.appendChild(texto4);
  encabezados.appendChild(encabezado4);

  let encabezado5 = document.createElement("th");
  let texto5 = document.createTextNode("Amount");
  encabezado5.appendChild(texto5);
  encabezados.appendChild(encabezado5);
  tabla.appendChild(encabezados);
  let cuerpo = document.createElement("tbody");
  for (k in detalle) {
    let fila = document.createElement("tr");
    let casilla0 = document.createElement("th");
    let textoCasilla0 = document.createTextNode(detalle[k].Item);
    casilla0.appendChild(textoCasilla0);
    fila.appendChild(casilla0);
    let casilla1 = document.createElement("td");
    let textoCasilla1 = document.createTextNode(detalle[k].Qty);
    casilla1.appendChild(textoCasilla1);
    fila.appendChild(casilla1);
    let casilla2 = document.createElement("td");
    let textoCasilla2 = document.createTextNode(detalle[k].Description);
    casilla2.appendChild(textoCasilla2);
    fila.appendChild(casilla2);
    let casilla3 = document.createElement("td");
    let textoCasilla3 = document.createTextNode(detalle[k].UnitPrice);
    casilla3.appendChild(textoCasilla3);
    fila.appendChild(casilla3);
    let casilla4 = document.createElement("td");
    let textoCasilla4 = document.createTextNode(detalle[k].Amount);
    casilla4.appendChild(textoCasilla4);
    fila.appendChild(casilla4);
    cuerpo.appendChild(fila);
  }
  tabla.appendChild(cuerpo);
  tabla.setAttribute("width", "100%");
  tabla.setAttribute("margin", "10%");
  let compra = 0;
  for (j in detalle) {
    compra += detalle[j].Amount;
  }
  let divi = document.createElement("div");
  let total = document.createElement("h6");
  let confirmar = document.createElement("button");
  let cancelar = document.createElement("button");
  divi.className = "col-12";
  total.innerHTML = "Total: $" + compra;
  total.className = "float-left";
  cancelar.innerHTML = "Cancel";
  confirmar.innerHTML = "Confirm order";
  confirmar.className = "btn btn-success float-right";
  cancelar.className = "btn btn-danger float-right";
  cancelar.dataset.toggle = "modal";
  cancelar.dataset.target = "#cancelacion";
  confirmar.addEventListener("click", confirmarCompra);
  divi.appendChild(total);
  divi.appendChild(confirmar);
  divi.appendChild(cancelar);

  division.appendChild(tabla);
  division.appendChild(divi);
};
carro.addEventListener("click", hacerTabla);
const muestraProductos = function () {
  fetch(url)
    .then((response) => response.json())
    .then((response) => createCards(response, this.innerHTML));
};
menus.forEach((menu) => {
  menu.addEventListener("click", muestraProductos);
});

const agregaCarro = function () {
  let elementos = document.getElementById("elementos");

  let qty;
  let descripcion;
  let unitPrice;
  let amount;
  descripcion = this.id;
  let index = detalle.map((o) => o.Description).indexOf(descripcion);

  if (index == -1) {
    qty = 1;
    let ind = productos.map((o) => o.name).indexOf(this.id);
    unitPrice = productos[ind].price;
    amount = unitPrice;
    detalle.push({
      Item: detalle.length + 1,
      Qty: qty,
      Description: descripcion,
      UnitPrice: unitPrice,
      Amount: amount,
    });
  } else {
    detalle[index].Qty += 1;
    detalle[index].Amount = detalle[index].Qty * detalle[index].UnitPrice;
  }
  let total = 0;
  for (j in detalle) {
    total += detalle[j].Qty;
  }
  elementos.innerHTML = total + " items";
};

function createCards(json1, producto) {
  let indice = 0;
  for (i in json1) {
    if (json1[i].name == producto) {
      indice = i;
    }
  }
  json = json1[indice].products;
  productos = json;
  let division = document.getElementById("Cards");
  division.innerHTML = "";
  let categoria = document.getElementById("Categoria");
  categoria.innerHTML = json1[indice].name;
  for (let i in json) {
    let dividir = document.createElement("div");
    let card = document.createElement("div");
    let img = document.createElement("img");
    let cuerpo = document.createElement("div");
    let titulo = document.createElement("h5");
    let descripcion = document.createElement("p");
    let precio = document.createElement("h6");
    let boton = document.createElement("a");
    dividir.className = "col-3";
    card.className = "card";
    card.style = "width: 23rem;";
    img.className = "card-img-top imagenCard";
    img.src = json[i].image;
    img.alt = json[i].name;
    cuerpo.className = "card-body";
    cuerpo.style = "position: relative;";
    titulo.className = "card-title";
    titulo.innerHTML = json[i].name;
    descripcion.className = "card-text";
    descripcion.innerHTML = json[i].description;
    precio.innerHTML = json[i].price;
    boton.className = "btn btn-dark agregar";
    boton.id = json[i].name;
    boton.style = "position: absolute; left: 5%; bottom: 10px;";
    boton.innerHTML = "Add to cart";
    boton.addEventListener("click", agregaCarro);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(boton);
    card.appendChild(img);
    card.appendChild(cuerpo);
    dividir.appendChild(card);
    division.appendChild(dividir);
  }
}

const cancelarCompra = function () {
  detalle = [];
  let elementos = document.getElementById("elementos");
  elementos.innerHTML = "0 items";
  hacerTabla();
};
positiveCanceling.addEventListener("click", cancelarCompra);
const confirmarCompra = function () {
  console.log(detalle);
  cancelarCompra();
};
