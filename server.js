const { ok } = require('assert');
const http = require('http');
const PORT = process.env.PORT || 3000;
const app = require('./app.js');
const server = http.createServer(app);


server.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const { get, post } = server.router;

server([
    get('/', ctx => 'Hello World!')
]);