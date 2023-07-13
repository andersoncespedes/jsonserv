import Modelo from './modelo.js';
class Productos extends Modelo{
    constructor(){
        super();
        this.api = "product";
    }
    config(method, body){
        let bod = typeof body === "number" ? null : JSON.stringify(body) 
        return {
            method: method,
            headers: {
              'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
            },
            body: bod // Convertir el objeto a formato JSON
          };
    }
    async getProducts(){
        try{
            const req = await fetch(this.http + this.api);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async postProduct(body){
        try{
            const req = await fetch(this.http + this.api, this.config("POST", body));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async deleteProduct(id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`, this.config("DELETE", id));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
}
const productos = new Productos();
export default productos;