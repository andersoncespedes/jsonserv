import rutas from "../modulos/rutasController.js";
import puntos from "../modulos/puntosController.js";

const borrar       = document.getElementById("borrar");
const elementRutas = document.getElementById("rutas");
const select       = document.getElementById("rutas");
const puntosHtml       = document.getElementById("puntos");

window.onload = async function(){
    const rutasDatos       = await rutas.getRutas();
    elementRutas.innerHTML = `<option value= "inic">Selecione una ruta</option>`;
    rutasDatos.forEach(element => {
        elementRutas.innerHTML += `
            <option value = "${element.id}" onclick= "buscar(this)">${element.NomRuta}</option>`; 
    })
  await inicial();
}
async function inicial(){
    const allPuntos        = await puntos.getPuntos();
    allPuntos.forEach(e => {
        puntosHtml.innerHTML += `
        <div class = "col-md-4 mt-3 text-center">
            <div class = "card">
                <div class="card-body">
                    <img src = "${e.imagen}" class="rImg">
                    <br>
                    <h4 class= "card-head">${e.NomPuntos}</h4>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        
        `;
    })
}
select.addEventListener("change",async (ev) => {
    puntosHtml.innerHTML = ""
    const id         =  ev.target.value 
    console.log(id);
    if( id == "inic"){
        await inicial();
    }
    else{
        let valores    = await rutas.getRelateTable(parseInt(id) );
        if(valores.length == 0){
            puntosHtml.innerHTML += `No Existen Datos Para Esta Ruta`
        }
        valores.forEach(e => {
            puntosHtml.innerHTML += `
            <div class = "col-md-4 mt-3 text-center">
                <div class = "card">
                    <div class="card-body">
                        <img src = "${e.imagen}" class="rImg">
                        <br>
                        <h4 class= "card-head">${e.NomPuntos}</h4>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            `;
        })
    }
   
})
