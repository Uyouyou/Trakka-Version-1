/*1. Bringing out all the necessary elements from the DOM*/
const otpInputs = document.querySelectorAll('.otp_inputs input');
const verifyForm = document.getElementById('verify-form');
const formTimer = document.getElementById('timer');
const resendLink = document.querySelector('.form_footer_link');
const submitBtn = document.getElementById('submit-button');
const btnSpinner = document.getElementById('btn-spinner');
const btnText = document.getElementById('btn_text');

/*2. Working on the timer functionality*/
//A. Setting the initial time for 60 seconds (1 minute)
let timeLeft = 60; //this means the time tagrted is at 60 seconds
const timerElement = document.getElementById('timer'); //this codes targets the timer element from the DOM

//B. Creating the function that runs the countdown
function startTimer() {
    //setInterval method is used to call a function at specified intervals that is every 1000 milliseconds (1 second)*/
    const timerInterval = setInterval(() => {
        //decreasing the time left by 1 second
        timeLeft--;

        //formatting the time in mm:ss format
        let displaySeconds = timeLeft < 10 ? "0" + timeLeft : timeLeft;
        timerElement.textContent = "00:" + displaySeconds;

        //checking if the time left has reached zero
        if (timeLeft <= 0) {
            //this code stops the timer
            clearInterval(timerInterval);

            //change the look to tell the user that the time is up
            timerElement.textContent = "00:00";
            timerElement.style.color = 'red';
            resendLink.classList.remove('disabled'); // Just unlock the link
            resendLink.style.cursor = 'pointer';
            resendLink.style.color = "004aad";
        }


    }, 1000);
}

//3. Function to handle the resend link activation
async function handleResendLink() {
    //1. this codes shows the visual feedback that the link has been clicked
    const originalText = resendLink.textContent;
    resendLink.textContent = 'Resending...';
    resendLink.style.opacity = "0.5";

    //2. this codes makes the api call to resend the otp. but fo now the code will be a mockup backend call code
    try {
        //this codes tells us how long we are to wait before the otp is sent, now we are to wait for 1.5 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert("A new 6-digit code has been sent to your email!");

        //3. resetting the link text and style back to normal
        timeLeft = 60; //reseting to the initial time of 60 seconds
        resendLink.style.opacity = "1";
        resendLink.textContent = originalText;

        //4. restarting the timer logic again
        startTimer();
    } catch (error) {
        alert('An error occured while resending the code. Please try again later.');
        resendLink.textContent = originalText;
    }


}


//4. Attach and event listener to the resend link so it responds when clicked by the user
resendLink.addEventListener('click', function (event) {
    event.preventDefault(); //preventing the default behavior of the link

    if (!resendLink.classList.contains('disabled')) {
        handleResendLink();
    }
});

//5. Starting the timer when the page loads
window.onload = startTimer;

//6. Working on the otp input fields functionality
//A. looping through each of the otp input fields to add an event listener
otpInputs.forEach((input, index) => {
    //adding an event listener to each input field to listen for an input event
    input.addEventListener('input', (e) => {
        const value = input.value;

        //this codes shows that if the user types a number, the user should move to the bext box
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus(); //moving the focus to the next box
        }
    });

    //handling the pressing of the backspace key
    input.addEventListener('keydown', (e) => {
        //checking if the pressed key is backspace and the current input box is empty and there is a previous box
        if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus(); //moving the focus to the previous box
        }
    });
});


//7. Handling the form submission
verifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. UI State: Start Loading
    btnText.textContent = "Verifying...";
    btnSpinner.style.display = "inline-block";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // 2. Simulate the "Wait" for the Backend (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Collect the code (same as before)
    let typedCode = "";
    otpInputs.forEach(input => typedCode += input.value);

    // 4. The Check
    if (typedCode === "123456") {
        window.location.href = "/Reset-password-Authentication/resetpwd.html";
    } else {
        alert("Invalid code! Try 123456");

        // 5. Reset UI State on Failure
        btnText.textContent = "Verify Email";
        btnSpinner.style.display = "none";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";

        //clearing all the input fields
        otpInputs.forEach(input => input.value = "");

        //setting the focus back to the first input field
        if (otpInputs.length > 0) {
            otpInputs[0].focus();
        }
    }
});