const formCep = document.querySelector("#form-cep");

formCep.addEventListener("submit", (e) => {
  e.preventDefault();

  const cepInputValue = document.querySelector("#cep-input").value;

  const cepInputDiv = document.querySelector("#cep-input-div");
  const cepInput = document.querySelector("#cep-input");

  const responseContainer = document.querySelector("#response-container");
  responseContainer.innerHTML = "";

  let regexSemHifen = /^[0-9]{8}$/;
  let regexComHifen = /^[0-9]{5}[-][0-9]{3}$/;

  if (regexComHifen.test(cepInputValue) || regexSemHifen.test(cepInputValue)) {
    if (regexComHifen.test(cepInputValue)) {
      cepInputValue = cepInputValue.replace("-", "");
    }

    const URL = `https://viacep.com.br/ws/${cepInputValue}/json/`;

    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!("erro" in data)) {
          const listaExibicao = {
            cep: "CEP",
            logradouro: "Endereço",
            complemento: "Complemento",
            bairro: "Bairro",
            localidade: "Cidade",
            estado: "Estado",
            ddd: "DDD",
          };

          for (let chave in data) {
            if (!data[chave] == "" && listaExibicao[chave]) {
              responseContainer.innerHTML += `
                <div class="div-${chave}">
                  <h4 class="h5 title" id="${chave}-title">${listaExibicao[chave]}</h4>
                  <p id="${chave}-content" class="text-light">${data[chave]}</p>
                </div>
              `;
            }
          }
          cepInput.classList.remove("is-invalid");
          cepInputDiv.classList.remove("is-invalid");
        } else {
          cepInput.classList.add("is-invalid");
          cepInputDiv.classList.add("is-invalid");
        }
      });
  } else {
    cepInput.classList.add("is-invalid");
    cepInputDiv.classList.add("is-invalid");
  }
});
