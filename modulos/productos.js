import Modelo from './modelo.js';
class Productos extends Modelo{
    constructor(){
        super();
        this.api = "product";
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