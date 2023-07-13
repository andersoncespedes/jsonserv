import productos from "./productos.js";
const borrar = document.getElementById("borrar")
document.addEventListener("click",() => {
   productos.postProduct(
    {
        "nombre":"jsadkas",
        "edad":123
    }) ;
})

borrar.addEventListener("click", () => {
    productos.deleteProduct(10);
})