const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";



  let ordenar = ((json, llave) => json.sort((a, b) => ((a[llave] < b[llave]) ? 1 : ((a[llave] > b[llave]) ? -1 : 0))));


  function muestraProductos() {
    fetch(url).then(response => response.json()).then(response => createTable(response));
    console.log('Gracias por pinchar'+producto);
  } 
  document.getElementById("Burguers").onclick = muestraProductos;

function createTable(json){
var t=0 ;
var division = document.getElementById("tabla");
var tabla=document.createElement("table");
var encabezados = document.createElement("tr");
var encabezado1 = document.createElement("th");
var texto1 = document.createTextNode("#");
encabezado1.appendChild(texto1);
encabezados.appendChild(encabezado1);
encabezado1.setAttribute("width", "15%");
var encabezado2 = document.createElement("th");
var texto2 = document.createTextNode("Events");
encabezado2.appendChild(texto2);
encabezados.appendChild(encabezado2);
var encabezado3 = document.createElement("th");
var texto3 = document.createTextNode("Squirrels");
encabezado3.appendChild(texto3);
encabezados.appendChild(encabezado3);
tabla.appendChild(encabezados);
for (var i = 0; i < json.length; i++) {
  // Crea las hileras de la tabla
  var fila = document.createElement("tr");
  var casilla0 = document.createElement("th");
var textoCasilla0 = document.createTextNode(i+1);
casilla0.appendChild(textoCasilla0);
fila.appendChild(casilla0);
var casilla1 = document.createElement("td");
var textoCasilla1= document.createTextNode(json[i].events);
casilla1.appendChild(textoCasilla1);
fila.appendChild(casilla1);
var casilla2 = document.createElement("td");
var textoCasilla2 = document.createTextNode(json[i].squirrel);
casilla2.appendChild(textoCasilla2);
fila.appendChild(casilla2);
if(json[i].squirrel){
  console.log("Aqui");
  fila.style.backgroundColor="red";
  t+=1;
}
tabla.appendChild(fila);

}
division.appendChild(tabla);
tabla.setAttribute("width", "80%");
tabla.setAttribute("frame", "void");
tabla.setAttribute("rules", "rows");
createTableEvents(json,t);
}

function createTableEvents(json,posibles){
  var eventos=[{valor:"a",tp:0,tn:0,fp:0,fn:0,a:0,totales:0}];

for(var i =0;i<json.length;i++){
  
  for(let x in json[i].events){
    let evento = json[i].events[x];
    let index = eventos.map((o) => o.valor).indexOf(evento);
    if(index== -1){
    eventos.push({valor:evento,tp:0,tn:0,fp:0,fn:0,a:1,totales:0});
    
    index=eventos.length-1;
  }else
  {
    eventos[index].a+=1;
  }

    if(json[i].squirrel){
      eventos[index].tp+=1;    
    console.log("si"+eventos[index].tp);

  }
    else
    {
      eventos[index].fn+=1;
    }
  
}



}
eventos.splice(0,1);
for(var i=0;i<eventos.length;i++){  
  eventos[i].fp=posibles-eventos[i].tp;
  eventos[i].tn=(json.length-posibles)-eventos[i].fn;
  console.log("Prueba "+eventos[i].tp+" y verdaderos"+ posibles);
}
let total=0;
console.log(eventos);
let m=0;
for(let y in eventos){
  
  total=((eventos[m].tp*eventos[m].tn)-(eventos[m].fp*eventos[m].fn))/(Math.pow(((eventos[m].tp+eventos[m].fp)*(eventos[m].tp+eventos[m].fn)*(eventos[m].tn+eventos[m].fp)*(eventos[m].tn+eventos[m].fn)),(1/2)));
  console.log(eventos[m].fn+" y m es "+m+" y tp es : "+eventos[m].tp);
  console.log(eventos[m].a+" y m es "+m+" y tp es : "+eventos[m].tp+" y tn es : "+eventos[m].tn+" y fp es : "+eventos[m].fp+" y fn es : "+eventos[m].fn);
  console.log(total);
  eventos[m].totales=total;
  m+=1;
    
}
ordenar(eventos,"totales");
var division = document.getElementById("tabla2");
var tabla=document.createElement("table");
var encabezados = document.createElement("tr");
var encabezado1 = document.createElement("th");
var texto1 = document.createTextNode("#");
encabezado1.appendChild(texto1);
encabezados.appendChild(encabezado1);
encabezado1.setAttribute("width", "15%");
var encabezado2 = document.createElement("th");
var texto2 = document.createTextNode("Event");
encabezado2.appendChild(texto2);
encabezados.appendChild(encabezado2);
var encabezado3 = document.createElement("th");
var texto3 = document.createTextNode("Correlation");
encabezado3.appendChild(texto3);
encabezados.appendChild(encabezado3);
tabla.appendChild(encabezados);
for (var i = 0; i < eventos.length; i++) {
  // Crea las hileras de la tabla
  var fila = document.createElement("tr");
  var casilla0 = document.createElement("th");
var textoCasilla0 = document.createTextNode(i+1);
casilla0.appendChild(textoCasilla0);
fila.appendChild(casilla0);
var casilla1 = document.createElement("td");
var textoCasilla1= document.createTextNode(eventos[i].valor);
casilla1.appendChild(textoCasilla1);
fila.appendChild(casilla1);
var casilla2 = document.createElement("td");
var textoCasilla2 = document.createTextNode(eventos[i].totales);
casilla2.appendChild(textoCasilla2);
fila.appendChild(casilla2);
tabla.appendChild(fila);

}
division.appendChild(tabla);
tabla.setAttribute("width", "80%");
tabla.setAttribute("frame", "void");
tabla.setAttribute("rules", "rows");
  }
 


