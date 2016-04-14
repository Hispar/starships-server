var schema = require('../../db');

var Manufacturer = schema.define('manufacturers', {
    name: {type: schema.String, unique: true},
    icon: {type: schema.String},
    code: {type: schema.String, unique: true}
}, {});

module.exports = Manufacturer;

