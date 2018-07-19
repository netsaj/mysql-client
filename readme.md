# mysql-client
> FabioMoreno

Mysql client for nodejs

#### Build Setup

``` bash
#Install mysql-client
npm i @netsaj/mysql-client

# install dependencies
npm install

```

#### Configure
Define a global variable with the params of connection to mysql server
```js
/*index.js file*/

var config = {
    db :{
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'db_name'
    },
    app: {
        folder : __dirname //root folder app
    }
}
//nodejs globals vars
global.config = config;
```

#### Usage

```js
var dbManager = require('node_modules/@netsaj/mysql-client')
var db = new dbManager();

// SELECT ONE

var user = await db.table('users')
.where('email', '=','asd@domain.com')
.first();

var users_list = await db.table('users')
.where('active', '=',true)
.all();
```

#####Selects

do
* select('field1, field2, field3')


#####Where
* where
* whereNull
* whereNoNull
* whereOr
* whereRaw
* whereOrRaw





=======================

Copyright (c) 2018, Fabio Moreno <fabiomoreno@outlook.com>

Licence ISC