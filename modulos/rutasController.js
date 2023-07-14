import Modelo from './modelo.js';
class Rutas extends Modelo{
    constructor(){
        super();
        this.api = "Ruta";
        this.relation = "Puntos"
    }
    async getRutas(){
        try{
            const req = await fetch(`${this.http}${this.api}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async postRutas(body){
        try{
            const req = await fetch(`${this.http}${this.api}`, this.config("POST", body));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async deleteRutas(id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`, this.config("DELETE", id));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async getRelateTable(id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}/${this.relation}`, this.config("GET", id));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async UpdateRutas(body,id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`, this.config("PATCH", body));
            const datos = await req.json();
        }catch(err){
            console.log(err);
        }
    }
}
const rutas = new Rutas();
export default rutas;