const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})

app.get('/', (request,response) => {
    response.render('pages/home.ejs');
});