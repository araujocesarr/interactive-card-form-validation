const cardholderInput = document.getElementById("cardholder");
const cardImageName = document.querySelector(".card-img-name");
const cardImageNumber = document.querySelector(".card-img-number");
const cardImageYear = document.querySelector(".card-img-date-yy");
const cardImageMonth = document.querySelector(".card-img-date-mm");
const cardImageCvc = document.querySelector(".card-img-cvc");
const cardNumberInput = document.getElementById("card-number");

const cardMM = document.getElementById("exp-date-mm");
const cardYY = document.getElementById("exp-date-yy");
const cvc = document.getElementById("cvc");
const confirm = document.getElementsByClassName("confirm");
const cardholderError = document.getElementById("error-cardholder");
const cardNumberError = document.getElementById("error-number");
const cardDateError = document.getElementById("error-date");
const cardCvcError = document.getElementById("error-cvc");
const form = document.querySelector("#my-form");

console.log(cardImageCvc);
console.log(cardholderInput);
console.log(cardNumberInput);
console.log(cardMM);
console.log(cardDateError);

function validateName() {
  const name = cardholderInput.value.trim();
  cardImageName.textContent = name;
  const regex =
    /^[A-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F]*(\s[A-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F]*){1,}$/;
  if (name === "") {
    cardholderError.textContent = "Cardholder name is REQUIRED";
    cardholderInput.classList.add("error");
    return false;
  } else if (!regex.test(name)) {
    cardholderError.textContent = "Enter a valid name";
    cardholderInput.classList.add("error");
    return false;
  } else {
    cardholderError.textContent = "";
    cardholderInput.classList.remove("error");
    return true;
  }
}
cardholderInput.addEventListener("blur", validateName);

function validateNumber() {
  const number = cardNumberInput.value.trim();
  cardImageNumber.textContent = number;
  const regex = {
    amexCard: /^3[47][0-9]{13}$/,
    bcGlobal: /^(6541|6556)[0-9]{12}$/,
    carteBlancheCard: /^389[0-9]{11}$/,
    dinnersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discoverCard:
      /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    instaPayment: /^63[7-9][0-9]{13}$/,
    jcbCard: /^(?:2131|1800|35\d{3})\d{11}$/,
    koreanLocalCard: /^9[0-9]{15}$/,
    laserCard: /^(6304|6706|6709|6771)[0-9]{12,15}$/,
    maestroCard: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
    masterCard:
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    soloCard:
      /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
    switchCard:
      /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
    unionPay: /^(62[0-9]{14,17})$/,
    visaCard: /^4[0-9]{12}(?:[0-9]{3})?$/,
    visaMaster: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
  };
  if (number === "") {
    cardNumberError.textContent = "Card number is REQUIRED";
    cardNumberInput.classList.add("error");
    return false;
  } else {
    for (let regexProp in regex) {
      if (regex[regexProp].test(number)) {
        cardNumberError.textContent = "";
        cardNumberInput.classList.remove("error");
        return true;
      }
    }
    cardNumberError.textContent = "Enter a valid number";
    cardNumberInput.classList.add("error");
    return false;
  }
}
cardNumberInput.addEventListener("blur", validateNumber);

function validateMonth() {
  const month = cardMM.value.trim();
  cardImageMonth.textContent = month.padStart(2, "0");
  const regex = /^(0?[1-9]|1[0-2])$/;
  if (month === "") {
    cardDateError.textContent = "Expiration date is REQUIRED";
    cardMM.classList.add("error");
    return false;
  } else if (!regex.test(month)) {
    cardDateError.textContent = "Enter a valid date";
    cardMM.classList.add("error");
    return false;
  } else {
    cardDateError.textContent = "";
    cardMM.value = month.padStart(2, "0");
    cardMM.classList.remove("error");
    return true;
  }
}
cardMM.addEventListener("blur", validateMonth);

function validateYear() {
  const year = cardYY.value.trim();
  cardImageYear.textContent = year.padStart(2, "0");
  const regex = /^\d{2}$/;

  if (year === "") {
    cardDateError.textContent = "Expiration date is REQUIRED";
    cardYY.classList.add("error");
    return false;
  } else if (!regex.test(year)) {
    cardDateError.textContent = "Enter a valid date: XX";
    cardYY.classList.add("error");
    return false;
  } else {
    cardDateError.textContent = "";
    cardYY.value = year.padStart(2, "0");
    cardYY.classList.remove("error");
    return true;
  }
}
cardYY.addEventListener("blur", validateYear);

function validateCvc() {
  const code = cvc.value.trim();
  cardImageCvc.textContent = code;
  const regex = /^\d{3,4}$/;

  if (code === "") {
    cardCvcError.textContent = "CVC is REQUIRED";
    cvc.classList.add("error");
    return false;
  } else if (!regex.test(code)) {
    cardCvcError.textContent = "Enter a valid CVC";
    cvc.classList.add("error");
    return false;
  } else {
    cardCvcError.textContent = "";
    cvc.classList.remove("error");
    return true;
  }
}
cvc.addEventListener("blur", validateCvc);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateName();
  validateNumber();
  validateMonth();
  validateYear();
  validateCvc();
});
