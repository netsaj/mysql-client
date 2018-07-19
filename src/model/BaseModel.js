'use strict';

var dbManager = require('../database/dbManager')

class BaseModel {

    /**
     * the connection to mysql server
     * @type {dbManager}
     * @private
     */
    __connection;

    /**
     * * the table associated with the model
     * @type {string}
     * @private
     */
    _table = '';

    /**
     * the primary key for the model
     * @type {string}
     * @private
     */
    _primaryKey = 'id';

    /**
     * the primary key "type" of the model
     * @type {string}
     * @private
     */
    _keyType = 'int';

    /**
     * Indicates if the ID is autoincrementing
     * @type {boolean}
     * @private
     */
    _incrementing = true;

    /**
     * The realations eager load on every query
     * @type {Array}
     * @private
     */
    _with = [];

    /**
     * The realationship counts on every query
     * @type {Array}
     * @private
     */
    _withCount = [];

    /**
     * The number of models return for pagination
     * @type {number}
     * @private
     */
    _perPage = 15;

    /**
     * Indicate if the model exists.
     * @type {boolean}
     * @private
     */
    _exists = false;

    /**
     * Indicates if the model was inserted during the current lifecycle
     * @type {boolean}
     * @private
     */
    _wasRecentlyCreated = false;

    _attributes = [];









    constructor(table, attributes){
        this._table = table;
        this._attributes = attributes;
        // restaure the global connection to mysql server
        var connection = global.__database.connection;
        //if the connection is not defined, start a new connection
        if(connection === undefined || connection == null){
            connection = new dbManager();
        }å
        this.__connection = connection;

    }



    HasMany(model, primary, foreign){
        var otherTable = require(global.config.app.folder + '/'+ model)
        let db = new dbManager();
        db.table()
    }

    save(){
        this.__connection.table(this._table).edit()
    }




}

module.exports = BaseModel;