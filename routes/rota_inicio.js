const express = require('express');
const router = express.Router();

// Rotas na raiz do localhost:3000

router.get('/', (request,response) => {
    response.render('pages/home.ejs');
});


router.get('/login', (request,response) => {
    response.render('pages/login.ejs');
});

router.get('/dashboard', (request,response) => {
    response.render('pages/dashboard.ejs');
});
//PEGA TODOS OS ELEMENTOS
/*
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Bem vindo a minha API'
    });
});
*/

module.exports = router;