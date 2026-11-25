
/* =========================================
   EXPLICITA MODA ÍNTIMA
   SISTEMA DA LOJA
========================================= */


// =========================================
// CADASTRO E CARREGAMENTO DOS PRODUTOS
// =========================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [
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

// Preparar o estoque sem apagar quantidades existentes
produtos = produtos.map(produto => ({
    ...produto,
    estoque: Number.isFinite(Number(produto.estoque))
        ? Number(produto.estoque)
        : 0
}));

// Salvar a lista atualizada
localStorage.setItem("produtos", JSON.stringify(produtos));


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

console.log("Página atual:", nomeArquivo);
console.log("Categoria identificada:", categoriasDaPagina);

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
        categoriasDaPagina.some(categoria =>
            String(categoria).trim().toLowerCase() ===
            String(produto.categoria || "").trim().toLowerCase()
        )
    );

} else if (nomeArquivo === "" || nomeArquivo === "index.html") {
    produtosDaPagina = produtos;
}

const produtosFiltrados = produtosDaPagina.filter(produto =>
    (produto.nome || "").toLowerCase().includes(termo) ||
    (produto.categoria || "").toLowerCase().includes(termo)
);

    if (produtosFiltrados.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    listaProdutos.innerHTML = produtosFiltrados.map(produto => `
        <article class="product-card">
<img
    src="${produto.imagem || 'imagens/sem-foto.png'}"
    alt="${produto.nome}"
    loading="lazy"
    onerror="this.src='imagens/sem-foto.png'"
>

            <div class="product-info">
                <span class="product-category">${produto.categoria}</span>
                <h3>${produto.nome}</h3>

                <p class="product-price">
                    ${formatarPreco(produto.preco)}
                </p>
                <p class="product-stock">
    ${Number(produto.estoque) > 0
        ? `${produto.estoque} unidades disponíveis`
        : "Produto indisponível"}
</p>

<button
    class="product-button"
    type="button"
    data-add="${produto.id}"
    ${Number(produto.estoque) <= 0 ? "disabled" : ""}
>
    ${Number(produto.estoque) > 0
        ? "Adicionar ao carrinho"
        : "Indisponível"}
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

    const quantidadeNoCarrinho = carrinho.filter(
        item => item.id === id
    ).length;

    if (quantidadeNoCarrinho >= Number(produto.estoque)) {
        alert("Desculpe! Não temos mais unidades disponíveis desse produto.");
        return;
    }

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
    "OLA! Seja bem-vinda a EXPLICITA MODA INTIMA!\n\n" +
    "Recebemos seu pedido e teremos prazer em atende-la.\n\n" +
    "RESUMO DO PEDIDO\n" +
    "------------------------------\n\n" +
    linhasProdutos.join("\n\n") +
    "\n\n------------------------------\n" +
    "TOTAL DO PEDIDO: " + formatarPreco(total) +
    "\n\n" +
    "Poderia confirmar a disponibilidade dos produtos e as opcoes de entrega?\n\n" +
    "Aguardamos seu contato!\n" +
    "EXPLICITA MODA INTIMA";

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

// =========================================
// PAINEL ADMINISTRATIVO
// =========================================
// =========================================
// PAINEL ADMINISTRATIVO
// =========================================

const formularioProduto = document.getElementById("form-produto");
console.log("Formulário encontrado:", formularioProduto);
const listaAdminProdutos = document.getElementById("lista-admin-produtos");
const campoImagem = document.getElementById("produto-imagem");
const previewImagem = document.getElementById("preview-imagem");

// Mostrar prévia da foto escolhida
campoImagem?.addEventListener("change", function() {
    const arquivo = this.files[0];

    if (!arquivo) {
        previewImagem.innerHTML = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(event) {
        previewImagem.innerHTML = `
            <img src="${event.target.result}"
                 style="width:150px; height:150px; object-fit:cover; border-radius:10px;">
        `;
    };

    leitor.readAsDataURL(arquivo);
});

function mostrarProdutosAdmin() {
    if (!listaAdminProdutos) return;

    listaAdminProdutos.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const item = document.createElement("div");

        item.style.padding = "10px";
        item.style.borderBottom = "1px solid #ddd";

        item.innerHTML = `
            <strong>${produto.nome}</strong>
            <p>${produto.categoria} - ${formatarPreco(produto.preco)}</p>

            <button type="button" onclick="editarProdutoPorIndice(${indice})">
                Editar
            </button>

            <button type="button" onclick="excluirProdutoPorIndice(${indice})">
                Excluir
            </button>
        `;

        listaAdminProdutos.appendChild(item);
    });
}

function salvarProduto(id, nome, categoria, preco, imagem) {
    console.log("Salvando produto:", nome, categoria, preco);

    if (id) {
        const produto = produtos.find(p => p.id === Number(id));

        if (produto) {
            Object.assign(produto, {
                nome,
                categoria,
                preco,
                imagem
            });
        }
    } else {
        produtos.push({
            id: Math.max(0, ...produtos.map(p => p.id)) + 1,
            nome,
            categoria,
            preco,
            imagem
        });
    }

    formularioProduto.reset();
    document.getElementById("produto-id").value = "";
    previewImagem.innerHTML = "";

    localStorage.setItem("produtos", JSON.stringify(produtos));

    mostrarProdutos();
    mostrarProdutosAdmin();

}

formularioProduto?.addEventListener("submit", function(event) {
    console.log("FORMULÁRIO ENVIADO!");
    event.preventDefault();

    const id = document.getElementById("produto-id").value;
    const nome = document.getElementById("produto-nome").value.trim();
    const categoria = document.getElementById("produto-categoria").value.trim();
    const preco = Number(document.getElementById("produto-preco").value);
    const arquivoImagem = campoImagem.files[0];

    if (!nome || !categoria || !Number.isFinite(preco) || preco <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const produtoExistente = produtos.find(p => p.id === Number(id));
    const imagemAtual = produtoExistente?.imagem;

    if (arquivoImagem) {
        if (arquivoImagem.size > 2 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 2 MB.");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function(event) {
            salvarProduto(id, nome, categoria, preco, event.target.result);
        };

        leitor.readAsDataURL(arquivoImagem);
        return;
    }

    if (imagemAtual) {
        salvarProduto(id, nome, categoria, preco, imagemAtual);
        return;
    }

    alert("Escolha uma foto para o produto.");
});

window.editarProduto = function(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    document.getElementById("produto-id").value = produto.id;
    document.getElementById("produto-nome").value = produto.nome;
    document.getElementById("produto-categoria").value = produto.categoria;
    document.getElementById("produto-preco").value = produto.preco;

    campoImagem.value = "";

    previewImagem.innerHTML = `
        <p>Foto atual:</p>
        <img src="${produto.imagem}"
             style="width:150px; border-radius:10px;">
    `;

    formularioProduto.scrollIntoView({ behavior: "smooth" });
};

window.excluirProduto = function(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    const indice = produtos.findIndex(p =>
        String(p.id) === String(id)
    );

    if (indice === -1) {
        alert("Não foi possível localizar este produto.");
        return;
    }

    produtos.splice(indice, 1);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    mostrarProdutos();
    mostrarProdutosAdmin();

    alert("Produto excluído com sucesso! 💗");
};
window.excluirProdutoPorIndice = function(indice) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    if (indice < 0 || indice >= produtos.length) return;

    produtos.splice(indice, 1);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    mostrarProdutos();
    mostrarProdutosAdmin();

    alert("Produto excluído com sucesso! 💗");
};

window.editarProdutoPorIndice = function(indice) {
    const produto = produtos[indice];

    if (!produto) return;

    document.getElementById("produto-id").value = produto.id || "";
    document.getElementById("produto-nome").value = produto.nome || "";
    document.getElementById("produto-categoria").value = produto.categoria || "";
    document.getElementById("produto-preco").value = produto.preco || "";

    campoImagem.value = "";

    previewImagem.innerHTML = `
        <p>Foto atual:</p>
        <img src="${produto.imagem || ''}" style="width:150px; border-radius:10px;">
    `;

    formularioProduto.scrollIntoView({ behavior: "smooth" });
};

document.getElementById("limpar-formulario")?.addEventListener("click", () => {
    formularioProduto.reset();
    document.getElementById("produto-id").value = "";
});

document.getElementById("exportar-produtos")?.addEventListener("click", () => {

    const conteudo =
        "const produtos = " +
        JSON.stringify(produtos, null, 4) +
        ";";

    const arquivo = new Blob(
        [conteudo],
        { type: "text/javascript;charset=utf-8" }
    );

    const link = document.createElement("a");
    const url = URL.createObjectURL(arquivo);

    link.href = url;
    link.download = "produtos-atualizados.js";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    alert("Catálogo exportado! Guarde o arquivo para atualizar sua loja.");
});

// =========================================
// INICIAR LOJA
// =========================================



mostrarProdutos();
atualizarCarrinho();
mostrarProdutosAdmin();

