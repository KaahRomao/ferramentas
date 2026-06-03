let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
//
const elemento = {
  aside: document.querySelector("aside"),
  sections: document.querySelectorAll("section"),
};

console.log(elemento.aside);
console.log(elemento.sections);

elemento.aside.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.id);
  displayControler(e.target.id);
});

// Função de controle de exibição de sections!

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

    console.log(dadosApi);
    if (dadosApi.ok === false)
      throw new Error("Fetch não buscou as informações!");
    const dados = await dadosApi.json();
    console.log(dados);
    dadosGlobal = dados;
    if (!dados) throw new Error("Não foi transformada para .json");
  } catch (error) {
    console.error(error);
    console.error("Algo deu errado, chefe!");
  }
}

getDados(url);

document.querySelector("#valorReal").addEventListener("input", (e) => {
  let valorDoReal = document.querySelector("#valorReal").value;

  let resultadoReal = valorDoReal / dadosGlobal.USDBRL.bid;

  document.querySelector("#valorUsd").value = resultadoReal.toFixed(2);
});

document.querySelector("#valorUsd").addEventListener("input", (e) => {
  let valorDoUsd = document.querySelector("#valorUsd").value;

  let resultadoDolar = valorDoUsd * dadosGlobal.USDBRL.bid;

  document.querySelector("#valorReal").value = resultadoDolar.toFixed(2);
});

//!Final Conversor de moedas-------------------------------------------------------------------------------------------

//!Calculadora de IMC --------------------------------------------------------------------------------------------
function calcularImc() {
  // Seleciona os elementos de peso, altura e gênero
  let peso = document.querySelector("#peso");
  let altura = document.querySelector("#altura");
  let genero = document.querySelector("#genero");

  // Trativa de erros para os inputs de peso e altura
  if (altura.value === "0") {
    document.querySelector(".resultado-imc").textContent =
      "valor do Input Inválido";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado-imc").textContent = "";
    }, 3000);
    return;
  }

  if (peso.value === "" || altura.value == "") {
    document.querySelector(".resultado-imc").textContent = "Digite algum valor";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado-imc").textContent = "";
    }, 3000);
    return;
  }

  if (isNaN(peso.value) || isNaN(altura.value)) {
    document.querySelector(".resultado-imc").textContent =
      "Digite um valor válido";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado-imc").textContent = "";
    }, 3000);
    return;
  }

  if (Number(peso.value) < 0 || Number(altura.value) < 0) {
    document.querySelector(".resultado-imc").textContent =
      "Digite um valor válido";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado-imc").textContent = "";
    }, 3000);
    return;
  }
  // Calcula o IMC usando a fórmula: peso / (altura * altura)
  let resultado = peso.value / altura.value ** 2;

  // Exibe o resultado do IMC com duas casas decimais
  document.querySelector(".resultado-imc").textContent =
    `${resultado.toFixed(2)} (${genero.value})`;

  if (resultado < 18.5) {
    document.querySelector(".grupos").textContent =
      "Classificação: Abaixo do peso";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".grupos").textContent = "";
    }, 5000);
  } else if (resultado <= 24.9) {
    document.querySelector(".grupos").textContent = "Classificação: normal";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".grupos").textContent = "";
    }, 5000);
  } else if (resultado <= 29.9) {
    document.querySelector(".grupos").textContent = "Classificação: Sobrepeso";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".grupos").textContent = "";
    }, 5000);
  } else if (resultado <= 39.9) {
    document.querySelector(".grupos").textContent = "Classificação: Obesidade";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".grupos").textContent = "";
    }, 5000);
  } else if (resultado >= 40) {
    document.querySelector(".grupos").textContent =
      "Classificação: Obesidade grave";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".grupos").textContent = "";
    }, 5000);
  } else {
    document.querySelector(".grupos").textContent =
      "Não se encaixa em nenhum grupo!";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".grupos").textContent = "";
    }, 5000);
  }

  setTimeout(() => {
    peso.value = "";
    altura.value = "";
    document.querySelector(".resultado-imc").textContent = "";
  }, 5000);
}
//! Final Calculadora de IMC -------------------------------------------------------------------------------------------

//! Conversor de Temperatura -------------------------------------------------------------------------------------------
document.querySelector("#valorC").addEventListener("input", (e) => {
  let valorCelsius = document.querySelector("#valorC").value;

  let resultadoCparaF = Number(valorCelsius) * (9 / 5) + 32;
  let resultadoCparaK = Number(valorCelsius) + 273.15;

  document.querySelector("#valorF").value = resultadoCparaF.toFixed(2);
  document.querySelector("#valorK").value = resultadoCparaK.toFixed(2);
});

document.querySelector("#valorF").addEventListener("input", (e) => {
  let valorFahrenheit = document.querySelector("#valorF").value;

  let resultadoFparaC = (valorFahrenheit - 32) * (5 / 9);
  let resultadoFparaK = (valorFahrenheit - 32) * (5 / 9) + 273.15;

  document.querySelector("#valorC").value = resultadoFparaC.toFixed(2);
  document.querySelector("#valorK").value = resultadoFparaK.toFixed(2);
});

document.querySelector("#valorK").addEventListener("input", (e) => {
  let valorKelvin = document.querySelector("#valorK").value;

  let resultadoKparaC = valorKelvin - 273.15;
  let resultadoKparaF = (valorKelvin - 273.15) * (9 / 5) + 32;

  document.querySelector("#valorC").value = resultadoKparaC.toFixed(2);
  document.querySelector("#valorF").value = resultadoKparaF.toFixed(2);
});

// C → F: (C * 9/5) + 32
// C → K: C + 273.15
// F → C: (F - 32) * 5/9
// F → K: (F - 32) * 5/9 + 273.15
// K → C: K - 273.15
// K → F: (K - 273.15) * 9/5 + 32
//! Final Conversor de Temperatura -------------------------------------------------------------------------------------

//! Conversor de Velocidade -------------------------------------------------------------------------------------------

document.querySelector("#km").addEventListener("input", (e) => {
  let valorKm = Number(document.querySelector("#km").value);

  let resultadoMph = valorKm * 0.621371;
  document.querySelector("#mph").value = resultadoMph.toFixed(2);

  if (valorKm >= 100000) {
    document.querySelector("img").src = "./assets/img/download (5).jpeg";
  } else if (valorKm >= 5000) {
    document.querySelector("img").src = "./assets/img/download (4).jpeg";
  } else if (valorKm >= 1000) {
    document.querySelector("img").src = "./assets/img/download (3).jpeg";
  } else if (valorKm >= 500) {
    document.querySelector("img").src = "./assets/img/download (2).jpeg";
  } else if (valorKm >= 100) {
    document.querySelector("img").src = "./assets/img/download (7).jpeg";
  } else if (valorKm >= 45) {
    document.querySelector("img").src = "./assets/img/download (1).jpeg";
  } else {
    document.querySelector("img").src = "./assets/img/download.jpeg";
  }
});

document.querySelector("#mph").addEventListener("input", (e) => {
  let valorMph = Number(document.querySelector("#mph").value);

  let resultadoKm = valorMph * 1.60934;
  document.querySelector("#km").value = resultadoKm.toFixed(2);

  if (valorMph >= 62137) {
    document.querySelector("img").src = "./assets/img/download (5).jpeg";
  } else if (valorMph >= 3107) {
    document.querySelector("img").src = "./assets/img/download (4).jpeg";
  } else if (valorMph >= 621) {
    document.querySelector("img").src = "./assets/img/download (3).jpeg";
  } else if (valorMph >= 310) {
    document.querySelector("img").src = "./assets/img/download (2).jpeg";
  } else if (valorMph >= 62) {
    document.querySelector("img").src = "./assets/img/download (7).jpeg";
  } else if (valorMph >= 28) {
    document.querySelector("img").src = "./assets/img/download (1).jpeg";
  } else {
    document.querySelector("img").src = "./assets/img/download.jpeg";
  }
});

//! Final Conversor de Velocidade -------------------------------------------------------------------------------------------

//!Fazer o modo noturno e terminar os módulos
