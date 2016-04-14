var express = require('express');
var app = express();
var fs = require("fs");

var manufacturer = {
    "id": 3,
    "name": "Anvil Aeroespace",
    "icon": "https://robertsspaceindustries.com/media/w0o33qmdai9wpr/icon/Anvil.png",
    "_links": {
        "self": {
            "href": "http://localhost:3000/manufacturer/3"
        }
    }
};


app.get('/listManufacturers', function (req, res) {
    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.get('/addManufacturer', function (req, res) {
    // First read existing manufacturers.
    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(manufacturer);
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/manufacturer/:id', function (req, res) {
    // First read existing manufacturers.
    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
        manufacturers = JSON.parse(data);
        var manufacturer = manufacturers.find(function (obj) {
            return obj.id == req.params.id;
        });
        console.log(manufacturer);
        res.end(JSON.stringify(manufacturer));
    });
});

app.get('/deleteManufacturer', function (req, res) {
    // First read existing manufacturers.
    fs.readFile(__dirname + "/" + "manufacturers.json", 'utf8', function (err, data) {
        data = JSON.parse(data);

        var x = data.findIndex(function (obj) {
            return obj.id === 2;
        });
        delete data[x];
        res.end(JSON.stringify(data));
    });
});


var server = app.listen(8888, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});