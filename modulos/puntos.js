import rutas from "./rutasController.js";
import puntos from "./puntosController.js";

const formulario = document.getElementById("GuardarP");
const tabla      = document.getElementById("table");
const formAct    = document.getElementById("actPunto");
window.onload = async function(){
    const datosRutas  = await rutas.getRutas();
    const datosPuntos = await puntos.getPuntos();
    datosRutas.forEach(element => {
        formulario.rutas.innerHTML += `<option value= "${element.id}">${element.NomRuta}</option>`;
        formAct.rutas.innerHTML += `<option value= "${element.id}">${element.NomRuta}</option>`;
    });
    datosPuntos.forEach(element => {
        let row      = tabla.insertRow(0)
        let t1       = row.insertCell(0);
        let t2       = row.insertCell(1);
        let t3       = row.insertCell(2);
        let t4       = row.insertCell(3);
        let t5       = row.insertCell(4);
        t1.innerHTML = element.id;
        t2.innerHTML = element.NomPuntos;
        t3.innerHTML = element.imagen;
        t4.innerHTML = element.RutaId;
        t5.innerHTML = `
        <button id = "delete${element.id}" class = "btn btn-danger">Eliminar</button>
        <button id = "actualizar${element.id}" data-bs-toggle="modal" data-bs-target="#ActualizarRuta"  class = "btn btn-warning">Actualizar</button>
        `;
        let eliminarBtn = document.getElementById("delete"+element.id);
        let actualizarBtn = document.getElementById("actualizar"+element.id);
        eliminarBtn.addEventListener("click", eliminarPunto)
        actualizarBtn.addEventListener("click", actualizarPunto)
    })
}
async function eliminarPunto(param){
    const id = parseInt( param.target.getAttribute("id").match(/[0-9]/gi).join(""));
    await puntos.deletePuntos(id);
}
function actualizarPunto(param){
    const id = parseInt( param.target.getAttribute("id").match(/[0-9]/gi).join(""));
    formAct.Act.value = id;
}

formulario.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const obj = {
        "NomPuntos":formulario.nombrePunto.value,
        "RutaId":formulario.rutas.value,
        "imagen":formulario.imagenRuta.value
    }
    await puntos.postPuntos(obj);
});

formAct.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    let id = parseInt(formAct.Act.value)
    const obj = {
        "NomPuntos":formAct.nombrePunto.value,
        "RutaId":formAct.rutas.value,
        "imagen":formAct.imagenRuta.value
    }
    await puntos.UpdatePuntos(obj, id);
    formAct.reset();
} )