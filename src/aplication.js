var express 	= require("express"); 
var app 	= express();
var bodyParser 	= require('body-parser');
var request 	= require("request");

// URL con contenido JSON demostrativo.
var url 	= "https://www.datos.gov.co/resource/gt2j-8ykr.json"

// Soporte para bodies codificados en jsonsupport.
app.use(bodyParser.json());
// Soporte para bodies codificados
app.use(bodyParser.urlencoded({ extended: true })); 
 
// Ejemplo: GET http://localhost:8080/users
// Consumimos datos Covid Colombia de la URL: https://www.datos.gov.co/resource/gt2j-8ykr.json
app.get('/users', function(req, res) {
	request({
	    url: url,
	    json: false
	}, function (error, response, body) {
        
        let result = JSON.parse(body)
        console.log(result[0])
        

	    if (!error && response.statusCode === 200) {
            // Pintamos la respuesta JSON en navegador.
            const masculino = result.filter(val => val.sexo === 'M') 
            const femenino = result.filter(val => val.sexo === 'F')
            const veinte = result.filter(val => val.edad <=20)
            const cuarenta = result.filter(val => val.edad > 20 && val.edad <=40)
            const mayorCuarenta = result.filter(val => val.edad > 40 )

            res.send(femenino) 
             
        }
        
	})
});
 
//Ejemplo: GET http://localhost:8080/items/3
app.get('/users/:id', function(req, res) {

	var itemId = req.params.id;

	request({
	    url: url+itemId,
	    json: false
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	// Pintamos la respuesta JSON en navegador.
	        res.send(body) 
	    }
	})
})
  
var server = app.listen(8080, function () {
    console.log('Server is running..'); 
    
   
});
