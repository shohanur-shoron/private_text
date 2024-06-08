function checkInput(inputField) {
    const wordCounter = document.getElementById('wordCounter');

    var words = inputField.value.trim().split(/\s+/);
    //console.log(words, isEmptyStringArray(words))
    wordCounter.textContent = `Words: ${words.length}/300`;
    if (words.length > 300) {
        inputField.value = inputField.value.replace(/\s+\S*$/, '');
        inputField.value = inputField.value + ' '
        wordCounter.textContent = `Words: 300/300`;
    }
    if(isEmptyStringArray(words)){
        wordCounter.textContent = `Words: 0/300`;
    }
}

function isEmptyStringArray(arr) {
    return Array.isArray(arr) && arr.length === 1 && arr[0] === '';
}