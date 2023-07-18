const modos = document.getElementById("modo");
const local = localStorage;
const titulo =document.getElementById("tit");
let modo  = local.getItem("modo")
if(modo == "Light"){
    modos.children[0].className = "fa fa-moon";
    document.body.className = "bg-light ";
    titulo.className = "text-dark";
}
else{
    document.body.className = "bg-dark";
    modos.children[0].className = "fa fa-sun";
    titulo.className = "text-white";


}
modos.addEventListener("click", (ev) => {
    modo  = local.getItem("modo")
    modos.children[0].className = modos.children[0].className == "fa fa-sun" ? "fa fa-moon" : "fa fa-sun";
    if(modo == "Light"){
        titulo.className = "text-white";
        local.setItem("modo","Dark");
        document.body.className = "bg-dark";

    }
    else{
        local.setItem("modo","Light");
        titulo.className = "text-dark";

        document.body.className = "bg-light";
    }
    
    console.log(local);
})