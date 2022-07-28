const mysql = require('mysql2');

// Criando conexão com banco de dados

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: ,
    database: 'rest_api_teste'
});

exports.pool = pool;