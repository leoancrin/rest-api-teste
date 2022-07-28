const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();

const rotaPedido = require('./routes/pedido.js');
const rotaExemplo = require('./routes/rota_exemplo.js');
const rotaUsuario = require('./routes/usuarios.js');

app.use(express.json());
app.use(cors());

// teste login

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/usuarios/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/usuarios/cadastro', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/cadastro.html'));
});

app.use('/exemplo', rotaExemplo);
app.use('/pedido', rotaPedido);
app.use('/usuarios', rotaUsuario);

module.exports = app;