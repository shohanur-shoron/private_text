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
    if(pass !== '000000'){
        isPass = true
    }
    const messageObject = { message, viewed: false, isPass, pass};
    localStorage.setItem(id, JSON.stringify(messageObject));

    const link = `${window.location.origin}${window.location.pathname}?msgid=${id}`;
    document.getElementById('result').innerHTML = `Your link: <a href="${link}" target="_blank">${link}</a>`;
    document.getElementById('message').value = '';
}

function showMessage() {
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

    if(messageObject.isPass == true){
        document.getElementById('message-form').style.display = 'none';
        document.getElementById('message-display').style.display = 'block';
        messageText.style.display = 'none';
        passBtn.addEventListener('click', ()=>{
            const password = passwordBox.value;

            if(messageObject.pass === password){
                passwordBox.style.display = 'none';
                passBtn.style.display = 'none';
                messageText.style.display = 'block';

                if (messageObject.viewed) {
                    messageText.innerText = "This message has already been viewed.";
                } else {
                    messageText.innerText = messageObject.message;
                    messageObject.viewed = true;
                    localStorage.setItem(id, JSON.stringify(messageObject));
                }
            }
            else{
                passwordBox.style.borderColor = 'red'
                alert("Wrong Password!");
            }
        })
    }
    else{
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

window.onload = showMessage;