// Mensagem de Boas Vindas (estática no HTML)

// Elementos do formulário
const form = document.getElementById("metaForm");
const btnCalcular = document.getElementById("btnCalcular");
const cardCalcular = document.getElementById("cardCalcular");
const btnFecharCalcular = document.getElementById("fecharCardCalcular");
const formCalcular = document.getElementById("formCalcular");

// Abrir card de calcular
if (btnCalcular) {
  btnCalcular.addEventListener("click", function () {
    // Verificar se nome e objetivo estão preenchidos
    const nome = document.getElementById("nome").value;
    const objetivo = document.getElementById("objetivo").value;
    
    if (!nome || !objetivo) {
      alert("Por favor, preencha seu nome e objetivo primeiro!");
      return;
    }
    
    cardCalcular.classList.add("ativo");
  });
}

// Fechar card de calcular
if (btnFecharCalcular) {
  btnFecharCalcular.addEventListener("click", function () {
    cardCalcular.classList.remove("ativo");
  });
}

// Fechar ao clicar fora
if (cardCalcular) {
  cardCalcular.addEventListener("click", function (e) {
    if (e.target === cardCalcular) {
      cardCalcular.classList.remove("ativo");
    }
  });
}

// Calcular valor mensal
if (formCalcular) {
  formCalcular.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const objetivo = document.getElementById("objetivo").value;
    const metaTotal = parseFloat(document.getElementById("metaTotalCalc").value);
    const prazoMeses = parseInt(document.getElementById("prazoMeses").value);

    if (metaTotal && prazoMeses) {
      const valorMensal = (metaTotal / prazoMeses).toFixed(2);

      // Redirecionar para página principal com todos os parâmetros
      window.location.href = `principal.html?nome=${encodeURIComponent(nome)}&objetivo=${encodeURIComponent(objetivo)}&metaTotal=${metaTotal}&valorMensal=${valorMensal}&modo=calculo`;
    }
  });
}

// Enviar formulário principal (sem calcular)
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const objetivo = document.getElementById("objetivo").value;
    const metaTotal = document.getElementById("metaTotal").value;
    const valorMensal = document.getElementById("valorMensal").value || 0;

    window.location.href = `principal.html?nome=${encodeURIComponent(nome)}&objetivo=${encodeURIComponent(objetivo)}&metaTotal=${metaTotal}&valorMensal=${valorMensal}`;
  });
}

