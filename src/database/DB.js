'use strict';

var mysql = require('mysql');


class DB {

    constructor() {
        console.log(__dirname)
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
        this._connection = mysql.createConnection(global.config.db);
        this._connection.connect();
        this.printsql = false;
        this.__fullInfo = {};
        this.__fields = {};
        this.__errors = {};
    }

    _getInfo(){
        return this.__fullInfo;
    }
    _getFields(){
        return this.__fields;
    }
    _getErrors(){
        return this.__errors;
    }
    table(table_name) {
        this._table = table_name;
        return this;
    }

    rightJoin(tabla, pk, fk) {
        this._joins += "   RIGHT JOIN  `" + tabla + "` ON `" + pk + "` = `" + fk + "` \n";
        return this;
    }


    leftJoin(tabla, pk, fk) {
        this._joins += "   LEFT JOIN  `" + tabla + "` ON `" + pk + "` = `" + fk + "` \n";
        return this;
    }


    join(tabla, pk, fk) {
        this._joins += "   JOIN  `" + tabla + "` ON `" + pk + "` = `" + fk + "` \n";
        return this;
    }

    innerJoin(tabla, pk, fk) {
        this._joins += "   INNER JOIN  `" + tabla + "` ON (`" + pk + "` = `" + fk + "`) \n";
        return this;
    }

    joinRaw(join) {
        this._joins += "   " + join + " \n";
        return this;
    }

    where(campo, comparador, criterio) {
        if (this._where.length == 0) {
            this._where = " `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
        } else {
            this._where += " AND `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
        }
        return this;
    }

    whereNull(campo) {
        if (this._where.length == 0) {
            this._where = " `" + campo + "` IS NULL ";
        } else {
            this._where += " AND `" + campo + "` IS NULL";
        }
        return this;
    }


    whereNoNull(campo) {
        if (this._where.length == 0) {
            this._where = " `" + campo + "` IS NOT NULL ";
        }
        else {
            this._where += " AND `" + campo + "` IS NOT NULL";
        }
        return this;
    }

    whereOr(campo, comparador, criterio) {
        if (this._where.length == 0) {
            this._where = " `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
        } else {
            this._where += " OR `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
        }
        return this;
    }

    whereRaw(rawString) {
        if (this._where.length == 0) {
            this._where = rawString;
        } else {
            this._where += " AND ( " + rawString + " ) ";
        }
        return this;
    }

    whereOrRaw(rawString) {
        if (this._where.length == 0) {
            this._where = rawString;
        } else {
            this._where += "OR ( " + rawString + " )";
        }
        return this;
    }

    countRows() {
        this._select = " COUNT(*) ";
        return this;
    }

    orderBy(campo, criterio) {
        if (this._order_by.length == 0) {
            this._order_by = " `" + campo + "` " + criterio;
        } else {
            this._order_by += " ,  `" + campo + "` " + criterio;
        }
        return this;
    }

    orderByAsc(campo) {
        if (this._order_by.length == 0) {
            this._order_by = "\nORDER BY `" + campo + "` ASC";
        } else {
            this._order_by += " ,  `" + campo + "` ASC";
        }
        return this;
    }

    orderByDesc(campo) {
        if (this._order_by.length == 0) {
            this._order_by = "\nORDER BY `" + campo + "` DESC";
        } else {
            this._order_by += " ,  `" + campo + "` DESC";
        }
        return this;
    }

    groupBy(campo) {
        if (this._group_by.length == 0) {
            this._group_by = "\nGROUP BY `" + campo + "` ";
        } else {
            this._group_by += " ,  `" + campo+"` ";
        }
        return this;
    }

    set(campo, valor) {
        let value = valor;
        if (valor == ("true") || valor == true) {
            value = "1";
        } else if (valor == ("false") || valor == false) {
            value = "0";
        }
        if (this._set.length == 0) {
            if (valor == null) {
                this._set = " `" + campo + "` = NULL ";
            } else {
                this._set = " `" + campo + "` = '" + value + "'";
            }

        } else {
            if (valor == null) {
                this._set += " , `" + campo + "` = NULL ";
            } else {
                this._set += " , `" + campo + "` = '" + value + "' ";
            }

        }
        return this;
    }


    setNULL(campo) {
        if (this._set.length == 0) {
            this._set = "`"+campo + "` = NULL ";
        } else {
            this._set += " , `" + campo + "` = NULL ";
        }
        return this;
    }

    limit(cantidad, inicial) {
        this._limit = " LIMIT " + cantidad + ", " + inicial;
        return this;
    }

    select(fields) {
        this._select = fields;
    }

    disconnet() {
        this._connection.end();
    }

    sql(tipo) {
        if (tipo == ("delete")) {
            let sql
                = "DELETE FROM `" + this._table + "` ";
            if (!this._where.length == 0) {
                sql += " WHERE " + this._where;
            }
            if (this.printsql) {
                console.log(sql);
            }
            return sql;
        } else if (tipo == ("select")) {

            let sql
                = "SELECT " + "\n"
                + this._select
                + " FROM `"+ this._table+ "`  " + this._joins + " "
                + "\n";
            if (!this._where.length == 0) {
                sql += " WHERE " + this._where + "\n";
            }
            sql += this._group_by + "\n" + this._order_by;
            sql += this._limit;
            if (this.printsql) {
                console.log(sql);
            }
            return sql;
        }

        else if (tipo == ("update")) {
            let sql
                = "UPDATE `" + this._table + "` SET "
                + this._set
                + "";
            if (!this._where.length == 0) {
                sql += " WHERE " + this._where;
            }
            if (this.printsql) {
                console.log(sql);
            }
            return sql;
        } else {
            if (this.printsql) {
                System.out.println(" === NO SQL GENERATE ===");
            }
            return "";
        }
    }

    printSql() {
        this.printsql = true;
        return this;
    }

    async all() {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query(_this.sql('select'), function (error, results, fields) {
                if (error) throw error;
                _this.__fullInfo = results;
                _this.__fields = fields;
                _this.__errors = error;
                return resolve(JSON.parse(JSON.stringify(results)))
            })
        })
    }

    async first(){
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query(_this.sql('select'), function (error, results, fields) {
                if (error) throw error;
                _this.__fullInfo = results;
                _this.__fields = fields;
                _this.__errors = error;
                return resolve(JSON.parse(JSON.stringify(results[0])))
            })
        })
    }

    async last(){
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query(_this.sql('select'), function (error, results, fields) {
                if (error) throw error;
                _this.__fullInfo = results;
                _this.__fields = fields;
                _this.__errors = error;
                return resolve(JSON.parse(JSON.stringify(results[results.length-1])))
            })
        })
    }

    async delete(){
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query(_this.sql('delete'), function (error, results, fields) {
                if (error) throw error;

                _this.__fullInfo = results;
                _this.__fields = fields;
                _this.__errors = error;
                console.log(results);
                console.log("========")
                return resolve(results.affectedRows);
            })
        })
    }
    async update(){
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query(_this.sql('update'), function (error, results, fields) {
                if (error) throw error;

                _this.__fullInfo = results;
                _this.__fields = fields;
                _this.__errors = error;
                console.log(results);
                console.log("========")
                return resolve(results.changedRows);
            })
        })
    }


    async insert(map){
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query("INSERT INTO `"+_this._table+"` SET ? ", map, function (error, results, fields) {
                if (error) throw error;
                _this.__fullInfo = results;
                _this.__fields = fields;
                _this.__errors = error;
                return resolve(results.insertId);
            })
        })
    }
    async edit(map){
        var key;
        for(key in map){
            this.set(key, map[key]);
        }
        return this.update();
    }



}

module.exports = DB