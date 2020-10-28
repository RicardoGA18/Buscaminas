var b = document.getElementById("boton").addEventListener("click", mostrarJuego);
var only1 = 1;
var game = [];
var rw;
var cl;
var bombita;
var neut = false;
var clicks = 0;
class Casilla
{
    constructor(v, b, c, r, cb){
        this.value = v;
        this.bomba = b;
        this.col = c;
        this.row = r;
        this.uso = cb;
    }
}

function mostrarJuego()
{
    if (only1==1)
    {
        var c = document.getElementById("col");
        var col = parseInt(c.value);
        cl = col;
        var r = document.getElementById("row");
        var row = parseInt(r.value);
        rw = row;
        var nb = document.getElementsByName("dificultad");
        var num_bomb=0;

        for(y=0;y<4;y++)
        {
            if (nb[y].checked==true)
            {
                switch(nb[y].value)
                {
                    case "easy":
                        num_bomb=Math.floor((10*col*row)/100);
                        break;
                    case "medium":
                        num_bomb=Math.floor((15*col*row)/100);
                        break;
                    case "hard":
                        num_bomb=Math.floor((20*col*row)/100);
                        break;
                    case "neutron":
                        neut = true;
                        num_bomb=Math.floor((50*col*row)/100);
                        break;
                }
            }
        }
        

        // var num_bomb = parseInt(nb.value);
        if((col>=10) && (row>=10) && (row<=30) && (col<=30) && (num_bomb!=0))
        {
            cargarImagenes();
            crearCronometro();
            crearTabla(col,row,num_bomb);
            // var multi = col*row;
            // for(var e=0; e<multi;e++){
            //     console.log(game[e]);
            // }
            only1++;
            for(a=0;a<(col*row);a++)
            {
                var c = game[a].value;
                document.getElementById(c).addEventListener("click",presionarBoton);
                document.getElementById(c).addEventListener("contextmenu",clickDerecho);

            }
        }
        else
        {
            alert("Ingrese bien los datos.");
        }
    }
    else
    {
        alert("Actualiza la página para volver a jugar");
    }
}

function crearTabla(col, row, bomb)
{
    var body = document.getElementsByTagName("body")[0];
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblHead = document.createElement("thead");
    var tblBody = document.createElement("tbody");
    bombita = 0;
    var hilo = document.createElement("tr");
    
    // Crea las celdas
    for (var i = 1; i <= row; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
    
        for (var j = 1; j <= col; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var val = (i*100)+j;
        var ballon = false;
        
        if(bombita<bomb)
        {
            var posibility = (bomb/(col*row))*100;
            var pos = aleatorio(1,100);
            // console.log(posibility,pos);
            if(pos<posibility)
            {
                ballon = true;
                bombita++;
            }
        }
        game.push(new Casilla(val,ballon,j,i,false));
        var celda = document.createElement("td");
        celda.setAttribute("class",val);
        // var textoCelda = document.createTextNode(i+", "+j);
        var botoncillo = document.createElement("button");
        botoncillo.type="button";
        var name = val;
        botoncillo.setAttribute("id",name);
        botoncillo.setAttribute("class","boton");
        celda.appendChild(botoncillo);
        hilera.appendChild(celda);
        }
    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }
    //creando imagenes
    var n1 = Math.floor(bombita/100);
    var n2 = Math.floor((bombita - (n1*100))/10);
    var n3 = bombita-((n1*100)+(n2*10));

    var nbomb1 = new Image();
    nbomb1.src = darUrl(n1);

    var nbomb2 = new Image();
    nbomb2.src = darUrl(n2);

    var nbomb3 = new Image();
    nbomb3.src = darUrl(n3);

    var bomba = new Image();
    bomba.src = "./images/icono.svg";

    var point = new Image();
    point.src = "./images/points.svg";

    //cabecera
    var div1 = document.createElement("div");
    div1.setAttribute("id", "div1");
    div1.setAttribute("class", "container");
    div1.appendChild(bomba);

    var div2 = document.createElement("div");
    div2.setAttribute("id", "div2");
    div2.setAttribute("class", "container");
    div2.appendChild(point);

    var div3 = document.createElement("div");
    div3.setAttribute("id", "div3");
    div3.setAttribute("class", "container");
    div3.appendChild(nbomb1);

    var div4 = document.createElement("div");
    div4.setAttribute("id", "div4");
    div4.setAttribute("class", "container");
    div4.appendChild(nbomb2);

    var div5 = document.createElement("div");
    div5.setAttribute("id", "div5");
    div5.setAttribute("class", "container");
    div5.appendChild(nbomb3);

    var cabeza1 = document.createElement("th");
    cabeza1.setAttribute("colspan",2);

    var cabeza2 = document.createElement("th");

    var cabeza3 = document.createElement("th");
    cabeza3.setAttribute("colspan",2);

    var cabeza4 = document.createElement("th");
    cabeza4.setAttribute("colspan",2);

    var cabeza5 = document.createElement("th");
    cabeza5.setAttribute("colspan",2);

    var nc = col - 9;
    var cabeza6 = document.createElement("th");
    cabeza6.setAttribute("colspan",nc);

    cabeza1.appendChild(div1);
    cabeza2.appendChild(div2);
    cabeza3.appendChild(div3);
    cabeza4.appendChild(div4);
    cabeza5.appendChild(div5);


    hilo.appendChild(cabeza1);
    hilo.appendChild(cabeza2);
    hilo.appendChild(cabeza3);
    hilo.appendChild(cabeza4);
    hilo.appendChild(cabeza5);
    hilo.appendChild(cabeza6);

    tblHead.appendChild(hilo);
    tabla.appendChild(tblHead);
    
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

function aleatorio(min, max){
    var resultado;
    resultado = Math.floor(Math.random()*(max-min+1))+min;
    return resultado;    
}

function darUrl(num){
    // console.log(num);
    switch(num){
        case 0:
            return "./images/crono0.svg";
            break;
        case 1:
            return "./images/crono1.svg";
            break;
        case 2:
            return "./images/crono2.svg";
            break;
        case 3:
            return "./images/crono3.svg";
            break;
        case 4:
            return "./images/crono4.svg";
            break;
        case 5:
            return "./images/crono5.svg";
            break;
        case 6:
            return "./images/crono6.svg";
            break;
        case 7:
            return "./images/crono7.svg";
            break;
        case 8:
            return "./images/crono8.svg";
            break;
        case 9:
            return "./images/crono9.svg";
            break;
        default:
            alert("Error!!!!!!");
    }
}

function presionarBoton(evento){
    if(clicks==0)
    {
        empezarCronometro();
        clicks=10;
    }
    var vs = evento.path[0];
    var value = vs.id;
    var cantidad = 0;
    var val = parseInt(value);
    var obval = reconocerObjeto(val);

    if(game[obval].bomba == false)
    {
        game[obval].uso =true;
        var arriba = val - 100;
        var obarriba = reconocerObjeto(arriba);
        var ms1 = game[obarriba]
        if(ms1){
            if(game[obarriba].bomba == true)
            {
                cantidad++;
            }
        }

        var abajo = val + 100;
        var obabajo = reconocerObjeto(abajo);
        var ms2 = game[obabajo];
        if(ms2)
        {
            if(game[obabajo].bomba == true)
            {
                cantidad++;
            }
        }

        var derecha = val + 1;
        var obderecha = reconocerObjeto(derecha);
        var ms3 = game[obderecha];
        if(ms3)
        {
            if(game[obderecha].bomba == true)
            {
                cantidad++;
            }
        }

        var izquierda = val - 1;
        var obizquierda = reconocerObjeto(izquierda);
        var ms4 = game[obizquierda];
        if(ms4)
        {
            if(game[obizquierda].bomba == true)
            {
                cantidad++;
            }
        }

        var arde = val - 99;
        var obarde = reconocerObjeto(arde);
        var ms5 = game[obarde];
        if(ms5)
        {
            if(game[obarde].bomba == true)
            {
                cantidad++;
            }
        }

        var ariz = val -101;
        var obariz = reconocerObjeto(ariz);
        var ms6 = game[obariz];
        if(ms6)
        {
            if(game[obariz].bomba == true)
            {
                cantidad++;
            }
        }

        var abde = val + 101;
        var obabde = reconocerObjeto(abde);
        var ms7 = game[obabde];
        if(ms7)
        {
            if(game[obabde].bomba == true)
            {
                cantidad++;
            }
        }

        var abiz = val + 99;
        var obabiz = reconocerObjeto(abiz);
        var ms8 = game[obabiz];
        if(ms8)
        {
            if(game[obabiz].bomba == true)
            {
                cantidad++;
            }
        }

        if (cantidad == 0)
        {
            var nametd =value;
            var caja = document.getElementById(nametd);
            if(caja)
            {
                var padre = caja.parentNode;
                padre.removeChild(caja);
            }

            presionarBotonVacio(abajo);
            presionarBotonVacio(arriba);
            presionarBotonVacio(derecha);
            presionarBotonVacio(izquierda);
            presionarBotonVacio(arde);
            presionarBotonVacio(ariz);
            presionarBotonVacio(abde);
            presionarBotonVacio(abiz);
        }
        else{
            var nametd = value;
            var caja = document.getElementById(nametd);
            if(caja)
            {
                var padre = caja.parentNode;
                padre.removeChild(caja);

                var numbo = new Image();
                numbo.src = obtenerUrlBoton(cantidad);
                numbo.setAttribute("class", "imagenes");
                padre.appendChild(numbo);
            }
        }
    }
    else
    {
        detenerCronometro();
        var nametd = value;
        var caja = document.getElementById(nametd);
        if(caja)
        {
            var padre = caja.parentNode;
            padre.removeChild(caja);

            var a = document.getElementsByClassName(nametd);
            a[0].style.backgroundColor="red";
        
            var numbo = new Image();
            numbo.src = "./images/icono.svg";
            numbo.setAttribute("class", "imagenes");
            padre.appendChild(numbo);

            var max = cl*rw;
            for(var f=0;f<max;f++)
            {
                var id = game[f].value;
                var botom = document.getElementById(id);
                if(botom)
                {
                    if((game[f].uso==false)&&(game[f].bomba==true))
                    {
                        var pap = botom.parentNode;
                        pap.removeChild(botom);
                        var bombilla = new Image();
                        bombilla.src = "./images/icono.svg";
                        bombilla.setAttribute("class", "imagenes");
                        pap.appendChild(bombilla);
                    }
                    else if((game[f].uso==true)&&(game[f].bomba==false))
                    {
                        var pap = botom.parentNode;
                        pap.removeChild(botom);
                        var bombilla = new Image();
                        bombilla.src = "./images/guerra.svg";
                        bombilla.setAttribute("class", "imagenes");
                        pap.appendChild(bombilla);
                    }
                    botom.removeEventListener("click",presionarBoton);
                    botom.removeEventListener("contextmenu",clickDerecho);
                    botom.addEventListener("contextmenu",desClick);
                }
            }
            if(neut==false)
            {
                var am1 = document.getElementById("head");
                var am2 = document.getElementById("body");
                var am3 = document.getElementById("foot");

                am1.innerHTML = "Lo siento, a la siguiente será.";
                am3.innerHTML = "Actualiza la página para volver a intentarlo.";
                var feliz = new Image();
                feliz.src = "./images/perdiste.svg";
                feliz.setAttribute("class","normalImage");
                am2.appendChild(feliz);
                mostrarModel();
            }
            else{
                var am1 = document.getElementById("head");
                var am2 = document.getElementById("body");
                var am3 = document.getElementById("foot");

                am1.innerHTML = "Era obvio.";
                am3.innerHTML = "Actualiza la página para volver a intentarlo.";
                var feliz = new Image();
                feliz.src = "./images/neutron.png";
                feliz.setAttribute("class","pinaculo");
                am2.appendChild(feliz);
                mostrarModel();
            }
        }
    }
    haGanado();
}

function presionarBotonVacio(value){
    var cantidad = 0;
    var val = parseInt(value);
    var obval = reconocerObjeto(val);

    if(game[obval]){
        if(game[obval].uso==false)
        {
            game[obval].uso = true;
            if(game[obval].bomba == false)
            {
                var arriba = val - 100;
                var obarriba = reconocerObjeto(arriba);
                var ms1 = game[obarriba]
                if(ms1){
                    if(game[obarriba].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var abajo = val + 100;
                var obabajo = reconocerObjeto(abajo);
                var ms2 = game[obabajo];
                if(ms2)
                {
                    if(game[obabajo].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var derecha = val + 1;
                var obderecha = reconocerObjeto(derecha);
                var ms3 = game[obderecha];
                if(ms3)
                {
                    if(game[obderecha].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var izquierda = val - 1;
                var obizquierda = reconocerObjeto(izquierda);
                var ms4 = game[obizquierda];
                if(ms4)
                {
                    if(game[obizquierda].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var arde = val - 99;
                var obarde = reconocerObjeto(arde);
                var ms5 = game[obarde];
                if(ms5)
                {
                    if(game[obarde].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var ariz = val -101;
                var obariz = reconocerObjeto(ariz);
                var ms6 = game[obariz];
                if(ms6)
                {
                    if(game[obariz].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var abde = val + 101;
                var obabde = reconocerObjeto(abde);
                var ms7 = game[obabde];
                if(ms7)
                {
                    if(game[obabde].bomba == true)
                    {
                        cantidad++;
                    }
                }

                var abiz = val + 99;
                var obabiz = reconocerObjeto(abiz);
                var ms8 = game[obabiz];
                if(ms8)
                {
                    if(game[obabiz].bomba == true)
                    {
                        cantidad++;
                    }
                }

                if (cantidad == 0)
                {
                    var nametd =value;
                    var caja = document.getElementById(nametd);
                    if(caja)
                    {
                        var padre = caja.parentNode;
                        padre.removeChild(caja);
                    }
                    presionarBotonVacio(arriba);
                    presionarBotonVacio(abajo);
                    presionarBotonVacio(derecha);
                    presionarBotonVacio(izquierda);
                    presionarBotonVacio(arde);
                    presionarBotonVacio(ariz);
                    presionarBotonVacio(abde);
                    presionarBotonVacio(abiz);
                }
                else{
                    var nametd = value;
                    var caja = document.getElementById(nametd);
                    if (caja)
                    {
                        var padre = caja.parentNode;
                        padre.removeChild(caja);

                        var numbo = new Image();
                        numbo.src = obtenerUrlBoton(cantidad);
                        numbo.setAttribute("class", "imagenes");
                        padre.appendChild(numbo);
                    }
                }
            }
            else
            {
                var nametd = value;
                var caja = document.getElementById(nametd);
                if(caja)
                {
                    var padre = caja.parentNode;
                    padre.removeChild(caja);

                    var numbo = new Image();
                    numbo.src = "./images/icono.svg";
                    numbo.setAttribute("class", "imagenes");
                    padre.appendChild(numbo);
                }
            }
        }
    }
}

function obtenerUrlBoton(url){
    switch(url)
    {
        case 0:
            return "./images/cero.svg";
            break;
        case 1:
            return "./images/uno.svg";
            break;
        case 2:
            return "./images/dos.svg";
            break;
        case 3:
            return "./images/tres.svg";
            break;
        case 4:
            return "./images/cuatro.svg";
            break;
        case 5:
            return "./images/cinco.svg";
            break;
        case 6:
            return "./images/seis.svg";
            break;
        case 7:
            return "./images/siete.svg";
            break;
        case 8:
            return "./images/ocho.svg";
            break;
        case 9:
            return "./images/nueve.svg";
            break;
        default:
            alert("peligro!!!");
    }
}

function reconocerObjeto(val){
    aux = cl * rw;
    for(v=0;v<aux;v++){
        ef = game[v].value;
        if(ef==val)
        {
            return v;
        }
    }
}

function clickDerecho(evento){
    evento.preventDefault();
    var value = evento.path[0];
    var val = value.id;
    var obj = reconocerObjeto(val);
    if(!game[obj])
    {
        var value = evento.path[1];
        var val = value.id;
        obj = reconocerObjeto(val);
    }
    if(game[obj].uso==false)
    {
        game[obj].uso = true;
        // console.log(game[obj].uso);
        //confeti
        var bot = document.getElementById(val);
        var confe = new Image();
        confe.src = "./images/partido.svg";
        var confex = "confe"+val;
        confe.setAttribute("id", confex);
        confe.setAttribute("class","confeti");
        bot.appendChild(confe);
        bot.removeEventListener("click",presionarBoton);

        //disminuir y dar bombita
        bombita=bombita-1;
        if(bombita>=0)
        {
            var num1 = Math.floor(bombita/100);
            var num2 = Math.floor((bombita - (num1*100))/10);
            var num3 = bombita - ((num1*100)+(num2*10));
            
            var marca1 = document.getElementById("div3");
            var marca2 = document.getElementById("div4");
            var marca3 = document.getElementById("div5");

            var padre1 = marca1.parentNode;
            var padre2 = marca2.parentNode;
            var padre3 = marca3.parentNode;

            padre1.removeChild(marca1);
            padre2.removeChild(marca2);
            padre3.removeChild(marca3);
            
            var nbum1 = new Image();
            nbum1.src = darUrl(num1);
            nbum1.setAttribute("class","imagenes");
            var cas1 = document.createElement("div");
            cas1.setAttribute("id","div3");
            cas1.setAttribute("class", "container");
            cas1.appendChild(nbum1);
            padre1.appendChild(cas1);

            var nbum2 = new Image();
            nbum2.src = darUrl(num2);
            nbum2.setAttribute("class","imagenes");
            var cas2 = document.createElement("div");
            cas2.setAttribute("id","div4");
            cas2.setAttribute("class", "container");
            cas2.appendChild(nbum2);
            padre2.appendChild(cas2);

            var nbum3 = new Image();
            nbum3.src = darUrl(num3);
            nbum3.setAttribute("class","imagenes");
            var cas3 = document.createElement("div");
            cas3.setAttribute("id","div5");
            cas3.setAttribute("class", "container");
            cas3.appendChild(nbum3);
            padre3.appendChild(cas3);
        }
    }
    else{
        game[obj].uso = false;
        //confeti
        var confex = "confe"+val;
        var bot = document.getElementById(confex);
        var dad = bot.parentNode;
        dad.removeChild(bot);
        var buton = document.getElementById(val);
        buton.addEventListener("click",presionarBoton);

        //aumentar y dar bombita
        bombita=bombita+1;
        if(bombita>=0)
        {
            var num1 = Math.floor(bombita/100);
            var num2 = Math.floor((bombita - (num1*100))/10);
            var num3 = bombita - ((num1*100)+(num2*10));
            
            var marca1 = document.getElementById("div3");
            var marca2 = document.getElementById("div4");
            var marca3 = document.getElementById("div5");

            var padre1 = marca1.parentNode;
            var padre2 = marca2.parentNode;
            var padre3 = marca3.parentNode;

            padre1.removeChild(marca1);
            padre2.removeChild(marca2);
            padre3.removeChild(marca3);
            
            var nbum1 = new Image();
            nbum1.src = darUrl(num1);
            var cas1 = document.createElement("div");
            cas1.setAttribute("id","div3");
            cas1.setAttribute("class", "container");
            cas1.appendChild(nbum1);
            padre1.appendChild(cas1);

            var nbum2 = new Image();
            nbum2.src = darUrl(num2);
            var cas2 = document.createElement("div");
            cas2.setAttribute("id","div4");
            cas2.setAttribute("class", "container");
            cas2.appendChild(nbum2);
            padre2.appendChild(cas2);

            var nbum3 = new Image();
            nbum3.src = darUrl(num3);
            var cas3 = document.createElement("div");
            cas3.setAttribute("id","div5");
            cas3.setAttribute("class", "container");
            cas3.appendChild(nbum3);
            padre3.appendChild(cas3);
        }
    }
    haGanado();
}

function haGanado(){
    var man = cl*rw;
    var usos = 0;
    for(var p=0;p<man;p++)
    {
        if(game[p].uso==true)
        {
            usos++;
        }
    }
    // console.log(bombita);
    // console.log(usos);
    if((bombita==0)&&(usos==man))
    {
        detenerCronometro();
        for(var g=0;g<man;g++)
        {
            var idi = game[g].value;
            var botome = document.getElementById(idi);
            if(botome)
            {
                botome.removeEventListener("click",presionarBoton);
                botome.removeEventListener("contextmenu",clickDerecho);
                botome.addEventListener("contextmenu",desClick);
            }
        }
        if(neut==false)
        {
            var am1 = document.getElementById("head");
            var am2 = document.getElementById("body");
            var am3 = document.getElementById("foot");

            am1.innerHTML = "FELICIDADES!";
            am3.innerHTML = "Lo lograste! Actualiza la página para volver a jugar.";
            var feliz = new Image();
            feliz.src = "./images/sonreir.svg";
            feliz.setAttribute("class","normalImage");
            am2.appendChild(feliz);
            mostrarModel();
        }
        else{
            var am1 = document.getElementById("head");
            var am2 = document.getElementById("body");
            var am3 = document.getElementById("foot");

            am1.innerHTML = "Es el pináculo de la evolución.";
            am3.innerHTML = "Lo lograste! Actualiza la página para volver a jugar.";
            var feliz = new Image();
            feliz.src = "./images/pinaculo.jpg";
            feliz.setAttribute("class","pinaculo");
            am2.appendChild(feliz);
            mostrarModel();
        }
    }
}
function desClick(e){
    e.preventDefault();
}