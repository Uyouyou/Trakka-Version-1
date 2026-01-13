//1. getting the dom elements

//A. targeting the main form element
const signupForm = document.getElementById('signup-form');

//B. targeting the input fields elements
const passwordInput = document.getElementById('password');
const confirmpasswordInput = document.getElementById('cpassword');

//C. targeting the submit button
const submitButton = document.getElementById('submit-button');

//D. targeting error display spans
const passwordError = document.getElementById('password-error');
const cpasswordError = document.getElementById('cpassword-error');

//E. targeting the assword toggle icons
const passwordToggles = document.getElementById('toggle-password');

//F. targeting the confirm password toggle icons
const confirmPasswordToggles = document.getElementById('toggle-cpassword');





//2. validation function for password input field
const validatePassword = (password) => {
    //1. define all individual password criteria regex patterns
    const hasCapitalLetter = /(?=.*[A-Z])/;  //This is to test for the capital letter
    const hasSevenSmallLetters = /(?=(.*[a-z]){7})/; //this is to test for the seven small letters
    const hasNumber = /(?=.*[0-9])/; //this is to test for at least one number
    const hasSpecialCharacter = /(?=.*[^A-Za-z0-9])/; //this is to test for at least one special character
    const isLongEnough = password.length >= 10; // this is to test for minimum of 10 characters


    //2. checking if the password meets the criteria
    const failures = [];

    if (!hasCapitalLetter.test(password)) {
        failures.push('At least one capital letter');
    }

    if (!hasSevenSmallLetters.test(password)) {
        failures.push('At least seven small letters');
    }

    if (!hasNumber.test(password)) {
        failures.push('At least one number');
    }

    if (!hasSpecialCharacter.test(password)) {
        failures.push('At least one special character');
    }

    if (!isLongEnough) {
        failures.push('Minimum of 10 characters');
    }


    //3. handling the error messages
    if (failures.length > 0) {
        // A. Construct the error HTML for granular feedback
        passwordError.innerHTML = 'Password missing requirements: <ul><li>' + failures.join('</li><li>') + '</li></ul>';

        // B. Add the CSS classes to show the error and highlight the input
        passwordError.classList.add('visible');      // Makes the error message span visible 
        passwordInput.classList.add('is-invalid');   // Highlights the input field with a red border

        console.log('Password validation failed:', failures.join(', '));
        return false;
    }

    // 4. returning validation results (Success Case)
    // A. Remove all error visual cues
    passwordError.classList.remove('visible');    // Hides the error message span
    passwordInput.classList.remove('is-invalid'); // Removes the input field highlight

    //B. Clear any existing errors messages
    passwordError.innerHTML = '';

    return true;

};


//3. validation function for confirm password input field
const validateconfirmPassword = (confirmPassword) => {
    if (passwordInput.value !== confirmPassword) {
        cpasswordError.textContent = ' Passwords do not match.';
        console.log('Passwords do not match.');
        return false;
    }

    cpasswordError.textContent = '';
    return true;
};


// 4. Refactored toggle visibility feature (Works for any input/icon pair)
const toggleVisibility = (inputField, toggleElement) => {
    // 1. Check current type
    const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';

    // 2. Set the new type
    inputField.setAttribute('type', type);

    // 3. Toggle the icon class inside the specific toggle element clicked
    const icon = toggleElement.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }
};

// 5. Adding event listeners to BOTH toggle icons
// Password Toggle
passwordToggles.addEventListener('click', () => {
    toggleVisibility(passwordInput, passwordToggles);
});

// Confirm Password Toggle
confirmPasswordToggles.addEventListener('click', () => {
    toggleVisibility(confirmpasswordInput, confirmPasswordToggles);
});






//6. error handling function for form
const handleSubmit = (event) => {
    event.preventDefault(); //this ensures the form doesn't submit and refresh the page

    //1. getting all input validation values
    const passwordValue = validatePassword(passwordInput.value);
    const confirmPasswordValue = validateconfirmPassword(confirmpasswordInput.value);

    //2. checking if all validations passed
    const isFormValid = passwordValue && confirmPasswordValue;

    if (isFormValid) {
        //the button will be diasbled to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Creating Account...';

        ///submit to backend
        // submitDataToBackend();
    } else {
        console.log('Validation failed. Please correct the errors and try again.');
    }

};




//7. adding event listener to the form
signupForm.addEventListener('submit', handleSubmit);
