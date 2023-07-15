class Modelo{
    constructor(){
        this.http = "http://localhost:3000/";
        this.http2 = "http://localhost:3001/"
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
}
export default Modelo;