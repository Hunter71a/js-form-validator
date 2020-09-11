const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
}

// Check if email is valid

// function isValidEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');

  }

}

// Capitalize any string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// Capitalize string of input.id with alternate method
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(input) {
  input.forEach(function (input) {
    if (input.value.trim() === '') {
      console.log(input.id);
      showError(input, `${getFieldName(input)} is required`);
    }
  });
}

// Check input length
function checkLength(input, lowerLimit, upperLimit) {
  const value = input.value.trim().length;
  if (value <= lowerLimit || value >= upperLimit) {
    showError(input, `${getFieldName(input)} must be between ${lowerLimit} and ${upperLimit} characters in length`);
  } else {
    showSuccess(input);
  }
}

// Check to see if passwords match
function isPasswordsMatch(password, confirmation) {
  if (password.value !== confirmation.value) {
    showError(confirmation, 'Passwords do not match');
  } else {
    showSuccess(confirmation);
  }

}

// Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkEmail(email);  // check email before checkRequired so checkRequired overwrites to correct message if field left empty
  checkLength(username, 3, 15);
  checkLength(password, 5, 25);
  isPasswordsMatch(password, password2);
  checkRequired([username, email, password, password2]);
});