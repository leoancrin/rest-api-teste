const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

//teste


const app = express();

const rotaExemplo = require('./routes/rota_exemplo.js');
const rotaPaginas = require('./routes/rota_inicio.js');
const rotaUsuario = require('./routes/usuarios.js');

app.use(cors());
app.use(express.json());

//renderizar
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


app.use('/', rotaPaginas);
app.use('/exemplo', rotaExemplo);
app.use('/usuarios', rotaUsuario);

module.exports = app;
