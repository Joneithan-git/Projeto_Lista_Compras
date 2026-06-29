const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static("."));

let produtos = [];

// Buscar produtos
app.get("/produtos", (req, res) => {

    res.json(produtos);

});

// Adicionar produto
app.post("/produtos", (req, res) => {

    const { texto } = req.body;

    if (!texto) {

        return res.status(400).json({
            erro: "Produto inválido."
        });

    }

    const novoProduto = {

        id: Date.now(),

        texto,

        comprado: false

    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);

});

// Remover produto
app.delete("/produtos/:id", (req, res) => {

    const id = Number(req.params.id);

    produtos = produtos.filter(produto => produto.id !== id);

    res.json({
        mensagem: "Produto removido."
    });

});

// Marcar comprado
app.put("/produtos/:id", (req, res) => {

    const id = Number(req.params.id);

    const produto = produtos.find(p => p.id === id);

    if (!produto) {

        return res.status(404).json({
            erro: "Produto não encontrado."
        });

    }

    produto.comprado = !produto.comprado;

    res.json(produto);

});

app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});