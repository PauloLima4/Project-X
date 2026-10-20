// ========================================
// BANCO DE DADOS LOCAL
// ========================================

let entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

let gastos =
    JSON.parse(localStorage.getItem("gastos")) || [];

let contas =
    JSON.parse(localStorage.getItem("contas")) || [];

let receber =
    JSON.parse(localStorage.getItem("receber")) || [];


// ========================================
// SALVAR
// ========================================

function salvarDados() {

    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );

    localStorage.setItem(
        "gastos",
        JSON.stringify(gastos)
    );

    localStorage.setItem(
        "contas",
        JSON.stringify(contas)
    );

    localStorage.setItem(
        "receber",
        JSON.stringify(receber)
    );
}


// ========================================
// FORMATAÇÃO
// ========================================

function dinheiro(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


// ========================================
// NAVEGAÇÃO
// ========================================

const menus = document.querySelectorAll(".menu");

menus.forEach(menu => {

    menu.addEventListener("click", () => {

        menus.forEach(m =>
            m.classList.remove("active")
        );

        menu.classList.add("active");

        document.querySelectorAll(".page")
            .forEach(page =>
                page.classList.remove("active-page")
            );

        const pagina =
            document.getElementById(
                menu.dataset.page
            );

        pagina.classList.add("active-page");

    });

});


// ========================================
// ENTRADAS
// ========================================

document
    .getElementById("formEntrada")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const entrada = {

            id: Date.now(),

            descricao:
                document.getElementById(
                    "entradaDescricao"
                ).value,

            valor:
                Number(
                    document.getElementById(
                        "entradaValor"
                    ).value
                ),

            data:
                document.getElementById(
                    "entradaData"
                ).value,

            categoria:
                document.getElementById(
                    "entradaCategoria"
                ).value

        };

        entradas.push(entrada);

        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ========================================
// GASTOS
// ========================================

document
    .getElementById("formGasto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const gasto = {

            id: Date.now(),

            descricao:
                document.getElementById(
                    "gastoDescricao"
                ).value,

            valor:
                Number(
                    document.getElementById(
                        "gastoValor"
                    ).value
                ),

            data:
                document.getElementById(
                    "gastoData"
                ).value,

            categoria:
                document.getElementById(
                    "gastoCategoria"
                ).value,

            tipo:
                document.getElementById(
                    "gastoTipo"
                ).value

        };

        gastos.push(gasto);

        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ========================================
// CONTAS
// ========================================

document
    .getElementById("formConta")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const conta = {

            id: Date.now(),

            nome:
                document.getElementById(
                    "contaNome"
                ).value,

            valor:
                Number(
                    document.getElementById(
                        "contaValor"
                    ).value
                ),

            vencimento:
                document.getElementById(
                    "contaVencimento"
                ).value,

            status:
                document.getElementById(
                    "contaStatus"
                ).value

        };

        contas.push(conta);

        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ========================================
// A RECEBER
// ========================================

document
    .getElementById("formReceber")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const pessoa = {

            id: Date.now(),

            nome:
                document.getElementById(
                    "receberNome"
                ).value,

            valor:
                Number(
                    document.getElementById(
                        "receberValor"
                    ).value
                ),

            data:
                document.getElementById(
                    "receberData"
                ).value,

            prazo:
                document.getElementById(
                    "receberPrazo"
                ).value

        };

        receber.push(pessoa);

        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ========================================
// MOSTRAR ENTRADAS
// ========================================

function mostrarEntradas() {

    const lista =
        document.getElementById(
            "listaEntradas"
        );

    lista.innerHTML = "";

    entradas.forEach(item => {

        lista.innerHTML += `

            <tr>

                <td>${item.descricao}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${item.data}</td>

                <td>${item.categoria}</td>

                <td>

                    <button
                        class="delete"
                        onclick="excluirEntrada(${item.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });

}


// ========================================
// MOSTRAR GASTOS
// ========================================

function mostrarGastos() {

    const lista =
        document.getElementById(
            "listaGastos"
        );

    lista.innerHTML = "";

    gastos.forEach(item => {

        lista.innerHTML += `

            <tr>

                <td>${item.descricao}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${item.data}</td>

                <td>${item.categoria}</td>

                <td>${item.tipo}</td>

                <td>

                    <button
                        class="delete"
                        onclick="excluirGasto(${item.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });

}


// ========================================
// MOSTRAR CONTAS
// ========================================

function mostrarContas() {

    const lista =
        document.getElementById(
            "listaContas"
        );

    lista.innerHTML = "";

    contas.forEach(item => {

        lista.innerHTML += `

            <tr>

                <td>${item.nome}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${item.vencimento}</td>

                <td>${item.status}</td>

                <td>

                    <button
                        class="delete"
                        onclick="excluirConta(${item.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });

}


// ========================================
// MOSTRAR A RECEBER
// ========================================

function mostrarReceber() {

    const lista =
        document.getElementById(
            "listaReceber"
        );

    lista.innerHTML = "";

    const hoje = new Date();

    receber.forEach(item => {

        const prazo =
            new Date(item.prazo);

        let atraso = 0;

        if (hoje > prazo) {

            const diferenca =
                hoje - prazo;

            atraso =
                Math.floor(
                    diferenca /
                    (1000 * 60 * 60 * 24)
                );

        }

        lista.innerHTML += `

            <tr>

                <td>${item.nome}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${item.data}</td>

                <td>${item.prazo}</td>

                <td>${atraso} dias</td>

                <td>

                    <button
                        class="delete"
                        onclick="excluirReceber(${item.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });

}


// ========================================
// EXCLUSÕES
// ========================================

function excluirEntrada(id) {

    entradas =
        entradas.filter(
            item => item.id !== id
        );

    salvarDados();

    atualizarTudo();

}


function excluirGasto(id) {

    gastos =
        gastos.filter(
            item => item.id !== id
        );

    salvarDados();

    atualizarTudo();

}


function excluirConta(id) {

    contas =
        contas.filter(
            item => item.id !== id
        );

    salvarDados();

    atualizarTudo();

}


function excluirReceber(id) {

    receber =
        receber.filter(
            item => item.id !== id
        );

    salvarDados();

    atualizarTudo();

}


// ========================================
// DASHBOARD
// ========================================

let graficoFinanceiro;
let graficoCategorias;


function atualizarDashboard() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + item.valor,
            0
        );

    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + item.valor,
            0
        );

    const totalReceber =
        receber.reduce(
            (total, item) =>
                total + item.valor,
            0
        );

    const saldo =
        totalEntradas - totalGastos;


    document.getElementById(
        "saldo"
    ).textContent = dinheiro(saldo);

    document.getElementById(
        "totalEntradas"
    ).textContent = dinheiro(totalEntradas);

    document.getElementById(
        "totalGastos"
    ).textContent = dinheiro(totalGastos);

    document.getElementById(
        "totalReceber"
    ).textContent = dinheiro(totalReceber);


    criarGraficos();

}


// ========================================
// GRÁFICOS
// ========================================

function criarGraficos() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + item.valor,
            0
        );

    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + item.valor,
            0
        );


    if (graficoFinanceiro) {
        graficoFinanceiro.destroy();
    }

    graficoFinanceiro =
        new Chart(
            document.getElementById(
                "graficoFinanceiro"
            ),
            {

                type: "bar",

                data: {

                    labels: [
                        "Entradas",
                        "Gastos"
                    ],

                    datasets: [{

                        data: [
                            totalEntradas,
                            totalGastos
                        ]

                    }]

                },

                options: {

                    responsive: true,

                    plugins: {
                        legend: {
                            display: false
                        }
                    }

                }

            }
        );


    const categorias = {};

    gastos.forEach(gasto => {

        if (!categorias[gasto.categoria]) {

            categorias[gasto.categoria] = 0;

        }

        categorias[gasto.categoria] +=
            gasto.valor;

    });


    if (graficoCategorias) {
        graficoCategorias.destroy();
    }


    graficoCategorias =
        new Chart(
            document.getElementById(
                "graficoCategorias"
            ),
            {

                type: "doughnut",

                data: {

                    labels:
                        Object.keys(categorias),

                    datasets: [{

                        data:
                            Object.values(
                                categorias
                            )

                    }]

                },

                options: {

                    responsive: true

                }

            }
        );

}


// ========================================
// RESUMO
// ========================================

function atualizarResumo() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + item.valor,
            0
        );

    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + item.valor,
            0
        );

    const obrigatorios =
        gastos
            .filter(
                item =>
                    item.tipo === "Obrigatório"
            )
            .reduce(
                (total, item) =>
                    total + item.valor,
                0
            );

    const futeis =
        gastos
            .filter(
                item =>
                    item.tipo === "Fútil"
            )
            .reduce(
                (total, item) =>
                    total + item.valor,
                0
            );


    document.getElementById(
        "resumoEntradas"
    ).textContent =
        dinheiro(totalEntradas);

    document.getElementById(
        "resumoGastos"
    ).textContent =
        dinheiro(totalGastos);

    document.getElementById(
        "resumoObrigatorios"
    ).textContent =
        dinheiro(obrigatorios);

    document.getElementById(
        "resumoFuteis"
    ).textContent =
        dinheiro(futeis);

}


// ========================================
// ATUALIZAR TUDO
// ========================================

function atualizarTudo() {

    mostrarEntradas();

    mostrarGastos();

    mostrarContas();

    mostrarReceber();

    atualizarDashboard();

    atualizarResumo();

}


// ========================================
// INICIALIZAÇÃO
// ========================================

atualizarTudo();