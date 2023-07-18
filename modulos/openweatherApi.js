import Modelo from './modelo.js';
class OpenWeather extends Modelo{
    constructor(){
        super();
        this.pred = "Departamentos";
        this._APIKEY = "585a8c88552cb19f024fe4e76a3b03ee";
    }
    async getWeather(lat, lon){
        try{
            const req = await fetch(`${this.api}lat=${lat}&lon=${lon}&appid=${this._APIKEY}`);
            const datos = await req.json();
            return datos;
        }catch(err){
            console.log(err);
        }
    }
}
const openWeather = new OpenWeather();
export default openWeather;