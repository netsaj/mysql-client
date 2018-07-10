var mysql      = require('mysql');


class dbManager {

    constructor(params) {
        this._table = "";
        this._select = "*";
        this._set = "";
        this._db = "";
        this._joins = "";
        this._where = "";
        this._limit = "";
        this._insert = "";
        this._order_by = "";
        this._group_by = "";
        this._connection = mysql.createConnection(params);
        this._connection.connect();
    }

    table(table_name){
        this._table= table_name;
    }

    select(fields){
        this._select = fields;
    }

    disconnet(){
        this._connection.end();
    }
}