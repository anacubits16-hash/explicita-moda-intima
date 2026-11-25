
// =====================================
// PAINEL ADMINISTRATIVO - EXPLÍCITA
// =====================================

const formularioLogin = document.getElementById("form-login");
const telaLogin = document.getElementById("tela-login");
const painelAdmin = document.getElementById("painel-admin");
const mensagemLogin = document.getElementById("mensagem-login");
const botaoSair = document.getElementById("sair-admin");

const emailTeste = "admin@explicita.com";
const senhaTeste = "123456";

// =====================================
// LOGIN
// =====================================

function mostrarPainel() {
    telaLogin.style.display = "none";
    painelAdmin.style.display = "block";

    carregarEstoque();
    carregarProdutosRetirada();
    carregarProdutosEntrada();
    carregarHistorico();
}

formularioLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;

    if (email === emailTeste && senha === senhaTeste) {
        sessionStorage.setItem("admin-logado", "true");
        mostrarPainel();
    } else {
        mensagemLogin.textContent = "E-mail ou senha incorretos.";
    }
});

botaoSair.addEventListener("click", function() {
    sessionStorage.removeItem("admin-logado");
    painelAdmin.style.display = "none";
    telaLogin.style.display = "block";
});

if (sessionStorage.getItem("admin-logado") === "true") {
    mostrarPainel();
}

// =====================================
// NAVEGAÇÃO
// =====================================


document.querySelectorAll("[data-painel]").forEach(botao => {
    botao.addEventListener("click", function() {
        const destino = this.dataset.painel;

        // Esconder todos os painéis
        document.getElementById("painel-estoque").style.display = "none";
        document.getElementById("painel-retiradas").style.display = "none";
        document.getElementById("painel-historico").style.display = "none";

        // Mostrar o painel selecionado
        document.getElementById("painel-" + destino).style.display = "block";

        // Atualizar botão selecionado
        document.querySelectorAll("[data-painel]").forEach(item => {
            item.classList.remove("menu-ativo");
        });

        this.classList.add("menu-ativo");

        // Atualizar informações
        if (destino === "estoque") carregarEstoque();
        if (destino === "retiradas") carregarProdutosRetirada();
        if (destino === "historico") carregarHistorico();
    });
});


// =====================================
// DADOS
// =====================================

function obterProdutos() {
    try {
        return JSON.parse(localStorage.getItem("produtos")) || [];
    } catch {
        return [];
    }
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function obterHistorico() {
    try {
        return JSON.parse(localStorage.getItem("explicita-movimentacoes")) || [];
    } catch {
        return [];
    }
}

// =====================================
// MOSTRAR ESTOQUE
// =====================================



function carregarEstoque() {
    const lista = document.getElementById("lista-estoque");
    if (!lista) return;

    const produtos = obterProdutos();

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    lista.innerHTML = produtos.map(produto => {
        const estoque = Number(produto.estoque) || 0;
        const estoqueBaixo = estoque <= 5;

        return `
<div class="card-produto-estoque">

                <strong>${produto.nome}</strong>

                <p>${produto.categoria || ""}</p>

                <p>
                    Preço: R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}
                </p>

                <p>
                    Quantidade disponível:
                    <strong style="color: ${estoqueBaixo ? '#d9534f' : '#198754'}">
                        ${estoque} unidades
                    </strong>

                    ${estoqueBaixo
                        ? '<span style="color:#d9534f; font-weight:bold;"> ⚠ Estoque baixo</span>'
                        : ''}
                </p>

            </div>
        `;
    }).join("");
}





// =====================================
// PRODUTOS PARA RETIRADA
// =====================================

function carregarProdutosRetirada() {
    const seletor = document.getElementById("retirada-produto");
    if (!seletor) return;

    const produtos = obterProdutos();

    seletor.innerHTML = '<option value="">Selecione um produto</option>';

    produtos.forEach(produto => {
        const opcao = document.createElement("option");
        opcao.value = produto.id;
        opcao.textContent = `${produto.nome} — Estoque: ${Number(produto.estoque) || 0}`;
        seletor.appendChild(opcao);
    });
}

// =====================================
// CONFIRMAR VENDA E DAR BAIXA NO ESTOQUE
// =====================================

const formularioRetirada = document.getElementById("form-retirada");

if (formularioRetirada) {
    // A validação será feita pelo próprio código abaixo.
    formularioRetirada.noValidate = true;

    formularioRetirada.addEventListener("submit", function(event) {
        event.preventDefault();

        const responsavel = document
            .getElementById("retirada-responsavel").value.trim();

        const cliente = document
            .getElementById("retirada-cliente").value.trim();

        const whatsapp = document
            .getElementById("retirada-whatsapp").value.trim();

        if (!responsavel || !cliente || !whatsapp) {
            alert("Preencha o nome da funcionária, da cliente e o WhatsApp.");
            return;
        }

        if (itensRetirada.length === 0) {
            alert("Adicione pelo menos um produto à venda.");
            return;
        }

        const produtos = obterProdutos();

        // Conferir todo o estoque antes de realizar qualquer baixa.
        for (const item of itensRetirada) {
            const produto = produtos.find(
                p => String(p.id) === String(item.id)
            );

            if (!produto) {
                alert("Um dos produtos não foi encontrado.");
                return;
            }

            if (item.quantidade > Number(produto.estoque || 0)) {
                alert(
                    `Estoque insuficiente para ${produto.nome}. ` +
                    `Disponível: ${Number(produto.estoque) || 0}.`
                );
                return;
            }
        }

        // Descontar as quantidades do estoque.
        itensRetirada.forEach(item => {
            const produto = produtos.find(
                p => String(p.id) === String(item.id)
            );

            produto.estoque = Number(produto.estoque || 0) - item.quantidade;
        });

        // Salvar o estoque atualizado.
        salvarProdutos(produtos);

        // Criar registro da venda.
        const historico = obterHistorico();

        historico.push({
            id: Date.now(),
            tipo: "retirada",
            responsavel,
            cliente,
            whatsapp,
            data: new Date().toISOString(),
            itens: itensRetirada.map(item => ({ ...item }))
        });

        localStorage.setItem(
            "explicita-movimentacoes",
            JSON.stringify(historico)
        );

        // Limpar formulário e lista de produtos.
        itensRetirada = [];
        formularioRetirada.reset();

        mostrarItensRetirada();
        carregarEstoque();
        carregarProdutosRetirada();
        carregarHistorico();

        alert("Venda registrada e estoque atualizado com sucesso! 💗");
    });
}

// =====================================
// REGISTRAR ENTRADA DE MERCADORIAS
// =====================================

const formularioEntrada = document.getElementById("form-entrada");

function carregarProdutosEntrada() {
    const seletor = document.getElementById("entrada-produto");
    if (!seletor) return;

    const produtos = obterProdutos();

    seletor.innerHTML = '<option value="">Selecione um produto</option>';

    produtos.forEach(produto => {
        const opcao = document.createElement("option");
        opcao.value = produto.id;
        opcao.textContent = produto.nome;
        seletor.appendChild(opcao);
    });
}

if (formularioEntrada) {
    formularioEntrada.addEventListener("submit", function(event) {
        event.preventDefault();

        const id = document.getElementById("entrada-produto").value;
        const quantidade = Number(
            document.getElementById("entrada-quantidade").value
        );
        const responsavel = document
            .getElementById("entrada-responsavel").value.trim();

        if (!id || !Number.isInteger(quantidade) || quantidade < 1 || !responsavel) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const produtos = obterProdutos();
        const produto = produtos.find(p => String(p.id) === String(id));

        if (!produto) {
            alert("Produto não encontrado.");
            return;
        }

        // Aumentar o estoque
        produto.estoque = Number(produto.estoque || 0) + quantidade;

        salvarProdutos(produtos);

        // Registrar a entrada no histórico
        const historico = obterHistorico();

        historico.push({
            id: Date.now(),
            tipo: "entrada",
            responsavel,
            data: new Date().toISOString(),
            itens: [{
                id: produto.id,
                nome: produto.nome,
                quantidade
            }]
        });

        localStorage.setItem(
            "explicita-movimentacoes",
            JSON.stringify(historico)
        );

        formularioEntrada.reset();

        carregarEstoque();
        carregarProdutosRetirada();
        carregarProdutosEntrada();
        carregarHistorico();

        alert("Entrada registrada! Estoque atualizado com sucesso. 💗");
    });
}


// =====================================
// HISTÓRICO
// =====================================


// =====================================
// ADICIONAR VÁRIOS PRODUTOS À VENDA
// =====================================

let itensRetirada = [];

const botaoAdicionarItem = document.getElementById("adicionar-item-retirada");
const listaItensRetirada = document.getElementById("retirada-itens-adicionados");

function mostrarItensRetirada() {
    if (!listaItensRetirada) return;

    if (itensRetirada.length === 0) {
        listaItensRetirada.innerHTML = "<p>Nenhum produto adicionado ainda.</p>";
        return;
    }

    listaItensRetirada.innerHTML = itensRetirada.map((item, indice) => `
        <div style="padding:10px; border-bottom:1px solid #ddd;">
            <strong>${item.nome}</strong>
            <p>Quantidade: ${item.quantidade}</p>
            <button type="button" onclick="removerItemRetirada(${indice})">
                Remover
            </button>
        </div>
    `).join("");
}

botaoAdicionarItem?.addEventListener("click", function() {
    const seletor = document.getElementById("retirada-produto");
    const campoQuantidade = document.getElementById("retirada-quantidade");

    const id = seletor.value;
    const quantidade = Number(campoQuantidade.value);

    if (!id) {
        alert("Selecione um produto.");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Informe uma quantidade válida.");
        return;
    }

    const produtos = obterProdutos();
    const produto = produtos.find(p => String(p.id) === String(id));

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const itemExistente = itensRetirada.find(
        item => String(item.id) === String(produto.id)
    );

    const quantidadeTotal = quantidade + (
        itemExistente ? itemExistente.quantidade : 0
    );

    if (quantidadeTotal > Number(produto.estoque || 0)) {
        alert("Quantidade maior que o estoque disponível.");
        return;
    }

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        itensRetirada.push({
            id: produto.id,
            nome: produto.nome,
            quantidade: quantidade
        });
    }

    mostrarItensRetirada();
    campoQuantidade.value = 1;
    seletor.value = "";
});

window.removerItemRetirada = function(indice) {
    itensRetirada.splice(indice, 1);
    mostrarItensRetirada();
};



function carregarHistorico() {
    const produtos = obterProdutos();
    // Atualizar resumo do estoque
const totalProdutos = document.getElementById("total-produtos");
const totalUnidades = document.getElementById("total-unidades");
const estoqueBaixo = document.getElementById("produtos-estoque-baixo");

if (totalProdutos) {
    totalProdutos.textContent = produtos.length;
}

if (totalUnidades) {
    totalUnidades.textContent = produtos.reduce(
        (total, produto) => total + (Number(produto.estoque) || 0), 0
    );
}

if (estoqueBaixo) {
    estoqueBaixo.textContent = produtos.filter(
        produto => (Number(produto.estoque) || 0) <= 5
    ).length;
}
    const lista = document.getElementById("lista-historico");
    if (!lista) return;

    const historico = obterHistorico();

    if (historico.length === 0) {
        lista.innerHTML = "<p>Nenhuma movimentação registrada.</p>";
        return;
    }

    lista.innerHTML = historico.slice().reverse().map(movimento => `
        <div style="padding:15px; border-bottom:1px solid #ddd; margin-bottom:10px;">

            <strong>
                ${movimento.tipo === "entrada"
                    ? "📦 Entrada de mercadorias"
                    : "🛍️ Venda / Retirada"}
            </strong>

            <p><strong>Responsável:</strong> ${movimento.responsavel}</p>

            ${movimento.cliente
                ? `<p><strong>Cliente:</strong> ${movimento.cliente}</p>`
                : ""}

            ${movimento.whatsapp
                ? `<p><strong>WhatsApp:</strong> ${movimento.whatsapp}</p>`
                : ""}

            <p><strong>Data:</strong> ${new Date(movimento.data).toLocaleString("pt-BR")}</p>

            <p><strong>Produtos:</strong></p>

            ${(movimento.itens || []).map(item => `
                <p>${item.quantidade}x ${item.nome}</p>
            `).join("")}

        </div>
    `).join("");
}

// =====================================
// CADASTRAR PRODUTOS NO PAINEL ADMIN
// =====================================

const formularioCadastroProduto = document.getElementById(
    "form-cadastro-produto"
);

const campoCadastroImagem = document.getElementById(
    "cadastro-produto-imagem"
);

const previewCadastroImagem = document.getElementById(
    "cadastro-preview-imagem"
);

// Mostrar prévia da imagem
campoCadastroImagem?.addEventListener("change", function() {
    const arquivo = this.files[0];

    if (!arquivo) {
        previewCadastroImagem.innerHTML = "";
        return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2 MB.");
        this.value = "";
        previewCadastroImagem.innerHTML = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(event) {
        previewCadastroImagem.innerHTML = `
            <img
                src="${event.target.result}"
                alt="Prévia do produto"
                style="width:130px; height:130px; object-fit:cover; border-radius:12px;"
            >
        `;
    };

    leitor.readAsDataURL(arquivo);
});

// Salvar produto
formularioCadastroProduto?.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById(
        "cadastro-produto-nome"
    ).value.trim();

    const categoria = document.getElementById(
        "cadastro-produto-categoria"
    ).value;

    const preco = Number(document.getElementById(
        "cadastro-produto-preco"
    ).value);

    const arquivo = campoCadastroImagem.files[0];

    if (!nome || !categoria || !Number.isFinite(preco) || preco <= 0 || !arquivo) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2 MB.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(event) {
        const produtos = obterProdutos();

        const novoProduto = {
            id: Date.now(),
            nome: nome,
            categoria: categoria,
            preco: preco,
            imagem: event.target.result,
            estoque: 0
        };

        produtos.push(novoProduto);

        salvarProdutos(produtos);

        formularioCadastroProduto.reset();
        previewCadastroImagem.innerHTML = "";

        carregarEstoque();
        carregarProdutosRetirada();
        carregarProdutosEntrada();
        carregarHistorico();

        alert("Produto cadastrado com sucesso! Agora registre a quantidade no estoque. 💗");
    };

    leitor.readAsDataURL(arquivo);
});


