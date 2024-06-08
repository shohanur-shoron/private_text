// This function will generate a unique string each time for the message id
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

function generateLink() {
    const message = document.getElementById('message').value;
    const pass = document.getElementById('password').value || `000000`;
    if (!message) {
        alert("Please enter a message.");
        return;
    }

    const id = generateUniqueId();
    let isPass = false
    // If the pass variable has a default value then the user did not input any password
    if(pass !== '000000'){
        isPass = true
    }

    // Creating object
    const messageObject = { message, viewed: false, isPass, pass};
    // Storing the object in local storage
    localStorage.setItem(id, JSON.stringify(messageObject));

    // Creating the link to show message
    // Here we are adding the message id with the original link
    const link = `${window.location.origin}${window.location.pathname}?msgid=${id}`;
    document.getElementById('result').innerHTML = `Your link: <a href="${link}" target="_blank">${link}</a>`;
    document.getElementById('message').value = '';
}

function showMessage() {
    // Extracting the message ID from the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('msgid');
    if (!id) return;

    const messageObject = JSON.parse(localStorage.getItem(id));
    if (!messageObject) {
        alert("Message not found!");
        return;
    }

    const passwordBox = document.getElementById('passwordBox')
    const passBtn = document.getElementById('passBtn')
    const messageText = document.getElementById('message-text')

    // If the message object has true in the isPass attribute then the message is password protected
    if(messageObject.isPass == true){
        document.getElementById('message-form').style.display = 'none';
        document.getElementById('message-display').style.display = 'block';
        // Initially hiding the message
        messageText.style.display = 'none';

        // This event lessener triggers when we enter the password in the password field
        // If the password is correct then the message will show otherwise not
        passBtn.addEventListener('click', ()=>{
            const password = passwordBox.value;

            // Checking the password
            if(messageObject.pass === password){
                passwordBox.style.display = 'none';
                passBtn.style.display = 'none';
                messageText.style.display = 'block';

                // if viewed attribute is true then it will not show the message
                if (messageObject.viewed) {
                    messageText.innerText = "This message has already been viewed.";
                } else {
                    // Showing the message and making the viewed attribute true so that the message cannot be seen again
                    messageText.innerText = messageObject.message;
                    messageObject.viewed = true;
                    localStorage.setItem(id, JSON.stringify(messageObject));
                }
            }
            else{
                // If user input the wrong password then it will show an alert
                passwordBox.style.borderColor = 'red'
                alert("Wrong Password!");
            }
        })
    }
    else{
        // If there is no password protection then it will just show the message only one time
        document.getElementById('message-form').style.display = 'none';
        document.getElementById('message-display').style.display = 'block';

        passwordBox.style.display = 'none';
        passBtn.style.display = 'none';

        if (messageObject.viewed) {
            messageText.innerHTML = "This message has already been viewed.";
        } else {
            messageText.innerHTML = messageObject.message;
            messageObject.viewed = true;
            localStorage.setItem(id, JSON.stringify(messageObject));
        }
    }
}

// Check for a message ID when the page loads
window.onload = showMessage;
