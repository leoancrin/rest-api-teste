const mysql = require('mysql2');

// Criando conexão com banco de dados

const host = process.env.MYSQL_host;
const user = process.env.MYSQL_user;
const password = process.env.MYSQL_password;
const db =  process.env.MYSQL_database;

var pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: db
});

exports.pool = pool;