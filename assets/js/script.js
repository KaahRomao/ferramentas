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
    //Verifica se a classe "hidden" já existe na section... se não existir, adiciona!
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }

    if (section.classList.contains(id)) {
      section.classList.remove("hidden");
    }
  });
}

//Calculadora de IMC
function calcularImc() {
  let peso = document.querySelector("#peso");
  let altura = document.querySelector("#altura");

  if (altura.value === "0") {
    document.querySelector(".resultado").textContent =
      "valor do Input Inválido";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado").textContent = "";
    }, 3000);
    return;
  }

  if (peso.value === "" || altura.value == "") {
    document.querySelector(".resultado").textContent = "Digite algum valor";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado").textContent = "";
    }, 3000);
    return;
  }

  if (isNaN(peso.value) || isNaN(altura.value)) {
    document.querySelector(".resultado").textContent = "Digite um valor válido";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado").textContent = "";
    }, 3000);
    return;
  }

  if (Number(peso.value) < 0 || Number(altura.value) < 0) {
    document.querySelector(".resultado").textContent = "Digite um valor válido";
    setTimeout(() => {
      peso.value = "";
      altura.value = "";
      document.querySelector(".resultado").textContent = "";
    }, 3000);
    return;
  }

  let resultado = peso.value / altura.value ** 2;

  document.querySelector(".resultado").textContent = resultado.toFixed(2);

  setTimeout(() => {
    peso.value = "";
    altura.value = "";
    document.querySelector(".resultado").textContent = "";
  }, 5000);
}
