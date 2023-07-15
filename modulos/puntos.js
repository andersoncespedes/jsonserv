import rutas from "./rutasController.js";
const formulario   = document.getElementById("GuardarP");
window.onload = async function(){
    let datos = await rutas.getRutas();
    datos.forEach(element => {
        formulario.rutas.innerHTML += `<option value= "${element.id}">${element.NomRuta}</option>`
    });
}
formulario.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    
    console.log(ev);
});