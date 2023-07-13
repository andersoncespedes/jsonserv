import productos from "./productos.js";
const borrar = document.getElementById("borrar")
const formulario = document.getElementById("datos");
formulario["guard"].addEventListener("click",(ev) => {
    ev.preventDefault();
    const obj = {
        "nombre":formulario.nombre.value,
        "edad":parseInt(formulario.edad.value)
    }
    productos.postProduct(obj);
})

borrar.addEventListener("click", () => {
    productos.deleteProduct(7);
})