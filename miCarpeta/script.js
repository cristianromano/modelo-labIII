function $(cadena) {
  return document.getElementById(cadena);
}

function crearTabla(item) {
  let nombre = item.nombre;
  let apellido = item.apellido;
  let fecha = item.fecha;
  let sexo = item.sexo;
  let ID = item.id;

  let tabla = $("tabla");

  if (tabla == null) {
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla");
    let row = document.createElement("tr");
    let cabecera = document.createElement("th");
    let cabecera2 = document.createElement("th");
    let cabecera3 = document.createElement("th");
    let cabecera4 = document.createElement("th");
    let cabecera5 = document.createElement("th");
    let textoID = document.createTextNode("ID ");
    let textoNombre = document.createTextNode("NOMBRE ");
    let textoApellido = document.createTextNode("APELLIDO ");
    let textFecha = document.createTextNode("FECHA ");
    let textSexo = document.createTextNode("SEXO ");
    tabla.appendChild(row);
    row.appendChild(cabecera);
    row.appendChild(cabecera2);
    row.appendChild(cabecera3);
    row.appendChild(cabecera4);
    row.appendChild(cabecera5);
    cabecera.appendChild(textoNombre);
    cabecera2.appendChild(textoApellido);
    cabecera3.appendChild(textFecha);
    cabecera4.appendChild(textSexo);
    cabecera5.appendChild(textoID);

    tablaGeneral = $("tablaNueva");
    tablaGeneral.appendChild(tabla);
  } else {
    let row = document.createElement("tr");
    let data = document.createElement("td");
    let data2 = document.createElement("td");
    let data3 = document.createElement("td");
    let data4 = document.createElement("td");
    let data5 = document.createElement("td");
    let textoNombre = document.createTextNode(nombre);
    let textoApellido = document.createTextNode(apellido);
    let textFecha = document.createTextNode(fecha);
    let textSexo = document.createTextNode(sexo);
    let textID = document.createTextNode(ID);
    row.appendChild(data);
    row.appendChild(data2);
    row.appendChild(data3);
    row.appendChild(data4);
    row.appendChild(data5);
    data.appendChild(textoNombre);
    data2.appendChild(textoApellido);
    data3.appendChild(textFecha);
    data4.appendChild(textSexo);
    data5.appendChild(textID);

    tabla.appendChild(row);
    tablaGeneral = $("tablaNueva");
    tablaGeneral.appendChild(tabla);
    tabla.addEventListener("click", mostrarPopUp);

    tablaGeneral.addEventListener("click", autoCompletado);
  }

  window.addEventListener("load", () => {
    let btn = document.getElementById("envio");
    btn.addEventListener("click", crearTabla);
  });
}

function modificar(usuario) {
  var xhhtp = new XMLHttpRequest();
  // document.getElementById("loader").style.display = "flex";
  document.getElementById("popup").style.display = "none";
  xhhtp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = this.response;
      console.log(respuesta);
      let tabla = document.getElementById("tabla");
      tabla.childNodes.forEach(tr => {
        if (tr.rowIndex+1 == parseInt(usuario.id)) {
         
          // document.getElementById("loader").style.display = "none";
          tr.childNodes[0].innerHTML = usuario.nombre;
          tr.childNodes[1].innerHTML = usuario.apellido;
          tr.childNodes[2].innerText = usuario.fecha;
          tr.childNodes[3].innerText = usuario.sexo;
          tr.childNodes[4].innerText = usuario.id;
          return;
        }
      });
    }
  };

  xhhtp.open("POST", "http://localhost:3000/editar", true);
  xhhtp.setRequestHeader("content-type", "application/json");
  xhhtp.send(JSON.stringify(usuario));
}

function eliminar(usuario) {
  var xhhtp = new XMLHttpRequest();
  document.getElementById("loader").style.display = "flex";
  document.getElementById("popup").style.display = "none";
  xhhtp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = this.response;
      let tabla = document.getElementById("tabla");
      tabla.childNodes.forEach(tr => {
        if (tr.rowIndex+1 == parseInt(usuario.id)) {
          tabla.removeChild(tr);
          document.getElementById("loader").style.display = "none";
          return;
        }
      });
      
      console.log(respuesta);
    }
  };

  xhhtp.open("POST", "http://localhost:3000/eliminar", true);
  xhhtp.setRequestHeader("content-type", "application/json");
  xhhtp.send(JSON.stringify(usuario));
}

function traePersonas() {
  var xhhtp = new XMLHttpRequest();
  xhhtp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = this.response;
      let personaOBJ = JSON.parse(respuesta);
      for (let item of personaOBJ) {
        // console.log(item.nombre);
        crearTabla(item);
      }
    }
  };

  xhhtp.open("GET", "http://localhost:3000/personas", true);
  xhhtp.send();
}


function modificarPersona() {
  let $nombre = document.getElementById("txtNombre").value;
  let $apellido = document.getElementById("txtApellido").value;
  let $sexo = document.getElementsByName("sexo");
  // console.log(sexo.length);
  for (i = 0; i < $sexo.length; i++) {
    if ($sexo[i].checked) {
      //var memory=memo[i].checked;
      $genero = $sexo[i].value;
      // console.log($genero);
    }
  }
  let $fecha = document.getElementById("txtFecha").value;
  let $ID = document.getElementById("txtID").value;

  let usuarioModificado = {
    id: $ID,
    nombre: $nombre,
    apellido: $apellido,
    fecha: $fecha,
    sexo: $genero,
  };

  modificar(usuarioModificado);

}

function eliminarPersona() {
  let $nombre = document.getElementById("txtNombre").value;
  let $apellido = document.getElementById("txtApellido").value;
  let $sexo = document.getElementsByName("sexo");
  // console.log(sexo.length);
  for (i = 0; i < $sexo.length; i++) {
    if ($sexo[i].checked) {
      //var memory=memo[i].checked;
      $genero = $sexo[i].value;
      // console.log($genero);
    }
  }
  let $fecha = document.getElementById("txtFecha").value;
  let $ID = document.getElementById("txtID").value;

  let usuarioModificado = {
    id: $ID,
    nombre: $nombre,
    apellido: $apellido,
    fecha: $fecha,
    sexo: $genero,
  };

  eliminar(usuarioModificado);

}



window.addEventListener("load", () => {
  let btn = document.getElementById("modificar");
  btn.addEventListener("click", modificarPersona);
});

window.addEventListener("load", () => {
  let btn = document.getElementById("eliminar");
  btn.addEventListener("click", eliminarPersona);
  // btn.addEventListener("click", eliminarRow);
});

window.addEventListener("load", () => {
  let btn = document.getElementById("traerPersonas");
  btn.addEventListener("click", ()=>{
    document.getElementById("traerPersonas").style.display = 'none';
  });
});

// funcion solo para probar 
function eliminarRow(){
  let tabla = document.getElementById("tabla");
  tabla.childNodes.forEach(value => {
    console.log(value.rowIndex+1);

  });
}


function mostrarPopUp() {
  document.getElementById("popup").style.display = "block";
}

function cerrarPopUp() {
  document.getElementById("popup").style.display = "none";
}

function autoCompletado(e) {
  document.getElementById("txtID").value =
    e.target.parentNode.lastChild.innerHTML;
  document.getElementById("txtNombre").value =
    e.target.parentNode.firstChild.innerHTML;
  document.getElementById("txtApellido").value =
    e.target.parentNode.firstChild.nextSibling.innerHTML;

  let sexo = e.target.parentNode.lastChild.innerHTML;
  if (sexo == "Male") {
    document.getElementById("txtSexoH").checked = true;
  } else {
    document.getElementById("txtSexoM").checked = true;
  }

  document.getElementById("txtFecha").value =
    e.target.parentNode.firstChild.nextSibling.nextSibling.innerHTML;
  //    console.log(e.target.parentNode.firstChild.innerHTML);
  //    console.log(e.target.parentNode.firstChild.nextSibling.innerHTML);
  //    document.getElementById("textApellido").value = item.apellido;
}
