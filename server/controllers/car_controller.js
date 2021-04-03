const cars = require('../models/car'); 
const bookings = require('../models/booking'); 

module.exports.add_car = function(req,res){
    console.log(req.body);
    var count;
    var car = cars.find({}).exec(function(err, results){
        count = results.length;
        console.log(count);
        count = count + 1;
        console.log(count);
        carid = "C" + count.toString();
        console.log(carid);
        req.body.carID = carid;
        cars(req.body).save(function(err){
            if(err){
                console.log("Error in adding the car to database");
                console.log(err);
                return res.status(404).end();
            }else{
                console.log("Car successfully added to the database");
                return res.status(200).end();
            }
        });
    });
}

module.exports.car_details = function(req,res){
    console.log("Request for details of car: " + req.body.carID);
    data = cars.find({carID:req.body.carID});
    res.json(data);
}

module.exports.getCarfromLocationAndDate = function(req,res){

}

