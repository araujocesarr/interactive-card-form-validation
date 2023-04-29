/**File name: app.js
 * Description: this file contains the JavaScript code 
 for form interaction and funcionality
 *Author: César Araujo
 *Creation date: 29/04/2023
 */

//User inputs
const cardholderInput = document.getElementById("cardholder");
const cardNumberInput = document.getElementById("card-number");
const cardMM = document.getElementById("exp-date-mm");
const cardYY = document.getElementById("exp-date-yy");
const cvc = document.getElementById("cvc");

//Card images
const cardImageName = document.querySelector(".card-img-name");
const cardImageNumber = document.querySelector(".card-img-number");
const cardImageYear = document.querySelector(".card-img-date-yy");
const cardImageMonth = document.querySelector(".card-img-date-mm");
const cardImageCvc = document.querySelector(".card-img-cvc");
const cardImageLogo = document.getElementById("card-logo");

//Errors
const cardholderError = document.getElementById("error-cardholder");
const cardNumberError = document.getElementById("error-number");
const cardDateError = document.getElementById("error-date");
const cardCvcError = document.getElementById("error-cvc");

//Others elements
const confirm = document.getElementsByClassName("confirm");
const form = document.querySelector("#my-form");
const complete = document.querySelector(".complete-container");

/**
 * Validates the cardholder name input field
 * @returns (boolean) Returns true if the name is valid and false if it's not
 */
function validateName() {
  //Value of the name input field without whitespaces
  const name = cardholderInput.value.trim();
  //Regex to validate name, only alphabetic characters and some specials are allowed.
  const regex = /^([a-zA-Z\u00C0-\u017F'-]+\s)*[a-zA-Z\u00C0-\u017F'-]+$/;
  //if the name input is empty display error message and return false
  if (name === "") {
    cardImageName.textContent = name;
    cardholderError.textContent = "Cardholder name is REQUIRED";
    cardholderInput.classList.add("error");
    return false;
  }
  //if the name input field is not valid, display error message and return false
  else if (!regex.test(name)) {
    cardImageName.textContent = name;
    cardholderError.textContent = "Enter a valid name";
    cardholderInput.classList.add("error");
    return false;
  }
  //if the name input is valid, display name in the image and return true
  else {
    cardImageName.textContent = name;
    cardholderError.textContent = "";
    cardholderInput.classList.remove("error");
    return true;
  }
}
//call the function in the input event
cardholderInput.addEventListener("input", validateName);
// This event converts the words entered in the "cardholder" input into title format.
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

/**
 * Validates the card number input field
 * @returns (boolean) Returns true if the number is valid or false if it's not
 */
function validateNumber() {
  //Get number without spaces from numberSpaces function
  const numberSpace = numberSpaces();
  const number = cardNumberInput.value.replace(/\s/g, "");
  //regex to validate card number
  const regex = {
    amexCard: /^3[47][0-9]{13}$/,
    bcGlobal: /^(6541|6556)[0-9]{12}$/,
    carteBlancheCard: /^389[0-9]{11}$/,
    dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discoverCard:
      /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    instaPayment: /^63[7-9][0-9]{13}$/,
    jcbCard: /^(?:2131|1800|35\d{3})\d{11}$/,
    koreanLocalCard: /^9[0-9]{15}$/,
    laserCard: /^(6304|6706|6709|6771)[0-9]{12,15}$/,
    maestroCard: /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{8,15}$/,
    masterCard:
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    soloCard:
      /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
    switchCard:
      /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
    unionPay: /^(62[0-9]{14,17})$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    visa2: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
  };
  const cardImages = {
    amexCard: "images/amexCard.svg",
    dinersClub: "images/dinersClub.svg",
    discoverCard: "images/discoverCard.svg",
    jcbCard: "images/jcbCard.svg",
    masterCard: "images/masterCard.svg",
    visa: "images/visa.svg",
    visa2: "images/visa.svg",
    default: "images/card-logo.svg",
  };
  //if the number input is empty display error and return false
  if (number === "") {
    cardImageLogo.setAttribute("src", cardImages.default);
    cardNumberError.textContent = "Card number is REQUIRED";
    cardImageNumber.textContent = numberSpace;
    cardNumberInput.classList.add("error");
    return false;
  }
  //if the number input is valid return true
  else {
    for (let regexProp in regex) {
      if (regex[regexProp].test(number)) {
        console.log(cardImages[regexProp]);
        const imagePath = cardImages[regexProp] || cardImages.default;
        console.log(imagePath);
        cardImageLogo.setAttribute("src", imagePath);
        cardImageNumber.textContent = numberSpace;
        cardNumberError.textContent = "";
        cardNumberInput.classList.remove("error");
        return true;
      }
    }
    cardImageLogo.setAttribute("src", cardImages.default);
    cardImageNumber.textContent = numberSpace;
    cardNumberError.textContent = "Enter a valid number";
    cardNumberInput.classList.add("error");
    return false;
  }
}
//call the function in the input event
cardNumberInput.addEventListener("input", validateNumber);
/**
 * delete spaces to validate number
 * @returns (string) returns card number for the validation
 */
function numberSpaces() {
  const input = cardNumberInput.value;
  let value = input.replace(/\D/g, "").substring(0, 16);
  const groups = value.match(/[\s\S]{1,4}/g) || [];
  value = groups.join(" ");
  cardNumberInput.value = value;
  return value;
}

/**
 * validates the card month input field
 * @returns (boolean) Returns true if the month if valid or false is not valid.
 */
function validateMonth() {
  //Get the month from the monthSpaces function with correct format
  const month = monthSpaces();
  //regex to validate month, only one or two numbers
  const regex = /^(0?[1-9]|1[0-2])$/;
  //if the month input is empty display error and return false
  if (month === "") {
    cardMM.value = month;
    cardDateError.textContent = "Expiration date is REQUIRED";
    cardMM.classList.add("error");
    return false;
  }
  //if the month input is not valid, display error and return false
  else if (!regex.test(month)) {
    cardMM.value = month;
    cardImageMonth.textContent = month.padStart(2, "0");
    cardDateError.textContent = "Enter a valid date";
    cardMM.classList.add("error");
    return false;
  }
  //if the month input is valid, display month in the card and return true
  else {
    cardMM.value = month;
    cardImageMonth.textContent = month.padStart(2, "0");
    cardDateError.textContent = "";
    cardMM.classList.remove("error");
    return true;
  }
}
//call the function in the input event
cardMM.addEventListener("input", validateMonth);
/**
 * dalete spaces to validate month
 * @returns (string) returns card month formated for the validation
 */
function monthSpaces() {
  let value = cardMM.value;

  value = value.replace(/\D/g, "");
  value = value.slice(0, 2);
  return value;
}

/**
 * validates the year card input field
 * @returns (boolean) returns true if the year is valid and false if it's not
 */
function validateYear() {
  //Get year without spaces from yearSpaces()
  const year = yearSpaces();
  //regex tod validate year, only two numbers
  const regex = /^\d{2}$/;
  //if the year input is empty display error and return false
  if (year === "") {
    cardYY.value = year;
    cardDateError.textContent = "Expiration date is REQUIRED";
    cardYY.classList.add("error");
    return false;
  }
  //if the year input is not valid display error and return false
  else if (!regex.test(year)) {
    cardImageYear.textContent = year;
    cardDateError.textContent = "Enter a valid date: 0X";
    cardYY.classList.add("error");
    return false;
  }
  //if the year input is valid, delete the error and return true
  else {
    cardImageYear.textContent = year;
    cardDateError.textContent = "";
    cardYY.value = year;
    cardYY.classList.remove("error");
    return true;
  }
}
//call the function in the input event
cardYY.addEventListener("input", validateYear);
/**
 * delete spaces to validate year
 * @returns (string) return year for validateYear
 */
function yearSpaces() {
  let value = cardYY.value;
  value = value.replace(/\D/g, "");
  value = value.slice(0, 2);
  return value;
}

/**
 * validates the cvc input field
 * @returns (boolean) Returns true if the cvc input is valid and false if it's not
 */
function validateCvc() {
  //Get value without spaces from cvcSpaces()
  const code = cvcSpaces();
  //regex to validate cvc, only three or four numbers
  const regex = /^\d{3,4}$/;
  //if cvc input field is empty, display error and return false
  if (code === "") {
    cvc.value = code;
    cardImageCvc.textContent = code;
    cardCvcError.textContent = "CVC is REQUIRED";
    cvc.classList.add("error");
    return false;
  }
  //if cvc input field is not valid, display error and return false
  else if (!regex.test(code)) {
    cvc.value = code;
    cardImageCvc.textContent = code;
    cardCvcError.textContent = "Enter a valid CVC";
    cvc.classList.add("error");
    return false;
  }
  //if cvc input field is validate, delete error and return true
  else {
    cvc.value = code;
    cardImageCvc.textContent = code;
    cardCvcError.textContent = "";
    cvc.classList.remove("error");
    return true;
  }
}
//call the function with input event
cvc.addEventListener("input", validateCvc);
/**
 * delete spaces to validte cvc
 * @returns (string) returns cvc number for validation
 */
function cvcSpaces() {
  console.log(cvc);
  console.log(cardYY);
  let value = cvc.value;
  value = value.replace(/\D/g, "");
  value = value.slice(0, 4);
  return value;
}

/**
 * validate all form
 * @returns (boolean) returns true if whole validation is correct and return false if it's not
 */
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
