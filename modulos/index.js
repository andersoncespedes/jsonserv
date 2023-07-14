import rutas from "./rutasController.js";
const borrar       = document.getElementById("borrar");
const elementRutas = document.getElementById("rutas");

const select       = document.getElementById("rutas");
const puntos       = document.getElementById("puntos");

window.onload = async function(){
    const rutasDatos       = await rutas.getRutas();
    elementRutas.innerHTML = "";
    rutasDatos.forEach(element => {
        elementRutas.innerHTML += `
            <option value = "${element.id}" onclick= "buscar(this)">${element.NomRuta}</option>`; 
    })
}
select.addEventListener("click",async (ev) => {
    puntos.innerHTML = ""
    const id         = parseInt( ev.target.value ) 
    const valores    = await rutas.getRelateTable(id);

    valores.forEach(e => {
        puntos.innerHTML += `
        <div class = "col-md-4 ">
            <div class = "card">
                <div class="card-body">
                    <h4 class= "card-head">${e.NomPuntos}</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            
        </div>
        
        `;
    })
})
