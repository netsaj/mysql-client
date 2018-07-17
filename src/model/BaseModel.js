'use strict';

var dbManager = require('../database/dbManager')

class BaseModel {

    table = ''

    constructor(){

    }



    HasMany(model, primary, foreign){
        var otherTable = require(global.config.app.folder + '/'+ model)
        let db = new dbManager();
        db.table()
    }




}

module.exports = BaseModel;