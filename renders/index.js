import departamento from "../modulos/departamentoController.js";
import ciudad from "../modulos/ciudadController.js";
import openWeather from "../modulos/openweatherApi.js"

const borrar       = document.getElementById("borrar");
const elementRutas = document.getElementById("rutas");
const select       = document.getElementById("rutas");
const puntosHtml   = document.getElementById("puntos");

window.onload = async function(){
    const rutasDepartamento       = await departamento.getDepartamentos();
    elementRutas.innerHTML = `<option value= "inic">Selecione un Departamento</option>`;
    rutasDepartamento.forEach(element => {
        elementRutas.innerHTML += `
            <option value = "${element.id}" >${element.nomDepartamento}</option>`; 
    })
  await inicial();
}
async function inicial(){
    const allCiudades        = await ciudad.getCiudades();
    allCiudades.forEach(e => {
        puntosHtml.innerHTML += `
        <div class = "col-md-4 mt-3 text-center">
            <div class = "card">
                <div class="card-body">
                    <img src = "${e.imagen}" class="rImg">
                    <br>
                    <h4 class= "card-head">${e.nomCiudad}</h4>
                    <a href="#" id = "${e.id}" class="btn btn-primary clima" data-bs-toggle="modal" data-bs-target="#Status" ><span class = "fa fa-cloud-sun"></span></a>
                </div>
            </div>
        </div>
        
        `;
        
    })
    let clima = document.getElementsByClassName("clima");
    let clims = [...clima];
    clims.forEach(e => {
        e.addEventListener("click", weather);
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
        let valores    = await departamento.getRelateTable(parseInt(id) );
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
                        <h4 class= "card-head">${e.nomCiudad}</h4>
                        <a href="#" class="btn btn-primary clima" id="${e.id}" data-bs-toggle="modal" data-bs-target="#Status" ><span class = "fa fa-cloud-sun"></span></a>
                    </div>
                </div>
            </div>
            `;
            
        })
        
    }
    let clima = document.getElementsByClassName("clima");
    let clims = [...clima];
    clims.forEach(e => {
        e.addEventListener("click", weather);
    })
})

async function weather(){
    const nomcity = document.getElementById("nomCiudad")
    const temp    = document.getElementById("temp")
    const nubes  = document.getElementById("nubes")
    const latitud  = document.getElementById("latitud");
    const longitud  = document.getElementById("longitud");
    const viento    = document.getElementById("viento");
    const depa    = document.getElementById("depa");
    const presion    = document.getElementById("pres");
    const seaLevel   = document.getElementById("nMar")
    
    const img  = document.getElementById("imgR")
    let id             = this.getAttribute("id");
    const dato         = await ciudad.getCiudadById(parseInt(id))
    const departament = await departamento.getDepartamentoById(parseInt( dato.DepartamentoId)) ;
    const {lat, lon}   = dato.coordenadas;
    const clima        = await openWeather.getWeather(lat, lon)
    nomcity.innerHTML  = dato.nomCiudad;
    let realTemp       = clima.main["temp"] - 273.15
    temp.innerHTML     = realTemp.toFixed(2) + "°C";
    nubes.innerHTML    = clima.clouds.all + "%";
    latitud.innerHTML  = clima.coord.lat;
    longitud.innerHTML = clima.coord.lon;
    viento.innerHTML   = clima.wind.speed + "m/s"
    depa.innerHTML     = departament.nomDepartamento;
    presion.innerHTML  = clima.main.pressure;
    seaLevel.innerHTML = clima.main.sea_level;
    img.src = dato.imagen;
    console.log(clima);
}