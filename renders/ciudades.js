import departamento from "../modulos/departamentoController.js";
import ciudad from "../modulos/ciudadController.js";
const formulario = document.getElementById("GuardarP");
const tabla      = document.getElementById("table");
const formAct    = document.getElementById("actPunto");
window.onload = async function(){
    const datosDepartamentos  = await departamento.getDepartamentos();
    const datosCiudades = await ciudad.getCiudades();
    datosDepartamentos.forEach(element => {
        formulario.rutas.innerHTML += `<option value= "${element.id}">${element.nomDepartamento}</option>`;
        formAct.rutas.innerHTML    += `<option value= "${element.id}">${element.nomDepartamento}</option>`;
    });
    datosCiudades.forEach(async element => {
        const {lat, lon} = element.coordenadas;
        let dep      = await (await departamento.getDepartamentoById(parseInt(element.DepartamentoId)));
        let row      = tabla.insertRow(0)
        let t1       = row.insertCell(0);
        let t2       = row.insertCell(1);
        let t3       = row.insertCell(2);
        let t4       = row.insertCell(3);
        let t5       = row.insertCell(4)
        let t6       = row.insertCell(5);
        t1.innerHTML = element.id;
        t2.innerHTML = element.nomCiudad;
        t3.innerHTML = "direccion";
        t4.innerHTML = dep.nomDepartamento;
        t5.innerHTML = `Lat: ${lat}, lon: ${lon}`
        t6.innerHTML = `
        <button id = "delete${element.id}" class = "btn btn-danger">Eliminar</button>
        <button id = "actualizar${element.id}" data-bs-toggle="modal" data-bs-target="#ActualizarRuta"  class = "btn btn-warning">Actualizar</button>
        `;
        let eliminarBtn = document.getElementById("delete"+element.id);
        let actualizarBtn = document.getElementById("actualizar"+element.id);
        eliminarBtn.addEventListener("click", eliminarCiudad);
        actualizarBtn.addEventListener("click", actualizarCiudad)
    })
}
async function eliminarCiudad(param){
    const id = parseInt( param.target.getAttribute("id").match(/[0-9]/gi).join(""));
    await ciudad.deleteCiudad(id);
}
function actualizarCiudad(param){
    const id = parseInt( param.target.getAttribute("id").match(/[0-9]/gi).join(""));
    formAct.Act.value = id;
}

formulario.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const obj = {
        "nomCiudad":formulario.nombrePunto.value,
        "DepartamentoId":formulario.rutas.value,
        "imagen":formulario.imagenRuta.value,
        "coordenadas":{
            "lat":formulario.lat.value,
            "lon":formulario.lon.value
        }
    }
    await ciudad.postCiudad(obj);
});

formAct.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    let id = parseInt(formAct.Act.value)
    console.log(id);
    const obj = {
        "nomCiudad":formAct.nombrePunto.value,
        "DepartamentoId":formAct.rutas.value,
        "imagen":formAct.imagenRuta.value,
        "coordenadas":{
            "lat":formAct.lat.value,
            "lon":formAct.lon.value
        }
    }
    await ciudad.UpdateCiudad(obj, id);
    formAct.reset();
} )