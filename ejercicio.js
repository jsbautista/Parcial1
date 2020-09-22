const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";



  let ordenar = ((json, llave) => json.sort((a, b) => ((a[llave] < b[llave]) ? 1 : ((a[llave] > b[llave]) ? -1 : 0))));


  function muestraProductos(producto) {
    fetch(url).then(response => response.json()).then(response => createCards(response,producto));
  } 
  const burguer = document.querySelector("#Burguers");
burguer.addEventListener("click", function(evento){
  muestraProductos("Burguers");
});
const taco = document.querySelector("#Tacos");
taco.addEventListener("click", function(evento){
  muestraProductos("Tacos");
});
const salad = document.querySelector("#Salads");
salad.addEventListener("click", function(evento){
  muestraProductos("Salads");
});
const dessert = document.querySelector("#Desserts");
dessert.addEventListener("click", function(evento){
  muestraProductos("Desserts");
});
const drink = document.querySelector("#Drinks");
drink.addEventListener("click", function(evento){
  muestraProductos("Drinks and Sides");
});
function createCards(json1,producto){
console.log(json1);
var indice=0;
for(i in json1){
  if(json1[i].name==producto){
    indice=i;
  }
}
json=json1[indice].products;
console.log(json);
console.log(json);
var division = document.getElementById("Cards");
division.innerHTML="";
var categoria = document.getElementById("Categoria");
categoria.innerHTML=json1[indice].name;
for (var i in json) {
  var dividir=document.createElement("div");
  var card=document.createElement("div");
  var img =document.createElement("img");
  var cuerpo =document.createElement("div");
  var titulo =document.createElement("h5");
  var descripcion =document.createElement("p");
  var precio =document.createElement("h6");
  var boton =document.createElement("a");
  dividir.className="col-3";
  card.className="card";
  card.style="width: 23rem;";
  img.className="card-img-top imagenCard";
  img.src=json[i].image;
  img.alt=json[i].name;
  cuerpo.className="card-body";
  cuerpo.style="position: relative;"
  titulo.className="card-title";
  titulo.innerHTML=json[i].name;
  descripcion.className="card-text";
  descripcion.innerHTML = json[i].description;
  precio.innerHTML = json[i].price;
  boton.className="btn btn-dark";
  boton.style="position: absolute; left: 5%; bottom: 10px;"
  boton.innerHTML="Add to cart";
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