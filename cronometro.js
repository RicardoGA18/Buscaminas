var segundos=1;
var minutos=0;
var myvar;

function crearCronometro(){
    var body = document.getElementsByTagName("body")[0];

    var supercrono = document.createElement("div");
    supercrono.setAttribute("class","supercrono");

    var cronos = document.createElement("div");
    cronos.setAttribute("class", "cajacrono");

    var cr1 = document.createElement("div");
    cr1.setAttribute("class","cajitacrono");

    var cr2 = document.createElement("div");
    cr2.setAttribute("class","cajitacrono");

    var cr3 = document.createElement("div");
    cr3.setAttribute("class","cajitacrono");

    var cr4 = document.createElement("div");
    cr4.setAttribute("class","cajitacrono");

    var cr5 = document.createElement("div");
    cr5.setAttribute("class","cajitacrono");


    var min1 = new Image();
    min1.src = "./images/cero.svg";
    min1.setAttribute("class", "imagenes");
    min1.setAttribute("id", "min1");

    var min2 = new Image();
    min2.src = "./images/cero.svg";
    min2.setAttribute("class", "imagenes");
    min2.setAttribute("id", "min2");

    var sec1 = new Image();
    sec1.src = "./images/cero.svg";
    sec1.setAttribute("class", "imagenes");
    sec1.setAttribute("id", "sec1");

    var sec2 = new Image();
    sec2.src = "./images/cero.svg";
    sec2.setAttribute("class", "imagenes");
    sec2.setAttribute("id", "sec2");

    var tp = new Image();
    tp.src = "./images/points.svg";
    tp.setAttribute("class", "imagenes");

    cr1.appendChild(min1);
    cr2.appendChild(min2);
    cr3.appendChild(tp);
    cr4.appendChild(sec1);
    cr5.appendChild(sec2);

    cronos.appendChild(cr1);
    cronos.appendChild(cr2);
    cronos.appendChild(cr3);
    cronos.appendChild(cr4);
    cronos.appendChild(cr5);

    supercrono.appendChild(cronos);

    body.appendChild(supercrono);
}

function empezarCronometro(){
    myvar = setInterval(empezarCrono,1000);
}

function empezarCrono(){
    var crono1 = document.getElementById("min1");
    var crono2 = document.getElementById("min2");
    var crono3 = document.getElementById("sec1");
    var crono4 = document.getElementById("sec2");

    var sec1 = Math.floor(segundos/10);
    var sec2 = segundos - (sec1*10);

    // console.log(sec1,sec2);

    var min1 = Math.floor(minutos/10);
    var min2 = minutos - (min1*10);

    // console.log(min1,min2);

    var papa1 = crono1.parentNode;
    var papa2 = crono2.parentNode;
    var papa3 = crono3.parentNode;
    var papa4 = crono4.parentNode;

    papa1.removeChild(crono1);
    papa2.removeChild(crono2);
    papa3.removeChild(crono3);
    papa4.removeChild(crono4);

    var minuto1 = new Image();
    minuto1.src = obtenerUrlBoton(min1);
    minuto1.setAttribute("class", "imagenes");
    minuto1.setAttribute("id", "min1");

    var minuto2 = new Image();
    minuto2.src = obtenerUrlBoton(min2);
    minuto2.setAttribute("class", "imagenes");
    minuto2.setAttribute("id", "min2");

    var segundo1 = new Image();
    segundo1.src = obtenerUrlBoton(sec1);
    segundo1.setAttribute("class", "imagenes");
    segundo1.setAttribute("id", "sec1");

    var segundo2 = new Image();
    segundo2.src = obtenerUrlBoton(sec2);
    segundo2.setAttribute("class", "imagenes");
    segundo2.setAttribute("id", "sec2");
    
    papa1.appendChild(minuto1);
    papa2.appendChild(minuto2);
    papa3.appendChild(segundo1);
    papa4.appendChild(segundo2);

    if(minutos==59)
    {
        minutos = 0;
        segundos = 0;
    }
    else{
        if(segundos == 59)
        {
            minutos++;
            segundos = 0;
        }
        else
        {
            segundos++;
        }
    }
}

function detenerCronometro(){
    clearInterval(myvar);
}