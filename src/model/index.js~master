var mysql = require('mysql');

class Model {

    __db__;

    constructor() {
        //this.__db__ = new dbMananger();
        //console.log(__dirname)


        this.__femrORM__ = {
            _table: "",
            __with: "",
            __select: "*",
            __set: "",
            __db: "",
            __joins: "",
            __where: "",
            __limit: "",
            __insert: "",
            __order_by: "",
            __group_by: "",
            __printsql: false,
            __fullInfo: {},
            __fields: {},
            __errors: {},
            ___connection___ : null
        }
        if(typeof global.__femrORM__ === "undefined" || global.__femrORM__ === null){
            this.__femrORM__.___connection___ = mysql.createConnection(global.config.db);
            this.__femrORM__.___connection___.connect();
            global.__femrORM__ = this.__femrORM__.___connection___;
        }else{
            this.__femrORM__.___connection___ = global.__femrORM__;
        }

    }

    table() {
        var file = __dirname.split("/");
        this.__femrORM__._table = file[file.length - 1].split('.')[0].toLowerCase();
        return this.__femrORM__, _table;
    }

    primaryKey() {
        return 'id';
    }



}


Model.prototype._getInfo = function () {
    return this.__femrORM__.__fullInfo;
}
Model.prototype._getFields = function () {
    return this.__femrORM__.__fields;
}
Model.prototype._getErrors = function () {
    return this.__femrORM__.__errors;
}
Model.prototype._table = function (table_name) {
    this.__femrORM__._table = table_name;
    return this;
}

Model.prototype.rightJoin = function (tabla, pk, fk) {
    this.__femrORM__.__joins += "   RIGHT JOIN  `" + tabla + "` ON `" + pk + "` = `" + fk + "` \n";
    return this;
}


Model.prototype.leftJoin = function (tabla, pk, fk) {
    this.__femrORM__.__joins += "   LEFT JOIN  `" + tabla + "` ON `" + pk + "` = `" + fk + "` \n";
    return this;
}


Model.prototype.join = function (tabla, pk, fk) {
    this.__femrORM__.__joins += "   JOIN  `" + tabla + "` ON `" + pk + "` = `" + fk + "` \n";
    return this;
}

Model.prototype.innerJoin = function (tabla, pk, fk) {
    this.__femrORM__.__joins += "   INNER JOIN  `" + tabla + "` ON (`" + pk + "` = `" + fk + "`) \n";
    return this;
}

Model.prototype.joinRaw = function (join) {
    this.__femrORM__.__joins += "   " + join + " \n";
    return this;
}


Model.prototype.where = function (campo, comparador, criterio) {
    if(typeof criterio == "undefined" || criterio == null){
        if (this.__femrORM__.__where.length == 0) {
            this.__femrORM__.__where = " `" + campo + "` = '" + comparador + "' ";
        } else {
            this.__femrORM__.__where += " AND `" + campo + "` =  '" + comparador + "' ";
        }
    }else{
        if (this.__femrORM__.__where.length == 0) {
            this.__femrORM__.__where = " `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
        } else {
            this.__femrORM__.__where += " AND `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
        }
    }

    return this;
}


Model.prototype.whereMD5 = function (campo , criterio) {
    if (this.__femrORM__.__where.length == 0) {
        this.__femrORM__.__where = " `" + campo + "` = MD5('" + criterio + "') ";
    } else {
        this.__femrORM__.__where += " AND `" + campo + "` = MD5('" + criterio + "') ";
    }
    return this;
}

Model.prototype.whereNull = function (campo) {
    if (this.__femrORM__.__where.length == 0) {
        this.__femrORM__.__where = " `" + campo + "` IS NULL ";
    } else {
        this.__femrORM__.__where += " AND `" + campo + "` IS NULL";
    }
    return this;
}




Model.prototype.whereNoNull = function (campo) {
    if (this.__femrORM__.__where.length == 0) {
        this.__femrORM__.__where = " `" + campo + "` IS NOT NULL ";
    }
    else {
        this.__femrORM__.__where += " AND `" + campo + "` IS NOT NULL";
    }
    return this;
}

Model.prototype.whereOr = function (campo, comparador, criterio) {
    if(typeof criterio == "undefined" || criterio == null){
        if (this.__femrORM__.__where.length == 0) {
            this.__femrORM__.__where = " `" + campo + "` = '" + comparador + "' ";
        } else {
            this.__femrORM__.__where += " OR `" + campo + "` =  '" + comparador + "' ";
        }
    }
    if (this.__femrORM__.__where.length == 0) {
        this.__femrORM__.__where = " `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
    } else {
        this.__femrORM__.__where += " OR `" + campo + "` " + comparador.toUpperCase() + " '" + criterio + "' ";
    }
    return this;
}

Model.prototype.whereRaw = function (rawString) {
    if (this.__femrORM__.__where.length == 0) {
        this.__femrORM__.__where = rawString;
    } else {
        this.__femrORM__.__where += " AND ( " + rawString + " ) ";
    }
    return this;
}

Model.prototype.hereOrRaw = function (rawString) {
    if (this.__femrORM__.__where.length == 0) {
        this.__femrORM__.__where = rawString;
    } else {
        this.__femrORM__.__where += " OR ( " + rawString + " )";
    }
    return this;
}

Model.prototype.countRows = function () {
    this.__femrORM__.__select = " COUNT(*) ";
    return this;
}

Model.prototype.orderBy = function (campo, criterio) {
    if (this.__order_by.length == 0) {
        this.__femrORM__.__order_by = " `" + campo + "` " + criterio;
    } else {
        this.__femrORM__.__order_by += " ,  `" + campo + "` " + criterio;
    }
    return this;
}

Model.prototype.orderByAsc = function (campo) {
    if (this.__femrORM__.__order_by.length == 0) {
        this.__femrORM__.__order_by = "\nORDER BY `" + campo + "` ASC";
    } else {
        this.__femrORM__.__order_by += " ,  `" + campo + "` ASC";
    }
    return this;
}

Model.prototype.orderByDesc = function (campo) {
    if (this.__femrORM__.__order_by.length == 0) {
        this.__femrORM__.__order_by = "\nORDER BY `" + campo + "` DESC";
    } else {
        this.__femrORM__.__order_by += " ,  `" + campo + "` DESC";
    }
    return this;
}

Model.prototype.groupBy = function (campo) {
    if (this.__femrORM__.__group_by.length == 0) {
        this.__femrORM__.__group_by = "\nGROUP BY `" + campo + "` ";
    } else {
        this.__femrORM__.__group_by += " ,  `" + campo + "` ";
    }
    return this;
}

Model.prototype.set = function (campo, valor) {
    let value = valor;
    if (valor == ("true") || valor == true) {
        value = "1";
    } else if (valor == ("false") || valor == false) {
        value = "0";
    }
    if (this.__femrORM__.__set.length == 0) {
        if (valor == null) {
            this.__femrORM__.__set = " `" + campo + "` = NULL ";
        } else {
            this.__femrORM__.__set = " `" + campo + "` = '" + value + "'";
        }

    } else {
        if (valor == null) {
            this.__femrORM__.__set += " , `" + campo + "` = NULL ";
        } else {
            this.__femrORM__.__set += " , `" + campo + "` = '" + value + "' ";
        }

    }
    return this;
}


Model.prototype.setNULL = function (campo) {
    if (this.__femrORM__.__set.length == 0) {
        this.__femrORM__.__set = "`" + campo + "` = NULL ";
    } else {
        this.__femrORM__.__set += " , `" + campo + "` = NULL ";
    }
    return this;
}

Model.prototype.limit = function (cantidad, inicial) {
    this.__femrORM__.__limit = " LIMIT " + cantidad + ", " + inicial;
    return this;
}

Model.prototype.select = function (fields) {
    this.__femrORM__.__select = fields;
    return this;
}

Model.prototype.disconnet = function () {
    this.__femrORM__.___connection___.end();
}

Model.prototype._____sql = function (tipo) {
    this.__femrORM__._table = this['table'].call(this);
    if (tipo == ("delete")) {
        let sql
            = "DELETE FROM `" + this.__femrORM__._table + "` ";
        if (!this.__femrORM__.__where.length == 0) {
            sql += " WHERE " + this.__femrORM__.__where;
        }
        if (this.__femrORM__.__printsql) {
            //console.log(_____sql);
        }
        return sql;
    } else if (tipo == ("select")) {

        let sql
            = "SELECT " + "\n"
            + this.__femrORM__.__select
            + " FROM `" + this.__femrORM__._table + "`  " + this.__femrORM__.__joins + " "
            + "\n";
        if (!this.__femrORM__.__where.length == 0) {
            sql += " WHERE " + this.__femrORM__.__where + "\n";
        }
        sql += this.__femrORM__.__group_by + "\n" + this.__femrORM__.__order_by;
        sql += this.__femrORM__.__limit;
        if (this.__femrORM__.__printsql) {
            console.log(sql);
        }
        return sql;
    }

    else if (tipo == ("update")) {
        let sql
            = "UPDATE `" + this.__femrORM__._table + "` SET "
            + this.__femrORM__.__set
            + "";
        if (!this.__femrORM__.__where.length == 0) {
            sql += " WHERE " + this.__femrORM__.__where;
        }
        if (this.__femrORM__.__printsql) {
            //console.log(_____sql);
        }
        return sql;
    } else {
        if (this.__femrORM__.__printsql) {
            System.out.println(" === NO SQL GENERATE ===");
        }
        return "";
    }
}

Model.prototype.printSql = function () {
    this.__femrORM__.__printsql = true;
    return this;
}

Model.prototype.all = async function () {
    var _this = this;
    return new Promise(await function (resolve, reject) {
        _this.__femrORM__.___connection___.query(_this._____sql('select'), async function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            var array = [];
            var _res = JSON.parse(JSON.stringify(results));
            if(_res.length === 0){
                return resolve(array);
            }
            for (var i = 0; i < _res.length; i++) {
                for (var key in _res[i]) {
                    ////console.log(key);
                    //console.log('[' + i + '][' + key + "]=" + _res[i][key]);
                    _this[key] = _res[i][key];
                }
                if (_this.__femrORM__.__with.length > 0) {
                    var _incluir = _this.__femrORM__.__with.split(",");
                    for (var j = 0; j < _incluir.length; j++) {
                        var model = _incluir[j];
                        if (typeof _this[model] === "function") {
                            var list = await _this[model].call(_this);
                            _this["__" + model] = list;
                        }
                    }
                }
                array.push(_this);
            }
            return resolve(array);
        })
    });
}

Model.prototype.get = async function () {
    var _this = this;
    return new Promise(await function (resolve, reject) {
        _this.__femrORM__.___connection___.query(_this._____sql('select'), async function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            var array = [];
            var _res = JSON.parse(JSON.stringify(results));
            return resolve(_res);
        })
    });
}
Model.prototype.first = async function () {
    var _this = this;

    return new Promise(await function (resolve, reject) {
        _this.__femrORM__.___connection___.query(_this._____sql('select'), async function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            var array = [];
            var _res = JSON.parse(JSON.stringify(results));
            if(_res.length === 0){
                return resolve(null);
            }
            for (var i = 0; i < _res.length; i++) {
                for (var key in _res[i]) {
                    ////console.log(key);
                    //console.log('[' + i + '][' + key + "]=" + _res[i][key]);
                    _this[key] = _res[i][key];
                }
                if (_this.__femrORM__.__with.length > 0) {
                    var _incluir = _this.__femrORM__.__with.split(",");
                    for (var j = 0; j < _incluir.length; j++) {
                        var model = _incluir[j];
                        if (typeof _this[model] === "function") {
                            var list = await _this[model].call(_this);
                            _this["__" + model] = list;
                        }
                    }
                }
                array.push(_this);
            }
            return resolve(_this);
        })
    })
}

Model.prototype.find = async function(id){
    return await this.where(this.primaryKey(), '=', id).first();
}


Model.prototype.last = async function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.__femrORM__.___connection___.query(_this._____sql('select'), function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            return resolve(JSON.parse(JSON.stringify(results[results.length - 1])))
        })
    })
}

Model.prototype.delete = async function () {
    var _this = this;
    var pk = _this['primaryKey'].call(this);
    _this.where(pk, '=', this[pk]);
    return new Promise(function (resolve, reject) {
        _this.__femrORM__.___connection___.query(_this._____sql('delete'), function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            //console.log(results);
            //console.log("========")
            return resolve(results.affectedRows);
        })
    })
}
Model.prototype.update = async function () {
    var _this = this;
    //console.log(_this._____sql('update'));
    return new Promise(function (resolve, reject) {
        _this.__femrORM__.___connection___.query(_this._____sql('update'), function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            //console.log(results);
            //console.log("========")
            return resolve(results.changedRows);
        })
    })
}


Model.prototype.insert = async function () {
    var _this = this;
    var key;
    var map = {} ;
    for (key in this) {
        if (typeof this[key] !== "function" && key.indexOf('__') === -1 && key !== '_table') {
            //console.log(key + " : " + typeof this[key]);
            //this.set(key, this[key]);
            map[key] = this[key];
        }

    }
    return new Promise(function (resolve, reject) {
        _this.__femrORM__.___connection___.query("INSERT INTO `" + _this.table() + "` SET ? ", map, function (error, results, fields) {
            _this.__femrORM__.__fullInfo = results;
            _this.__femrORM__.__fields = fields;
            _this.__femrORM__.__errors = error;
            if (error) throw error;
            return resolve(results.insertId);
        })
    })
}
Model.prototype.save = async function(){
    var _id = await this.insert();
    this[this.primaryKey()] = _id;
}
Model.prototype.edit = async function () {
    var key;
    for (key in this) {
        if (typeof this[key] !== "function" && key.indexOf('__') === -1 && key !== '_table') {
            //console.log(key + " : " + typeof this[key]);
            this.set(key, this[key]);
        }

    }
    return await this.update();
}

Model.prototype.with = function (models) {
    if (this.__femrORM__.__with.length == 0) {
        this.__femrORM__.__with = models.trim();
    } else {
        this.__femrORM__.__with += "," + models.trim();
    }
    //console.log("modelo '" + this.table() + "' con : " + this.__femrORM__.__with);
    return this;
};

Model.prototype.toJSON = function(){
    return JSON.parse(this);
}

//=== REVISAR ===
Model.prototype.init = function(obj){
    for (var key in obj){
        console.log(key);
        if(this.hasOwnProperty(key)){
            this[key]= obj[key];
        }
    }
}


Model.prototype.hasMany = async function (model, primaryKey, foreignKey) {

    var modelo = new model();
    modelo.__femrORM__.__printsql = this.__femrORM__.__printsql;
    //console.log(this["__"+modelo.table()])
    if (this.hasOwnProperty("__" + modelo.table()) && typeof this["__" + modelo.table()] !== "function") {
        //    console.log("entro por with")
        return this["__" + modelo.table()];
    }
    var relaciones = "";
    //console.log("hizo consulta despues");
    var _incluir = this.__femrORM__.__with.split(',');
    for (var i = 0; i < _incluir.length; i++) {
        if (_incluir[i].indexOf(modelo.table() + ".") >= 0) {
            relaciones += relaciones.length == 0 ? _incluir[i].replace(modelo.table() + ".", "")
                : "," + _incluir[i].replace(modelo.table() + ".", "");
        }
    }
    //console.log("hizo consulta despues");
    var lista = await modelo.where(foreignKey, '=', this[primaryKey]).with(relaciones)
        .all();
    this["__" + modelo.table()] = lista;
    //console.log(this.__femrORM__.__with);
    return this["__" + modelo.table()];

}

Model.prototype.belongsTo = async function (model, primaryKey, foreignKey) {

    var modelo = new model();
    modelo.__femrORM__.__printsql = this.__femrORM__.__printsql;
    //console.log(this["__"+modelo.table()])
    if (this.hasOwnProperty("__" + modelo.table()) && typeof this["__" + modelo.table()] !== "function") {
        //    console.log("entro por with")
        return this["__" + modelo.table()];
    }
    var relaciones = "";
    //console.log("hizo consulta despues");
    var _incluir = this.__femrORM__.__with.split(',');
    for (var i = 0; i < _incluir.length; i++) {
        if (_incluir[i].indexOf(modelo.table() + ".") >= 0) {
            relaciones += relaciones.length == 0 ? _incluir[i].replace(modelo.table() + ".", "")
                : "," + _incluir[i].replace(modelo.table() + ".", "");
        }
    }
    var lista = await modelo.where(primaryKey, '=', this[foreignKey]).with(relaciones).first();
    this["__" + modelo.table()] = lista;
    //console.log(this.__femrORM__.__with);
    return this["__" + modelo.table()];

}



export default Model;