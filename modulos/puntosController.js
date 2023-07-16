import Modelo from './modelo.js';
class Puntos extends Modelo{
    constructor(){
        super();
        this.api = "Puntos";
    }
    async getPuntos(){
        try{
            const req = await fetch(`${this.http}${this.api}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async postPuntos(body){
        try{
            const req = await fetch(`${this.http}${this.api}`, this.config("POST", body));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async deletePuntos(id){
        try{
            const req = await (await fetch(`${this.http}${this.api}/${id}`, this.config("DELETE", id)));
            const datos = await (await req.json());
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async UpdatePuntos(body,id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`, this.config("PUT", body));
            const datos = await req.json();
        }catch(err){
            console.log(err);
        }
    }
}
const puntos = new Puntos();
export default puntos;