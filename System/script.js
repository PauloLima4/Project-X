// ========================================
// DADOS
// ========================================

let entradas = JSON.parse(
    localStorage.getItem("entradas")
) || [];

let gastos = JSON.parse(
    localStorage.getItem("gastos")
) || [];

let contas = JSON.parse(
    localStorage.getItem("contas")
) || [];

let receber = JSON.parse(
    localStorage.getItem("receber")
) || [];


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
// DINHEIRO
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
// DATA
// ========================================

function formatarData(data) {

    if (!data) return "-";

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ========================================
// NAVEGAÇÃO
// ========================================

document.querySelectorAll(".menu").forEach(menu => {

    menu.addEventListener("click", () => {

        document.querySelectorAll(".menu")
            .forEach(m => m.classList.remove("active"));

        menu.classList.add("active");

        document.querySelectorAll(".page")
            .forEach(page =>
                page.classList.remove("active-page")
            );

        document
            .getElementById(menu.dataset.page)
            .classList.add("active-page");

    });

});


// ========================================
// ENTRADAS
// ========================================

document
    .getElementById("formEntrada")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const descricao =
            document.getElementById(
                "entradaDescricao"
            ).value.trim();

        const valor =
            Number(
                document.getElementById(
                    "entradaValor"
                ).value
            );

        const data =
            document.getElementById(
                "entradaData"
            ).value;

        const categoria =
            document.getElementById(
                "entradaCategoria"
            ).value.trim();


        if (!descricao || !valor || !data || !categoria) {
            alert("Preencha todos os campos.");
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


// ========================================
// GASTOS
// ========================================

document
    .getElementById("formGasto")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const descricao =
            document.getElementById(
                "gastoDescricao"
            ).value.trim();

        const valor =
            Number(
                document.getElementById(
                    "gastoValor"
                ).value
            );

        const data =
            document.getElementById(
                "gastoData"
            ).value;

        const categoria =
            document.getElementById(
                "gastoCategoria"
            ).value.trim();

        const tipo =
            document.getElementById(
                "gastoTipo"
            ).value;


        if (
            !descricao ||
            !valor ||
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


// ========================================
// CONTAS FIXAS
// ========================================

document
    .getElementById("formConta")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const nome =
            document.getElementById(
                "contaNome"
            ).value.trim();

        const valor =
            Number(
                document.getElementById(
                    "contaValor"
                ).value
            );

        const vencimento =
            document.getElementById(
                "contaVencimento"
            ).value;

        const obrigatorio =
            document.getElementById(
                "contaObrigatorio"
            ).value;

        const status =
            document.getElementById(
                "contaStatus"
            ).value;


        if (
            !nome ||
            !valor ||
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


// ========================================
// A RECEBER
// ========================================

document
    .getElementById("formReceber")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const nome =
            document.getElementById(
                "receberNome"
            ).value.trim();

        const valor =
            Number(
                document.getElementById(
                    "receberValor"
                ).value
            );

        const data =
            document.getElementById(
                "receberData"
            ).value;

        const prazo =
            document.getElementById(
                "receberPrazo"
            ).value;

        const status =
            document.getElementById(
                "receberStatus"
            ).value;


        if (
            !nome ||
            !valor ||
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

                <td>${formatarData(item.data)}</td>

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

                <td>${formatarData(item.data)}</td>

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

                <td>${formatarData(item.vencimento)}</td>

                <td>${item.obrigatorio}</td>

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

        let atraso = 0;


        if (item.status !== "Recebido") {

            const prazo =
                new Date(
                    item.prazo + "T23:59:59"
                );


            if (hoje > prazo) {

                const diferenca =
                    hoje.getTime() -
                    prazo.getTime();


                atraso =
                    Math.floor(
                        diferenca /
                        (1000 * 60 * 60 * 24)
                    );

            }

        }


        lista.innerHTML += `

            <tr>

                <td>${item.nome}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${formatarData(item.data)}</td>

                <td>${formatarData(item.prazo)}</td>

                <td>${atraso} dia(s)</td>

                <td>${item.status}</td>

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
// EXCLUIR
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

let graficoFinanceiro = null;

let graficoCategorias = null;


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
                item => item.status !== "Recebido"
            )
            .reduce(
                (total, item) =>
                    total + Number(item.valor),
                0
            );


    const saldo =
        totalEntradas - totalGastos;


    document.getElementById(
        "saldo"
    ).textContent = dinheiro(saldo);


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


    criarGraficos();

}


// ========================================
// GRÁFICOS
// ========================================

function criarGraficos() {

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

        const categoria =
            gasto.categoria || "Sem categoria";


        if (!categorias[categoria]) {

            categorias[categoria] = 0;

        }


        categorias[categoria] +=
            Number(gasto.valor);

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

                    datasets: [

                        {

                            data:
                                Object.values(
                                    categorias
                                )

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false

                }

            }
        );

}


// ========================================
// RESUMO MENSAL
// ========================================

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
                item => item.status !== "Recebido"
            )
            .reduce(
                (total, item) =>
                    total + Number(item.valor),
                0
            );


    const saldo =
        totalEntradas - totalGastos;


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
// INICIAR
// ========================================

atualizarTudo();