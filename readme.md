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

global.config = config;
```

#### Usage

####-insert

=======================

Copyright (c) 2018, Fabio Moreno <fabiomoreno@outlook.com>

Licence ISC