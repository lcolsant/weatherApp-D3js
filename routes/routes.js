

module.exports = function Route(app){


    var request = require('request');
    var api_data;
    var api_forecast;


    app.get('/', function(req, res){
        res.render('index');
    })


    app.post('/api', function(req, res){
        
        var location = req.body.location;
        
        // console.log(`city is: ${city.city}`);
        console.log(`location is: ${location}`);
        // res.render('index', {city:city.city})


        ////first API call to retrieve current weather information

        var apiKey = 'ab93560c3c304c6be78da42e40565e12';
        request(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&&appid=${apiKey}`, function(error,response,body) {

            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('statusCode:', response.statusCode);
            console.log('body:', body); 

            if(response.statusCode=='404'){
                let error_msg = 'City not found.';
                console.log(`error message: ${error_msg}`);
                res.render('index', {error:error_msg})
            }else{

            
            
                //parse string returned from api into object from traversal
                var body = JSON.parse(body);
                console.log(body.name); 

                api_data = {
                    location:location,
                    name:body.name,
                    temp:body.main.temp,
                    min_temp:body.main.temp_min,
                    max_temp:body.main.temp_max,
                    humidity:body.main.humidity,
                    pressure:body.main.pressure,
                }

                console.log(`data location ${api_data.location}`)
                console.log(`name is ${api_data.name}`)
                console.log(`temp is ${api_data.temp}`)

                //nested second API call to retrieve forecast data

                request(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&&appid=${apiKey}`, function(error,response,body) {

                
                console.log('error2:', error);
                console.log('statusCode2:', response && response.statusCode);
                var body2 = JSON.parse(body);
                console.log('body2:', body2);

                
                
        
                
                var dates = [];
                var temps = [];
                // var d = new Date();
                // for (var i=0; i<10; i++){
                //     dates.push(d.getDate(body2.list[i].dt_txt))
                // }
                for (var i=0; i<10; i++){
                    dates.push(body2.list[i].dt_txt)
                }
                for (var i=0; i<10; i++){
                    temps.push(body2.list[i].main.temp)
                }
                console.log(`dates are: ${dates}`);
                console.log(`temps are: ${temps}`);

                api_forecast = {
                    dates:dates,
                    temps:temps,
                }

                res.render('index', {data:api_data, forecast:api_forecast});
                
                // res.render('index', {data:api_data, myname:myname});

                });

             }


            ////////////////////////////////////end nested api call
        
        });
    
    })
    

}
