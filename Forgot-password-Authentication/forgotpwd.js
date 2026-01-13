//1. getting the dom elements

//A. targeting the main form element
const signupForm = document.getElementById('signup-form');

//B. targeting the input fields elements
const emailInput = document.getElementById('email');


//C. targeting the submit button
const submitButton = document.getElementById('submit-button');

//D. targeting error display spans
const emailError = document.getElementById('email-error');





//2. validation function for email input field
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        console.log('Please enter a valid email address.');
        return false;
    }

    emailError.textContent = '';
    return true;
}








//3. error handling function for form
const handleSubmit = (event) => {
    event.preventDefault(); //this ensures the form doesn't submit and refresh the page

    //1. getting all input validation values
    const emailValue = validateEmail(emailInput.value);


    //2. checking if all validations passed
    const isFormValid = emailValue;

    if (isFormValid) {
        //the button will be diasbled to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        ///submit to backend
        // submitDataToBackend();
    } else {
        console.log('Validation failed. Please correct the errors and try again.');
    }

};




//11. adding event listener to the form
signupForm.addEventListener('submit', handleSubmit);
