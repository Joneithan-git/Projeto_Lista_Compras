const formulario = document.querySelector("#formulario");
const input = document.querySelector("#produto");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const mensagem = document.querySelector("#mensagem");

carregarProdutos();

formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const texto = input.value.trim();

    if (texto === "") {

        mensagem.textContent = "Digite um produto.";

        mensagem.style.color = "red";

        return;

    }

    await fetch("/produtos", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            texto

        })

    });

    input.value = "";

    carregarProdutos();

});

async function carregarProdutos() {

    const resposta = await fetch("/produtos");

    const produtos = await resposta.json();

    lista.innerHTML = "";

    contador.textContent = produtos.length;

    produtos.forEach(produto => {

        const item = document.createElement("li");

        if (produto.comprado)

            item.classList.add("comprado");

        const esquerda = document.createElement("div");

        esquerda.classList.add("item-esquerda");

        const marcador = document.createElement("div");

        marcador.classList.add("marcador");

        marcador.onclick = async () => {

            await fetch(`/produtos/${produto.id}`, {

                method: "PUT"

            });

            carregarProdutos();

        };

        const texto = document.createElement("span");

        texto.classList.add("texto");

        texto.textContent = produto.texto;

        esquerda.appendChild(marcador);

        esquerda.appendChild(texto);

        const remover = document.createElement("button");

        remover.textContent = "Remover";

        remover.classList.add("remover");

        remover.onclick = async () => {

            await fetch(`/produtos/${produto.id}`, {

                method: "DELETE"

            });

            carregarProdutos();

        };

        item.appendChild(esquerda);

        item.appendChild(remover);

        lista.appendChild(item);

    });

}