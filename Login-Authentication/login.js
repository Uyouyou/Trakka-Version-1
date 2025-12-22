//1. getting the dom elements

//A. targeting the main form element
const signupForm = document.getElementById('signup-form');

//B. targeting the input fields elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmpasswordInput = document.getElementById('cpassword');

//C. targeting the submit button
const submitButton = document.getElementById('submit-button');

//D. targeting error display spans
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const cpasswordError = document.getElementById('cpassword-error');

//E. targeting the assword toggle icons
const passwordToggles = document.getElementById('toggle-password');

//F. targeting the confirm password toggle icons
const confirmPasswordToggles = document.getElementById('toggle-cpassword');




//2. validation functions for name input field
const validateName = (name) => {
    if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        console.log('Name must be at least 2 characters long.');
        return false;
    }

    nameError.textContent = '';
    return true;
};


//3. validation function for email input field
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


//4. validation function for password input field
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


//5. validation function for confirm password input field
const validateconfirmPassword = (confirmPassword) => {
    if (passwordInput.value !== confirmPassword) {
        cpasswordError.textContent = ' Passwords do not match.';
        console.log('Passwords do not match.');
        return false;
    }

    cpasswordError.textContent = '';
    return true;
};


//6. submitting the form to the backend server
/*const submitDataToBackend = async () => {
    // 1. Prepare the Data Payload (We only send the necessary inputs)
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value // Send the plaintext password for the server to hash
    };

    const API_ENDPOINT = '/api/auth/signup'; // Example: Replace with your actual endpoint

    // Re-enable the submit button in case of failure or success
    const reEnableButton = (text, disabled) => {
        submitButton.textContent = text;
        submitButton.disabled = disabled;
    };

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // 3. Process the Response
        const data = await response.json();

        if (response.ok) { // HTTP status 200-299 (Success)
            // Handle success (Step 7: Success)
            console.log('Account created successfully!', data);

            // Example: Store the token and redirect
            localStorage.setItem('authToken', data.token);
            // window.location.href = '/dashboard'; 

            reEnableButton('Account Created!', true); // Keep disabled after successful redirect
            alert('Success! Redirecting to dashboard...');

        } else { // HTTP status 400+ (Failure)
            // Handle server-side validation failures (e.g., Email already exists)
            console.error('Server Error:', data.message);

            // Display error to user (e.g., general error message or specific email error)
            alert(`Signup failed: ${data.message || 'An unknown error occurred.'}`);

            reEnableButton('Create Account', false); // Re-enable for the user to try again
        }

    } catch (error) {
        // Handle network errors (e.g., server is down)
        console.error('Network Error:', error);
        alert('Could not connect to the server. Please check your connection.');
        reEnableButton('Create Account', false); // Re-enable
    }
};*/

//6. working on the password toggle visibility feature
const togglePasswordVisibility = () => {
    //1. check the current type of the password input field
    const type = passwordInput.getAttribute('type') === 'password' ? 'text'
        : 'password';

    //2. set the new type of the password input field
    passwordInput.setAttribute('type', type);

    //3. toggle the icon class
    const icon = passwordToggles.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');

};

//7. adding event listeners to the password toggle icons
passwordToggles.addEventListener('click', togglePasswordVisibility);




//10. error handling function for form
const handleSubmit = (event) => {
    event.preventDefault(); //this ensures the form doesn't submit and refresh the page

    //1. getting all input validation values
    const nameValue = validateName(nameInput.value);
    const emailValue = validateEmail(emailInput.value);
    const passwordValue = validatePassword(passwordInput.value);
    const confirmPasswordValue = validateconfirmPassword(confirmpasswordInput.value);

    //2. checking if all validations passed
    const isFormValid = nameValue && emailValue && passwordValue && confirmPasswordValue;

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




//11. adding event listener to the form
signupForm.addEventListener('submit', handleSubmit);
