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

#####Selects



```js
var dbManager = require('node_modules/@netsaj/mysql-client')
var db = new dbManager();

// SELECT ONE

var user = await db.table('users')
.where('email', '=','asd@domain.com')
.first();

// SELECT ALL
var users_list = await db.table('users')
.all();
```

You can select especific fields of your table
```js
var users_list = await db.table('users')
.select('name, email')
.all();
```


#####Where

put the field you wanna filter, one operator (=, >, <, <=, >=, <>) and the value to search

```js
var users_list = await db.table('users')
.where('active', '=', true)
.select('name, email')
.all();
```
if you need add more fields you can continue put where clouses
```js
var users_list = await db.table('users')
.select('name, email')
.where('active', '=', true)
.where('age', '>', 25)
.all();
```
the options that you can use be:
* where
```js
.where('age', '>', 25)
//age > 25
```
* whereNull
```js
.whereNull('age')
// ... age IS NULL
```
* whereNoNull
```js
.whereNoNull('age')
// ... age IS NOT NULL
```
* whereOr
```js
.whereOr('age','=',30)
// ... OR age = 30
```
* whereRaw /whereOrRaw

is used when needs complex expressions
```js
.whereRaw(" LOWER(city) = 'cucuta' ")
// other example with OR
.whereOrRaw(" DATE(create_at) = '2018-10-12' ")
```

#####insert

```js
// the json var
var user = {
    name: 'fabio moreno',
    email: 'asd@domain.com',
    age: 25,
    active: true
}
  
// select the table and sent the json to create
cont id = await db.table('users')
.insert(user);
   
    
// return the autoincrement id
console.log(id)
print>_ 10
```

#####edit

```js
// the json var
var user = {
    name: 'fabio moreno',
    email: 'das@domain.com',
    age: 30,
    active: false
}
  
// select the table and sent the json to create
cont afect = await db.table('users')
.where('id', '=', 10)
.edit(user);
   
    
// return the numbers of rows that afected by the query
console.log(afect)
print>_ 1


```

other method is:

````js
cont afect = await db.table('users')
.set('email', 'das@domain.com')
.set('age',30)
.set('active',false)
.where('id', '=',10)
.update()
   
// return the numbers of rows that afected by the query
console.log(afect)
print>_ 1
````


#####delete


````js
cont afect = await db.table('users')
.where('email', 'like', 'das@%')
.delete()
  
// return the numbers of rows that afected by the query
console.log(afect)
print>_ 1

````



=======================

Copyright (c) 2018, Fabio Moreno <fabiomoreno@outlook.com>

Licence ISC