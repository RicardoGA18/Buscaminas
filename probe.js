function cargarImagenes(){
    var body = document.getElementsByTagName("body")[0];

    var supercrono = document.createElement("div");
    supercrono.setAttribute("class","supercrono");
    supercrono.setAttribute("id","supercrono");

    var cronos = document.createElement("div");
    cronos.setAttribute("class", "cajacrono");

    var cr1 = document.createElement("div");
    cr1.setAttribute("class","cajitacrono");

    var min1 = new Image();
    min1.src = "./images/cero.svg";
    min1.setAttribute("class", "imagenes");
    min1.setAttribute("id", "min1");

    cr1.appendChild(min1);
    cronos.appendChild(cr1);
    supercrono.appendChild(cronos);
    body.appendChild(supercrono);

    for(i=0;i<=9;i++)
    {
        var imagen = document.getElementById("min1");
        var padre = imagen.parentNode;
        padre.removeChild(imagen);

        var num1 = new Image();
        num1.src = obtenerUrlBoton(i);
        num1.setAttribute("class", "imagenes");
        num1.setAttribute("id", "min1");
        padre.appendChild(num1);
        var newimagen = document.getElementById("min1");
        console.log(newimagen);
    }
    
    var sup = document.getElementById("supercrono");
    body.removeChild(sup);
}