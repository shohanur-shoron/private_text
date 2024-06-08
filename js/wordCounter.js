function checkInput(inputField) {
    const wordCounter = document.getElementById('wordCounter');
    // Getting the message from the input field and splitting it using space
    var words = inputField.value.trim().split(/\s+/);
    // Showing user how many words are already been inputted
    wordCounter.textContent = `Words: ${words.length}/300`;
    // Increase or decrease the number based on how many words you want to take input
    // Here the word limit is 300
    if (words.length > 300) {
        // Replace any character input after 300 word with nothing or ''
        inputField.value = inputField.value.replace(/\s+\S*$/, '');
        inputField.value = inputField.value + ' '
        wordCounter.textContent = `Words: 300/300`;
    }
    if(isEmptyStringArray(words)){
        wordCounter.textContent = `Words: 0/300`;
    }
}

//This function will show if the array is empty or not
// If empty return true otherwise return false
function isEmptyStringArray(arr) {
    return Array.isArray(arr) && arr.length === 1 && arr[0] === '';
}
