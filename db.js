//var caminte = require('caminte'),
//    Schema = caminte.Schema,
//    config = {
//        driver: "sqlite3",
//        database: "./db/mySite.db"
//    };
var caminte = require('caminte'),
    Schema = caminte.Schema,
    config = {
        driver     : "redis",
        host       : "localhost",
        port       : "6379",
        database   : "test"
    };

var schema = new Schema(config.driver, config);

module.exports = schema;