const express = require('express');
const router = express.Router();

// Rotas na raiz do localhost:3000

//PEGA TODOS OS ELEMENTOS
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Bem vindo a minha API'
    });
});

module.exports = router;