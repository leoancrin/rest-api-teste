const express = require('express');
const PORT = process.env.PORT || 3000;

//teste


const app = express();

const rotaExemplo = require('./routes/rota_exemplo.js');
const rotaUsuario = require('./routes/usuarios.js');

app.use(express.json());

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Bem vindo a minha API'
    });
});

app.use('/exemplo', rotaExemplo);
app.use('/usuarios', rotaUsuario);

module.exports = app;