var schema = require('../../db');

var Test = schema.define('tests', {
    name: {type: schema.String, "null": false, limit: 255, index: true},
});

module.exports = Test;
