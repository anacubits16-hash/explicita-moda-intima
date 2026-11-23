
/* =========================================
   EXPLICITA MODA ÍNTIMA
   SISTEMA DA LOJA
========================================= */

// =========================================
// CADASTRO DOS PRODUTOS
// =========================================

const produtos = [
    { id: 1, nome: "Conjunto de Lingerie Rendado", categoria: "Lingerie", preco: 89.90, imagem: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
    { id: 2, nome: "Conjunto Lingerie Delicado", categoria: "Lingerie", preco: 79.90, imagem: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600" },
    { id: 3, nome: "Calcinha Confort", categoria: "Calcinhas", preco: 19.90, imagem: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600" },
    { id: 4, nome: "Calcinha Rendada", categoria: "Calcinhas", preco: 24.90, imagem: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
    { id: 5, nome: "Conjunto Plus Size", categoria: "Plus Size", preco: 99.90, imagem: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600" },
    { id: 6, nome: "Lingerie Plus Size", categoria: "Plus Size", preco: 109.90, imagem: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600" },
    { id: 7, nome: "Sutiã Básico", categoria: "Sutiãs", preco: 49.90, imagem: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600" },
    { id: 8, nome: "Sutiã Rendado", categoria: "Sutiãs", preco: 59.90, imagem: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
    { id: 9, nome: "Cueca Confort", categoria: "Cuecas", preco: 34.90, imagem: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600" },
    { id: 10, nome: "Cueca Boxer", categoria: "Cuecas", preco: 39.90, imagem: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600" },
    { id: 11, nome: "Kit de Meias", categoria: "Meias", preco: 24.90, imagem: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600" },
    { id: 12, nome: "Meia Casual", categoria: "Meias", preco: 14.90, imagem: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600" },
    { id: 13, nome: "Camisola Elegante", categoria: "Camisolas", preco: 79.90, imagem: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600" },
    { id: 14, nome: "Camisola Confortável", categoria: "Camisolas", preco: 69.90, imagem: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600" },
    { id: 15, nome: "Baby-doll Delicado", categoria: "Baby-doll", preco: 69.90, imagem: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
    { id: 16, nome: "Baby-doll Confort", categoria: "Baby-doll", preco: 74.90, imagem: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600" },
    { id: 17, nome: "Brinco Delicado", categoria: "Brincos", preco: 25.90, imagem: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600" },
    { id: 18, nome: "Colar Dourado", categoria: "Colares", preco: 39.90, imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600" },
    { id: 19, nome: "Pulseira Elegante", categoria: "Pulseiras", preco: 32.90, imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600" },
    { id: 20, nome: "Acessório Feminino", categoria: "Outros acessórios", preco: 29.90, imagem: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600" },
    { id: 21, nome: "Kit Skin Care", categoria: "Skin Care", preco: 69.90, imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600" },
    { id: 22, nome: "Kit Maquiagem", categoria: "Maquiagem", preco: 89.90, imagem: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600" }
];

// =========================================
// CONFIGURAÇÕES
// =========================================

const WHATSAPP_LOJA = "558199321665";

// =========================================
// ELEMENTOS DO SITE
// =========================================

const listaProdutos = document.getElementById("lista-produtos");
const pesquisa = document.getElementById("pesquisa-produtos");

const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
const botaoFecharCarrinho = document.getElementById("fechar-carrinho");

const overlayCarrinho = document.getElementById("carrinho-overlay");
const itensCarrinho = document.getElementById("itens-carrinho");

const quantidadeCarrinho = document.getElementById("quantidade-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");

const botaoFinalizarCompra = document.getElementById("finalizar-compra");

// =========================================
// FORMATAÇÃO DE PREÇOS
// =========================================

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// =========================================
// IDENTIFICAR A PÁGINA ATUAL
// =========================================

const nomeArquivo = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

const paginasCategorias = {
    "lingerie.html": ["Lingerie"],
    "calcinhas.html": ["Calcinhas"],
    "plus-size.html": ["Plus Size"],
    "sutias.html": ["Sutiãs"],
    "cuecas.html": ["Cuecas"],
    "meias.html": ["Meias"],
    "camisolas.html": ["Camisolas"],
    "baby-doll.html": ["Baby-doll"],
    "acessorios.html": ["Brincos", "Colares", "Pulseiras", "Outros acessórios"],
    "maquiagem.html": ["Maquiagem"],
    "skincare.html": ["Skin Care"]
};

const categoriasDaPagina = paginasCategorias[nomeArquivo] || null;

// =========================================
// MOSTRAR PRODUTOS
// =========================================

function mostrarProdutos() {
    if (!listaProdutos) return;

    const termo = pesquisa
        ? pesquisa.value.toLowerCase().trim()
        : "";

    let produtosDaPagina = produtos;

    if (categoriasDaPagina) {
        produtosDaPagina = produtos.filter(produto =>
            categoriasDaPagina.includes(produto.categoria)
        );
    } else if (nomeArquivo === "" || nomeArquivo === "index.html") {
        produtosDaPagina = produtos.slice(0, 8);
    }

    const produtosFiltrados = produtosDaPagina.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    if (produtosFiltrados.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    listaProdutos.innerHTML = produtosFiltrados.map(produto => `
        <article class="product-card">
            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                loading="lazy"
            >

            <div class="product-info">
                <span class="product-category">${produto.categoria}</span>
                <h3>${produto.nome}</h3>

                <p class="product-price">
                    ${formatarPreco(produto.preco)}
                </p>

                <button
                    class="product-button"
                    type="button"
                    data-add="${produto.id}"
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

// =========================================
// PESQUISAR PRODUTOS
// =========================================

if (pesquisa) {
    pesquisa.addEventListener("input", mostrarProdutos);
}

// =========================================
// CARRINHO - SALVAR NO NAVEGADOR
// =========================================

function carregarCarrinho() {
    try {
        const dados = localStorage.getItem("explicita-carrinho");
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        return [];
    }
}

let carrinho = carregarCarrinho();

function salvarCarrinho() {
    localStorage.setItem(
        "explicita-carrinho",
        JSON.stringify(carrinho)
    );
}

// =========================================
// ADICIONAR PRODUTO
// =========================================

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    carrinho.push(produto);
    atualizarCarrinho();

    alert(produto.nome + " foi adicionado ao carrinho! 💗");
}

// =========================================
// ATUALIZAR CARRINHO
// =========================================

function atualizarCarrinho() {
    salvarCarrinho();

    const quantidade = carrinho.length;

    const total = carrinho.reduce(
        (soma, produto) => soma + Number(produto.preco),
        0
    );

    if (quantidadeCarrinho) {
        quantidadeCarrinho.textContent = quantidade;
    }

    if (totalCarrinho) {
        totalCarrinho.textContent = formatarPreco(total);
    }

    if (!itensCarrinho) return;

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    itensCarrinho.innerHTML = carrinho.map((produto, indice) => `
        <div class="cart-item">
            <div>
                <strong>${produto.nome}</strong>
                <p>${formatarPreco(produto.preco)}</p>
            </div>

            <button
                type="button"
                data-remove="${indice}"
            >
                Remover
            </button>
        </div>
    `).join("");
}

// =========================================
// REMOVER PRODUTOS
// =========================================

if (itensCarrinho) {
    itensCarrinho.addEventListener("click", evento => {
        const botao = evento.target.closest("[data-remove]");

        if (!botao) return;

        const indice = Number(botao.dataset.remove);

        carrinho.splice(indice, 1);
        atualizarCarrinho();
    });
}

// =========================================
// ABRIR CARRINHO
// =========================================

if (botaoAbrirCarrinho && overlayCarrinho) {
    botaoAbrirCarrinho.addEventListener("click", () => {
        overlayCarrinho.classList.add("active");
    });
}

// =========================================
// FECHAR CARRINHO
// =========================================

if (botaoFecharCarrinho && overlayCarrinho) {
    botaoFecharCarrinho.addEventListener("click", () => {
        overlayCarrinho.classList.remove("active");
    });
}

if (overlayCarrinho) {
    overlayCarrinho.addEventListener("click", evento => {
        if (evento.target === overlayCarrinho) {
            overlayCarrinho.classList.remove("active");
        }
    });
}

// =========================================
// RECONHECER BOTÕES DE COMPRA
// =========================================

if (listaProdutos) {
    listaProdutos.addEventListener("click", evento => {
        const botao = evento.target.closest("[data-add]");

        if (!botao) return;

        adicionarCarrinho(Number(botao.dataset.add));
    });
}

// =========================================
// FINALIZAR PEDIDO PELO WHATSAPP
// =========================================

if (botaoFinalizarCompra) {
    botaoFinalizarCompra.textContent = "Finalizar pedido pelo WhatsApp";

    botaoFinalizarCompra.addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        // Agrupar produtos iguais
        const resumo = new Map();

        carrinho.forEach(produto => {
            if (!resumo.has(produto.id)) {
                resumo.set(produto.id, {
                    ...produto,
                    quantidade: 0
                });
            }

            resumo.get(produto.id).quantidade++;
        });

        const produtosPedido = Array.from(resumo.values());

        const total = carrinho.reduce(
            (soma, produto) => soma + Number(produto.preco),
            0
        );

        const linhasProdutos = produtosPedido.map(produto => {
            const subtotal = produto.preco * produto.quantidade;

            return `• ${produto.quantidade}x ${produto.nome} — ${formatarPreco(subtotal)}`;
        });

        const mensagem =
            "Olá! 💗 Quero fazer um pedido na Explícita Moda Íntima.\n\n" +
            "🛍️ *Meu pedido:*\n" +
            linhasProdutos.join("\n") +
            "\n\n*Total: " + formatarPreco(total) + "*\n\n" +
            "Gostaria de confirmar a disponibilidade dos produtos. Obrigada!";

        const linkWhatsApp =
            `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(mensagem)}`;

        window.open(linkWhatsApp, "_blank");

        if (overlayCarrinho) {
            overlayCarrinho.classList.remove("active");
        }
    });
}

// =========================================
// INICIAR LOJA
// =========================================

mostrarProdutos();
atualizarCarrinho();
