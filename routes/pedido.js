const express = require('express');
const router = express.Router();
const mysql = require('../mysql.js').pool; // pegando o arquivo com a conexão

// Rotas na raiz do localhost:3000

//PEGA TODOS OS PEDIDOS
router.get('/', (req,res,next) => {

    mysql.getConnection((error, conn) => {       // conectando ao db para fazer um post
        
        // realizando a query
        conn.query(
            'SELECT * FROM rest_api_teste',    
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

// CRIA UM PEDIDO
router.post('/', (req,res,next) => {

    mysql.getConnection((error, conn) => {       // conectando ao db para fazer um post
        
        // realizando a query
        conn.query(
            'INSERT INTO rest_api_teste (ordem_pedido, id_pedido, nome) VALUES (?,?,?)',
            [req.body.ordem_pedido,req.body.id_pedido,req.body.nome],     
            (error, resultado, fields) => {
                conn.release(); //libera a conexão após a query por estar usando createPool
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Pedido criado'
                });
            }
        );
    });

});

// Rotas para elemento exclusivo

// PEGA ELEMENTO EXCLUSIVO
router.get('/:ordem_pedido', (req,res,next) => {
    
    mysql.getConnection((error, conn) => {       // conectando ao db para fazer um post
        
        // realizando a query
        conn.query(
            'SELECT * FROM rest_api_teste WHERE ordem_pedido = ?;',
            [req.params.ordem_pedido],    
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


// REMOVE UM ELEMENTO
router.delete('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Usando rota DELETE pela pasta routes'
    });
});


module.exports = router;