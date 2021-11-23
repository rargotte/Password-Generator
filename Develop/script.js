// Assignment Code

//Constants
const upperCaseArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const specialCharacters = ["$","+","%", "-", "&", "|", "!", "(", ")","@", "#", "{", "}", "[", "]", "^", "~", "*", "?", ":", ",", ".", ";", "\""];
const integerArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//Variables
var generateBtn = document.querySelector("#generate");
var userContinue = true;
var passwordLength = 0;
var passwordLowercase = "N";
var passwordUppercase = "N";
var passwordNumeric = "N";
var passwordSpecial = "N";
var validEntry = false;
var selectedCharacters = new Array();

//Function to initialize all variables. 
function initializeVariables() {
  userContinue = true;
  passwordLength = 0;
  passwordLowercase = "N";
  passwordUppercase = "N";
  passwordNumeric = "N";
  passwordSpecial = "N";
  validEntry = false;
  selectedCharacters = new Array();
}

//Function to get user input (uppercase, lowecase, numeric & special characters)
function getUserInput(promptString) {
  var varInput = "N";
  if (userContinue === true && validEntry === true) {
    validEntry = false;
    while (userContinue === true && validEntry === false) {
      varInput = window.prompt(promptString);
      if (varInput === null) {
        userContinue = window.confirm("Continue?");
      } else {
        if (varInput.toLowerCase() === "y" || varInput.toLowerCase() === "n") {
          validEntry = true;
          userContinue = true;
        } else
          userContinue = window.confirm("Invalid option. Continue?");
      }
    }
  }
  return varInput;
}

//Functon to validate that at least one character type was selected.
function oneCharacterType() {
  if (userContinue === true &&
    (passwordUppercase.toLowerCase() === "y" ||
      passwordLowercase.toLowerCase() === "y" ||
      passwordNumeric.toLowerCase() === "y" ||
      passwordSpecial.toLowerCase() === "y")) {
    return true;
  } else {
    return false;
  }
}

//Function to create an array of selected characters.
function createArraySelectedCharacters() {
  if (passwordNumeric.toLowerCase() === "y") {
    selectedCharacters = selectedCharacters.concat(integerArray);
  }
  if (passwordUppercase.toLowerCase() === "y") {
    selectedCharacters = selectedCharacters.concat(upperCaseArray);
  }
  if (passwordLowercase.toLowerCase() === "y") {
    selectedCharacters = selectedCharacters.concat(lowerCaseArray);
  }
  if (passwordSpecial.toLocaleLowerCase() === "y") {
    selectedCharacters = selectedCharacters.concat(specialCharacters);
  }
}

// Function to generate password based on array of selected characters.
function generatePassword() {
  var stringResult = new String();
  var randomIndex;

  createArraySelectedCharacters();
  for (let i = 0; i < passwordLength; i++) {
    randomIndex = Math.floor(Math.random() * selectedCharacters.length);
    stringResult = stringResult + selectedCharacters[randomIndex];
  }
  return stringResult;
};

//Main function called at click event.
function writePassword() {
  var passwordText = document.querySelector("#password");
  //Calling function to initialize all variables
  initializeVariables();
  //Get length of password.
  while (userContinue === true && validEntry === false) {
    passwordLength = window.prompt("Length of password [8-128]? ");
    if (passwordLength === null) {
      userContinue = window.confirm("Continue?");
    } else {
      if (!(passwordLength <= 128 && passwordLength >= 8)) {
        userContinue = window.confirm("Length not between [8-128]. Continue?");
      } else validEntry = true;
    }
  }
  //Get user input on Lowercase characters (Y/N)?.
  passwordLowercase = getUserInput("Include Lowercase (Y/N)?");
  //Get user input on Uppercase characters (Y/N)?.
  passwordUppercase = getUserInput("Include Uppercase (Y/N)?");
  //Get user input on Numeric characters (Y/N)?.
  passwordNumeric = getUserInput("Include Numeric Characters (Y/N)?");
  //Get user input on Special characters (Y/N)?.
  passwordSpecial = getUserInput("Include Special Characters (Y/N)?");
  //Validate at least 1 character type has been selected
  //generate password and write it in the HTML file.
  if (oneCharacterType() === true) {
    password = generatePassword();
    passwordText.value = password;
  } else if (userContinue === true) {
    userContinue = window.confirm("You did not select any type of character");
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
