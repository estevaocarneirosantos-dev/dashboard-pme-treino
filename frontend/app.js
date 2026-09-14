const API = 'http://localhost:3001';

const lista = document.getElementById('lista');
const total = document.getElementById('total');
const erro = document.getElementById('erro');
const msg = document.getElementById('msg');
const form = document.getElementById('form');

async function carregarClientes() {
    erro.hidden = true;
    lista.innerHTML = '<li>Carregando...</li>';
    try {
        const resposta = await fetch(API + '/clientes');
        const clientes = await resposta.json();

        lista.innerHTML = '';
        for (const c of clientes) {
            const item = document.createElement('li');
            const nome = document.createElement('strong');
            nome.textContent = c.nome;
            const info = document.createElement('span');
            info.textContent = c.telefone + ' — ' + (c.ultimoServico || 'sem serviço registrado');
            item.appendChild(nome);
            item.appendChild(info);
            lista.appendChild(item);
        }

        total.textContent = clientes.length;
    } catch (e) {
        lista.innerHTML = '';
        erro.textContent = 'Não consegui falar com a API. O backend está ligado em ' + API + '?';
        erro.hidden = false;
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    msg.hidden = true;

    const novo = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        ultimoServico: document.getElementById('ultimoServico').value
    };

    const resposta = await fetch(API + '/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
    });

    if (!resposta.ok) {
        const falha = await resposta.json();
        msg.textContent = 'Erro: ' + (falha.erro || 'não foi possível cadastrar');
        msg.hidden = false;
        return;
    }

    form.reset();
    msg.textContent = 'Cliente cadastrado!';
    msg.hidden = false;
    carregarClientes();
});

document.getElementById('atualizar').addEventListener('click', carregarClientes);

carregarClientes();
