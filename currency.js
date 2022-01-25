let amountEntered = document.getElementById("input_amount");
let from = document.getElementById("input_currency");
let to = document.getElementById("output_currency");
let button = document.getElementById("convert");
let replace = document.getElementById("replace");

let convertedAmount = document.querySelector("#converted span");
let enteredAmount = document.querySelector("#entered span");
let currency_1 = document.getElementById("currency1");
let currency_2 = document.getElementById("currency2");

window.addEventListener("load", () => {
  getCurrencyInfo();
  getCurrencyRates();
});

const getCurrencyInfo = async () => {
  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`;
  const response = await axios.get(url);
  const { data } = response;
  let allCurrencies = [];
  allCurrencies.push(Object.keys(data));
  allCurrencies[0].forEach((each) => {
    from.innerHTML += `<option>${each.toUpperCase()}</option>`;
    to.innerHTML += `<option>${each.toUpperCase()}</option>`;
  });
};

const getCurrencyRates = async () => {
  let amount = amountEntered.value;
  let exchangeFrom = from.options[from.selectedIndex].value.toLowerCase();
  // console.log(exchangeFrom);
  let exchangeTo = to.options[to.selectedIndex].value.toLowerCase();
  // console.log(exchangeTo);

  const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${exchangeFrom}/${exchangeTo}.json`;
  const response = await axios.get(url);
  const { data } = response;
  const exchangeRate = data[exchangeTo];
  // console.log(exchangeRate);

  let result = (amount * exchangeRate).toFixed(2);
  enteredAmount.innerText = `${Number(amount).toFixed(
    2
  )} ${exchangeFrom.toUpperCase()}`;
  // if (amount == "") {
  //   enteredAmount.innerText = `0.00 ${exchangeFrom.toUpperCase()}`;
  //   alert("Please enter an amount to convert!");
  }

  convertedAmount.innerText = `${result} ${exchangeTo.toUpperCase()}`;
  currency_1.innerText = `1 ${exchangeFrom.toUpperCase()} = ${exchangeRate.toFixed(
    2
  )} ${exchangeTo.toUpperCase()}`;
  currency_2.innerText = `1 ${exchangeTo.toUpperCase()} = ${(
    1 / exchangeRate
  ).toFixed(2)} ${exchangeFrom.toUpperCase()}`;
  amountEntered.value = "";
};

button.addEventListener("click", () => {
  getCurrencyRates();
});

replace.addEventListener("click", () => {
  let left = from.options[from.selectedIndex].innerText;
  let right = to.options[to.selectedIndex].innerText;
  to.options[to.selectedIndex].innerText = left;
  from.options[from.selectedIndex].innerText = right;
});
