const checkBox = document.getElementById('isPassword');
const passwordInputBox = document.getElementById('password');

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