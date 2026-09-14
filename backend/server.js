const express = require('express');
const app = express();
app.use(express.json());

// Fase 1: começa com lista na memória (depois vai pra banco)
const clientes = [
  { id: 1, nome: 'Pedro', telefone: '11999990001', ultimoServico: 'Corte' },
  { id: 2, nome: 'Anna Beatriz', telefone: '11999990002', ultimoServico: 'Barba' }
];

app.get('/', (req, res) => {
  res.send('Barbearia Corte Fino API — vai em /clientes');
});

app.get('/clientes', (req, res) => {
  res.json(clientes);
});

app.listen(3001, () => {
  console.log('Barbearia API ligada em http://localhost:3001');
});
