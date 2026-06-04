let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

let dadosGlobal = null;

const elemento = {
  aside: document.querySelector("aside"),
  sections: document.querySelectorAll("section"),
};

elemento.aside.addEventListener("click", (e) => {
  e.preventDefault();
  displayControler(e.target.id);
});

// Função de controle de exibição de sections
function displayControler(id) {
  elemento.sections.forEach((section) => {
    section.classList.add("hidden");
    section.classList.remove("visible");

    if (section.classList.contains(id)) {
      section.classList.remove("hidden");
      section.classList.add("visible");
    }
  });
}

//! Conversor de moedas --------------------------------------------------------------------------------------------

async function getDados(url) {
  try {
    if (!url) throw new Error("A Api não foi achada!");
    const dadosApi = await fetch(url);

    if (dadosApi.ok === false)
      throw new Error("Fetch não buscou as informações!");

    const dados = await dadosApi.json();
    dadosGlobal = dados;

    if (!dados) throw new Error("Não foi transformada para .json");

    // Atualiza a cotação exibida na tela com o valor real da API
    const cotacao = Number(dadosGlobal.USDBRL.bid).toFixed(2);
    document.querySelector(".cotacao-atual").textContent =
      `Cotação do Dólar Atual: R$ ${cotacao}`;
  } catch (error) {
    console.error(error);
    document.querySelector(".cotacao-atual").textContent =
      "Erro ao buscar cotação. Tente novamente.";
  }
}

getDados(url);

document.querySelector("#valorReal").addEventListener("input", () => {
  if (!dadosGlobal) return;
  let valorDoReal = Number(document.querySelector("#valorReal").value);
  document.querySelector("#valorUsd").value = calcRealParaDolar(
    valorDoReal,
    dadosGlobal.USDBRL.bid,
  ).toFixed(2);
});

document.querySelector("#valorUsd").addEventListener("input", () => {
  if (!dadosGlobal) return;
  let valorDoUsd = Number(document.querySelector("#valorUsd").value);
  document.querySelector("#valorReal").value = calcDolarParaReal(
    valorDoUsd,
    dadosGlobal.USDBRL.bid,
  ).toFixed(2);
});

// Funções puras — Moedas
function calcRealParaDolar(real, bid) {
  return real / bid;
}

function calcDolarParaReal(dolar, bid) {
  return dolar * bid;
}

//! Final Conversor de moedas ---------------------------------------------------------------------------------------

//! Calculadora de IMC -----------------------------------------------------------------------------------------------

function calcularImc() {
  let peso = document.querySelector("#peso");
  let altura = document.querySelector("#altura");
  let genero = document.querySelector("#genero");

  if (altura.value === "0") {
    exibirErroImc("Valor do Input Inválido", peso, altura);
    return;
  }

  if (peso.value === "" || altura.value === "") {
    exibirErroImc("Digite algum valor", peso, altura);
    return;
  }

  if (isNaN(peso.value) || isNaN(altura.value)) {
    exibirErroImc("Digite um valor válido", peso, altura);
    return;
  }

  if (Number(peso.value) < 0 || Number(altura.value) < 0) {
    exibirErroImc("Digite um valor válido", peso, altura);
    return;
  }

  let resultado = calcIMC(Number(peso.value), Number(altura.value));

  document.querySelector(".resultado-imc").textContent =
    `${resultado.toFixed(2)} (${genero.value})`;

  let classificacao = classificarIMC(resultado, genero.value);
  document.querySelector(".grupos").textContent =
    `Classificação: ${classificacao}`;

  setTimeout(() => {
    peso.value = "";
    altura.value = "";
    document.querySelector(".resultado-imc").textContent = "";
    document.querySelector(".grupos").textContent = "";
  }, 5000);
}

// Funções puras — IMC
function calcIMC(peso, altura) {
  return peso / altura ** 2;
}

function classificarIMC(imc, genero) {
  if (imc < 18.5) return "Abaixo do peso";

  if (genero === "Masculino") {
    if (imc <= 24.9) return "Normal";
    if (imc <= 29.9) return "Sobrepeso";
    if (imc <= 39.9) return "Obesidade";
    return "Obesidade grave";
  }

  if (genero === "Feminino") {
    if (imc <= 23.9) return "Normal";
    if (imc <= 28.9) return "Sobrepeso";
    return "Obesidade";
  }

  return "Não se encaixa em nenhum grupo!";
}

function exibirErroImc(mensagem, peso, altura) {
  document.querySelector(".resultado-imc").textContent = mensagem;
  setTimeout(() => {
    peso.value = "";
    altura.value = "";
    document.querySelector(".resultado-imc").textContent = "";
  }, 3000);
}

//! Final Calculadora de IMC ----------------------------------------------------------------------------------------

//! Conversor de Temperatura ----------------------------------------------------------------------------------------

// Funções puras — Temperatura
function calcCparaF(c) {
  return c * (9 / 5) + 32;
}
function calcCparaK(c) {
  return c + 273.15;
}
function calcFparaC(f) {
  return (f - 32) * (5 / 9);
}
function calcFparaK(f) {
  return (f - 32) * (5 / 9) + 273.15;
}
function calcKparaC(k) {
  return k - 273.15;
}
function calcKparaF(k) {
  return (k - 273.15) * (9 / 5) + 32;
}

document.querySelector("#valorC").addEventListener("input", () => {
  let c = Number(document.querySelector("#valorC").value);
  document.querySelector("#valorF").value = calcCparaF(c).toFixed(2);
  document.querySelector("#valorK").value = calcCparaK(c).toFixed(2);
});

document.querySelector("#valorF").addEventListener("input", () => {
  let f = Number(document.querySelector("#valorF").value);
  document.querySelector("#valorC").value = calcFparaC(f).toFixed(2);
  document.querySelector("#valorK").value = calcFparaK(f).toFixed(2);
});

document.querySelector("#valorK").addEventListener("input", () => {
  let k = Number(document.querySelector("#valorK").value);
  document.querySelector("#valorC").value = calcKparaC(k).toFixed(2);
  document.querySelector("#valorF").value = calcKparaF(k).toFixed(2);
});

//! Final Conversor de Temperatura ----------------------------------------------------------------------------------

//! Conversor de Velocidade -----------------------------------------------------------------------------------------

// Funções puras — Velocidade
function calcKmParaMph(km) {
  return km * 0.621371;
}
function calcMphParaKm(mph) {
  return mph * 1.60934;
}

document.querySelector("#km").addEventListener("input", () => {
  let valorKm = Number(document.querySelector("#km").value);
  document.querySelector("#mph").value = calcKmParaMph(valorKm).toFixed(2);

  atualizarImagemVelocidade(valorKm, "km");
});

document.querySelector("#mph").addEventListener("input", () => {
  let valorMph = Number(document.querySelector("#mph").value);
  document.querySelector("#km").value = calcMphParaKm(valorMph).toFixed(2);

  atualizarImagemVelocidade(valorMph, "mph");
});

function atualizarImagemVelocidade(valor, unidade) {
  let limites =
    unidade === "km"
      ? [100000, 5000, 1000, 500, 100, 45]
      : [62137, 3107, 621, 310, 62, 28];

  let imagens = [
    "./assets/img/download (5).jpeg",
    "./assets/img/download (4).jpeg",
    "./assets/img/download (3).jpeg",
    "./assets/img/download (2).jpeg",
    "./assets/img/download (7).jpeg",
    "./assets/img/download (1).jpeg",
    "./assets/img/download.jpeg",
  ];

  let src = imagens[imagens.length - 1];
  for (let i = 0; i < limites.length; i++) {
    if (valor >= limites[i]) {
      src = imagens[i];
      break;
    }
  }

  document.querySelector("#velocidade").src = src;
}

//! Final Conversor de Velocidade -----------------------------------------------------------------------------------

//! Conversor de Massa ----------------------------------------------------------------------------------------------

// Funções puras — Massa
function calcKgParaLb(kg) {
  return kg * 2.20462;
}
function calcLbParaKg(lb) {
  return lb * 0.453592;
}

document.querySelector("#kg").addEventListener("input", () => {
  let valorKg = Number(document.querySelector("#kg").value);
  document.querySelector("#lb").value = calcKgParaLb(valorKg).toFixed(2);
});

document.querySelector("#lb").addEventListener("input", () => {
  let valorLb = Number(document.querySelector("#lb").value);
  document.querySelector("#kg").value = calcLbParaKg(valorLb).toFixed(2);
});

//! Final Conversor de Massa ----------------------------------------------------------------------------------------

//! Regra de 3 ----------------------------------------------------------------------------------------------

// Função pura — Regra de 3
function calcRegraDeT(a, b, c) {
  return (b * c) / a;
}

document.querySelector("#calcRegra").addEventListener("click", (e) => {
  e.preventDefault();
  let valor1 = document.querySelector("#v1");
  let valor2 = document.querySelector("#v2");
  let valor3 = document.querySelector("#v3");

  if (valor1.value === "" || valor2.value === "" || valor3.value === "") {
    document.querySelector("#v4").value = "Digite todos os valores!";
    setTimeout(() => {
      valor1.value = "";
      valor2.value = "";
      valor3.value = "";
      document.querySelector("#v4").value = "";
    }, 3000);
    return;
  }

  if (valor1.value == 0 || valor2.value == 0 || valor3.value == 0) {
    document.querySelector("#v4").value = "Valor não pode ser zero!";
    setTimeout(() => {
      valor1.value = "";
      valor2.value = "";
      valor3.value = "";
      document.querySelector("#v4").value = "";
    }, 3000);
    return;
  }

  let x = calcRegraDeT(
    Number(valor1.value),
    Number(valor2.value),
    Number(valor3.value),
  );
  document.querySelector("#v4").value = x.toFixed(2);
});

//! Final Regra de 3 ------------------------------------------------------------------------------------------------

//! Limpeza de dados ------------------------------------------------------------------------------------------------

function displayClean() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}

//! Final Limpeza de dados ------------------------------------------------------------------------------------------

//! Modo noturno ----------------------------------------------------------------------------------------------------

const coisa = {
  body: document.querySelector("body"),
  dark: document.querySelector("#btnDark"),
};

coisa.dark.addEventListener("click", () => {
  coisa.body.classList.toggle("dark-mode");

  if (coisa.body.classList.contains("dark-mode")) {
    coisa.dark.src = "./assets/img/moon-solid-full.svg";
  } else {
    coisa.dark.src = "./assets/img/sun-regular-full.svg";
  }
});

//! Final Modo noturno ----------------------------------------------------------------------------------------------
