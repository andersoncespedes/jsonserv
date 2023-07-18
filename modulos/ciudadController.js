import Modelo from './modelo.js';
class Ciudad extends Modelo{
    constructor(){
        super();
        this.api = "Ciudades";
    }
    async getCiudades(){
        try{
            const req = await fetch(`${this.http}${this.api}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async getCiudadById(id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async postCiudad(body){
        try{
            const req = await fetch(`${this.http}${this.api}`, this.config("POST", body));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async deleteCiudad(id){
        try{
            const req = await (await fetch(`${this.http}${this.api}/${id}`, this.config("DELETE", id)));
            const datos = await (await req.json());
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async UpdateCiudad(body,id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`, this.config("PUT", body));
            const datos = await req.json();
        }catch(err){
            console.log(err);
        }
    }
}
const ciudad = new Ciudad();
export default ciudad;