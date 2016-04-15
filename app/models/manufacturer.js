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

Manufacturer.validatesPresenceOf('name', 'code')

/* custom validator */
function nameValidator(err, done) {
    Manufacturer.findOne( { name : this.name }).exec(function (e,u) {
        if (u) { err(); }
        done();
    });
}

/* custom validator */
function codeValidator(err, done) {
    Manufacturer.findOne( { code : this.code }).exec(function (e,u) {
        if (u) { err(); }
        done();
    });
}

///* custom validation */
Manufacturer.validateAsync('code', codeValidator, {message: 'is duplicate'});
Manufacturer.validateAsync('name', nameValidator, {message: 'is duplicate'});

module.exports = Manufacturer;