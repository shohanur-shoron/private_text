const checkBox = document.getElementById('isPassword');
const passwordInputBox = document.getElementById('password');

// Show the password input box based on whether the check box is checked or not
// If the check box is checked the password input box will show otherwise not
checkBox.addEventListener('change', function() {
    if (checkBox.checked) {
        passwordInputBox.style.display = 'block';
    } else {
        passwordInputBox.style.display = 'none';
    }
});

// Initially hide the password input box if the checkbox is not checked
if (!checkBox.checked) {
    passwordInputBox.style.display = 'none';
}
