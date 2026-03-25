// Dicas de economia
const dicas = [
  "Separe 10% de cada renda que você recebe antes de gastar.",
  "Evite compras por impulso: espere 24h antes de comprar algo não essencial.",
  "Cozinhar em casa economiza até 60% comparado com comer fora.",
  "Use o método dos envelopes: separe dinheiro por categoria de gasto.",
  "Revise suas assinaturas e cancele as que não usa.",
  "Defina um dia da semana para verificar seus gastos.",
  "Economize energia: desconecte aparelhos que não estão em uso.",
  "Faça uma lista de compras antes de ir ao supermercado.",
  "Evite desperdício: planeje suas refeições da semana.",
  "Guarde moedas: junte moedas em um cofre por mês."
];

// Variáveis globais
let valorEconomizado = 0;
let metaTotal = 0;
let valorMensal = 0;

// Elementos do DOM
const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");
const objetivo = params.get("objetivo");
const modo = params.get("modo");
metaTotal = parseFloat(params.get("metaTotal")) || 0;
valorMensal = parseFloat(params.get("valorMensal")) || 0;

// Inicializar página
document.addEventListener("DOMContentLoaded", function () {
  // Preencher dados básicos
  if (nome) {
    document.getElementById("saudacao").textContent = `Olá, ${nome}`;
  }
  
  document.getElementById("nomeObjetivo").textContent = objetivo;
  document.getElementById("metaTotal").textContent = metaTotal.toFixed(2);

  // Verificar modo de cálculo
  const mensagemGuardar = document.getElementById("mensagemGuardar");
  if (mensagemGuardar) {
    if (modo === "calculo" && valorMensal > 0) {
      // Se veio do cálculo, mostrar quanto precisa guardar por mês
      const valorFormatado = valorMensal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      mensagemGuardar.innerHTML = `<p class="aviso-guardar">💡 ${nome}, você precisa guardar <strong>${valorFormatado}</strong> por mês para alcançar sua meta!</p>`;
    } else if (valorMensal > 0) {
      // Se registrou valor mensal, mostrar quanto planeja guardar
      const valorFormatado = valorMensal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      mensagemGuardar.innerHTML = `<p class="aviso-guardar">📊 Meta mensal: <strong>${valorFormatado}</strong></p>`;
    } else {
      // Se não registrou nenhum valor, mostrar aviso
      mensagemGuardar.innerHTML = `<p class="aviso-guardar alerta">⚠️ Você não definiu quanto vai guardar por mês. Registre suas economias para acompanhar o progresso!</p>`;
    }
  }

  // Atualizar valores iniciais
  atualizarValores();

  // Sortear dica inicial
  sortearDica();

  // Configurar eventos
  configurarEventos();
});

function atualizarValores() {
  const falta = Math.max(0, metaTotal - valorEconomizado);
  const percentual = metaTotal > 0 ? Math.min((valorEconomizado / metaTotal) * 100, 100) : 0;

  // Atualizar textos
  document.getElementById("valorEconomizado").textContent = valorEconomizado.toFixed(2);
  document.getElementById("valorFalta").textContent = falta.toFixed(2);

  // Atualizar barra de progresso
  const barra = document.getElementById("barraProgresso");
  barra.style.width = percentual + "%";
  barra.textContent = percentual >= 10 ? percentual.toFixed(0) + "%" : "";
  
  document.getElementById("percentual").textContent = percentual.toFixed(1) + "%";

  // Verificar se atingiu a meta
  if (valorEconomizado >= metaTotal && metaTotal > 0) {
    mostrarParabens();
  }

  // Atualizar feedback inteligente
  atualizarFeedback(percentual);

  // Atualizar gráfico
  if (window.grafico) {
    window.grafico.data.datasets[0].data = [valorEconomizado, falta];
    window.grafico.update();
  }
}

function mostrarParabens() {
  const mensagemParabens = document.getElementById("mensagemParabens");
  if (mensagemParabens) {
    mensagemParabens.classList.add("mostrar");
    
    // Ocultar após 4 segundos
    setTimeout(function() {
      mensagemParabens.classList.remove("mostrar");
    }, 4000);
  }
}

function atualizarFeedback(percentual) {
  const feedbackEl = document.getElementById("feedback");
  
  const metaEsperada = metaTotal / 12;
  
  if (valorEconomizado >= metaEsperada) {
    feedbackEl.className = "feedback sucesso";
    feedbackEl.textContent = "Você está acima da meta. Continue assim! 🎉";
  } else {
    feedbackEl.className = "feedback alerta";
    feedbackEl.textContent = "Você está abaixo da meta. Ajuste agora para não acumular.";
  }
}

function configurarEventos() {
  document.getElementById("btnAdicionar")?.addEventListener("click", function () {
    document.getElementById("cardEconomia").classList.add("ativo");
  });

  document.getElementById("btnResetar")?.addEventListener("click", function () {
    if (confirm("Tem certeza que deseja recomeçar?")) {
      window.location.href = "inicio.html";
    }
  });

  document.getElementById("fecharCardEconomia")?.addEventListener("click", function () {
    document.getElementById("cardEconomia").classList.remove("ativo");
  });

  document.getElementById("cardEconomia")?.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("ativo");
    }
  });

  document.getElementById("formEconomia")?.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const valor = parseFloat(document.getElementById("valorEconomia").value);
    if (valor && valor > 0) {
      valorEconomizado += valor;
      atualizarValores();
      
      document.getElementById("valorEconomia").value = "";
      document.getElementById("cardEconomia").classList.remove("ativo");
    }
  });

  document.getElementById("btnNovaDica")?.addEventListener("click", sortearDica);
}

function sortearDica() {
  const dicaEl = document.getElementById("textoDica");
  const randomIndex = Math.floor(Math.random() * dicas.length);
  dicaEl.textContent = dicas[randomIndex];
}

const ctx = document.getElementById("graficoMeta");
if (ctx) {
    window.grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Economizado", "Falta"],
      datasets: [{
        data: [valorEconomizado, Math.max(0, metaTotal - valorEconomizado)],
        backgroundColor: ["#F59E0B", "#334155"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15,
            usePointStyle: true
          }
        }
      },
      cutout: "60%"
    }
  });
}

