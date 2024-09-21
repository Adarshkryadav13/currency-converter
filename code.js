const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromcurr = document.querySelector("select[name='from']");
const tocurr = document.querySelector("select[name='to']");
const msge = document.querySelector(".msg");
// const apikey = 'https://v6.exchangerate-api.com/v6/5df37e35849a0f2aa4c3f2aa/latest/USD'

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
btn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchange();
});
function getExchange() {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amount.value = "1";
    amountVal = 1;
  }
  console.log(fromcurr.value, tocurr.value, amountVal);

let url = `https://v6.exchangerate-api.com/v6/5df37e35849a0f2aa4c3f2aa/latest/${fromcurr.value}`;

fetch(url)
  .then((response) => response.json())
  .then((result) => {
     console.log(result);

    let exchangerate = result.conversion_rates[tocurr.value];
    let totalExchangeRate = (amountVal*exchangerate).toFixed(2);
    console.log(totalExchangeRate);
    // console.log(exchangerate)
    const exchangeRateText = document.querySelector(".msg");
    exchangeRateText.innerHTML = `${amountVal} ${fromcurr.value}= ${totalExchangeRate} ${tocurr.value}`
  })
  .catch((error) => console.error("Error:", error));
}