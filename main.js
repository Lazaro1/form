const url = "http://localhost:8080";
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const cepInput = document.querySelector("#cep");
const submitButton = document.querySelector("#submit-button");

const errorMessage = document.querySelector(".msg");

const items = document.querySelector(".items");

async function getCep(cep) {
  try {
    const response = await axios.get(`${url}/cep?cep=${cep}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const nameValue = nameInput.value;
  const emailValue = emailInput.value;
  const cepValue = cepInput.value;

  if (nameValue === "" || emailValue === "") {
    errorMessage.textContent = "Please fill out the fields!";
    errorMessage.classList = "error";

    setTimeout(() => {
      errorMessage.textContent = "";
      errorMessage.classList = "";
    }, 3000);
    return;
  }

  //   const {bairro, cep, ddd} = await getCep(cepValue);
  //   console.log(bairro, cep, ddd);

  const { bairro, cep, localidade, logradouro } = await getCep(cepValue);

  const li = document.createElement("li");
  li.classList = "item";
  li.innerHTML = `Nome: ${nameValue}<br />Email: ${emailValue} <br />Cidade: ${localidade}`;

  items.appendChild(li);

  nameInput.value = "";
  emailInput.value = "";
  cepInput.value = "";
});
