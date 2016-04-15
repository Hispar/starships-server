var schema = require('../../db');

var Manufacturer = schema.define('manufacturers', {
    name: {type: schema.String, "null": false, unique: true, index: true},
    icon: {type: schema.String},
    code: {type: schema.String, "null": false, unique: true, index: true}
}, {
    indexes: {
        idx_1: {
            columns: 'name'
        },
        idx_2: {
            columns: 'code'
        }
    }
});

module.exports = Manufacturer;