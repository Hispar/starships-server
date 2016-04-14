var schema = require('../../db');

var Ship = schema.define('ships', {
    model: {type: schema.String, unique: true},
    description: {type: schema.Text},
    image: {type: schema.String},
    max_crew: {type: schema.Integer},
    cargo_capacity: {type: schema.Integer}
}, {});

module.exports = Ship;
