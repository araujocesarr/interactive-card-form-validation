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
const complete = document.querySelector(".complete-container");

function validateName() {
  const name = cardholderInput.value.trim();
  const regex = /^([a-zA-Z\u00C0-\u017F'-]+\s)*[a-zA-Z\u00C0-\u017F'-]+$/;
  if (name === "") {
    cardImageName.textContent = name;
    cardholderError.textContent = "Cardholder name is REQUIRED";
    cardholderInput.classList.add("error");
    return false;
  } else if (!regex.test(name)) {
    cardImageName.textContent = name;
    cardholderError.textContent = "Enter a valid name";
    cardholderInput.classList.add("error");
    return false;
  } else {
    cardImageName.textContent = name;
    cardholderError.textContent = "";
    cardholderInput.classList.remove("error");
    return true;
  }
}
cardholderInput.addEventListener("input", validateName);

cardholderInput.addEventListener("input", (event) => {
  const words = event.target.value.toLowerCase().split(" ");
  const capitalizedWords = words.map((word) => {
    let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    for (let i = 0; i < capitalizedWord.length - 1; i++) {
      if (capitalizedWord[i] === "'" || capitalizedWord[i] === "-") {
        capitalizedWord =
          capitalizedWord.slice(0, i + 1) +
          capitalizedWord[i + 1].toUpperCase() +
          capitalizedWord.slice(i + 2);
      }
    }
    return capitalizedWord;
  });
  event.target.value = capitalizedWords.join(" ");
});

function validateNumber() {
  const numberSpaces = deleteSpaces();
  console.log(numberSpaces);
  const number = cardNumberInput.value.replace(/\s/g, "");
  console.log(numberSpaces);
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
    cardImageNumber.textContent = numberSpaces;
    cardNumberInput.classList.add("error");
    return false;
  } else {
    for (let regexProp in regex) {
      if (regex[regexProp].test(number)) {
        cardImageNumber.textContent = numberSpaces;
        cardNumberError.textContent = "";
        cardNumberInput.classList.remove("error");
        return true;
      }
    }
    cardImageNumber.textContent = numberSpaces;
    cardNumberError.textContent = "Enter a valid number";
    cardNumberInput.classList.add("error");
    return false;
  }
}
cardNumberInput.addEventListener("input", validateNumber);
function deleteSpaces() {
  const input = cardNumberInput.value;
  let value = input.replace(/\D/g, "").substring(0, 16);
  const groups = value.match(/[\s\S]{1,4}/g) || [];
  value = groups.join(" ");
  cardNumberInput.value = value;
  console.log(value);
  return value;
}

function validateMonth() {
  const month = monthSpaces();
  const regex = /^(0?[1-9]|1[0-2])$/;
  if (month === "") {
    cardDateError.textContent = "Expiration date is REQUIRED";
    cardMM.classList.add("error");
    return false;
  } else if (!regex.test(month)) {
    cardImageMonth.textContent = month.padStart(2, "0");
    cardDateError.textContent = "Enter a valid date";
    cardMM.classList.add("error");
    return false;
  } else {
    cardImageMonth.textContent = month.padStart(2, "0");
    cardDateError.textContent = "";
    cardMM.value = month;
    cardMM.classList.remove("error");
    return true;
  }
}
cardMM.addEventListener("input", validateMonth);
function monthSpaces() {
  let value = cardMM.value;
  value = value.replace(/\D/g, "");
  value = value.slice(0, 2);
  return value;
}

function validateYear() {
  const year = yearSpaces();
  const regex = /^\d{2}$/;
  if (year === "") {
    cardDateError.textContent = "Expiration date is REQUIRED";
    cardYY.classList.add("error");
    return false;
  } else if (!regex.test(year)) {
    cardImageYear.textContent = year;
    cardDateError.textContent = "Enter a valid date: 0X";
    cardYY.classList.add("error");
    return false;
  } else {
    cardImageYear.textContent = year;
    cardDateError.textContent = "";
    cardYY.value = year;
    cardYY.classList.remove("error");
    return true;
  }
}
cardYY.addEventListener("input", validateYear);
function yearSpaces() {
  let value = cardYY.value;
  value = value.replace(/\D/g, "");
  value = value.slice(0, 2);
  return value;
}

function validateCvc() {
  const code = cvcSpaces();
  const regex = /^\d{3,4}$/;
  if (code === "") {
    cvc.value = code;
    cardImageCvc.textContent = code;
    cardCvcError.textContent = "CVC is REQUIRED";
    cvc.classList.add("error");
    return false;
  } else if (!regex.test(code)) {
    cvc.value = code;
    cardImageCvc.textContent = code;
    cardCvcError.textContent = "Enter a valid CVC";
    cvc.classList.add("error");
    return false;
  } else {
    cvc.value = code;
    cardImageCvc.textContent = code;
    cardCvcError.textContent = "";
    cvc.classList.remove("error");
    return true;
  }
}
cvc.addEventListener("input", validateCvc);
function cvcSpaces() {
  console.log(cvc);
  console.log(cardYY);
  let value = cvc.value;
  value = value.replace(/\D/g, "");
  value = value.slice(0, 4);
  return value;
}

function formValidation() {
  const nameValidation = validateName();
  const numberValidation = validateNumber();
  const monthValidation = validateMonth();
  const yearValidation = validateYear();
  const cvcValidation = validateCvc();
  return (
    nameValidation &&
    numberValidation &&
    monthValidation &&
    yearValidation &&
    cvcValidation
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const validForm = formValidation();
  if (validForm) {
    form.style.display = "none";
    complete.style.display = "flex";
  }
});

complete.addEventListener("click", (event) => {
  event.preventDefault();
  form.style.display = "flex";
  complete.style.display = "none";
  location.reload();
});
