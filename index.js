'use strict';

var Manager = require('./src/database/dbManager')


class Main {

    constructor() {
        this.run()
    }

    async run(){
        var db = new  Manager({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'bifrost'
        });

        //var lista =  await db.table('usuario').printSql().set('nombre','Fabio').where('usuario', '=', 'demo3').update();
        var usuario = {codigo: 'FAB2', nombre: 'Cuenta demo2', tipo_cuenta : 'CAJA GENERAL', esActiva : true,
            saldo_inicial: 1000.20};
        var lista = await db.table('cuenta').insert(usuario);
        console.log("id: "+lista);
    }
}

module.exports = new Main()