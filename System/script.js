"use strict";

/* =====================================================
   DADOS
===================================================== */

let entradas = carregar("entradas");
let gastos = carregar("gastos");
let contas = carregar("contas");
let receber = carregar("receber");


function carregar(chave) {
    try {
        const dados = localStorage.getItem(chave);

        if (!dados) {
            return [];
        }

        const convertido = JSON.parse(dados);

        return Array.isArray(convertido) ? convertido : [];

    } catch (erro) {
        console.error("Erro ao carregar:", chave, erro);
        return [];
    }
}


/* =====================================================
   SALVAR
===================================================== */

function salvarDados() {

    localStorage.setItem("entradas", JSON.stringify(entradas));
    localStorage.setItem("gastos", JSON.stringify(gastos));
    localStorage.setItem("contas", JSON.stringify(contas));
    localStorage.setItem("receber", JSON.stringify(receber));

}


/* =====================================================
   FORMATAÇÃO
===================================================== */

function dinheiro(valor) {

    return Number(valor || 0).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function formatarData(data) {

    if (!data) {
        return "-";
    }

    const partes = String(data).split("-");

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


function escaparHTML(valor) {

    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   NAVEGAÇÃO
===================================================== */

document.querySelectorAll(".menu").forEach(menu => {

    menu.addEventListener("click", function () {

        document.querySelectorAll(".menu")
            .forEach(item => item.classList.remove("active"));

        document.querySelectorAll(".page")
            .forEach(page => page.classList.remove("active-page"));

        this.classList.add("active");

        const pagina = document.getElementById(this.dataset.page);

        if (pagina) {
            pagina.classList.add("active-page");
        }

    });

});


/* =====================================================
   ENTRADAS
===================================================== */

document.getElementById("formEntrada")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const descricao =
            document.getElementById("entradaDescricao").value.trim();

        const valor =
            Number(document.getElementById("entradaValor").value);

        const data =
            document.getElementById("entradaData").value;

        const categoria =
            document.getElementById("entradaCategoria").value.trim();


        if (!descricao || !Number.isFinite(valor) || valor <= 0 || !data || !categoria) {
            alert("Preencha todos os campos corretamente.");
            return;
        }


        entradas.push({

            id: Date.now() + Math.random(),

            descricao,

            valor,

            data,

            categoria

        });


        salvarDados();

        this.reset();

        atualizarTudo();

    });


/* =====================================================
   GASTOS
===================================================== */

document.getElementById("formGasto")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const descricao =
            document.getElementById("gastoDescricao").value.trim();

        const valor =
            Number(document.getElementById("gastoValor").value);

        const data =
            document.getElementById("gastoData").value;

        const categoria =
            document.getElementById("gastoCategoria").value.trim();

        const tipo =
            document.getElementById("gastoTipo").value;


        if (
            !descricao ||
            !Number.isFinite(valor) ||
            valor <= 0 ||
            !data ||
            !categoria ||
            !tipo
        ) {
            alert("Preencha todos os campos do gasto.");
            return;
        }


        gastos.push({

            id: Date.now() + Math.random(),

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


/* =====================================================
   CONTAS FIXAS
===================================================== */

document.getElementById("formConta")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const nome =
            document.getElementById("contaNome").value.trim();

        const valor =
            Number(document.getElementById("contaValor").value);

        const vencimento =
            document.getElementById("contaVencimento").value;

        const obrigatorio =
            document.getElementById("contaObrigatorio").value;

        const status =
            document.getElementById("contaStatus").value;


        if (
            !nome ||
            !Number.isFinite(valor) ||
            valor <= 0 ||
            !vencimento ||
            !obrigatorio ||
            !status
        ) {
            alert("Preencha todos os campos da conta.");
            return;
        }


        contas.push({

            id: Date.now() + Math.random(),

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


/* =====================================================
   A RECEBER
===================================================== */

document.getElementById("formReceber")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const nome =
            document.getElementById("receberNome").value.trim();

        const valor =
            Number(document.getElementById("receberValor").value);

        const data =
            document.getElementById("receberData").value;

        const prazo =
            document.getElementById("receberPrazo").value;

        const status =
            document.getElementById("receberStatus").value;


        if (
            !nome ||
            !Number.isFinite(valor) ||
            valor <= 0 ||
            !data ||
            !prazo
        ) {
            alert("Preencha todos os campos.");
            return;
        }


        receber.push({

            id: Date.now() + Math.random(),

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


/* =====================================================
   ENTRADAS - TABELA
===================================================== */

function mostrarEntradas() {

    const lista = document.getElementById("listaEntradas");

    lista.innerHTML = "";


    if (entradas.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="5" class="empty-row">
                    Nenhuma entrada cadastrada.
                </td>
            </tr>
        `;

        return;
    }


    entradas.forEach(item => {

        lista.insertAdjacentHTML("beforeend", `

            <tr>

                <td>${escaparHTML(item.descricao)}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${formatarData(item.data)}</td>

                <td>${escaparHTML(item.categoria)}</td>

                <td>
                    <button
                        class="delete"
                        data-tipo="entrada"
                        data-id="${item.id}"
                    >
                        Excluir
                    </button>
                </td>

            </tr>

        `);

    });

}


/* =====================================================
   GASTOS - TABELA
===================================================== */

function mostrarGastos() {

    const lista = document.getElementById("listaGastos");

    lista.innerHTML = "";


    if (gastos.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">
                    Nenhum gasto cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    gastos.forEach(item => {

        lista.insertAdjacentHTML("beforeend", `

            <tr>

                <td>${escaparHTML(item.descricao)}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${formatarData(item.data)}</td>

                <td>${escaparHTML(item.categoria)}</td>

                <td>${escaparHTML(item.tipo)}</td>

                <td>
                    <button
                        class="delete"
                        data-tipo="gasto"
                        data-id="${item.id}"
                    >
                        Excluir
                    </button>
                </td>

            </tr>

        `);

    });

}


/* =====================================================
   CONTAS - TABELA
===================================================== */

function mostrarContas() {

    const lista = document.getElementById("listaContas");

    lista.innerHTML = "";


    if (contas.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">
                    Nenhuma conta cadastrada.
                </td>
            </tr>
        `;

        return;
    }


    contas.forEach(item => {

        lista.insertAdjacentHTML("beforeend", `

            <tr>

                <td>${escaparHTML(item.nome)}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${formatarData(item.vencimento)}</td>

                <td>${escaparHTML(item.obrigatorio)}</td>

                <td>${escaparHTML(item.status)}</td>

                <td>
                    <button
                        class="delete"
                        data-tipo="conta"
                        data-id="${item.id}"
                    >
                        Excluir
                    </button>
                </td>

            </tr>

        `);

    });

}


/* =====================================================
   DIAS DE ATRASO
===================================================== */

function calcularAtraso(prazo, status) {

    if (status === "Recebido" || !prazo) {
        return 0;
    }


    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);


    const partes = prazo.split("-");

    if (partes.length !== 3) {
        return 0;
    }


    const dataPrazo = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

    dataPrazo.setHours(0, 0, 0, 0);


    const diferenca =
        hoje.getTime() - dataPrazo.getTime();


    if (diferenca <= 0) {
        return 0;
    }


    return Math.floor(
        diferenca / 86400000
    );

}


/* =====================================================
   A RECEBER - TABELA
===================================================== */

function mostrarReceber() {

    const lista = document.getElementById("listaReceber");

    lista.innerHTML = "";


    if (receber.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="7" class="empty-row">
                    Nenhum valor a receber cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    receber.forEach(item => {

        const atraso =
            calcularAtraso(item.prazo, item.status);


        lista.insertAdjacentHTML("beforeend", `

            <tr>

                <td>${escaparHTML(item.nome)}</td>

                <td>${dinheiro(item.valor)}</td>

                <td>${formatarData(item.data)}</td>

                <td>${formatarData(item.prazo)}</td>

                <td>${atraso} dia(s)</td>

                <td>${escaparHTML(item.status)}</td>

                <td>
                    <button
                        class="delete"
                        data-tipo="receber"
                        data-id="${item.id}"
                    >
                        Excluir
                    </button>
                </td>

            </tr>

        `);

    });

}


/* =====================================================
   EXCLUSÃO
===================================================== */

document.addEventListener("click", function (event) {

    const botao = event.target.closest(".delete");

    if (!botao) {
        return;
    }


    const id = Number(botao.dataset.id);

    const tipo = botao.dataset.tipo;


    if (!confirm("Deseja excluir este registro?")) {
        return;
    }


    if (tipo === "entrada") {

        entradas =
            entradas.filter(item => Number(item.id) !== id);

    }


    if (tipo === "gasto") {

        gastos =
            gastos.filter(item => Number(item.id) !== id);

    }


    if (tipo === "conta") {

        contas =
            contas.filter(item => Number(item.id) !== id);

    }


    if (tipo === "receber") {

        receber =
            receber.filter(item => Number(item.id) !== id);

    }


    salvarDados();

    atualizarTudo();

});


/* =====================================================
   DASHBOARD
===================================================== */

function atualizarDashboard() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + Number(item.valor || 0),
            0
        );


    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + Number(item.valor || 0),
            0
        );


    const totalReceber =
        receber
            .filter(item => item.status !== "Recebido")
            .reduce(
                (total, item) =>
                    total + Number(item.valor || 0),
                0
            );


    const saldo =
        totalEntradas - totalGastos;


    document.getElementById("saldo").textContent =
        dinheiro(saldo);


    document.getElementById("totalEntradas").textContent =
        dinheiro(totalEntradas);


    document.getElementById("totalGastos").textContent =
        dinheiro(totalGastos);


    document.getElementById("totalReceber").textContent =
        dinheiro(totalReceber);


    atualizarGraficos(
        totalEntradas,
        totalGastos
    );

}


/* =====================================================
   GRÁFICO ENTRADAS X GASTOS
   SEM CHART.JS
   SEM CANVAS
   SEM REDIMENSIONAMENTO INFINITO
===================================================== */

function atualizarGraficoFinanceiro(
    totalEntradas,
    totalGastos
) {

    const barraEntrada =
        document.getElementById("barraEntrada");

    const barraGasto =
        document.getElementById("barraGasto");

    const valorEntrada =
        document.getElementById("valorBarraEntrada");

    const valorGasto =
        document.getElementById("valorBarraGasto");


    valorEntrada.textContent =
        dinheiro(totalEntradas);

    valorGasto.textContent =
        dinheiro(totalGastos);


    const maior =
        Math.max(
            totalEntradas,
            totalGastos,
            1
        );


    const alturaEntrada =
        (totalEntradas / maior) * 100;


    const alturaGasto =
        (totalGastos / maior) * 100;


    barraEntrada.style.height =
        `${alturaEntrada}%`;


    barraGasto.style.height =
        `${alturaGasto}%`;

}


/* =====================================================
   GRÁFICO POR CATEGORIA
   FEITO COM CSS
===================================================== */

function atualizarGraficoCategorias() {

    const donut =
        document.getElementById("donutCategorias");

    const legenda =
        document.getElementById("legendaCategorias");

    const totalDonut =
        document.getElementById("totalDonut");


    const categorias = {};


    gastos.forEach(gasto => {

        const categoria =
            gasto.categoria || "Sem categoria";


        const valor =
            Number(gasto.valor || 0);


        categorias[categoria] =
            (categorias[categoria] || 0) + valor;

    });


    const nomes =
        Object.keys(categorias);


    const valores =
        Object.values(categorias);


    const total =
        valores.reduce(
            (soma, valor) => soma + valor,
            0
        );


    totalDonut.textContent =
        dinheiro(total);


    if (total <= 0 || nomes.length === 0) {

        donut.style.background =
            "#e5e7eb";


        legenda.innerHTML =
            `<p class="empty-chart">
                Nenhum gasto cadastrado.
            </p>`;

        return;
    }


    const cores = [
        "#2563eb",
        "#ef4444",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#ec4899",
        "#06b6d4",
        "#84cc16",
        "#f97316",
        "#6366f1"
    ];


    let acumulado = 0;

    const partes = [];


    nomes.forEach((nome, indice) => {

        const percentual =
            (categorias[nome] / total) * 100;


        const inicio =
            acumulado;


        acumulado += percentual;


        partes.push(
            `${cores[indice % cores.length]} ${inicio}% ${acumulado}%`
        );

    });


    donut.style.background =
        `conic-gradient(${partes.join(", ")})`;


    legenda.innerHTML = "";


    nomes.forEach((nome, indice) => {

        const item =
            document.createElement("div");

        item.className =
            "legend-item";


        const cor =
            document.createElement("span");

        cor.className =
            "legend-color";


        cor.style.background =
            cores[indice % cores.length];


        const texto =
            document.createElement("span");

        texto.className =
            "legend-text";


        texto.textContent =
            `${nome}: ${dinheiro(categorias[nome])}`;


        item.appendChild(cor);

        item.appendChild(texto);

        legenda.appendChild(item);

    });

}


/* =====================================================
   ATUALIZAÇÃO DOS GRÁFICOS
===================================================== */

function atualizarGraficos(
    totalEntradas,
    totalGastos
) {

    atualizarGraficoFinanceiro(
        totalEntradas,
        totalGastos
    );


    atualizarGraficoCategorias();

}


/* =====================================================
   RESUMO
===================================================== */

function atualizarResumo() {

    const totalEntradas =
        entradas.reduce(
            (total, item) =>
                total + Number(item.valor || 0),
            0
        );


    const totalGastos =
        gastos.reduce(
            (total, item) =>
                total + Number(item.valor || 0),
            0
        );


    const obrigatorios =
        gastos
            .filter(item => item.tipo === "Obrigatório")
            .reduce(
                (total, item) =>
                    total + Number(item.valor || 0),
                0
            );


    const futeis =
        gastos
            .filter(item => item.tipo === "Fútil")
            .reduce(
                (total, item) =>
                    total + Number(item.valor || 0),
                0
            );


    const totalReceber =
        receber
            .filter(item => item.status !== "Recebido")
            .reduce(
                (total, item) =>
                    total + Number(item.valor || 0),
                0
            );


    const saldo =
        totalEntradas - totalGastos;


    document.getElementById("resumoEntradas").textContent =
        dinheiro(totalEntradas);


    document.getElementById("resumoGastos").textContent =
        dinheiro(totalGastos);


    document.getElementById("resumoObrigatorios").textContent =
        dinheiro(obrigatorios);


    document.getElementById("resumoFuteis").textContent =
        dinheiro(futeis);


    document.getElementById("resumoSaldo").textContent =
        dinheiro(saldo);


    document.getElementById("resumoReceber").textContent =
        dinheiro(totalReceber);

}


/* =====================================================
   ATUALIZAR TUDO
===================================================== */

function atualizarTudo() {

    mostrarEntradas();

    mostrarGastos();

    mostrarContas();

    mostrarReceber();

    atualizarDashboard();

    atualizarResumo();

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    atualizarTudo();

});