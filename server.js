// server.js

// BASE SETUP
// =============================================================================

// database models
var Manufacturer = require('./app/models/manufacturer');
//var Test = require('./app/models/test');


// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// on routes that end in /manufacturers
// ----------------------------------------------------
router.route('/manufacturers')
    // create a manufacturer (accessed at POST http://localhost:8080/api/manufacters)
    .post(function (req, res) {

        //var test = new Test;
        //test.name = req.body.name;
        if (!req.body.code){
            res.send({message: 'No code sent for manufacturer'});
            return;
        }

        var manufacturer = new Manufacturer (
            {
                code: req.body.code,
                name: req.body.name,
                icon: req.body.icon
            });
        manufacturer.isValid(function (isValid) {
            if(isValid) {
                manufacturer.save(function (err) {
                    if(err) {
                        return res.send(err);
                    }
                    res.json({message: 'Manufacturer created!'});
                    //console.log('user created');
                });
            } else {
                //console.log('user validation error:', user.errors);
                res.send(manufacturer.errors);
            }
        });
    })

    // get all the manufacters (accessed at GET http://localhost:8080/api/manufacters)
    .get(function (req, res) {
        Manufacturer.find(function (err, manufacters) {
            if (err)
                res.send(err);
            else
                res.json(manufacters);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//
//
//app.get('/listManufacturers', function (req, res) {
//    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
//        console.log(data);
//        res.end(data);
//    });
//});
//
//app.get('/addManufacturer', function (req, res) {
//    // First read existing manufacturers.
//    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
//        data = JSON.parse(data);
//        data.push(manufacturer);
//        console.log(data);
//        res.end(JSON.stringify(data));
//    });
//});
//
//app.get('/manufacturer/:id', function (req, res) {
//    // First read existing manufacturers.
//    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
//        manufacturers = JSON.parse(data);
//        var manufacturer = manufacturers.find(function (obj) {
//            return obj.id == req.params.id;
//        });
//        console.log(manufacturer);
//        res.end(JSON.stringify(manufacturer));
//    });
//});
//
//app.get('/deleteManufacturer', function (req, res) {
//    // First read existing manufacturers.
//    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
//        data = JSON.parse(data);
//
//        var x = data.findIndex(function (obj) {
//            return obj.id === 2;
//        });
//        delete data[x];
//        res.end(JSON.stringify(data));
//    });
//});
//
//
//var server = app.listen(8888, function () {
//
//    var host = server.address().address;
//    var port = server.address().port;
//
//    console.log("Example app listening at http://%s:%s", host, port);
//});