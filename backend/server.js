const express = require('express');
const app = express();
app.use(express.json());

// Libera o frontend (outra porta/arquivo) para chamar a API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

const PORT = 3001;
const clientes = [
    {id: 1, nome: 'Pedro', telefone: '11999990001', ultimoServico: 'Corte de cabelo'},
    {id: 2, nome: 'Leonardo', telefone: '11999990002', ultimoServico: 'Barba'},
];
app.get('/', (req, res) => {
    res.send('Barbearia Corte Fino API - vai em /clientes');
});
app.get('/clientes', (req, res) => {
    res.json(clientes);
});
app.post('/clientes', (req, res) => {
    const { nome, telefone, ultimoServico } = req.body;
    if(!nome || !telefone) {
        return res.status(400).json({ erro: 'nome e telefone são obrigatórios' });
    }
    const novoCliente = {
        id: clientes.length + 1,
        nome,
        telefone,
        ultimoServico
    };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});
app.listen(PORT, () => {
    console.log('Barbearia Corte Fino API ligada em http://localhost:3001');
});
