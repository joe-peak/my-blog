let settings=reqiure('../settings.js');
let Db = require('mangodb').Db;
let Connection = require('mangodb').Connection;
let Server = require('mangodb').Server;
module.exports = new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT, {}));