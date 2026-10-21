// ======================================================
// BANCO DE DADOS
// ======================================================

let entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];


let gastos =
    JSON.parse(localStorage.getItem("gastos")) || [];


let contas =
    JSON.parse(localStorage.getItem("contas")) || [];


let receber =
    JSON.parse(localStorage.getItem("receber")) || [];


// ======================================================
// GRÁFICOS
// ======================================================

let graficoFinanceiro = null;

let graficoCategorias = null;


// ======================================================
// SALVAR
// ======================================================

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


// ======================================================
// FORMATAÇÃO
// ======================================================

function dinheiro(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function formatarData(data) {

    if (!data) return "-";

    const partes = data.split("-");

    if (partes.length !== 3) return data;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// ======================================================
// NAVEGAÇÃO
// ======================================================

document.querySelectorAll(".menu").forEach(menu => {

    menu.addEventListener("click", () => {

        document.querySelectorAll(".menu")
            .forEach(item =>
                item.classList.remove("active")
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


// ======================================================
// ENTRADAS
// ======================================================

document
    .getElementById("formEntrada")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const descricao =
            document
                .getElementById("entradaDescricao")
                .value.trim();


        const valor =
            Number(
                document
                    .getElementById("entradaValor")
                    .value
            );


        const data =
            document
                .getElementById("entradaData")
                .value;


        const categoria =
            document
                .getElementById("entradaCategoria")
                .value.trim();


        if (
            !descricao ||
            valor <= 0 ||
            !data ||
            !categoria
        ) {

            alert("Preencha todos os campos corretamente.");

            return;

        }


        entradas.push({

            id: Date.now(),

            descricao,

            valor,

            data,

            categoria

        });


        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ======================================================
// GASTOS
// ======================================================

document
    .getElementById("formGasto")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const descricao =
            document
                .getElementById("gastoDescricao")
                .value.trim();


        const valor =
            Number(
                document
                    .getElementById("gastoValor")
                    .value
            );


        const data =
            document
                .getElementById("gastoData")
                .value;


        const categoria =
            document
                .getElementById("gastoCategoria")
                .value.trim();


        const tipo =
            document
                .getElementById("gastoTipo")
                .value;


        if (
            !descricao ||
            valor <= 0 ||
            !data ||
            !categoria ||
            !tipo
        ) {

            alert("Preencha todos os campos do gasto.");

            return;

        }


        gastos.push({

            id: Date.now(),

            descricao,

            valor,

            data,

            categoria,

            tipo

        });


        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ======================================================
// CONTAS FIXAS
// ======================================================

document
    .getElementById("formConta")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("contaNome")
                .value.trim();


        const valor =
            Number(
                document
                    .getElementById("contaValor")
                    .value
            );


        const vencimento =
            document
                .getElementById("contaVencimento")
                .value;


        const obrigatorio =
            document
                .getElementById("contaObrigatorio")
                .value;


        const status =
            document
                .getElementById("contaStatus")
                .value;


        if (
            !nome ||
            valor <= 0 ||
            !vencimento ||
            !obrigatorio ||
            !status
        ) {

            alert("Preencha todos os campos da conta.");

            return;

        }


        contas.push({

            id: Date.now(),

            nome,

            valor,

            vencimento,

            obrigatorio,

            status

        });


        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ======================================================
// A RECEBER
// ======================================================

document
    .getElementById("formReceber")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("receberNome")
                .value.trim();


        const valor =
            Number(
                document
                    .getElementById("receberValor")
                    .value
            );


        const data =
            document
                .getElementById("receberData")
                .value;


        const prazo =
            document
                .getElementById("receberPrazo")
                .value;


        const status =
            document
                .getElementById("receberStatus")
                .value;


        if (
            !nome ||
            valor <= 0 ||
            !data ||
            !prazo
        ) {

            alert("Preencha todos os campos.");

            return;

        }


        receber.push({

            id: Date.now(),

            nome,

            valor,

            data,

            prazo,

            status

        });


        salvarDados();

        this.reset();

        atualizarTudo();

    });


// ======================================================
// TABELA DE ENTRADAS
// ======================================================

function mostrarEntradas() {

    const lista =
        document.getElementById(
            "listaEntradas"
        );


    lista.innerHTML = "";


    entradas.forEach(item => {

        lista.innerHTML += `

            <tr>

                <td>
                    ${item.descricao}
                </td>

                <td>
                    ${dinheiro(item.valor)}
                </td>

                <td>
                    ${formatarData(item.data)}
                </td>

                <td>
                    ${item.categoria}
                </td>

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


// ======================================================
// TABELA DE GASTOS
// ======================================================

function mostrarGastos() {

    const lista =
        document.getElementById(
            "listaGastos"
        );


    lista.innerHTML = "";


    gastos.forEach(item => {

        lista.innerHTML += `

            <tr>

                <td>
                    ${item.descricao}
                </td>

                <td>
                    ${dinheiro(item.valor)}
                </td>

                <td>
                    ${formatarData(item.data)}
                </td>

                <td>
                    ${item.categoria}
                </td>

                <td>
                    ${item.tipo}
                </td>

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


// ======================================================
// TABELA DE CONTAS
// ======================================================

function mostrarContas() {

    const lista =
        document.getElementById(
            "listaContas"
        );


    lista.innerHTML = "";


    contas.forEach(item => {

        lista.innerHTML += `

            <tr>

                <td>
                    ${item.nome}
                </td>

                <td>
                    ${dinheiro(item.valor)}
                </td>

                <td>
                    ${formatarData(item.vencimento)}
                </td>

                <td>
                    ${item.obrigatorio}
                </td>

                <td>
                    ${item.status}
                </td>

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


// ======================================================
// DIAS DE ATRASO
// ======================================================

function calcularAtraso(prazo, status) {

    if (status === "Recebido") {

        return 0;

    }


    const hoje =
        new Date();


    const dataPrazo =
        new Date(
            prazo + "T23:59:59"
        );


    if (hoje <= dataPrazo) {

        return 0;

    }


    const diferenca =
        hoje.getTime() -
        dataPrazo.getTime();


    return Math.floor(
        diferenca /
        (1000 * 60 * 60 * 24)
    );

}


// ======================================================
// TABELA A RECEBER
// ======================================================

function mostrarReceber() {

    const lista =
        document.getElementById(
            "listaReceber"
        );


    lista.innerHTML = "";


    receber.forEach(item => {

        const atraso =
            calcularAtraso(
                item.prazo,
                item.status
            );


        lista.innerHTML += `

            <tr>

                <td>
                    ${item.nome}
                </td>

                <td>
                    ${dinheiro(item.valor)}
                </td>

                <td>
                    ${formatarData(item.data)}
                </td>

                <td>
                    ${formatarData(item.prazo)}
                </td>

                <td>
                    ${atraso} dia(s)
                </td>

                <td>
                    ${item.status}
                </td>

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


// ======================================================
// EXCLUSÕES
// ======================================================

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


// ======================================================
// DASHBOARD
// ======================================================

function atualizarDashboard() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + Number(item.valor),
            0
        );


    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + Number(item.valor),
            0
        );


    const totalReceber =
        receber
            .filter(
                item =>
                    item.status !== "Recebido"
            )
            .reduce(
                (total, item) =>
                    total + Number(item.valor),
                0
            );


    const saldo =
        totalEntradas -
        totalGastos;


    document.getElementById(
        "saldo"
    ).textContent =
        dinheiro(saldo);


    document.getElementById(
        "totalEntradas"
    ).textContent =
        dinheiro(totalEntradas);


    document.getElementById(
        "totalGastos"
    ).textContent =
        dinheiro(totalGastos);


    document.getElementById(
        "totalReceber"
    ).textContent =
        dinheiro(totalReceber);


    atualizarGraficos();

}


// ======================================================
// GRÁFICOS
// ======================================================

function atualizarGraficos() {

    const canvasFinanceiro =
        document.getElementById(
            "graficoFinanceiro"
        );


    const canvasCategorias =
        document.getElementById(
            "graficoCategorias"
        );


    if (
        !canvasFinanceiro ||
        !canvasCategorias ||
        typeof Chart === "undefined"
    ) {

        return;

    }


    // --------------------------------------
    // TOTAIS
    // --------------------------------------

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + Number(item.valor),
            0
        );


    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + Number(item.valor),
            0
        );


    // --------------------------------------
    // GRÁFICO FINANCEIRO
    // --------------------------------------

    if (!graficoFinanceiro) {

        graficoFinanceiro =
            new Chart(
                canvasFinanceiro,
                {

                    type: "bar",

                    data: {

                        labels: [
                            "Entradas",
                            "Gastos"
                        ],

                        datasets: [

                            {

                                label: "Valor",

                                data: [
                                    totalEntradas,
                                    totalGastos
                                ]

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        animation: false,

                        plugins: {

                            legend: {
                                display: false
                            }

                        }

                    }

                }
            );

    } else {

        graficoFinanceiro
            .data
            .datasets[0]
            .data = [

                totalEntradas,

                totalGastos

            ];


        graficoFinanceiro.update("none");

    }


    // --------------------------------------
    // CATEGORIAS
    // --------------------------------------

    const categorias = {};


    gastos.forEach(gasto => {

        const categoria =
            gasto.categoria ||
            "Sem categoria";


        if (!categorias[categoria]) {

            categorias[categoria] = 0;

        }


        categorias[categoria] +=
            Number(gasto.valor);

    });


    const labels =
        Object.keys(categorias);


    const valores =
        Object.values(categorias);


    // --------------------------------------
    // GRÁFICO DE CATEGORIAS
    // --------------------------------------

    if (!graficoCategorias) {

        graficoCategorias =
            new Chart(
                canvasCategorias,
                {

                    type: "doughnut",

                    data: {

                        labels,

                        datasets: [

                            {

                                label: "Gastos",

                                data: valores

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        animation: false

                    }

                }
            );

    } else {

        graficoCategorias
            .data
            .labels = labels;


        graficoCategorias
            .data
            .datasets[0]
            .data = valores;


        graficoCategorias.update("none");

    }

}


// ======================================================
// RESUMO
// ======================================================

function atualizarResumo() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + Number(item.valor),
            0
        );


    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + Number(item.valor),
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
                    total + Number(item.valor),
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
                    total + Number(item.valor),
                0
            );


    const totalReceber =
        receber
            .filter(
                item =>
                    item.status !== "Recebido"
            )
            .reduce(
                (total, item) =>
                    total + Number(item.valor),
                0
            );


    const saldo =
        totalEntradas -
        totalGastos;


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


    document.getElementById(
        "resumoSaldo"
    ).textContent =
        dinheiro(saldo);


    document.getElementById(
        "resumoReceber"
    ).textContent =
        dinheiro(totalReceber);

}


// ======================================================
// ATUALIZAR SISTEMA
// ======================================================

function atualizarTudo() {

    mostrarEntradas();

    mostrarGastos();

    mostrarContas();

    mostrarReceber();

    atualizarDashboard();

    atualizarResumo();

}


// ======================================================
// INICIAR
// ======================================================

atualizarTudo();