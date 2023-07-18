import departamento from "../modulos/departamentoController.js";
import ciudad from "../modulos/ciudadController.js";

const formulario   = document.getElementById("GuardarR");
const table        = document.getElementById("table");
const formAct      = document.getElementById("ActRuta")
window.onload = async function(){
    const departamentoDatos   =  await departamento.getDepartamentos();
    departamentoDatos.sort(e => e.id).forEach( element => {
        let row      = table.insertRow(0)
        let t1       = row.insertCell(0);
        let t2       = row.insertCell(1);
        let t3       = row.insertCell(2);
        t1.innerHTML = element.id;
        t2.innerHTML = element.nomDepartamento;
        t3.innerHTML = `
        <button id = "delete${element.id}" class = "btn btn-danger">Eliminar</button>
        <button id = "actualizar${element.id}" data-bs-toggle="modal" data-bs-target="#ActualizarRuta"  class = "btn btn-warning">Actualizar</button>
        `;
        let eliminarBtn = document.getElementById("delete"+element.id);
        let actualizarBtn = document.getElementById("actualizar"+element.id);
        eliminarBtn.addEventListener("click", eliminarRuta)
        actualizarBtn.addEventListener("click", actualizarDepartamento)

    });
}
async function eliminarRuta(param){
    const id = parseInt( param.target.getAttribute("id").match(/[0-9]/gi).join(""));
    const filtroPuntos = await (await departamento.getRelateTable(id));
    filtroPuntos.forEach(async e => {
        await (await ciudad.deleteCiudad(e.id))
    })
    await (await departamento.deleteDepartamento(id))
}
function actualizarDepartamento(param){
    const id = parseInt( param.target.getAttribute("id").match(/[0-9]/gi).join(""));
    formAct.Act.value = id;
}

formulario.addEventListener("submit",async (ev) => {
    ev.preventDefault();
    const obj = {
        "nomDepartamento":formulario.nombreRuta.value,
    }
    await (await departamento.postDepartamento(obj));
    
})

formAct.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    let id = parseInt(formAct.Act.value)
    console.log(id);
    const obj = {
        "nomDepartamento":formAct.nombreRuta.value,
    }
    await departamento.UpdateDepartamento(obj, id);
    formAct.reset();
} )