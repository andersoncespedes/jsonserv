import Modelo from './modelo.js';
class Departamento extends Modelo{
    constructor(){
        super();
        this.api = "Departamentos";
        this.relation = "Ciudades"
    }
    async getDepartamentos(){
        try{
            const req = await fetch(`${this.http}${this.api}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async getDepartamentoById(id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async postDepartamento(body){
        try{
            const req = await fetch(`${this.http}${this.api}`, this.config("POST", body));
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
    async deleteDepartamento(id){
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
    async UpdateDepartamento(body,id){
        try{
            const req = await fetch(`${this.http}${this.api}/${id}`, this.config("PATCH", body));
            const datos = await req.json();
        }catch(err){
            console.log(err);
        }
    }
}
const departamento = new Departamento();
export default departamento;