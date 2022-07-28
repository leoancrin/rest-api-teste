const express = require('express');
const router = express.Router();

// Rotas na raiz do localhost:3000

//PEGA TODOS OS ELEMENTOS
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Usando GET pela rota na pasta routes'
    });
});

// CRIA UM ELEMENTO
router.post('/', (req,res,next) => {
    res.status(201).send({
        mensagem: 'Usando POST pela rota na pasta routes'
    });
});

// Rotas para elemento exclusivo

// PEGA ELEMENTO EXCLUSIVO
router.get('/:id_rota', (req,res,next) => {
    
    const id = req.params.id_rota;

    if (id === 'rota2'){
        res.status(200).send({
            mensagem: 'Voce pegou o id especial na rota GET para id exclusivo na url /rota2',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: '/rota2',
        });
    };

});


module.exports = router;