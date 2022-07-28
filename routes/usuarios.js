const express = require('express');
const router = express.Router();
const mysql = require('../database/mysql.js').pool; // pegando o arquivo com a conexão
const bcrpyt = require('bcrypt'); // biblioteca para fazer a criptografar as senhas

// ACESSO

router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Bem vindo a minha API na área de usuários'
    });
});

// MOSTRA TODOS USUARIOS

router.get('/all', (req,res,next) => {

    mysql.getConnection((error, conn) => {       // conectando ao db para fazer um post
        
        // realizando a query
        conn.query(
            'SELECT id, email FROM usuarios',    
            (error, resultado, fields) => {
                conn.release(); //libera a conexão após a query por estar usando createPool
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(200).send({
                    resultado
                });
            }
        );
    });
});


// CADASTRO
router.post('/cadastro', (req,res,next) => {
    
    mysql.getConnection( (error, conn) => {
        bcrpyt.hash(req.body.senha, 10, (errBcrpyt, hash) => {

            if (errBcrpyt) { return res.status(500).send({ error: errBcrpyt }) };

            conn.query('INSERT INTO usuarios (email, senha) VALUES (?,?)', 
                [req.body.email, hash],
                (error, results) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: errBcrpyt }) };

                    return res.status(201).send({
                        mensagem: 'Usuário criado com sucesso',
                        Usuario: {
                            email: req.body.email,
                            id: results.insertId
                        }
                    });
            });
        });
    });
});

// LOGIN
router.post('/login', (req,res,next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })};
        
        const query = `SELECT * FROM usuarios WHERE email = ?`;

        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error })}

            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            };
            
            bcrpyt.compare(req.body.senha, results[0].senha, (err, results) => {
                if (results) {
                    return res.status(201).send({ mensagem: 'Autenticação feita com sucesso'});
                } else {
                    return res.status(401).send({ mensagem: 'Falha na autenticação, usuário ou senha inválidos' });
                }
            });
        });
    });
});

module.exports = router;
